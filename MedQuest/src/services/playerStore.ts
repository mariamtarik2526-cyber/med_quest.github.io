/**
 * MEDQUEST - Player State, Milestones & Achievements Store
 * Tracks performance milestones across clinical cases and awards badges.
 */

import { PlayerProfile, CaseSessionState, Badge, PerformanceMilestones } from '../types/player';

const STORAGE_KEY = 'medquest_player_profile_v1';

export const INITIAL_MILESTONES: PerformanceMilestones = {
  totalQuestionsAsked: 0,
  totalRedFlagsIdentified: 0,
  totalSystemsExamined: 0,
  totalInvestigationsOrdered: 0,
  totalHistologyHotspotsInspected: 0,
  perfectProblemRepresentations: 0,
  correctDiagnosesCount: 0,
  safeManagementDecisions: 0,
  evidenceBoardsOrganized: 0,
  casesCompletedCount: 0,
  highestCaseScorePercent: 0
};

export const INITIAL_BADGES: Badge[] = [
  {
    id: 'badge-observer',
    name: 'The Observer',
    description: 'Thoroughly investigated clinical history and identified all critical red flags.',
    criteriaDescription: 'Uncover all 3 critical red-flag history inquiries in a case.',
    icon: 'Eye',
    category: 'reasoning',
    rarity: 'Rare',
    xpReward: 60,
    currentProgress: 0,
    targetProgress: 3,
    isUnlocked: false
  },
  {
    id: 'badge-investigator',
    name: 'The Investigator',
    description: 'Ordered appropriate, high-yield diagnostic investigations while avoiding wasteful testing.',
    criteriaDescription: 'Order the excisional lymph node biopsy and critical blood counts.',
    icon: 'Search',
    category: 'investigation',
    rarity: 'Rare',
    xpReward: 70,
    currentProgress: 0,
    targetProgress: 2,
    isUnlocked: false
  },
  {
    id: 'badge-analyst',
    name: 'The Analyst',
    description: 'Correctly interpreted complex laboratory values, severe cytopenias, and critical indices.',
    criteriaDescription: 'Analyze serial laboratory trajectories and acute transaminitis in Stage 11.',
    icon: 'Activity',
    category: 'reasoning',
    rarity: 'Rare',
    xpReward: 65,
    currentProgress: 0,
    targetProgress: 1,
    isUnlocked: false
  },
  {
    id: 'badge-detective',
    name: 'The Detective',
    description: 'Synthesized multi-station evidence on the Evidence Board and prioritized differential diagnoses.',
    criteriaDescription: 'Correctly organize clinical clues across all 4 reasoning vectors.',
    icon: 'GitBranch',
    category: 'diagnostics',
    rarity: 'Rare',
    xpReward: 75,
    currentProgress: 0,
    targetProgress: 6,
    isUnlocked: false
  },
  {
    id: 'badge-diagnostician',
    name: 'The Diagnostician',
    description: 'Accurately reached the definitive histopathologic diagnosis and correct subtype.',
    criteriaDescription: 'Correctly identify Classical Hodgkin Lymphoma and Mixed Cellularity subtype.',
    icon: 'CheckCircle2',
    category: 'diagnostics',
    rarity: 'Epic',
    xpReward: 100,
    currentProgress: 0,
    targetProgress: 1,
    isUnlocked: false
  },
  {
    id: 'badge-safe-clinician',
    name: 'The Safe Clinician',
    description: 'Recognized life-threatening complications and prioritized urgent stabilization.',
    criteriaDescription: 'Prioritize emergency blood transfusions and sepsis workup while avoiding premature discharge or toxic chemo.',
    icon: 'ShieldAlert',
    category: 'safety',
    rarity: 'Epic',
    xpReward: 90,
    currentProgress: 0,
    targetProgress: 1,
    isUnlocked: false
  },
  {
    id: 'badge-pathology-sleuth',
    name: 'Pathology Sleuth',
    description: 'Examined high-power microscopy features and interpreted the full diagnostic IHC panel.',
    criteriaDescription: 'Inspect all 4 histological annotations including Reed-Sternberg owl-eye cytology.',
    icon: 'Microscope',
    category: 'investigation',
    rarity: 'Common',
    xpReward: 50,
    currentProgress: 0,
    targetProgress: 4,
    isUnlocked: false
  },
  {
    id: 'badge-syndrome-architect',
    name: 'Syndrome Architect',
    description: 'Formulated an accurate syndromic problem representation distinguishing key clusters from distractors.',
    criteriaDescription: 'Select all 4 primary syndromic problem representations without selecting distractors.',
    icon: 'BrainCircuit',
    category: 'reasoning',
    rarity: 'Rare',
    xpReward: 60,
    currentProgress: 0,
    targetProgress: 4,
    isUnlocked: false
  },
  {
    id: 'badge-first-encounter',
    name: 'First Encounter',
    description: 'Completed your first full simulated patient case from intake to learning debrief.',
    criteriaDescription: 'Finish all 12 stages of any clinical case.',
    icon: 'Award',
    category: 'diagnostics',
    rarity: 'Common',
    xpReward: 50,
    currentProgress: 0,
    targetProgress: 1,
    isUnlocked: false
  },
  {
    id: 'badge-master-clinician',
    name: 'Master Clinician',
    description: 'Demonstrated superior diagnostic reasoning with a comprehensive case score of ≥ 85%.',
    criteriaDescription: 'Achieve ≥ 85% overall score on any completed clinical investigation.',
    icon: 'Sparkles',
    category: 'diagnostics',
    rarity: 'Legendary',
    xpReward: 150,
    currentProgress: 0,
    targetProgress: 85,
    isUnlocked: false
  }
];

export function getLevelInfo(xp: number): { level: number; title: string; nextLevelXp: number; prevLevelXp: number } {
  if (xp < 100) return { level: 1, title: 'Medical Student (Year 3)', nextLevelXp: 100, prevLevelXp: 0 };
  if (xp < 250) return { level: 2, title: 'Clinical Clerk', nextLevelXp: 250, prevLevelXp: 100 };
  if (xp < 500) return { level: 3, title: 'Sub-Intern / Acting Intern', nextLevelXp: 500, prevLevelXp: 250 };
  if (xp < 800) return { level: 4, title: 'Resident Physician', nextLevelXp: 800, prevLevelXp: 500 };
  if (xp < 1200) return { level: 5, title: 'Chief Resident', nextLevelXp: 1200, prevLevelXp: 800 };
  if (xp < 1800) return { level: 6, title: 'Fellow in Hematology/Oncology', nextLevelXp: 1800, prevLevelXp: 1200 };
  return { level: 7, title: 'Attending Diagnostician', nextLevelXp: 3000, prevLevelXp: 1800 };
}

export function createInitialProfile(): PlayerProfile {
  const levelInfo = getLevelInfo(0);
  return {
    id: 'guest-' + Math.random().toString(36).substring(2, 9),
    name: 'Guest Clinician',
    isGuest: true,
    xp: 0,
    level: levelInfo.level,
    levelTitle: levelInfo.title,
    streakDays: 1,
    completedCaseIds: [],
    badges: INITIAL_BADGES,
    milestones: { ...INITIAL_MILESTONES },
    activeSessions: {}
  };
}

export function loadPlayerProfile(): PlayerProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial = createInitialProfile();
      savePlayerProfile(initial);
      return initial;
    }
    const parsed: PlayerProfile = JSON.parse(raw);

    // Ensure all badges exist (merge if new badges were introduced)
    const existingBadgeMap = new Map((parsed.badges || []).map(b => [b.id, b]));
    const mergedBadges = INITIAL_BADGES.map(b => {
      const existing = existingBadgeMap.get(b.id);
      if (existing) {
        return {
          ...b,
          isUnlocked: existing.isUnlocked,
          unlockedAt: existing.unlockedAt,
          currentProgress: existing.currentProgress ?? b.currentProgress
        };
      }
      return b;
    });

    const validatedProfile: PlayerProfile = {
      ...parsed,
      badges: mergedBadges,
      milestones: parsed.milestones ? { ...INITIAL_MILESTONES, ...parsed.milestones } : { ...INITIAL_MILESTONES }
    };

    return validatedProfile;
  } catch (e) {
    console.error('Error loading player profile from localStorage:', e);
    return createInitialProfile();
  }
}

export function savePlayerProfile(profile: PlayerProfile): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.error('Error saving player profile to localStorage:', e);
  }
}

export function resetPlayerProfile(): PlayerProfile {
  const fresh = createInitialProfile();
  savePlayerProfile(fresh);
  return fresh;
}

export function createInitialSession(caseId: string): CaseSessionState {
  const now = new Date().toISOString();
  return {
    caseId,
    currentStage: 1,
    completedStages: [],
    revealedQuestions: [],
    examinedSystems: [],
    selectedProblems: [],
    rankedDifferentials: [],
    orderedInvestigations: [],
    pinnedEvidence: [],
    inspectedHistologyHotspots: [],
    selectedManagementOptions: [],
    stageScores: {},
    startedAt: now,
    lastUpdated: now,
    isCompleted: false
  };
}

/**
 * Play a subtle, elegant synthesized chord for achievement unlocks
 */
export function playAchievementChime(): void {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const now = ctx.currentTime;

    // Frequencies for a pleasant major 9th chime: C5, E5, G5, D6
    const freqs = [523.25, 659.25, 783.99, 1174.66];

    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0.001, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.08, now + idx * 0.08 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.85);
    });
  } catch (err) {
    // Audio may be blocked by browser autoplay policy before user gesture
  }
}

/**
 * Evaluates all user milestones across clinical cases and awards badges.
 */
export function evaluateMilestonesAndBadges(
  profile: PlayerProfile,
  session: CaseSessionState,
  caseId: string
): { updatedProfile: PlayerProfile; newlyUnlockedBadges: Badge[] } {
  const now = new Date().toISOString();
  const newlyUnlocked: Badge[] = [];
  let additionalXp = 0;

  // Red flags in case 001 are questions hx-2, hx-3, hx-7
  const redFlagIds = ['hx-2', 'hx-3', 'hx-7'];
  const redFlagsIdentified = (session.revealedQuestions || []).filter(qId => redFlagIds.includes(qId)).length;

  // High-yield investigations: inv-7 (biopsy), inv-1 or inv-3 (CBC)
  const orderedBiopsy = (session.orderedInvestigations || []).includes('inv-7');
  const orderedCBC = (session.orderedInvestigations || []).includes('inv-1') || (session.orderedInvestigations || []).includes('inv-3');
  const highYieldInvestigationCount = (orderedBiopsy ? 1 : 0) + (orderedCBC ? 1 : 0);

  // Problem representation: p1, p2, p3, p4 are correct, p5, p6 are distractors
  const primaryProblemIds = ['p1', 'p2', 'p3', 'p4'];
  const correctProblems = (session.selectedProblems || []).filter(p => primaryProblemIds.includes(p)).length;
  const distractorsChosen = (session.selectedProblems || []).filter(p => !primaryProblemIds.includes(p)).length;
  const isPerfectProblemRep = correctProblems === 4 && distractorsChosen === 0;

  // Evidence Board clues organized
  const pinnedCount = session.pinnedEvidence?.length || 0;

  // Histology hotspots inspected (4 landmarks)
  const histologyCount = session.inspectedHistologyHotspots?.length || 0;

  // Diagnosis
  const isDiagnosisCorrect = session.submittedDiagnosis?.isCorrect === true;

  // Safe management: mgmt-1 (transfusion) selected, mgmt-5 (discharge) NOT selected
  const hasSelectedTransfusion = (session.selectedManagementOptions || []).includes('mgmt-1');
  const hasDischargedPrematurely = (session.selectedManagementOptions || []).includes('mgmt-5');
  const isSafeManagement = hasSelectedTransfusion && !hasDischargedPrematurely;

  // Trajectory analysis (completed stage 11)
  const hasAnalyzedTrajectory = session.completedStages.includes(11);

  // Total case score percent
  const totalScore = Object.values(session.stageScores || {}).reduce((acc, s) => acc + s.scoreEarned, 0);
  const scorePercent = Math.min(100, Math.round((totalScore / 350) * 100));

  // Update milestone stats
  const updatedMilestones: PerformanceMilestones = {
    ...profile.milestones,
    totalQuestionsAsked: Math.max(profile.milestones.totalQuestionsAsked, session.revealedQuestions?.length || 0),
    totalRedFlagsIdentified: Math.max(profile.milestones.totalRedFlagsIdentified, redFlagsIdentified),
    totalSystemsExamined: Math.max(profile.milestones.totalSystemsExamined, session.examinedSystems?.length || 0),
    totalInvestigationsOrdered: Math.max(profile.milestones.totalInvestigationsOrdered, session.orderedInvestigations?.length || 0),
    totalHistologyHotspotsInspected: Math.max(profile.milestones.totalHistologyHotspotsInspected, histologyCount),
    perfectProblemRepresentations: isPerfectProblemRep ? Math.max(profile.milestones.perfectProblemRepresentations, 1) : profile.milestones.perfectProblemRepresentations,
    correctDiagnosesCount: isDiagnosisCorrect ? Math.max(profile.milestones.correctDiagnosesCount, 1) : profile.milestones.correctDiagnosesCount,
    safeManagementDecisions: isSafeManagement ? Math.max(profile.milestones.safeManagementDecisions, 1) : profile.milestones.safeManagementDecisions,
    evidenceBoardsOrganized: Math.max(profile.milestones.evidenceBoardsOrganized, pinnedCount >= 6 ? 1 : 0),
    casesCompletedCount: session.isCompleted ? Math.max(profile.milestones.casesCompletedCount, profile.completedCaseIds.length) : profile.milestones.casesCompletedCount,
    highestCaseScorePercent: Math.max(profile.milestones.highestCaseScorePercent, scorePercent)
  };

  // Evaluate badge progress and unlocks
  const updatedBadges = profile.badges.map(b => {
    let currentProgress = b.currentProgress;
    let shouldUnlock = b.isUnlocked;

    switch (b.id) {
      case 'badge-observer':
        currentProgress = Math.max(currentProgress, redFlagsIdentified);
        if (currentProgress >= b.targetProgress) shouldUnlock = true;
        break;

      case 'badge-investigator':
        currentProgress = Math.max(currentProgress, highYieldInvestigationCount);
        if (currentProgress >= b.targetProgress) shouldUnlock = true;
        break;

      case 'badge-analyst':
        currentProgress = hasAnalyzedTrajectory ? 1 : currentProgress;
        if (currentProgress >= b.targetProgress) shouldUnlock = true;
        break;

      case 'badge-detective':
        currentProgress = Math.max(currentProgress, pinnedCount);
        if (currentProgress >= b.targetProgress) shouldUnlock = true;
        break;

      case 'badge-diagnostician':
        currentProgress = isDiagnosisCorrect ? 1 : currentProgress;
        if (currentProgress >= b.targetProgress) shouldUnlock = true;
        break;

      case 'badge-safe-clinician':
        currentProgress = isSafeManagement ? 1 : currentProgress;
        if (currentProgress >= b.targetProgress) shouldUnlock = true;
        break;

      case 'badge-pathology-sleuth':
        currentProgress = Math.max(currentProgress, histologyCount);
        if (currentProgress >= b.targetProgress) shouldUnlock = true;
        break;

      case 'badge-syndrome-architect':
        currentProgress = Math.max(currentProgress, correctProblems);
        if (isPerfectProblemRep) shouldUnlock = true;
        break;

      case 'badge-first-encounter':
        currentProgress = session.isCompleted ? 1 : (session.completedStages.length >= 12 ? 1 : 0);
        if (currentProgress >= b.targetProgress) shouldUnlock = true;
        break;

      case 'badge-master-clinician':
        currentProgress = Math.max(currentProgress, scorePercent);
        if (scorePercent >= b.targetProgress && session.isCompleted) shouldUnlock = true;
        break;
    }

    if (shouldUnlock && !b.isUnlocked) {
      const unlocked: Badge = {
        ...b,
        currentProgress: Math.max(currentProgress, b.targetProgress),
        isUnlocked: true,
        unlockedAt: now,
        unlockedInCaseId: caseId
      };
      newlyUnlocked.push(unlocked);
      additionalXp += b.xpReward;
      return unlocked;
    }

    return {
      ...b,
      currentProgress
    };
  });

  const totalNewXp = profile.xp + additionalXp;
  const levelInfo = getLevelInfo(totalNewXp);

  const updatedProfile: PlayerProfile = {
    ...profile,
    xp: totalNewXp,
    level: levelInfo.level,
    levelTitle: levelInfo.title,
    milestones: updatedMilestones,
    badges: updatedBadges
  };

  savePlayerProfile(updatedProfile);

  if (newlyUnlocked.length > 0) {
    playAchievementChime();
  }

  return { updatedProfile, newlyUnlockedBadges: newlyUnlocked };
}
