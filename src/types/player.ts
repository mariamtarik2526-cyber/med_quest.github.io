/**
 * MEDQUEST - Player & Gamification Types
 */

export type BadgeCategory = 'reasoning' | 'investigation' | 'safety' | 'diagnostics';
export type BadgeRarity = 'Common' | 'Rare' | 'Epic' | 'Legendary';

export interface Badge {
  id: string;
  name: string;
  description: string;
  criteriaDescription: string;
  icon: string;
  category: BadgeCategory;
  rarity: BadgeRarity;
  xpReward: number;
  currentProgress: number;
  targetProgress: number;
  isUnlocked: boolean;
  unlockedAt?: string;
  unlockedInCaseId?: string;
}

export interface StageScore {
  stageNumber: number;
  stageName: string;
  scoreEarned: number;
  maxScore: number;
  decisionsMade: number;
  feedback: string[];
}

export interface CaseSessionState {
  caseId: string;
  currentStage: number; // 1 to 12
  completedStages: number[];
  revealedQuestions: string[];
  examinedSystems: string[];
  selectedProblems: string[];
  rankedDifferentials: string[];
  orderedInvestigations: string[];
  pinnedEvidence: {
    clueId: string;
    column: 'supporting_cHL' | 'alternative_differentials' | 'urgent_priorities' | 'unresolved_questions';
  }[];
  inspectedHistologyHotspots: string[];
  submittedDiagnosis?: {
    primary: string;
    subtype: string;
    isCorrect: boolean;
  };
  selectedManagementOptions: string[];
  stageScores: Record<number, StageScore>;
  startedAt: string;
  lastUpdated: string;
  isCompleted: boolean;
}

export interface PerformanceMilestones {
  totalQuestionsAsked: number;
  totalRedFlagsIdentified: number;
  totalSystemsExamined: number;
  totalInvestigationsOrdered: number;
  totalHistologyHotspotsInspected: number;
  perfectProblemRepresentations: number;
  correctDiagnosesCount: number;
  safeManagementDecisions: number;
  evidenceBoardsOrganized: number;
  casesCompletedCount: number;
  highestCaseScorePercent: number;
}

export interface PlayerProfile {
  id: string;
  name: string;
  isGuest: boolean;
  xp: number;
  level: number;
  levelTitle: string;
  streakDays: number;
  completedCaseIds: string[];
  badges: Badge[];
  milestones: PerformanceMilestones;
  activeSessions: Record<string, CaseSessionState>;
}
