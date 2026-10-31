# MEDQUEST — Think. Investigate. Diagnose.
### An Interactive Clinical Reasoning & Medical Education Platform

MEDQUEST is an immersive, case-based clinical reasoning simulation platform designed for medical students, clinical clerks, residents, and healthcare educators.

Rather than testing rote memory with isolated multiple-choice questions, MEDQUEST puts the learner in the position of a treating physician across a structured **12-stage clinical journey**:

1. **Patient Encounter** — Active history taking with relevance weighting and red-flag identification.
2. **Physical Examination** — Systematic regional examination distinguishing documented positive, documented negative, and undocumented findings.
3. **Problem Representation** — Syndromic formulation transforming raw symptoms into semantic clinical qualifiers.
4. **Differential Diagnosis** — Comparative diagnostic ranking with supporting evidence, counter-arguments, and distinguishing tests.
5. **Investigation Lab** — Ordering and interpreting CBC, chemistry, inflammatory markers, imaging, and histology with authentic reference ranges.
6. **The Evidence Board** — Diagnostic workspace organizing evidence into supporting vectors, alternative possibilities, and urgent priorities.
7. **Pathology Lab** — High-power interactive micrograph exploration of Reed-Sternberg cells, mixed background infiltrate, and diagnostic immunohistochemistry (CD30+, CD15-, CD20 focal, LCA-).
8. **Diagnostic Challenge** — Definitive disease commitment with histological subtype selection and diagnostic rationale.
9. **Staging & Disease Extent** — Anatomical nodal mapping above and below the diaphragm using Ann Arbor / Lugano criteria.
10. **Management Simulation** — Acute triage balancing emergency blood product stabilization against definitive systemic oncology protocols.
11. **Clinical Course & Trajectory** — Serial timeline comparing hematologic deterioration, acute transaminitis, and secondary hyperinflammatory response.
12. **Final Debrief & Learning Portfolio** — Comprehensive score analysis, badge unlocks, common diagnostic pitfalls, clinical pearls, and peer-reviewed citations.

---

## Featured Initial Case: CASE 001 — "The Hidden Clue"

- **Patient Profile**: 28-year-old male presenting with progressive, non-tender generalized lymph node enlargement.
- **Histopathologically Confirmed Diagnosis**: Classical Hodgkin Lymphoma, Mixed Cellularity Subtype.
- **Critical Clinical Complications**: Severe acute pancytopenia (Hemoglobin 3.9 g/dL, Platelets 9 × 10³/µL, WBC 2.92 × 10³/µL), high fevers (>39°C), marked transaminitis (AST 393, ALT 116), direct hyperbilirubinemia (9.15 mg/dL), and clinical suspicion under investigation for secondary Hemophagocytic Lymphohistiocytosis (HLH).

## Achievements & Performance Milestones System

MEDQUEST features an active **Achievements & Milestones Engine** that tracks clinical competencies and awards specialized badges based on objective performance benchmarks stored in the user profile (`PlayerProfile.milestones`):

### Clinical Badges & Milestones:
- **The Observer** (*Rare*, +60 XP): Uncover all 3 critical red-flag history inquiries in a case.
- **The Investigator** (*Rare*, +70 XP): Order high-yield diagnostic investigations including excisional lymph node biopsy and critical CBC.
- **The Analyst** (*Rare*, +65 XP): Correctly interpret complex laboratory trajectories, critical cytopenias, and acute transaminitis in Stage 11.
- **The Detective** (*Rare*, +75 XP): Correctly synthesize and organize clinical clues across all 4 reasoning vectors on the Evidence Board.
- **The Diagnostician** (*Epic*, +100 XP): Accurately reach the definitive histopathologic diagnosis and correct subtype (Classical Hodgkin Lymphoma, Mixed Cellularity).
- **The Safe Clinician** (*Epic*, +90 XP): Recognize life-threatening emergencies (Hb 3.9, Plt 9k) and prioritize urgent stabilization before chemotherapy while avoiding premature discharge.
- **Pathology Sleuth** (*Common*, +50 XP): Inspect all microscopic features and analyze the full immunohistochemistry panel.
- **Syndrome Architect** (*Rare*, +60 XP): Formulate an accurate syndromic problem representation distinguishing key clusters from distractors.
- **First Encounter** (*Common*, +50 XP): Complete your first full clinical case investigation from encounter to debrief.
- **Master Clinician** (*Legendary*, +150 XP): Achieve an overall diagnostic accuracy score of ≥ 85% on any completed clinical investigation.

### Real-Time Milestone Detection & Audio Chime:
- **Instant Milestone Triggers**: Evaluated dynamically during each clinical action (history questions, laboratory orders, problem rep, pathology review, and emergency triage).
- **Audio Chime**: Web Audio API synthesized harmonic chime (`C5 - E5 - G5 - D6`) provides instant, elegant auditory reinforcement upon unlocking an achievement.
- **Dedicated Achievements Hub**: Category filtering (*Diagnostics*, *Investigation*, *Clinical Reasoning*, *Patient Safety*), status filtering (*Unlocked*, *In Progress*), detailed criteria inspection, and numerical progress bars.


## Technical Stack & Architecture

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Motion
- **Icons**: Lucide React
- **Typography**: Plus Jakarta Sans (Display & Body), JetBrains Mono (Tabular Clinical Numerals)
- **Design System**: Midnight navy / charcoal palette (`#090d16`), phosphorescent emerald (`#34d399`), cyan (`#22d3ee`), amber (`#fbbf24`), and rose (`#f43f5e`).
- **State & Persistence**: LocalStorage session engine with guest access, XP tracking, level progression, and 6 clinical badges.
- **Case Authoring Studio**: Educator studio with JSON case schema export, live validation, and modular architecture.

---

## Getting Started

```bash
# Install dependencies
npm install

# Run local development server
npm run dev

# Build production bundle
npm run build
```
