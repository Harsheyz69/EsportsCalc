# Agent Instructions: PointCalc Builder Agent

You are an expert full-stack engineer, computer vision specialist, and esports tooling architect. Your mission is to implement **PointCalc** (`pointcalc.in`), the automated esports tournament toolkit for BGMI, PUBG Mobile, and Free Fire organizers.

---

## 1. System Role & Architecture Directives

### Full-Stack Boundary & Conventions
- **Frontend:** Next.js (App Router, React 19) + TypeScript (strict mode, zero `any`, strict null checks).
- **Backend:** Python 3.11+ via FastAPI, Pydantic v2 schemas, SQLAlchemy (asyncpg) or SQLModel.
- **Async Processing:** Heavy image processing, OCR, and graphics export must be processed via background task queues (Celery or ARQ with Redis).
- **Client Canvas:** PointCalc Studio must run on Fabric.js or Konva.js for instant vector/canvas editing, backed by headless server-side generation (Pillow/PyMuPDF/Playwright) for batch rendering.

---

## 2. Directory Structure

Organize the repository according to the following layout:

```text
pointcalc/
├── frontend/                     # Next.js App Router Application
│   ├── app/
│   │   ├── (auth)/               # Login / Register routes
│   │   ├── dashboard/            # Tournaments, scrim manager, history
│   │   ├── tournament/[id]/
│   │   │   ├── matches/          # Match list & manual score verification
│   │   │   ├── upload/           # Drag-and-drop screen uploader
│   │   │   ├── standings/        # Live points table view
│   │   │   └── studio/           # PointCalc Studio canvas graphic customizer
│   │   └── api/                  # Edge endpoints & reverse proxies
│   ├── components/
│   │   ├── ui/                   # Shadcn UI primitives
│   │   ├── ocr-inspector/        # Side-by-side screenshot verification & corrections
│   │   ├── studio/               # Canvas overlays, layout picker, font selector
│   │   └── tables/               # Dynamic points tables & fragger cards
│   ├── lib/
│   │   ├── types/                # Canonical TypeScript interfaces
│   │   ├── calculator.ts         # Client-side tie-breaker & points preview engine
│   │   └── api-client.ts         # Type-safe Axios/fetch wrapper
│   └── stores/
│       └── useMatchStore.ts      # Active match OCR queue and editing state
│
└── backend/                      # Python FastAPI Service
    ├── app/
    │   ├── api/v1/
    │   │   ├── ocr.py            # Upload & parse endpoints
    │   │   ├── tournaments.py    # Tournament CRUD & standings
    │   │   ├── matches.py        # Match ingestion & verification
    │   │   └── render.py         # 4K image and PDF generation
    │   ├── core/
    │   │   ├── config.py         # Pydantic Settings
    │   │   └── database.py       # Async SQLAlchemy engine & sessions
    │   ├── models/               # Database entities
    │   ├── schemas/              # Pydantic v2 request/response schemas
    │   ├── services/
    │   │   ├── ocr_engine/       # OpenCV pre-processing & OCR extraction
    │   │   ├── point_engine.py   # Ranking, points calculation, tie-breakers
    │   │   └── graphic_renderer/ # Pillow & canvas template compositor
    │   └── workers/              # Celery/ARQ task definitions
    └── tests/                    # Pytest test cases for OCR and points calculation
```

---

## 3. Vision & OCR Pipeline Implementation Guidelines

### Screenshot Preprocessing Workflow
In `services/ocr_engine/preprocessor.py`:
1. **Aspect Ratio & Resolution Normalization:** Resize image preserving aspect ratio to a canonical width ($1920\text{px}$ minimum) before cropping.
2. **Game Title Auto-Detection:**
   - Detect UI characteristics (BGMI/PUBG: Bottom-left team summary tabs, blue/yellow headers; Free Fire: "Booyah!" banners and top-right kill count grid).
3. **Region of Interest (ROI) Extraction:**
   - Crop the scoreboard bounding box using contour detection and Otsu's thresholding.
   - De-skew if mobile screenshots are captured at slight canvas deviations.
4. **Column Isolation:** Split the ROI into distinct vertical lanes:
   - Rank Column
   - Team Tag / Name Column
   - Eliminations (Kill count)
   - Damage Dealt / Survival Duration
5. **Character Filtering:** Apply contrast normalization and noise removal (Gaussian Blur, Adaptive Thresholding) before feeding to OCR.

### OCR & LLM Fallback Pipeline
In `services/ocr_engine/extractor.py`:
- Primary Engine: **PaddleOCR** or **EasyOCR** with customized whitelist characters (`[A-Za-z0-9_# -]`).
- Fuzzy Matching: Use Levenshtein distance against registered tournament team tags and slot lists to resolve minor misreads (e.g., matching `S0UL` to `Soul` or `G0D` to `GodLike`).
- **Vision Model Fallback:**
  - If average OCR confidence across rows drops below $0.78$ or total kills detected diverge drastically from lobby player counts ($\sum \text{kills} > \text{total players} - 1$), forward the cropped scoreboard to a Multimodal Vision API (Gemini Flash or GPT-4o-mini Vision) with a strict JSON schema prompt.

---

## 4. Tournament Calculation Engine Logic

In `services/point_engine.py`:

### Standings Aggregation Algorithm
1. Sum all matches for every team:
   $$\text{Total Points} = \sum (\text{Placement Points}) + \sum (\text{Kills} \times \text{Kill Point Value})$$
2. **Deterministic Tie-Breaker Ordering:**
   When two or more teams share identical `Total Points`, break ties strictly in this priority:
   1. Higher cumulative `Placement Points`
   2. Higher cumulative `WWCD` / `Booyah` count (First-place finishes)
   3. Higher cumulative `Kill Points`
   4. Highest single-match total score
   5. Best individual placement rank achieved in the tournament
   6. Latest match finish rank

### Pydantic Validation Schema Example
```python
from pydantic import BaseModel, Field
from typing import List, Optional
from uuid import UUID

class PlayerStatInput(BaseModel):
    player_ign: str
    kills: int = Field(ge=0)
    damage: Optional[int] = Field(default=0, ge=0)
    is_mvp: bool = False

class TeamMatchResultInput(BaseModel):
    team_name: str
    rank: int = Field(ge=1, le=25)
    kills: int = Field(ge=0)
    is_wwcd: bool = False
    players: List[PlayerStatInput] = []

class MatchVerificationPayload(BaseModel):
    match_id: UUID
    tournament_id: UUID
    map_name: str
    match_number: int
    results: List[TeamMatchResultInput]
```

---

## 5. PointCalc Studio & Graphics Generation Guidelines

### Client-Side Studio (Next.js)
- Build an interactive WYSIWYG editor using Konva or Fabric:
  - Allow organizers to toggle elements: Tournament Title, Map Name, Match Count, Team Logos, Sponsor Banners.
  - Support asset format presets: `1920x1080` (16:9 Stream Overlay / Twitter), `1080x1350` (4:5 Instagram Portrait), `1080x1920` (9:16 Story).
  - High-DPI export: Scale canvas context by factor of 2x or 4x before executing `toDataURL('image/png')`.

### Headless Backend Renderer (Python)
In `services/graphic_renderer/`:
- Use **Pillow (PIL)** with pre-composed templates and dynamic text coordinate matrices.
- Cache loaded fonts (e.g., Anton, Montserrat, Oswald, Bebas Neue) and common esports team badges.
- Expose batch generation:
  - Generate full asset kits (Leaderboard + Warhead + MVP + Slot List) in parallel threads, zipping results into a single download package.

---

## 6. Phased Implementation Roadmap

### Phase 1: Core Foundation & Data Modeling
1. Set up FastAPI project with async SQLAlchemy, Alembic migrations, and PostgreSQL.
2. Implement Tournament, Team, Match, and PointSystem schemas.
3. Build the core point calculation and multi-match tie-breaker unit tests (`tests/test_points.py`).

### Phase 2: OCR & Screenshot Parsing Engine
1. Implement OpenCV image preprocessing (adaptive thresholding, ROI box croppers).
2. Integrate EasyOCR / PaddleOCR and implement the fuzzy team tag matching algorithm.
3. Implement the multimodal fallback router for low-confidence reads.
4. Expose `POST /api/v1/ocr/process-match`.

### Phase 3: Next.js Frontend & Interactive Correction Table
1. Set up Next.js App Router with Tailwind CSS and dark mode theme.
2. Build the multi-image upload dropzone with real-time parsing progress indicators.
3. Build the **Interactive OCR Correction Inspector**: Left pane displays original screenshot with zoom/pan; right pane displays editable data rows with highlighted low-confidence fields.

### Phase 4: PointCalc Studio & Kit Generation
1. Implement the browser-based canvas editor (Konva/Fabric) for standings, top fraggers, and warhead customization.
2. Implement backend Pillow batch rendering pipeline for 4K asset downloads and ZIP bundling.
3. Implement certificate generator with organizer digital signature and logo uploads.