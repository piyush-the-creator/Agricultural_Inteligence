# UI/UX Design Specification
## AgriN AI — Regenerative Agricultural Intelligence Network

**Event:** Code with Community by H2S / Google  
**Prototype:** AgriN AI  
**Document Type:** UI/UX Design System & Screen Specifications  
**Based On:** AgriN AI PRD + TRD + App Flow

---

## 01. Design Overview
AgriN AI (Regenerative Agricultural Intelligence Network) is an agricultural intelligence platform engineered for small and marginal farmers, agricultural extension workers, and regional agronomy advisors. It synthesizes multi-spectral earth observation data, hyper-local meteorological forecasts, ground-level soil chemical metrics, and agronomic knowledge bases into localized, explainable, and regenerative agricultural guidance.

**Core Data Flow:**
`FARM DATA → DATA ANALYSIS → FARM INTELLIGENCE → AI EXPLANATION → ACTIONABLE ADVISORY → REGENERATIVE ACTION`

**Key Principles:**
1. **Decision Over Metric:** NDVI 0.71 matters because vigor slipped from 0.76, indicating moderate stress in tillering stage.
2. **Contextual Actionability:** 18mm rain forecast in 48 hours determines whether to burn diesel pumping water today.
3. **Causal Transparency:** Every recommendation exposes the underlying data points that triggered it.

---

## 02. Product Design Principles & Prohibitions
- **Principle 1:** Decision-First Information Architecture (answer what is happening, how critical, what caused it, what action to take today/this week, how it protects soil long-term).
- **Principle 2:** Calm, Scientific, and Grounded Materiality (high-contrast, outdoor-glare-resistant, earth-derived palette).
- **Principle 3:** Structural Transparency and Explainability ("Why this recommendation?" causal drawers).
- **Principle 4: Defensible Restraint (Strict Prohibitions):**
  - ❌ **No Bento Grids** → Use structured data panels & modular field sections.
  - ❌ **No Skeleton Loaders** → Use deterministic step-by-step processing logs.
  - ❌ **No Purple/Neon/Dark Mode SaaS tropes** → Use Crisp Chalk White (`#FBFBF9`), Field Sand (`#F4F3EE`), Slate Charcoal (`#1B241E`).
  - ❌ **No Sparkle/Magic AI Icons** → Use provenance badges (Gemini 1.5, Copernicus Sentinel-2, Open-Meteo).
  - ❌ **No Radial Orbs & 3D Blobs** → Use precision segmented gauges & tabular indicators.
  - ❌ **No Floating Cards** → Use defined inset borders (1px solid `#E2E0D8`) & clear section dividers.
  - ❌ **No Flying Arrows** → Use static orthogonal connectors & directional carets (↓, →).

---

## 03. Design Tokens & Color System

### Primary Color Palette
| Token Name | Hex Code | Role & Agronomic Application | WCAG Contrast |
|---|---|---|---|
| `earth-slate` | `#1B241E` | Primary typography, panel headers, dividing lines | 14.8:1 (AAA) |
| `canopy-deep` | `#2D5A3C` | Primary branding, action buttons, healthy vegetative states | 7.2:1 (AAA) |
| `canopy-surface` | `#EBF2ED` | Success message backgrounds, low-risk tags | 1.2:1 (fill) |
| `canvas-bg` | `#FBFBF9` | Global application background (anti-glare off-white) | Base canvas |
| `panel-surface` | `#FFFFFF` | Core container background, input fields | 1.1:1 vs Canvas |
| `border-subtle` | `#E2E0D8` | Structural container borders, table dividing rules | 1.3:1 (structural) |
| `border-strong` | `#B8B6AC` | Emphasized dividers, active input borders | 2.1:1 |
| `text-muted` | `#58635A` | Metadata, unit indicators, subheadings, provenance | 5.8:1 (AA) |
| `text-dim` | `#828E84` | Form placeholders, disabled labels, chart axis rules | 3.2:1 |

### Functional Agricultural Status Palette
| State | Fill Hex | Border Hex | Text Hex | Agronomic Trigger |
|---|---|---|---|---|
| **Optimal / Resilient** | `#EBF5EE` | `#BCE3C5` | `#1E5E2E` | NDVI > 0.70, optimal soil pH (6.5–7.2), low disease probability |
| **Moderate / Attention** | `#FFF9EB` | `#F5DE9C` | `#875A00` | NDVI 0.50–0.70, declining vigor trend, rain pending (irrigation hold) |
| **High Risk / Alert** | `#FDF0ED` | `#F3BEB2` | `#992615` | Rapid NDVI collapse, critical moisture deficit, disease screening positive |
| **Neutral / Informational**| `#F2F4F3` | `#D3D8D5` | `#2C3830` | Static farm metadata, historical averages |

---

## 04. Typography
- **Sans-serif font:** Inter (or system sans-serif)
- **Monospace font:** JetBrains Mono (for telemetry, coordinates, bands, metrics)
- **Rules:** No startup hero text > 28px. Tabular figures (`tabular-nums`) for all numbers. Always pair numerical values with an agronomic evaluation label.

---

## 05. Core Components & Visual Rules
- **Buttons:** 38px height (desktop), 44px (mobile touch target). Rectangular with subtle 4px radius. Primary: `#2D5A3C` background, white text. Secondary: white background, `#E2E0D8` border, `#1B241E` text.
- **Inputs:** 38px height, white background, `#E2E0D8` border, focus ring `#2D5A3C`.
- **Farm Health Score:** Horizontal linear segmented bar (0–49 Red, 50–74 Amber, 75–100 Green) + JetBrains Mono readout + "Why this score?" trigger.
- **AI Advisory Card:** Border-left 4px `#2D5A3C`. Clear metadata strip (Priority, Timeframe, Domain) + direct action imperative + concise rationale + "Why this recommendation?" causal link.
- **Step-Based Progress Loader:** Sequential checklist (`✓` complete, `⟳` rotating track, `○` pending) with actual stage text and mathematical bar.
- **Explainability Drawer:** Right-side slide-over panel (480px width) detailing atmospheric, satellite, and crop inputs + Gemini inference deduction.

---

## 06. Screen Inventory & Layouts
1. **`/` — Landing Page:** Minimal top nav, clean hero, 5-stage pipeline diagram, live dashboard 1:1 preview, core infrastructure pillars, global footer.
2. **`/farm` — Farm Setup:** 580px max-width centered form: Country node, location lookup + GPS detect, crop species selector, farm area with unit toggle, optional collapsible soil chemistry inputs.
3. **`/analysis` — Farm Analysis:** 5-stage sequential processing log with live status indicators and progress bar.
4. **`/dashboard` — Farm Intelligence Dashboard:** 3-column modular grid (Health Score & AI Advisory left; NDVI trend & Soil chemistry center; Weather forecast & Farm map right; Quick action links bottom).
5. **`/regenerative` — Regenerative Transition Plan:** 4-stage temporal horizons (Now, This Week, Next Crop Cycle, Long-Term Resilience).
6. **`/disease` — Crop Disease Scanner:** Dual-panel layout (Upload & crop selector on left; 3-stage analysis log & structured diagnosis + field directives + non-diagnostic disclaimer on right).
7. **`/network` — AgriN Network (BRICS Interoperability):** 5-node topology schematic, Common Agricultural Data Schema (CADS) definition, interactive country inspector.
8. **`/privacy` & `/terms`:** Focused single-column governance documents.
