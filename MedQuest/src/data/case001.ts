/**
 * CASE 001: THE HIDDEN CLUE
 * Verified Medical Case Data — Anonymized clinical records
 * Classical Hodgkin Lymphoma, Mixed Cellularity Subtype
 */

import { ClinicalCase } from '../types/case';

export const CASE_001: ClinicalCase = {
  id: 'case-001',
  caseNumber: '001',
  title: 'The Hidden Clue',
  subtitle: 'A young man presenting with widespread adenopathy and unexplained cytopenias',
  specialty: 'Hematology',
  subspecialty: 'Hematologic Oncology / Lymphoma',
  difficulty: 'Intermediate',
  estimatedMinutes: 25,
  author: 'Clinical Diagnostic Reasoning Panel',
  version: '2026.1.0',
  learningObjectives: [
    'Formulate an evidence-based differential diagnosis for generalized lymphadenopathy in a young adult.',
    'Differentiate reactive vs neoplastic lymph node histopathology and understand Reed-Sternberg morphology.',
    'Interpret diagnostic immunohistochemistry in Classical Hodgkin Lymphoma (CD30+, CD15-, CD20 focal, CD3 background).',
    'Recognize acute decompensation and profound cytopenias requiring urgent supportive stabilization.',
    'Evaluate clinical and laboratory features of secondary hyperinflammatory response (suspected secondary HLH).'
  ],
  patientProfile: {
    age: 28,
    sex: 'Male',
    setting: 'Inpatient Hematology Referral Service',
    chiefComplaint: 'Generalized enlargement of neck and body lymph nodes',
    initialPresentation: 'A 28-year-old male presents with progressive, non-tender generalized lymph node enlargement noticed over several weeks, accompanied by fatigue and subsequent high fevers.'
  },
  stages: {
    historyQuestions: [
      {
        id: 'hx-1',
        category: 'chief_complaint',
        questionText: 'When did you first notice the enlarged lymph nodes and how did they evolve?',
        patientAnswer: 'Noticed enlarged lumps in the left side of the neck first about 6–8 weeks ago. Gradually noticed swellings in both armpits and groin. They were not acutely painful, but gradually enlarged.',
        relevance: 'high',
        educationalRationale: 'Assessing duration, location, and rate of progression helps distinguish acute infective adenitis (tender, rapid) from indolent or aggressive lymphoproliferative disorders.',
        isDocumented: true,
        scoreImpact: 10
      },
      {
        id: 'hx-2',
        category: 'hpi',
        questionText: 'Have you had recurrent fevers, drenching night sweats, or significant unexplained weight loss?',
        patientAnswer: 'Documented recurrent fevers with spikes exceeding 39°C. Marked constitutional fatigue and night sweats noted in clinical progression.',
        relevance: 'high',
        isRedFlag: true,
        educationalRationale: 'Systemic "B symptoms" (fevers >38°C, drenching sweats, >10% weight loss in 6 months) carry prognostic and staging significance in lymphoma (Ann Arbor staging B designation).',
        isDocumented: true,
        scoreImpact: 15
      },
      {
        id: 'hx-3',
        category: 'hpi',
        questionText: 'Have you noticed any bleeding, bruising, petechiae, or dark stools?',
        patientAnswer: 'No overt gross bleeding episode documented at initial presentation; however, marked pallor and profound fatigue were recorded.',
        relevance: 'high',
        isRedFlag: true,
        educationalRationale: 'With bone marrow involvement or peripheral cytopenias, assessing hemorrhagic risks (mucosal bleeding, purpura) is a vital patient safety assessment.',
        isDocumented: true,
        scoreImpact: 10
      },
      {
        id: 'hx-4',
        category: 'pmh',
        questionText: 'Do you have any past medical history, chronic diseases, or prior hospital admissions?',
        patientAnswer: 'Not documented in the available case record. No documented prior chronic medical illness before current presentation.',
        relevance: 'moderate',
        educationalRationale: 'Baseline health status rules out preexisting autoimmune, renal, or hepatic disease that might complicate interpretation.',
        isDocumented: false,
        scoreImpact: 5
      },
      {
        id: 'hx-5',
        category: 'meds',
        questionText: 'What medications, herbal supplements, or illicit substances were you taking prior to illness?',
        patientAnswer: 'Not documented in the available case record. Documented medications in hospital record are supportive treatments and empiric antimicrobial agents initiated during workup.',
        relevance: 'moderate',
        educationalRationale: 'Certain drugs (e.g., phenytoin, allopurinol) can cause drug-induced pseudolymphoma or drug-induced cytopenias.',
        isDocumented: false,
        scoreImpact: 5
      },
      {
        id: 'hx-6',
        category: 'social',
        questionText: 'Have you had recent foreign travel, tuberculosis contact, or high-risk exposures?',
        patientAnswer: 'No documented specific travel history or TB contact. Viral serology panel was subsequently negative for HIV, HBV, and HCV.',
        relevance: 'moderate',
        educationalRationale: 'Infectious causes of generalized adenopathy (tuberculosis, disseminated histoplasmosis, HIV seroconversion) are major differentials in young patients.',
        isDocumented: true,
        scoreImpact: 10
      },
      {
        id: 'hx-7',
        category: 'ros',
        questionText: 'Have you had abdominal fullness, early satiety, or swelling in your legs?',
        patientAnswer: 'Clinical notes document marked abdominal fullness, confirmed organomegaly (marked hepatosplenomegaly), and progressive marked bilateral lower-limb edema.',
        relevance: 'high',
        isRedFlag: true,
        educationalRationale: 'Satiety and distension suggest massive splenomegaly or hepatomegaly; lower extremity edema may indicate inferior vena cava/iliac nodal compression or hypoalbuminemia.',
        isDocumented: true,
        scoreImpact: 15
      },
      {
        id: 'hx-8',
        category: 'social',
        questionText: 'What is your favorite recreational hobby or dietary preference?',
        patientAnswer: 'Not documented in the available case record.',
        relevance: 'low',
        educationalRationale: 'Unfocused questions consume clinical time without providing diagnostic value in an acute workup.',
        isDocumented: false,
        scoreImpact: -5
      }
    ],
    examinationFindings: [
      {
        system: 'general',
        label: 'General Appearance & Vitals',
        status: 'positive',
        description: 'Ill-appearing young male, severe pallor, high fevers spiking above 39°C. Marked fatigue and diaphoresis.',
        clinicalSignificance: 'High fever and severe pallor indicate acute systemic illness with profound anemia and intense inflammatory or infectious response.',
        dataLabel: 'VERIFIED PATIENT DATA'
      },
      {
        system: 'lymph_nodes',
        label: 'Lymphatic System Examination',
        status: 'positive',
        description: 'Widespread enlarged lymph nodes palpable in bilateral cervical regions (left cervical excisional biopsy performed measuring 2.5 × 2.0 × 1.5 cm, firm whitish surface), bilateral axillae, and inguinal chains.',
        clinicalSignificance: 'Generalized lymphadenopathy in a young male strongly points towards systemic lymphoproliferative disorder (lymphoma), disseminated infection (TB, viral), or autoimmune process.',
        dataLabel: 'VERIFIED PATIENT DATA'
      },
      {
        system: 'abdominal',
        label: 'Abdominal Examination',
        status: 'positive',
        description: 'Distended abdomen with marked hepatosplenomegaly. Liver span approximately 21–23 cm; spleen enlarged to approximately 16.5–17.8 cm. Moderate ascites present on subsequent imaging. Scleral icterus observed.',
        clinicalSignificance: 'Massive hepatosplenomegaly with conjugated hyperbilirubinemia, ascites, and elevated transaminases highlights hepatic and splenic infiltration or hemophagocytic activation.',
        dataLabel: 'VERIFIED PATIENT DATA'
      },
      {
        system: 'extremities',
        label: 'Peripheral Extremity Examination',
        status: 'positive',
        description: 'Marked bilateral lower-limb edema. Bilateral venous Doppler performed demonstrating patent deep venous system without detected DVT.',
        clinicalSignificance: 'Edema without venous thrombosis is consistent with severe hypoalbuminemia (albumin 2.06 g/dL) and pelvic/retroperitoneal lymphatic and venous compression by iliac and aortocaval adenopathy.',
        dataLabel: 'VERIFIED PATIENT DATA'
      },
      {
        system: 'respiratory',
        label: 'Respiratory System',
        status: 'positive',
        description: 'Mild bilateral pleural effusion noted on subsequent imaging. Reduced breath sounds at lung bases.',
        clinicalSignificance: 'Pleural effusion may reflect fluid overload, low oncotic pressure, or thoracic lymphatic block from mediastinal adenopathy.',
        dataLabel: 'VERIFIED PATIENT DATA'
      },
      {
        system: 'cardiovascular',
        label: 'Cardiovascular Examination',
        status: 'not_documented',
        description: 'Not documented in the available case record. (Heart sounds and detailed murmur status not specifically transcribed in available records).',
        clinicalSignificance: 'Data integrity rule: normal heart sounds must not be fabricated when unrecorded.',
        dataLabel: 'GENERAL EDUCATIONAL INFORMATION'
      },
      {
        system: 'neurological',
        label: 'Neurological Examination',
        status: 'not_documented',
        description: 'Not documented in the available case record.',
        clinicalSignificance: 'Gross neurologic deficits were not documented; player must distinguish absence of documentation from negative examination.',
        dataLabel: 'GENERAL EDUCATIONAL INFORMATION'
      }
    ],
    problemRepresentation: {
      clinicalVignettePrompt: 'Based on the history and physical examination, select the key clinical features that comprise this patient\'s core syndromic problem representation:',
      problemOptions: [
        {
          id: 'p1',
          label: 'Generalized Lymphadenopathy (Bilateral cervical, axillary, retroperitoneal, iliac)',
          isPrimaryProblem: true,
          category: 'organ_involvement',
          explanation: 'Core finding defining the architectural disease process; firm, non-tender, multi-station adenopathy strongly suggests a lymphoproliferative disorder.'
        },
        {
          id: 'p2',
          label: 'Severe Pancytopenia with Critical Anemia & Thrombocytopenia',
          isPrimaryProblem: true,
          category: 'hematologic',
          explanation: 'Hb 8.3 -> 3.9 g/dL, Platelets 25k -> 9k/µL, WBC 1.61k -> 2.92k/µL indicates severe bone marrow suppression, hypersplenism, or hemophagocytosis.'
        },
        {
          id: 'p3',
          label: 'Hepatosplenomegaly with Conjugated Hyperbilirubinemia & Hypoalbuminemia',
          isPrimaryProblem: true,
          category: 'organ_involvement',
          explanation: 'Liver 21-23 cm, Spleen 16.5-17.8 cm, Total Bili 9.15 mg/dL (Direct 6.71 mg/dL), Albumin 2.06 g/dL represents massive reticuloendothelial involvement.'
        },
        {
          id: 'p4',
          label: 'High-Grade Fevers (>39°C) & Marked Acute Phase Reactants (CRP 176, LDH 709, Procalcitonin 6.51)',
          isPrimaryProblem: true,
          category: 'constitutional',
          explanation: 'Demonstrates intense systemic inflammatory cytokine cascade, typical of lymphoma B symptoms and secondary cytokine storm.'
        },
        {
          id: 'p5',
          label: 'Acute ST-Elevation Myocardial Infarction',
          isPrimaryProblem: false,
          category: 'unrelated',
          explanation: 'Incorrect. There is no chest pain, troponin elevation, or clinical picture suggesting acute coronary syndrome.'
        },
        {
          id: 'p6',
          label: 'Isolated Acute Viral Upper Respiratory Pharyngitis',
          isPrimaryProblem: false,
          category: 'unrelated',
          explanation: 'Incorrect. The patient has profound multi-station lymphadenopathy, organomegaly, and progressive severe cytopenias.'
        }
      ],
      expertSummary: 'A 28-year-old male presenting with generalized lymphadenopathy, massive hepatosplenomegaly, severe progressive pancytopenia, high-grade fevers, marked hyperferritinemic/inflammatory markers, and mixed hyperbilirubinemia.'
    },
    differentialDiagnoses: [
      {
        id: 'ddx-1',
        diagnosis: 'Classical Hodgkin Lymphoma (cHL)',
        category: 'Malignant Hematology',
        isLeading: true,
        supportingEvidence: [
          'Age 28 (characteristic young adult bimodal peak for Hodgkin lymphoma)',
          'Generalized, firm, non-tender lymph node enlargement',
          'Recurrent high fevers and constitutional systemic symptoms',
          'Hepatosplenomegaly and elevated LDH (709 U/L)',
          'Confirmed on excisional lymph node biopsy showing Reed-Sternberg cells'
        ],
        findingsAgainst: [
          'Generalized adenopathy with subdiaphragmatic & retroperitoneal involvement is less frequent than isolated supradiaphragmatic disease in early-stage cHL, but characteristic of advanced/mixed cellularity subtype.'
        ],
        distinguishingInvestigations: [
          'Excisional lymph node biopsy with architectural assessment and immunohistochemistry (CD30, CD15, CD20, CD3, LCA)'
        ],
        educationalNotes: 'Classical Hodgkin lymphoma typically affects young adults. The mixed cellularity subtype frequently presents with more advanced stage, constitutional B symptoms, and abdominal involvement compared to nodular sclerosis.'
      },
      {
        id: 'ddx-2',
        diagnosis: 'Non-Hodgkin Lymphoma (e.g., Diffuse Large B-Cell, Peripheral T-Cell)',
        category: 'Malignant Hematology',
        isLeading: false,
        supportingEvidence: [
          'Generalized lymphadenopathy across multiple nodal chains',
          'Hepatosplenomegaly and systemic B symptoms',
          'Elevated LDH'
        ],
        findingsAgainst: [
          'Histology does not show sheets of diffuse malignant lymphocytes; rather, it shows sparse large atypical cells in a rich reactive mixed inflammatory milieu.'
        ],
        distinguishingInvestigations: [
          'Immunohistochemistry: Diffuse sheet-like positivity for CD20 in DLBCL vs CD30+ Reed-Sternberg cells in cHL.'
        ],
        educationalNotes: 'Non-Hodgkin lymphomas are an essential differential; histopathology and IHC are definitive distinguishing modalities.'
      },
      {
        id: 'ddx-3',
        diagnosis: 'Disseminated Tuberculosis (Tuberculous Lymphadenitis / Scrofula)',
        category: 'Infectious Diseases',
        isLeading: false,
        supportingEvidence: [
          'Young male with prolonged fevers and night sweats',
          'Generalized lymphadenopathy and hepatosplenomegaly',
          'Elevated inflammatory markers (CRP, procalcitonin)'
        ],
        findingsAgainst: [
          'Biopsy reveals atypical Reed-Sternberg cells rather than caseating granulomatous inflammation with Langhans giant cells and acid-fast bacilli.'
        ],
        distinguishingInvestigations: [
          'Ziehl-Neelsen / Auramine stain, GeneXpert MTB/RIF, mycobacterial tissue culture.'
        ],
        educationalNotes: 'In many regions, disseminated tuberculosis closely mimics lymphoma. Tissue histology is essential to avoid inappropriate antitubercular therapy or delayed chemotherapy.'
      },
      {
        id: 'ddx-4',
        diagnosis: 'Secondary Hemophagocytic Lymphohistiocytosis (HLH) / Macrophage Activation Syndrome',
        category: 'Hyperinflammatory Syndromes',
        isLeading: false,
        supportingEvidence: [
          'High spiking fevers >39°C',
          'Massive hepatosplenomegaly',
          'Severe progressive pancytopenia (Hb 3.9 g/dL, Platelets 9k/µL, WBC 2.92k)',
          'Hypertriglyceridemia (>210 mg/dL), Fibrinogen 186 mg/dL',
          'Marked liver dysfunction (AST 393, ALT 116, Bilirubin 9.15)'
        ],
        findingsAgainst: [
          'Secondary HLH is a syndrome driven by an underlying trigger (here, underlying Hodgkin lymphoma), not a primary standalone neoplastic diagnosis. Bone marrow showed erythroid hyperplasia without documented overt hemophagocytosis in this aspirate.'
        ],
        distinguishingInvestigations: [
          'Serum ferritin, soluble IL-2 receptor (sCD25), NK cell activity, serial marrow biopsies.'
        ],
        educationalNotes: 'Documented in clinical records as a serious clinical suspicion under investigation. Lymphoma is one of the most common malignancy triggers for secondary HLH.'
      },
      {
        id: 'ddx-5',
        diagnosis: 'Acute Leukemia or Myelodysplastic Syndrome',
        category: 'Malignant Hematology',
        isLeading: false,
        supportingEvidence: [
          'Severe pancytopenia with marked anemia and thrombocytopenia'
        ],
        findingsAgainst: [
          'Bone marrow examination documented normocellular marrow with normal lymphoid/myeloid maturation and mature megakaryocytes; no excess blast population.'
        ],
        distinguishingInvestigations: [
          'Bone marrow aspirate and trephine biopsy with flow cytometry for myeloblasts/lymphoblasts.'
        ],
        educationalNotes: 'Normal bone marrow blast count rules out acute myeloid or lymphoid leukemia as the direct cause of cytopenias.'
      }
    ],
    investigations: [
      {
        id: 'inv-1',
        category: 'cbc',
        name: 'Complete Blood Count (CBC) — 17 Sep 2026',
        dateDocumented: '17 September 2026',
        value: 'Hemoglobin: 8.3 g/dL | WBC: 1.61 × 10³/µL | Platelets: 25 × 10³/µL',
        referenceRange: 'Hb: 13.5–17.5 g/dL | WBC: 4.0–11.0 × 10³/µL | Plt: 150–450 × 10³/µL',
        isAbnormal: true,
        severity: 'critical',
        indicationRationale: 'Initial assessment of cytopenias, bleeding risk, and constitutional fatigue.',
        clinicalInterpretation: 'Moderate normocytic anemia, significant leukopenia/neutropenia, and severe thrombocytopenia. Demonstrates multi-lineage bone marrow compromise or peripheral destruction.',
        dataLabel: 'VERIFIED PATIENT DATA'
      },
      {
        id: 'inv-2',
        category: 'cbc',
        name: 'Complete Blood Count (CBC) — 19 Sep 2026',
        dateDocumented: '19 September 2026',
        value: 'Hemoglobin: 7.8 g/dL | WBC: 2.75 × 10³/µL | Platelets: 60 × 10³/µL',
        referenceRange: 'Hb: 13.5–17.5 g/dL | WBC: 4.0–11.0 × 10³/µL | Plt: 150–450 × 10³/µL',
        isAbnormal: true,
        severity: 'abnormal',
        indicationRationale: 'Serial monitoring prior to lymph node excisional biopsy.',
        clinicalInterpretation: 'Persistent anemia with slight fluctuation in WBC and platelet counts, allowing safe excisional lymph node biopsy under hematology surveillance.',
        dataLabel: 'VERIFIED PATIENT DATA'
      },
      {
        id: 'inv-3',
        category: 'cbc',
        name: 'Complete Blood Count (CBC) — 04 Oct 2026',
        dateDocumented: '04 October 2026',
        value: 'Hemoglobin: 3.9 g/dL | WBC: 2.92 × 10³/µL | Platelets: 9 × 10³/µL',
        referenceRange: 'Hb: 13.5–17.5 g/dL | WBC: 4.0–11.0 × 10³/µL | Plt: 150–450 × 10³/µL',
        isAbnormal: true,
        severity: 'critical',
        indicationRationale: 'Urgent evaluation of rapid clinical deterioration, severe fatigue, and febrile spike.',
        clinicalInterpretation: 'LIFE-THREATENING CRITICAL PANCTYOPENIA. Hemoglobin 3.9 g/dL is critical with severe cardiac and ischemic risk. Platelet count 9 × 10³/µL places patient at spontaneous catastrophic bleeding risk requiring emergency transfusion support.',
        dataLabel: 'VERIFIED PATIENT DATA'
      },
      {
        id: 'inv-4',
        category: 'lft_rft',
        name: 'Comprehensive Liver & Renal Profile — 04 Oct 2026',
        dateDocumented: '04 October 2026',
        value: 'AST: 393 U/L | ALT: 116 U/L | Total Bilirubin: 9.15 mg/dL | Direct Bilirubin: 6.71 mg/dL | Albumin: 2.06 g/dL | Creatinine: 1.03 mg/dL',
        referenceRange: 'AST: 10–40 U/L | ALT: 7–56 U/L | T.Bili: 0.2–1.2 mg/dL | D.Bili: 0.0–0.3 mg/dL | Alb: 3.5–5.0 g/dL | Cr: 0.7–1.3 mg/dL',
        isAbnormal: true,
        severity: 'critical',
        indicationRationale: 'Evaluation of jaundice, hepatosplenomegaly, and liver metabolic synthetic capacity.',
        clinicalInterpretation: 'Severe conjugated hyperbilirubinemia with marked hepatocellular injury (AST > ALT) and marked hypoalbuminemia. Preserved creatinine (1.03 mg/dL). Indicates hepatic infiltration by lymphoma or secondary cytokine-mediated hepatic inflammation.',
        dataLabel: 'VERIFIED PATIENT DATA'
      },
      {
        id: 'inv-5',
        category: 'inflammatory',
        name: 'Acute Phase & Metabolic Reactants — 05 Oct 2026',
        dateDocumented: '05 October 2026',
        value: 'LDH: 709 U/L | CRP: 176 mg/L | Procalcitonin: 6.51 ng/mL | Fibrinogen: 186 mg/dL | Triglycerides: > 210 mg/dL',
        referenceRange: 'LDH: 140–280 U/L | CRP: < 5 mg/L | Procalcitonin: < 0.5 ng/mL | Fib: 200–400 mg/dL | Triglycerides: < 150 mg/dL',
        isAbnormal: true,
        severity: 'critical',
        indicationRationale: 'Evaluation for systemic infection, tumor lysis/turnover, and secondary hyperinflammatory syndrome (HLH).',
        clinicalInterpretation: 'Extremely elevated inflammatory markers. Markedly high CRP and procalcitonin indicate severe systemic inflammation or concurrent sepsis. Elevated triglycerides, LDH, and borderline low fibrinogen prompted clinical suspicion for HLH.',
        dataLabel: 'VERIFIED PATIENT DATA'
      },
      {
        id: 'inv-6',
        category: 'bone_marrow',
        name: 'Bone Marrow Aspirate & Biopsy Evaluation',
        dateDocumented: 'Verified Case Record',
        value: 'Normocellular for age. Normal lymphoid series in count & morphology. Myeloid series with normal maturation. Erythroid hyperplasia. Megakaryocytes present & mature.',
        referenceRange: 'Normal age-adjusted cellularity and triliniage hematopoiesis',
        isAbnormal: false,
        severity: 'normal',
        indicationRationale: 'Determining if severe pancytopenia is due to marrow infiltration by lymphoma, acute leukemia, or myelodysplasia.',
        clinicalInterpretation: 'No overt lymphoma infiltration or leukemic blast crisis seen in this marrow sample. Erythroid hyperplasia with present megakaryocytes points toward peripheral destruction, hypersplenism, or cytokine-mediated suppression.',
        dataLabel: 'VERIFIED PATIENT DATA'
      },
      {
        id: 'inv-7',
        category: 'pathology',
        name: 'Excisional Left Cervical Lymph Node Biopsy',
        dateDocumented: '19 September 2026',
        value: 'Specimen: 2.5 × 2.0 × 1.5 cm. Firm whitish cut surface. Architectural effacement by mixed inflammatory infiltrate. Large atypical lymphoid cells consistent with Hodgkin/Reed-Sternberg cells (monolobated, bilobated, multilobated nuclei, large eosinophilic nucleoli, amphophilic cytoplasm). Foci of necrosis.',
        referenceRange: 'Normal lymph node architecture with preserved follicles and sinuses',
        isAbnormal: true,
        severity: 'critical',
        indicationRationale: 'Gold-standard definitive diagnostic test for persistent unexplained adenopathy.',
        clinicalInterpretation: 'DEFINITIVE DIAGNOSTIC HISTOLOGY for Classical Hodgkin Lymphoma, Mixed Cellularity Subtype.',
        dataLabel: 'VERIFIED PATIENT DATA'
      },
      {
        id: 'inv-8',
        category: 'ihc',
        name: 'Immunohistochemistry (IHC) Panel',
        dateDocumented: '19 September 2026',
        value: 'CD30: Diffuse positive in large cells | CD15: Negative in large cells (positive in granulocytes) | CD20: Focal positive in large cells | CD3: Positive in background T cells | LCA (CD45): Negative in large cells',
        referenceRange: 'Marker-specific immunoreactivity patterns',
        isAbnormal: true,
        severity: 'abnormal',
        indicationRationale: 'Immunophenotyping atypical lymphoid cells to confirm classical Hodgkin lymphoma vs non-Hodgkin lymphoma.',
        clinicalInterpretation: 'CD30+ and LCA- in large cells confirms Classical Hodgkin Lymphoma. Note that CD15 is negative in ~15–20% of verified cHL cases (a crucial diagnostic pearl). Background CD3+ T cells and focal CD20+ are characteristic.',
        dataLabel: 'VERIFIED PATIENT DATA'
      },
      {
        id: 'inv-9',
        category: 'imaging',
        name: 'Contrast-Enhanced Computed Tomography (CT Neck/Chest/Abdomen/Pelvis)',
        dateDocumented: 'Verified Case Record',
        value: 'Multiple enlarged lymph nodes documented in: Bilateral cervical, bilateral axillary, mediastinal, para-aortic, aortocaval, upper abdominal & porta hepatis, and iliac regions.',
        referenceRange: 'Normal node short-axis < 1.0 cm (< 1.5 cm for jugulodigastric/inguinal)',
        isAbnormal: true,
        severity: 'critical',
        indicationRationale: 'Anatomical staging and baseline disease burden quantification.',
        clinicalInterpretation: 'Widespread supra- and infradiaphragmatic nodal disease demonstrating multi-station lymphadenopathy.',
        dataLabel: 'VERIFIED PATIENT DATA'
      },
      {
        id: 'inv-10',
        category: 'imaging',
        name: 'Abdominal Ultrasound & MRCP',
        dateDocumented: 'Verified Case Record',
        value: 'Ultrasound: Liver ~21 cm, Spleen ~16.5 cm. MRCP: Liver right lobe ~23 cm, Spleen ~17.8 cm. Moderate ascites, mild bilateral pleural effusion. No detected dilatation of intrahepatic biliary radicals.',
        referenceRange: 'Liver span < 16 cm; Spleen length < 12 cm; No ascites/effusions',
        isAbnormal: true,
        severity: 'critical',
        indicationRationale: 'Assessing organomegaly and ruling out mechanical extrahepatic biliary obstruction.',
        clinicalInterpretation: 'Massive hepatosplenomegaly. Absence of biliary radical dilatation indicates jaundice is intrahepatic (infiltrative or cytokine-mediated cholestasis/hepatitis) rather than mechanical extrahepatic duct compression.',
        dataLabel: 'VERIFIED PATIENT DATA'
      },
      {
        id: 'inv-11',
        category: 'viral_serology',
        name: 'Viral Hepatitis & Retroviral Serologies',
        dateDocumented: 'Verified Case Record',
        value: 'HIV 1&2 Antibody: Non-reactive | HBsAg: Non-reactive | HCV Antibody: Non-reactive',
        referenceRange: 'Non-reactive / Negative',
        isAbnormal: false,
        severity: 'normal',
        indicationRationale: 'Rule out viral triggers of adenopathy and screen before immunosuppressive chemotherapy.',
        clinicalInterpretation: 'Negative viral screen excludes acute HIV seroconversion lymphadenopathy and viral hepatitis B/C as primary causes of liver dysfunction.',
        dataLabel: 'VERIFIED PATIENT DATA'
      },
      {
        id: 'inv-12',
        category: 'specialized',
        name: 'Bilateral Lower-Limb Venous Doppler Ultrasound',
        dateDocumented: 'Verified Case Record',
        value: 'Patent deep venous system bilaterally; no detected deep vein thrombosis (DVT). Marked bilateral lower-limb soft-tissue edema.',
        referenceRange: 'Compressible veins without luminal thrombus',
        isAbnormal: false,
        severity: 'normal',
        indicationRationale: 'Rule out acute DVT in a patient with profound lower extremity edema and malignancy risk.',
        clinicalInterpretation: 'Excludes acute DVT. Edema is attributed to severe hypoalbuminemia (2.06 g/dL) and pelvic/iliac nodal lymphovascular compression.',
        dataLabel: 'VERIFIED PATIENT DATA'
      }
    ],
    evidenceClues: [
      {
        id: 'clue-1',
        title: 'Diagnostic Reed-Sternberg Cells on Cervical Biopsy',
        category: 'supporting_cHL',
        description: 'Excisional biopsy shows architectural effacement by mixed inflammatory background with large Hodgkin and multinucleated Reed-Sternberg cells with owl-eyed nucleoli.',
        source: 'Histopathology Report (19 Sep 2026)',
        dataLabel: 'VERIFIED PATIENT DATA'
      },
      {
        id: 'clue-2',
        title: 'CD30+ / LCA- / CD15- / Focal CD20+ Immunophenotype',
        category: 'supporting_cHL',
        description: 'Immunohistochemistry confirms large cells are strongly CD30 positive and CD45/LCA negative, diagnostic of Classical Hodgkin Lymphoma.',
        source: 'Immunohistochemistry Report',
        dataLabel: 'VERIFIED PATIENT DATA'
      },
      {
        id: 'clue-3',
        title: 'Multi-station Nodal Involvement on CT',
        category: 'supporting_cHL',
        description: 'Bilateral cervical, axillary, mediastinal, para-aortic, aortocaval, and iliac lymphadenopathy.',
        source: 'CT Whole Body Scan',
        dataLabel: 'VERIFIED PATIENT DATA'
      },
      {
        id: 'clue-4',
        title: 'Suspected Secondary HLH (Hyperinflammatory Syndrome)',
        category: 'alternative_differentials',
        description: 'High fever >39°C, splenomegaly (17.8 cm), cytopenias (Hb 3.9, Plt 9k), hypertriglyceridemia (>210 mg/dL), and severe liver injury prompted clinical concern for HLH.',
        source: 'Clinical Team Consultation Notes',
        dataLabel: 'CLINICAL SUSPICION / UNDER INVESTIGATION'
      },
      {
        id: 'clue-5',
        title: 'Life-Threatening Anemia & Thrombocytopenia',
        category: 'urgent_priorities',
        description: 'Hemoglobin dropped to 3.9 g/dL and platelets to 9 × 10³/µL on 4 October, requiring immediate transfusion stabilization.',
        source: 'Emergency CBC (04 Oct 2026)',
        dataLabel: 'VERIFIED PATIENT DATA'
      },
      {
        id: 'clue-6',
        title: 'Unconjugated vs Conjugated Jaundice Etiology',
        category: 'unresolved_questions',
        description: 'Direct bilirubin 6.71 mg/dL without biliary ductal dilatation on MRCP indicates parenchymal infiltration or cytokine cholestasis rather than gallstones or nodal duct compression.',
        source: 'MRCP & Liver Chemistry',
        dataLabel: 'VERIFIED PATIENT DATA'
      }
    ],
    pathology: {
      imagePath: '/src/assets/images/histology_reed_sternberg_1793467511946.jpg',
      grossDescription: 'Excisional biopsy of left cervical lymph node measuring 2.5 × 2.0 × 1.5 cm with firm whitish cut surface.',
      microscopicDescription: 'Sections show complete effacement of nodal architecture by a polymorphic cellular infiltrate composed of mature lymphocytes, histiocytes, plasma cells, and eosinophils, amid which are diagnostic Hodgkin cells and binucleated/multinucleated Reed-Sternberg cells with prominent eosinophilic nucleoli.',
      annotations: [
        {
          id: 'anno-1',
          x: 50,
          y: 48,
          title: 'Diagnostic Reed-Sternberg Cell',
          description: 'Large binucleated cell with mirror-image "owl-eye" nuclei, prominent inclusion-like eosinophilic nucleoli, and abundant amphophilic cytoplasm.',
          type: 'diagnostic_cell',
          verifiedPatientFact: 'Documented in left cervical lymph node biopsy (19 Sep 2026).',
          educationalPearl: 'The Reed-Sternberg cell is the neoplastic clone in Classical Hodgkin Lymphoma, derived from crippled germinal center B cells.'
        },
        {
          id: 'anno-2',
          x: 24,
          y: 60,
          title: 'Eosinophils & Plasma Cells',
          description: 'Numerous granular eosinophils and plasma cells intermixed throughout the background.',
          type: 'background_infiltrate',
          verifiedPatientFact: 'Reported as "mixed inflammatory infiltrate" characterizing the Mixed Cellularity subtype.',
          educationalPearl: 'In Classical Hodgkin Lymphoma, neoplastic cells constitute only 1–5% of the total tumor mass; the remainder is a reactive immune infiltrate orchestrated by tumor cytokine secretion (IL-5, CCL5, TGF-beta).'
        },
        {
          id: 'anno-3',
          x: 75,
          y: 35,
          title: 'Reactive Small Lymphocytes',
          description: 'Abundant small mature T-lymphocytes (CD3+) forming rosettes around the neoplastic Reed-Sternberg cells.',
          type: 'background_infiltrate',
          verifiedPatientFact: 'Documented CD3 positivity in background T-cell population.',
          educationalPearl: 'T-cells are recruited and rendered anergic or immunosuppressive by the Reed-Sternberg cells via PD-L1 expression and immunosuppressive cytokines.'
        },
        {
          id: 'anno-4',
          x: 82,
          y: 80,
          title: 'Architectural Effacement & Foci of Necrosis',
          description: 'Loss of normal germinal centers, mantle zones, and sinuses with small areas of focal necrosis.',
          type: 'architecture',
          verifiedPatientFact: 'Documented architectural effacement with foci of necrosis.',
          educationalPearl: 'Focal necrosis is frequently observed in the Mixed Cellularity subtype of cHL and correlates with rapid turnover and EBV association.'
        }
      ],
      ihcPanel: [
        {
          marker: 'CD30 (Ki-1)',
          patientResult: 'Diffuse positive in large cells',
          typicalFinding: 'Positive in >95% of Classical Hodgkin Lymphoma',
          interpretation: 'Membranous and Golgi zone (dot-like) positivity is diagnostic for Classical Hodgkin Lymphoma and serves as the therapeutic target for brentuximab vedotin.',
          dataLabel: 'VERIFIED PATIENT DATA'
        },
        {
          marker: 'CD15',
          patientResult: 'Negative in large cells (positive in granulocytes)',
          typicalFinding: 'Positive in ~80–85% of cHL cases; negative in 15–20%',
          interpretation: 'Crucial diagnostic pitfall: CD15 negativity DOES NOT rule out Classical Hodgkin Lymphoma. In 15–20% of authentic cHL cases, CD15 is negative. Granulocyte positivity serves as an internal control.',
          dataLabel: 'VERIFIED PATIENT DATA'
        },
        {
          marker: 'CD20',
          patientResult: 'Focal positive in large cells',
          typicalFinding: 'Variable (focal/weak in 20–30% of cHL; strong diffuse in B-NHL)',
          interpretation: 'Reed-Sternberg cells are clonal B cells that have downregulated immunoglobulin gene transcription, showing weak or focal CD20 in a minority of cases.',
          dataLabel: 'VERIFIED PATIENT DATA'
        },
        {
          marker: 'CD3',
          patientResult: 'Positive in background T cells, negative in large cells',
          typicalFinding: 'T-cell marker positive in reactive background mantle/rosetting cells',
          interpretation: 'Confirms that the predominant surrounding infiltrate is reactive T-lymphocytes.',
          dataLabel: 'VERIFIED PATIENT DATA'
        },
        {
          marker: 'LCA / CD45',
          patientResult: 'Negative in large cells',
          typicalFinding: 'Negative in large cells in Classical Hodgkin Lymphoma (>98%)',
          interpretation: 'Lack of LCA (leukocyte common antigen) in large cells rules out classical Diffuse Large B-Cell Lymphoma and Nodular Lymphocyte Predominant Hodgkin Lymphoma (which is LCA+).',
          dataLabel: 'VERIFIED PATIENT DATA'
        }
      ]
    },
    diagnosticChallenge: {
      question: 'Integrate the patient\'s clinical presentation, gross pathology, Reed-Sternberg morphology, and immunohistochemistry profile to establish the definitive diagnosis and histological subtype:',
      primaryOptions: [
        'Classical Hodgkin Lymphoma (cHL)',
        'Diffuse Large B-Cell Lymphoma (DLBCL)',
        'Nodular Lymphocyte Predominant Hodgkin Lymphoma (NLPHL)',
        'Disseminated Tuberculous Lymphadenitis',
        'Acute Myeloid Leukemia (AML) with myeloid sarcoma'
      ],
      correctPrimary: 'Classical Hodgkin Lymphoma (cHL)',
      subtypeOptions: [
        'Mixed Cellularity Subtype',
        'Nodular Sclerosis Subtype',
        'Lymphocyte-Rich Subtype',
        'Lymphocyte-Depleted Subtype'
      ],
      correctSubtype: 'Mixed Cellularity Subtype',
      rationale: 'The biopsy demonstrates classic Reed-Sternberg cells with CD30 positivity and CD45/LCA negativity in a polymorphic background composed of lymphocytes, histiocytes, and eosinophils with foci of necrosis, without dense collagen bands (which would indicate nodular sclerosis). The final histopathological diagnosis is verified Classical Hodgkin Lymphoma, Mixed Cellularity subtype.',
      pearls: [
        'CD15 is negative in ~15-20% of classical Hodgkin lymphomas; negative CD15 does not exclude the diagnosis.',
        'Mixed cellularity cHL has a strong epidemiological association with Epstein-Barr Virus (EBV) and presents more often with systemic B symptoms, advanced stage, and extranodal involvement than nodular sclerosis.',
        'Reed-Sternberg cells represent less than 5% of the tumor mass, enveloped in a protective cytokine-recruited immune microenvironment.'
      ]
    },
    staging: {
      systemUsed: 'Ann Arbor Staging System with Lugano Classification Criteria',
      stagingSites: [
        {
          id: 'site-cervical',
          region: 'Cervical Lymph Nodes',
          isInvolved: true,
          anatomicalLocation: 'Bilateral neck chains',
          imagingSource: 'CT & Excisional Biopsy',
          description: 'Documented enlarged bilateral cervical nodes; left cervical biopsy 2.5 cm confirmed diagnostic cHL.',
          isExtranodal: false,
          dataLabel: 'VERIFIED PATIENT DATA'
        },
        {
          id: 'site-axillary',
          region: 'Axillary Lymph Nodes',
          isInvolved: true,
          anatomicalLocation: 'Bilateral axillae',
          imagingSource: 'CT whole body',
          description: 'Enlarged bilateral axillary lymphadenopathy.',
          isExtranodal: false,
          dataLabel: 'VERIFIED PATIENT DATA'
        },
        {
          id: 'site-mediastinal',
          region: 'Mediastinal Nodes',
          isInvolved: true,
          anatomicalLocation: 'Anterior & middle mediastinum',
          imagingSource: 'CT chest',
          description: 'Documented enlarged mediastinal lymph nodes.',
          isExtranodal: false,
          dataLabel: 'VERIFIED PATIENT DATA'
        },
        {
          id: 'site-retroperitoneal',
          region: 'Para-aortic & Aortocaval Nodes',
          isInvolved: true,
          anatomicalLocation: 'Retroperitoneal abdominal chains',
          imagingSource: 'CT abdomen',
          description: 'Enlarged para-aortic and aortocaval nodes crossing the diaphragm.',
          isExtranodal: false,
          dataLabel: 'VERIFIED PATIENT DATA'
        },
        {
          id: 'site-portae',
          region: 'Porta Hepatis Nodes',
          isInvolved: true,
          anatomicalLocation: 'Upper abdominal / porta hepatis',
          imagingSource: 'CT & Ultrasound',
          description: 'Enlarged lymph nodes in porta hepatis region.',
          isExtranodal: false,
          dataLabel: 'VERIFIED PATIENT DATA'
        },
        {
          id: 'site-iliac',
          region: 'Iliac Lymph Nodes',
          isInvolved: true,
          anatomicalLocation: 'Pelvic iliac chains',
          imagingSource: 'CT pelvis',
          description: 'Enlarged pelvic iliac lymph nodes.',
          isExtranodal: false,
          dataLabel: 'VERIFIED PATIENT DATA'
        },
        {
          id: 'site-liver',
          region: 'Liver Involvement / Hepatomegaly',
          isInvolved: true,
          anatomicalLocation: 'Right lobe ~23 cm, severe transaminitis & direct hyperbilirubinemia',
          imagingSource: 'Ultrasound & MRCP',
          description: 'Marked hepatomegaly (21–23 cm) with parenchymal dysfunction. Extranodal involvement vs reactive cytokine hepatitis requires formal PET-CT/biopsy for definitive Ann Arbor designation.',
          isExtranodal: true,
          dataLabel: 'VERIFIED PATIENT DATA'
        },
        {
          id: 'site-spleen',
          region: 'Splenic Involvement / Splenomegaly',
          isInvolved: true,
          anatomicalLocation: 'Spleen ~16.5–17.8 cm',
          imagingSource: 'Ultrasound & MRCP',
          description: 'Splenomegaly is designated as lymphatic tissue (Stage III if nodes present on both sides of diaphragm with splenic involvement).',
          isExtranodal: false,
          dataLabel: 'VERIFIED PATIENT DATA'
        },
        {
          id: 'site-marrow',
          region: 'Bone Marrow Involvement',
          isInvolved: false,
          anatomicalLocation: 'Iliac crest biopsy',
          imagingSource: 'Bone Marrow Pathology',
          description: 'Normocellular for age, erythroid hyperplasia, no diagnostic RS cells in available marrow aspirate. Marrow not documented as positive for lymphoma.',
          isExtranodal: true,
          dataLabel: 'VERIFIED PATIENT DATA'
        }
      ],
      educationalGuidance: 'In the Ann Arbor/Lugano staging system, involvement of lymph node regions on BOTH sides of the diaphragm (cervical/axillary/mediastinal AND para-aortic/iliac/spleen) constitutes Stage III disease. If liver involvement is confirmed as diffuse lymphoma infiltration, it would represent Stage IVB (given fever and systemic symptoms). Per clinical data rules: final stage is not finalized without full PET-CT and definitive liver histology.'
    },
    management: {
      clinicalScenario: 'On 04 October 2026, the patient acutely deteriorates with high fever (>39°C), critical pancytopenia (Hb 3.9 g/dL, Platelets 9 × 10³/µL, WBC 2.92 × 10³/µL), marked hyperbilirubinemia (9.15 mg/dL), and procalcitonin 6.51 ng/mL. Identify and prioritize the essential management actions:',
      options: [
        {
          id: 'mgmt-1',
          priorityCategory: 'immediate_stabilization',
          title: 'Immediate Transfusion Support (Irradiated & Leukoreduced PRBCs and Platelets)',
          isRecommended: true,
          clinicalRationale: 'Hb 3.9 g/dL and Platelets 9 × 10³/µL represent life-threatening emergencies with imminent risks of high-output cardiac ischemia and fatal intracranial/GI bleeding. Irradiated blood products prevent transfusion-associated graft-versus-host disease in lymphoma patients.',
          guidelineVsActualNote: 'Verified emergency supportive clinical standard for critical cytopenias.',
          scoreImpact: 20
        },
        {
          id: 'mgmt-2',
          priorityCategory: 'infectious_workup',
          title: 'Emergency Septic Workup & Broad-Spectrum Intravenous Antibiotics',
          isRecommended: true,
          clinicalRationale: 'Fever >39°C with procalcitonin 6.51 ng/mL and severe cytopenias mandates blood cultures, urine cultures, chest imaging, and immediate broad-spectrum coverage to treat or prevent neutropenic sepsis.',
          guidelineVsActualNote: 'Clinical notes verify antimicrobial medications and supportive management were initiated.',
          scoreImpact: 15
        },
        {
          id: 'mgmt-3',
          priorityCategory: 'hlh_evaluation',
          title: 'Secondary HLH Diagnostic Evaluation (Ferritin, Soluble CD25, Fibrinogen monitoring)',
          isRecommended: true,
          clinicalRationale: 'Severe cytopenias, splenomegaly, fever, hypertriglyceridemia, and liver injury strongly suggest secondary hemophagocytic lymphohistiocytosis (HLH). Testing ferritin and soluble CD25 guides urgent immunomodulatory or HLH-directed therapy (e.g., dexamethasone).',
          guidelineVsActualNote: 'Documented in available clinical notes as an active suspicion under evaluation.',
          scoreImpact: 15
        },
        {
          id: 'mgmt-4',
          priorityCategory: 'definitive_oncology',
          title: 'Urgent Inpatient Hematology/Oncology Consultation & Staging Stabilization',
          isRecommended: true,
          clinicalRationale: 'Definitive chemotherapy (such as ABVD or Brentuximab vedotin + AVD) will be required to control the underlying driver, but must be coordinated once the patient is hemodynamically stabilized and infectious sepsis is controlled.',
          guidelineVsActualNote: 'General educational guideline standard; exact patient chemo regimen requires full stabilization.',
          scoreImpact: 10
        },
        {
          id: 'mgmt-5',
          priorityCategory: 'harmful_or_premature',
          title: 'Immediate Outpatient Discharge with Oral Iron Supplements',
          isRecommended: false,
          clinicalRationale: 'FATAL MEDICAL ERROR. With Hb 3.9 g/dL and Platelets 9k/µL, discharging the patient would be catastrophic.',
          guidelineVsActualNote: 'Contraindicated unsafe decision.',
          scoreImpact: -30
        },
        {
          id: 'mgmt-6',
          priorityCategory: 'harmful_or_premature',
          title: 'Immediate High-Dose Full Chemotherapy (BEACOPP) prior to hemodynamic stabilization or infection control',
          isRecommended: false,
          clinicalRationale: 'Unsafe without resuscitation. Administering heavy marrow-ablative chemotherapy in an unstable patient with Hb 3.9, platelets 9k, and possible septic shock carries prohibitive early mortality.',
          guidelineVsActualNote: 'Stabilization and sepsis workup must precede cytotoxic marrow ablation.',
          scoreImpact: -15
        }
      ],
      guidelineSummary: 'Management in complex advanced lymphoma with secondary hyperinflammation requires a two-pronged strategy: 1) Urgent supportive resuscitation (irradiated blood/platelet transfusions, bleeding precautions, sepsis antimicrobials), and 2) Coordinated specialist care for underlying lymphoma and suspected HLH.'
    },
    timeline: [
      {
        date: '17 September 2026',
        event: 'Initial Documented Clinical Presentation',
        vitalStatus: 'Afebrile, fatigue, generalized adenopathy',
        keyLabs: [
          { name: 'Hemoglobin', value: '8.3', unit: 'g/dL', isCritical: false },
          { name: 'WBC', value: '1.61', unit: '× 10³/µL', isCritical: true },
          { name: 'Platelets', value: '25', unit: '× 10³/µL', isCritical: true }
        ],
        clinicalStatus: 'Initial hematology assessment for generalized adenopathy and moderate bicytopenia.',
        commentary: 'Initial evaluation identified multi-station lymph node enlargement and moderate baseline bone marrow suppression.',
        dataLabel: 'VERIFIED PATIENT DATA'
      },
      {
        date: '19 September 2026',
        event: 'Diagnostic Left Cervical Lymph Node Excisional Biopsy',
        vitalStatus: 'Stable for surgical biopsy',
        keyLabs: [
          { name: 'Hemoglobin', value: '7.8', unit: 'g/dL', isCritical: false },
          { name: 'WBC', value: '2.75', unit: '× 10³/µL', isCritical: false },
          { name: 'Platelets', value: '60', unit: '× 10³/µL', isCritical: false }
        ],
        clinicalStatus: 'Successful excisional biopsy yielding 2.5 × 2.0 × 1.5 cm lymph node specimen with firm whitish cut surface.',
        commentary: 'Histopathology and immunohistochemistry established definitive diagnosis of Classical Hodgkin Lymphoma, Mixed Cellularity subtype (CD30+, CD15-, CD20 focal, CD3 background).',
        dataLabel: 'VERIFIED PATIENT DATA'
      },
      {
        date: '04 October 2026',
        event: 'Acute Clinical Decompensation with Critical Cytopenias & Liver Injury',
        vitalStatus: 'Fever > 39°C, tachypneic, severe pallor, marked edema',
        keyLabs: [
          { name: 'Hemoglobin', value: '3.9', unit: 'g/dL', isCritical: true },
          { name: 'Platelets', value: '9', unit: '× 10³/µL', isCritical: true },
          { name: 'WBC', value: '2.92', unit: '× 10³/µL', isCritical: false },
          { name: 'AST', value: '393', unit: 'U/L', isCritical: true },
          { name: 'Total Bilirubin', value: '9.15', unit: 'mg/dL', isCritical: true }
        ],
        clinicalStatus: 'Severe physiological decompensation requiring immediate critical care and emergency blood product resuscitation.',
        commentary: 'Rapid drop in hemoglobin and platelets in conjunction with massive hepatosplenomegaly and liver transaminitis raised strong concern for secondary HLH or rapid disease acceleration.',
        dataLabel: 'VERIFIED PATIENT DATA'
      },
      {
        date: '05 October 2026',
        event: 'Hyperinflammatory Panel & HLH Clinical Suspicion Workup',
        vitalStatus: 'Persistent high fevers, ongoing intensive supportive care',
        keyLabs: [
          { name: 'LDH', value: '709', unit: 'U/L', isCritical: true },
          { name: 'CRP', value: '176', unit: 'mg/L', isCritical: true },
          { name: 'Procalcitonin', value: '6.51', unit: 'ng/mL', isCritical: true },
          { name: 'Triglycerides', value: '> 210', unit: 'mg/dL', isCritical: true },
          { name: 'Fibrinogen', value: '186', unit: 'mg/dL', isCritical: false }
        ],
        clinicalStatus: 'Clinical team documented suspicion for possible secondary HLH and requested expanded diagnostic evaluation.',
        commentary: 'Hyperinflammatory markers confirmed extreme systemic cytokine storm. Documented as clinical suspicion under investigation.',
        dataLabel: 'CLINICAL SUSPICION / UNDER INVESTIGATION'
      }
    ],
    references: [
      {
        title: 'WHO Classification of Tumours of Haematopoietic and Lymphoid Tissues (5th Edition)',
        source: 'World Health Organization (WHO) Blue Book',
        citation: 'Alaggio R, et al. The 5th edition of the World Health Organization Classification of Haematolymphoid Tumours: Lymphoid Neoplasms. Leukemia. 2022;36(7):1720-1748.',
        link: 'https://www.nature.com/articles/s41375-022-01620-2'
      },
      {
        title: 'ESMO Clinical Practice Guidelines for Diagnosis, Treatment and Follow-Up in Hodgkin Lymphoma',
        source: 'Annals of Oncology',
        citation: 'Eichenauer DA, et al. Hodgkin lymphoma: ESMO Clinical Practice Guidelines for diagnosis, treatment and follow-up. Ann Oncol. 2018;29(Suppl 4):iv19-iv29.',
        link: 'https://www.esmo.org/guidelines'
      },
      {
        title: 'Diagnosis and Management of Secondary Hemophagocytic Lymphohistiocytosis in Adults',
        source: 'Blood Reviews / American Society of Hematology',
        citation: 'La Rosée P, et al. Recommendations for the management of hemophagocytic lymphohistiocytosis in adults. Blood. 2019;133(23):2465-2477.',
        link: 'https://ashpublications.org/blood'
      },
      {
        title: 'Histopathology & Diagnostic Immunohistochemistry of Classical Hodgkin Lymphoma',
        source: 'American Journal of Clinical Pathology',
        citation: 'Kuppers R. The biology of Hodgkin\'s lymphoma. Nat Rev Cancer. 2009;9(1):15-27.',
        link: 'https://www.nature.com/nrc'
      }
    ]
  }
};
