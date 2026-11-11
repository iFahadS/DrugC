# Review of 5 modules (Phenytoin, Tacrolimus, Cyclosporine, Linezolid, Fluconazole) - v6
Status: constants checked against published references; math verified; PENDING CLINICAL REVIEW.

## Findings (all fixed in index.html v6)
| # | Module | Finding | Reference | Effect | Fix |
|---|---|---|---|---|---|
| 1 | Phenytoin | Salt/bioavailability factor: capsule 0.95, suspension 0.9, IV 1.0 | S = 0.92 capsules & injection, 1.0 tablets & suspension (GlobalRPh; Winter-based lecture notes; ClinCalc) | 8-10% dose error; large level change near Vmax | Capsule 0.92, chewable 1.0, suspension 1.0, IV 0.92 (F taken as 1) |
| 2 | Phenytoin | IV loading dose not divided by S | LD = 0.7 x wt x (target - current) / 0.92 | ~8% under-loading | Divided by 0.92 |
| 3 | Phenytoin | Sheiner-Tozer renal constant (0.1) applied when CrCl <= 20 | Constant 0.1 only for CrCl < 10 mL/min (Winter; Epocrates) | CrCl 10-20: corrected level overestimated (e.g. 6 -> 17.1 vs 10.0 mg/L), so under-dosing | Threshold CrCl < 10 or dialysis |
| 4 | Tacrolimus | Starting dose 0.075 mg/kg/day for every indication; text said 0.05-0.1 | Label: kidney 0.2 (azathioprine) / 0.1 (MMF, IL-2 antagonist); liver 0.10-0.15; heart 0.075 | Kidney/liver under-dosed by 25-60% | Per-indication start (kidney 0.1, liver 0.1, heart 0.075) with label ranges shown |
| 5 | Tacrolimus | Doses rounded to 0.5 mg/day | Capsules 0.5/1/5 mg, given q12h | 3.5 mg/day cannot be split into two equal doses | Whole mg/day |
| 6 | Cyclosporine | Starting dose 4 mg/kg/day for all | Neoral label: kidney 9 +/- 3, liver 8 +/- 4, heart 7 +/- 3, RA/psoriasis 2.5 mg/kg/day | Transplant under-dosed ~50%; RA/psoriasis over-dosed 60% | Indication selector; Sandimmune (original) start not calculated |
| 7 | Cyclosporine | Doses rounded to 25 mg/day | Capsules 25/100 mg, q12h | Same as 5 | Rounded to 50 mg/day |
| 8 | Fluconazole | Cryptococcal induction = 400 mg/day (6 mg/kg, max 400) | WHO 2022: 1200 mg/day (adults); IDSA: >= 800 mg/day, 1200 favored; consolidation 800 | Induction under-dosed by 50-67% | 1200 mg q24h, no load, review flag, consolidation note |
| 9 | Linezolid | No errors found | - | - | - |

## Not changed (design notes)
- Phenytoin: level > 30 mg/L is displayed as INVALID (it is a toxicity alert); hepatic factor x0.75 is not from a cited source.
- Tacrolimus/cyclosporine: hepatic x0.6, inhibitor x0.6, inducer x1.3 are rule-of-thumb multipliers without a primary source; organ- and time-specific target troughs are not implemented (default targets only).
- Sheiner-Tozer is known to be less accurate in some groups (Kiang & Ensom, Ann Pharmacother 2016); free levels are preferred when albumin is low.

## Test results
- 69 checks on the patched file against an independent reference built from the sources above: 0 mismatches (phenytoin maintenance/Vmax/loading/albumin correction, two-level Km/Vmax recovery, tacrolimus, cyclosporine, fluconazole, linezolid logic).
- The same tests on the previous file: 29 mismatches in 57 checks (findings 1-8).
- Limits: references were verified from search results (label/guideline excerpts and lecture notes), not from the full original papers; reference years must be confirmed before they are cited.
