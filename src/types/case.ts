/**
 * MEDQUEST - Case Schema & Clinical Reasoning Types
 * Reusable architecture for modular clinical cases and educational simulation.
 */

export type DataLabel = 
  | 'VERIFIED PATIENT DATA'
  | 'CLINICAL SUSPICION / UNDER INVESTIGATION'
  | 'GENERAL EDUCATIONAL INFORMATION';

export type QuestionRelevance = 'high' | 'moderate' | 'low' | 'red_flag';

export interface HistoryQuestion {
  id: string;
  category: 'chief_complaint' | 'hpi' | 'pmh' | 'meds' | 'family' | 'social' | 'ros';
  questionText: string;
  patientAnswer: string;
  relevance: QuestionRelevance;
  educationalRationale: string;
  isRedFlag?: boolean;
  isDocumented: boolean;
  scoreImpact: number;
}

export interface ExaminationFinding {
  system: 'general' | 'lymph_nodes' | 'cardiovascular' | 'respiratory' | 'abdominal' | 'extremities' | 'neurological';
  label: string;
  status: 'positive' | 'negative_documented' | 'not_documented';
  description: string;
  clinicalSignificance: string;
  dataLabel: DataLabel;
}

export interface ProblemOption {
  id: string;
  label: string;
  isPrimaryProblem: boolean;
  category: 'hematologic' | 'constitutional' | 'organ_involvement' | 'metabolic' | 'unrelated';
  explanation: string;
}

export interface DifferentialDiagnosisItem {
  id: string;
  diagnosis: string;
  category: string;
  isLeading: boolean;
  supportingEvidence: string[];
  findingsAgainst: string[];
  distinguishingInvestigations: string[];
  educationalNotes: string;
}

export interface LabTestResult {
  id: string;
  category: 'cbc' | 'lft_rft' | 'inflammatory' | 'coagulation' | 'viral_serology' | 'bone_marrow' | 'imaging' | 'pathology' | 'ihc' | 'specialized';
  name: string;
  dateDocumented?: string;
  value: string;
  unit?: string;
  referenceRange?: string;
  isAbnormal: boolean;
  severity?: 'normal' | 'abnormal' | 'critical';
  indicationRationale: string;
  clinicalInterpretation: string;
  dataLabel: DataLabel;
  costTier?: 'standard' | 'specialized' | 'advanced';
}

export interface EvidenceClue {
  id: string;
  title: string;
  category: 'supporting_cHL' | 'alternative_differentials' | 'urgent_priorities' | 'unresolved_questions';
  description: string;
  source: string;
  dataLabel: DataLabel;
}

export interface HistologyAnnotation {
  id: string;
  x: number; // percentage
  y: number; // percentage
  title: string;
  description: string;
  type: 'diagnostic_cell' | 'background_infiltrate' | 'architecture' | 'necrosis';
  verifiedPatientFact: string;
  educationalPearl: string;
}

export interface IHCMarker {
  marker: string;
  patientResult: string; // e.g. "Diffuse positive" or "Negative in large cells"
  typicalFinding: string;
  interpretation: string;
  dataLabel: DataLabel;
}

export interface StagingSite {
  id: string;
  region: string;
  isInvolved: boolean;
  anatomicalLocation: string;
  imagingSource: string;
  description: string;
  isExtranodal: boolean;
  dataLabel: DataLabel;
}

export interface ManagementOption {
  id: string;
  priorityCategory: 'immediate_stabilization' | 'infectious_workup' | 'hlh_evaluation' | 'definitive_oncology' | 'harmful_or_premature';
  title: string;
  isRecommended: boolean;
  clinicalRationale: string;
  guidelineVsActualNote: string;
  scoreImpact: number;
}

export interface ClinicalTimelinePoint {
  date: string;
  event: string;
  vitalStatus?: string;
  keyLabs: {
    name: string;
    value: string;
    unit: string;
    isCritical?: boolean;
  }[];
  clinicalStatus: string;
  commentary: string;
  dataLabel: DataLabel;
}

export interface ClinicalCase {
  id: string;
  caseNumber: string;
  title: string;
  subtitle: string;
  specialty: string;
  subspecialty: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedMinutes: number;
  author: string;
  version: string;
  learningObjectives: string[];
  patientProfile: {
    age: number;
    sex: string;
    setting: string;
    chiefComplaint: string;
    initialPresentation: string;
  };
  stages: {
    historyQuestions: HistoryQuestion[];
    examinationFindings: ExaminationFinding[];
    problemRepresentation: {
      clinicalVignettePrompt: string;
      problemOptions: ProblemOption[];
      expertSummary: string;
    };
    differentialDiagnoses: DifferentialDiagnosisItem[];
    investigations: LabTestResult[];
    evidenceClues: EvidenceClue[];
    pathology: {
      imagePath: string;
      grossDescription: string;
      microscopicDescription: string;
      annotations: HistologyAnnotation[];
      ihcPanel: IHCMarker[];
    };
    diagnosticChallenge: {
      question: string;
      primaryOptions: string[];
      correctPrimary: string;
      subtypeOptions: string[];
      correctSubtype: string;
      rationale: string;
      pearls: string[];
    };
    staging: {
      systemUsed: string;
      stagingSites: StagingSite[];
      educationalGuidance: string;
    };
    management: {
      clinicalScenario: string;
      options: ManagementOption[];
      guidelineSummary: string;
    };
    timeline: ClinicalTimelinePoint[];
    references: {
      title: string;
      source: string;
      citation: string;
      link?: string;
    }[];
  };
}
