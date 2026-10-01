# Project Context: PointCalc (AI Esports Tournament Toolkit)

## 1. Executive Summary & Value Proposition

**PointCalc** (`pointcalc.in`) is an AI-powered tournament operations and automated media kit generation platform engineered specifically for mobile battle royale esports organizers running **BGMI (Battlegrounds Mobile India)**, **PUBG Mobile**, and **Free Fire**.

### The Problem
Esports tier-1 to tier-3 tournament and daily scrim organizers face massive manual operational friction:
- **Tedious Manual Entry:** Organizers spend 25–45 minutes per match manually cross-referencing scoreboard screenshots, verifying in-game kill feeds, and typing stats into spreadsheets.
- **Graphic Production Bottlenecks:** Creating overall standings, top fraggers, warheads, and social posters requires dedicated Canva or Photoshop designers, delaying publication by hours.
- **Human Scoring Errors:** Miscounted kills, incorrect tie-break assessments, and mistyped team tags trigger disputes and disrupt scrim schedules.

### The Solution
PointCalc eliminates manual workflows through an end-to-end automated pipeline:
1. **Drop Screens:** Organizers upload raw lobby rosters and end-of-match post-game result screenshots.
2. **AI Vision Extraction:** Specialized OCR and vision models automatically detect game type, crop scoreboard tables, match team tags, and extract placements, kills, damage, and MVP stats.
3. **Automated Point Engine:** The system applies official or custom rule systems (e.g., BGIS 10-point, PMGC, legacy 15-point, Free Fire criteria) with automated tie-breaker logic.
4. **The Complete Kit Delivery:** In seconds, PointCalc renders export-ready vector/raster graphics:
   - Overall Leaderboard / Points Table (Multi-match aggregations)
   - Warhead Graphics (Head-to-head match summary)
   - Top Fraggers / MVP Spotlight Cards
   - Tournament Slot Lists (Team tags + player IGNs + slot numbers)
   - Social Media Posters (1:1 Square, 4:5 Portrait, 9:16 Story formats)
   - Team Verification & Winner Certificates

---

## 2. Target Technical Stack

### Frontend Architecture
- **Framework:** Next.js (App Router, React 19)
- **Language:** TypeScript (Strict mode enabled, zero `any` policy)
- **Styling:** Tailwind CSS with custom esports theme (Dark mode native, neon neon-cyan/violet accents, high-contrast tabular figures)
- **UI Components:** Shadcn UI, Radix UI Primitives, Lucide React
- **Canvas / Studio Editor:** Fabric.js or Konva.js for custom client-side asset template positioning, font selection, and logo drag-and-drop
- **State Management:** Zustand (for match queue, live editing of parsed OCR data, and active templates)
- **Data Fetching:** TanStack React Query v5 with optimistic UI updates
- **Client Rendering / Export:** `html-to-image` / Canvas to Blob with high-DPI scaling (2x/4x for 4K exports)

### Backend Architecture
- **Framework:** Python 3.11+ via FastAPI (Fully asynchronous endpoints)
- **Validation & Serialization:** Pydantic v2
- **Computer Vision & OCR Pipeline:**
  - OpenCV for image pre-processing (deskewing, contrast enhancement, dynamic thresholding, scoreboard region isolation)
  - EasyOCR / PaddleOCR fine-tuned for gaming fonts and condensed alphanumeric layouts
  - Multimodal LLM Fallback (Gemini Flash / GPT-4o-mini Vision) for compressed, low-res, or unusual UI skins
- **Database & Cache:** PostgreSQL (Supabase / Neon) via SQLAlchemy (asyncpg) or SQLModel; Redis for parsing job queues and Celery/ARQ workers
- **Server-Side Graphic Engine:** Pillow (PIL) and Skia-Python / CairoSVG for automated headless server-side batch rendering of 4K posters and certificates

---

## 3. Core System Architecture

```text
+-----------------------------------------------------------------------------------+
|                                  NEXT.JS CLIENT                                   |
|                                                                                   |
|  +--------------------+   +-----------------------+   +------------------------+  |
|  | Multi-File Uploader|-->| Interactive OCR Editor|-->| PointCalc Studio Canvas|  |
|  | (Lobby & Results)  |   | (Manual Correction)   |   | (Custom Templates)     |  |
|  +--------------------+   +-----------------------+   +------------------------+  |
+-----------------------------------------|-----------------------------------------+
                                          | JSON Payloads / Multipart Upload
                                          v
+-----------------------------------------------------------------------------------+
|                                FASTAPI BACKEND                                    |
|                                                                                   |
|  +-----------------------------------------------------------------------------+  |
|  | REST API Gateway (/api/v1/tournaments, /api/v1/ocr, /api/v1/render)         |  |
|  +-----------------------------------------------------------------------------+  |
|          |                                                |                       |
|          v                                                v                       |
|  +---------------------------+                +--------------------------------+  |
|  | Vision & OCR Pipeline     |                | Tournament Calculation Engine  |  |
|  | - Preprocessing (OpenCV)  |                | - Placement Points Matrix      |  |
|  | - Table Detection & OCR   |                | - Kill Multipliers             |  |
|  | - Fallback Multimodal LLM |                | - Automated Tie-Break Rules    |  |
|  +---------------------------+                +--------------------------------+  |
|          |                                                |                       |
|          +-----------------------+------------------------+                       |
|                                  v                                                |
|                   +-------------------------------+                               |
|                   | Headless Asset Renderer (PIL) |                               |
|                   | (Leaderboard, MVP, Certs)     |                               |
|                   +-------------------------------+                               |
+-----------------------------------------------------------------------------------+
```

---

## 4. Domain Data Model

```text
+------------------------+             +------------------------+
|      Tournament        | 1 ------- * |        Match           |
+------------------------+             +------------------------+
| id: UUID               |             | id: UUID               |
| name: string           |             | tournament_id: UUID    |
| game: BGMI|PUBG|FF     |             | match_number: int      |
| point_system_id: UUID  |             | map_name: string       |
| organizer_id: UUID     |             | raw_screenshot_urls: []|
| status: DRAFT|ACTIVE   |             | is_verified: bool      |
+------------------------+             +------------------------+
            | 1                                     | 1
            |                                       |
            *                                       *
+------------------------+             +------------------------+
|      PointSystem       |             |       MatchResult      |
+------------------------+             +------------------------+
| id: UUID               |             | id: UUID               |
| name: string           |             | match_id: UUID         |
| placement_points: dict |             | team_id: UUID          |
| kill_point_value: int  |             | rank: int              |
| tie_breaker_order: []  |             | kill_points: int       |
+------------------------+             | placement_points: int  |
                                       | total_points: int      |
                                       | is_wwcd: bool          |
                                       +------------------------+
                                                    | 1
                                                    |
                                                    *
                                       +------------------------+
                                       |      PlayerStat        |
                                       +------------------------+
                                       | id: UUID               |
                                       | match_result_id: UUID  |
                                       | player_ign: string     |
                                       | kills: int             |
                                       | damage: int            |
                                       | survival_time_sec: int |
                                       | is_mvp: bool           |
                                       +------------------------+
```

---

## 5. Game Point System Presets

### Standard 10-Point System (Official BGIS / PMGC Modern)
- **#1 (WWCD / Booyah):** 10 points
- **#2:** 6 points
- **#3:** 5 points
- **#4:** 4 points
- **#5:** 3 points
- **#6:** 2 points
- **#7–#8:** 1 point
- **#9–#16 (#20):** 0 points
- **Kill Points:** 1 point per kill

### Legacy 15-Point System (Old PMPL / Club Open)
- **#1:** 15 pts | **#2:** 12 pts | **#3:** 10 pts | **#4:** 8 pts | **#5:** 6 pts | **#6:** 4 pts | **#7:** 2 pts | **#8–#12:** 1 pt | **#13–#16:** 0 pts
- **Kill Points:** 1 point per kill

### Tie-Breaker Priority Hierarchy
1. Total Placement Points (excluding kills)
2. Total Chicken Dinners / Booyahs (WWCD count)
3. Total Kill Points
4. Best single-match placement
5. Latest match finish rank

---

## 6. Output Asset Specifications

| Asset Name | Aspect Ratio | Dimensions | Key Elements Included |
| :--- | :--- | :--- | :--- |
| **Overall Standings** | 16:9 Landscape & 4:5 Portrait | 3840×2160 / 1080×1350 | Rank, Team Logo, Team Name, Matches Played, WWCDs, Placement Pts, Kill Pts, Total Pts |
| **Match Warhead** | 16:9 Landscape | 1920×1080 | Map, Match #, Top 5 teams bar chart, Kill distribution, Head-to-Head roster clash |
| **Top Fraggers / MVP** | 1:1 Square & 9:16 Story | 2160×2160 / 1080×1920 | Player Avatar/IGN, Team Tag, Kills, Total Damage, Survival Duration, Headshot % |
| **Slot List Grid** | 16:9 Landscape & 4:5 Portrait | 1920×1080 / 1080×1350 | Slot # (1–25), Team Name, Leader Contact/Discord tag, Group Tag (Group A/B) |
| **Winner Certificates**| Landscape A4 / 16:9 | 3508×2480 / 1920×1080 | Tournament Title, Rank, Team Name, Prize Pool Share, Official Organizer Signature & Stamp |

---

## 7. Core REST API Interface

### OCR & Vision
- `POST /api/v1/ocr/process-match`
  - Accepts: Multipart array of images (`result_screens`, `lobby_screens`), `game` (`bgmi` | `pubg` | `freefire`).
  - Returns: Structured JSON of parsed teams, ranks, player kills, damages, confidence scores per bounding box, and warnings for flagged low-confidence values.

### Matches & Tournaments
- `POST /api/v1/tournaments` — Create tournament with point rules and slot allocations.
- `POST /api/v1/tournaments/{id}/matches` — Ingest parsed match data and update leaderboard.
- `GET /api/v1/tournaments/{id}/standings` — Retrieve cumulative calculated standings with tie-breaker resolution.

### Graphics & Studio Export
- `POST /api/v1/render/asset`
  - Accepts: `template_id`, `tournament_id`, `match_id` (optional), `type` (`OVERALL` | `WARHEAD` | `MVP` | `SLOTS` | `CERTIFICATE`), overrides (custom logo, background image, branding color hex).
  - Returns: High-resolution PNG/WebP URL or direct binary stream.