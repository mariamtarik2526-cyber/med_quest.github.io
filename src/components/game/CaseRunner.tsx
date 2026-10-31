import React, { useState } from 'react';
import { ClinicalCase } from '../../types/case';
import { CaseSessionState, PlayerProfile, Badge } from '../../types/player';
import { evaluateMilestonesAndBadges } from '../../services/playerStore';
import { DataIntegrityBadge } from '../common/DataIntegrityBadge';
import { Stage1Encounter } from './stages/Stage1Encounter';
import { Stage2Examination } from './stages/Stage2Examination';
import { Stage3ProblemRep } from './stages/Stage3ProblemRep';
import { Stage4Differential } from './stages/Stage4Differential';
import { Stage5InvestigationLab } from './stages/Stage5InvestigationLab';
import { Stage6EvidenceBoard } from './stages/Stage6EvidenceBoard';
import { Stage7PathologyLab } from './stages/Stage7PathologyLab';
import { Stage8DiagnosticChallenge } from './stages/Stage8DiagnosticChallenge';
import { Stage9StagingMap } from './stages/Stage9StagingMap';
import { Stage10Management } from './stages/Stage10Management';
import { Stage11ClinicalCourse } from './stages/Stage11ClinicalCourse';
import { Stage12Debrief } from './stages/Stage12Debrief';
import {
  Clock,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  FileText,
  ChevronRight,
  Layers,
  Sparkles,
  Award,
  X
} from 'lucide-react';

interface Props {
  clinicalCase: ClinicalCase;
  session: CaseSessionState;
  profile: PlayerProfile;
  onUpdateSession: (updates: Partial<CaseSessionState>) => void;
  onUpdateProfile: (updatedProfile: PlayerProfile) => void;
  onExploreLibrary: () => void;
  onOpenDashboard: () => void;
  onOpenAchievements?: () => void;
  onRestartCase: () => void;
}

const STAGE_NAMES = [
  'Patient Encounter',
  'Physical Examination',
  'Problem Representation',
  'Differential Diagnosis',
  'Investigation Lab',
  'The Evidence Board',
  'Pathology Lab',
  'Diagnostic Challenge',
  'Staging & Extent',
  'Management Simulation',
  'Clinical Course',
  'Final Debrief'
];

export const CaseRunner: React.FC<Props> = ({
  clinicalCase,
  session,
  profile,
  onUpdateSession,
  onUpdateProfile,
  onExploreLibrary,
  onOpenDashboard,
  onOpenAchievements,
  onRestartCase,
}) => {
  const [hasBegun, setHasBegun] = useState<boolean>(session.currentStage > 1 || session.revealedQuestions.length > 0);
  const [showDossier, setShowDossier] = useState<boolean>(false);
  const [unlockedBadgesQueue, setUnlockedBadgesQueue] = useState<Badge[]>([]);

  const currentStage = session.currentStage || 1;

  // Intercept session updates to check real-time milestones
  const handleSessionUpdateWithMilestones = (updates: Partial<CaseSessionState>) => {
    const nextSession = { ...session, ...updates };
    onUpdateSession(updates);

    const { updatedProfile, newlyUnlockedBadges } = evaluateMilestonesAndBadges(
      profile,
      nextSession,
      clinicalCase.id
    );

    if (newlyUnlockedBadges.length > 0) {
      setUnlockedBadgesQueue(prev => [...prev, ...newlyUnlockedBadges]);
      setTimeout(() => {
        setUnlockedBadgesQueue(prev => prev.filter(b => !newlyUnlockedBadges.some(nb => nb.id === b.id)));
      }, 6500);
    }

    onUpdateProfile(updatedProfile);
  };

  const handleStageCompletion = (stageNum: number, scoreEarned: number, feedback: string[]) => {
    const nextStage = Math.min(12, stageNum + 1);
    const completed = Array.from(new Set([...session.completedStages, stageNum]));
    const isFinished = stageNum === 12;

    const updatedScores = {
      ...session.stageScores,
      [stageNum]: {
        stageNumber: stageNum,
        stageName: STAGE_NAMES[stageNum - 1],
        scoreEarned,
        maxScore: 50,
        decisionsMade: 1,
        feedback
      }
    };

    const nextSession: CaseSessionState = {
      ...session,
      currentStage: nextStage,
      completedStages: completed,
      stageScores: updatedScores,
      isCompleted: isFinished,
      lastUpdated: new Date().toISOString()
    };

    // Evaluate milestones and badge rewards
    const { updatedProfile, newlyUnlockedBadges } = evaluateMilestonesAndBadges(
      profile,
      nextSession,
      clinicalCase.id
    );

    if (newlyUnlockedBadges.length > 0) {
      setUnlockedBadgesQueue(prev => [...prev, ...newlyUnlockedBadges]);
      setTimeout(() => {
        setUnlockedBadgesQueue(prev => prev.filter(b => !newlyUnlockedBadges.some(nb => nb.id === b.id)));
      }, 6500);
    }

    const completedCaseIds = isFinished
      ? Array.from(new Set([...updatedProfile.completedCaseIds, clinicalCase.id]))
      : updatedProfile.completedCaseIds;

    const finalProfile: PlayerProfile = {
      ...updatedProfile,
      xp: updatedProfile.xp + scoreEarned,
      completedCaseIds
    };

    onUpdateProfile(finalProfile);
    onUpdateSession({
      currentStage: nextStage,
      completedStages: completed,
      stageScores: updatedScores,
      isCompleted: isFinished,
      lastUpdated: new Date().toISOString()
    });
  };

  const jumpToStage = (stageNum: number) => {
    // Can jump if already completed or current
    if (session.completedStages.includes(stageNum) || stageNum <= (Math.max(...session.completedStages, 0) + 1)) {
      onUpdateSession({ currentStage: stageNum });
    }
  };

  // Case Briefing screen if not yet begun
  if (!hasBegun) {
    return (
      <div className="min-h-screen bg-[#090d16] text-slate-100 py-12 px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 sm:p-12 space-y-8">
            <div className="space-y-3 pb-6 border-b border-slate-800">
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                <span className="font-mono text-emerald-400 font-bold">CASE {clinicalCase.caseNumber}</span>
                <span>·</span>
                <span>{clinicalCase.specialty}</span>
                <span>·</span>
                <span>Difficulty: {clinicalCase.difficulty}</span>
                <span>·</span>
                <span className="flex items-center gap-1 font-mono">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{clinicalCase.estimatedMinutes} Mins</span>
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {clinicalCase.title}
              </h1>
              <p className="text-slate-300 text-base">{clinicalCase.subtitle}</p>
            </div>

            {/* Patient Presentation Snapshot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1">
                <div className="text-[11px] font-mono text-slate-400 uppercase">Patient Profile</div>
                <div className="text-lg font-bold text-white">
                  {clinicalCase.patientProfile.age}-Year-Old {clinicalCase.patientProfile.sex}
                </div>
                <div className="text-xs text-slate-400">{clinicalCase.patientProfile.setting}</div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1">
                <div className="text-[11px] font-mono text-slate-400 uppercase">Chief Complaint</div>
                <div className="text-base font-semibold text-emerald-400">
                  "{clinicalCase.patientProfile.chiefComplaint}"
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/50 border border-slate-800 space-y-2">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Initial Clinical Vignette:
              </div>
              <p className="text-sm text-slate-200 leading-relaxed">
                {clinicalCase.patientProfile.initialPresentation}
              </p>
            </div>

            {/* Learning Objectives */}
            <div className="space-y-3">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Educational Objectives:
              </div>
              <ul className="grid grid-cols-1 gap-2.5 text-xs text-slate-300">
                {clinicalCase.learningObjectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950/40 border border-slate-800/80">
                    <span className="text-emerald-400 font-bold shrink-0">✓</span>
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800">
              <div className="text-xs text-slate-500">
                Diagnostic outcome will be determined through your active investigation.
              </div>
              <button
                onClick={() => setHasBegun(true)}
                className="cursor-pointer w-full sm:w-auto px-8 py-3.5 text-sm font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 group"
              >
                <span>BEGIN CASE</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col">
      {/* Workspace Sticky Sub-Header */}
      <div className="sticky top-[65px] z-40 bg-[#090d16]/95 backdrop-blur-md border-b border-slate-800/80 px-6 py-3">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowDossier(true)}
              className="cursor-pointer px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-lg flex items-center gap-1.5 transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-emerald-400" />
              <span>Patient Dossier</span>
            </button>

            <div className="hidden sm:block h-4 w-px bg-slate-800" />

            <div className="text-xs">
              <span className="font-mono text-emerald-400 font-semibold">STAGE {currentStage}/12:</span>{' '}
              <span className="font-bold text-white">{STAGE_NAMES[currentStage - 1]}</span>
            </div>
          </div>

          {/* Breadcrumb Stage Buttons */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {STAGE_NAMES.map((name, i) => {
              const stageNum = i + 1;
              const isCurrent = currentStage === stageNum;
              const isCompleted = session.completedStages.includes(stageNum);

              return (
                <button
                  key={stageNum}
                  onClick={() => jumpToStage(stageNum)}
                  title={`${stageNum}. ${name}`}
                  className={`cursor-pointer w-7 h-7 text-xs font-mono font-bold rounded-md flex items-center justify-center transition-colors ${
                    isCurrent
                      ? 'bg-emerald-400 text-slate-950 shadow-sm'
                      : isCompleted
                      ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30'
                      : 'bg-slate-900 text-slate-500 border border-slate-800/80 hover:text-slate-300'
                  }`}
                >
                  {stageNum}
                </button>
              );
            })}
          </div>

          {onOpenAchievements && (
            <button
              onClick={onOpenAchievements}
              className="cursor-pointer px-2.5 py-1 text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 rounded-lg hover:bg-emerald-900/60 transition-colors flex items-center gap-1.5 shrink-0"
            >
              <Award className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Achievements</span>
              <span className="font-mono text-[11px]">
                {profile.badges.filter(b => b.isUnlocked).length}/{profile.badges.length}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Real-time Badge Notification Popups */}
      {unlockedBadgesQueue.length > 0 && (
        <div className="fixed top-24 right-6 z-50 flex flex-col gap-3 max-w-sm w-full">
          {unlockedBadgesQueue.map((badge) => (
            <div
              key={badge.id}
              onClick={onOpenAchievements}
              className="cursor-pointer bg-slate-900/95 border-2 border-emerald-400/80 text-white p-4 rounded-2xl shadow-2xl flex items-start gap-3.5 animate-bounce backdrop-blur-md hover:bg-slate-850 transition-all"
            >
              <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">
                    CLINICAL BADGE UNLOCKED!
                  </span>
                  <span className="text-[10px] font-mono font-bold text-emerald-300">
                    +{badge.xpReward} XP
                  </span>
                </div>
                <div className="text-sm font-bold text-white mt-0.5">{badge.name}</div>
                <div className="text-xs text-slate-300 mt-0.5 line-clamp-1">{badge.description}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Patient Dossier Drawer Modal */}
      {showDossier && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-md bg-slate-900 border-l border-slate-800 h-full p-6 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>Patient Chart & Verified Records</span>
              </div>
              <button
                onClick={() => setShowDossier(false)}
                className="cursor-pointer p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                <div className="font-mono text-slate-400">PATIENT PROFILE</div>
                <div className="font-bold text-white">28-year-old Male</div>
                <div className="text-slate-400">Setting: Inpatient Hematology Referral</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                <div className="font-mono text-slate-400">CHIEF COMPLAINT</div>
                <div className="font-semibold text-emerald-300">
                  Generalized enlargement of neck and body lymph nodes
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                <div className="font-mono text-slate-400">KEY VERIFIED TIMELINE DATES</div>
                <ul className="space-y-1.5 text-slate-300 font-mono">
                  <li>• 17 Sep 2026: Hb 8.3, WBC 1.61, Plt 25</li>
                  <li>• 19 Sep 2026: Cervical LN Biopsy (2.5 cm firm whitish cut surface)</li>
                  <li>• 04 Oct 2026: Severe deterioration (Hb 3.9, Plt 9k, Fevers &gt;39°C, AST 393, Bili 9.15)</li>
                  <li>• 05 Oct 2026: Secondary HLH evaluation (LDH 709, CRP 176, Procalcitonin 6.51)</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/20 text-cyan-200 leading-relaxed">
                <span className="font-semibold text-cyan-300">Clinical Data Integrity: </span>
                All patient findings in this case are derived strictly from verified clinical records without artificial filler or inferred negative values.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Stage Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8">
        {currentStage === 1 && (
          <Stage1Encounter
            clinicalCase={clinicalCase}
            session={session}
            onUpdateSession={handleSessionUpdateWithMilestones}
            onCompleteStage={(score, feedback) => handleStageCompletion(1, score, feedback)}
          />
        )}

        {currentStage === 2 && (
          <Stage2Examination
            clinicalCase={clinicalCase}
            session={session}
            onUpdateSession={handleSessionUpdateWithMilestones}
            onCompleteStage={(score, feedback) => handleStageCompletion(2, score, feedback)}
          />
        )}

        {currentStage === 3 && (
          <Stage3ProblemRep
            clinicalCase={clinicalCase}
            session={session}
            onUpdateSession={handleSessionUpdateWithMilestones}
            onCompleteStage={(score, feedback) => handleStageCompletion(3, score, feedback)}
          />
        )}

        {currentStage === 4 && (
          <Stage4Differential
            clinicalCase={clinicalCase}
            session={session}
            onUpdateSession={handleSessionUpdateWithMilestones}
            onCompleteStage={(score, feedback) => handleStageCompletion(4, score, feedback)}
          />
        )}

        {currentStage === 5 && (
          <Stage5InvestigationLab
            clinicalCase={clinicalCase}
            session={session}
            onUpdateSession={handleSessionUpdateWithMilestones}
            onCompleteStage={(score, feedback) => handleStageCompletion(5, score, feedback)}
          />
        )}

        {currentStage === 6 && (
          <Stage6EvidenceBoard
            clinicalCase={clinicalCase}
            session={session}
            onUpdateSession={handleSessionUpdateWithMilestones}
            onCompleteStage={(score, feedback) => handleStageCompletion(6, score, feedback)}
          />
        )}

        {currentStage === 7 && (
          <Stage7PathologyLab
            clinicalCase={clinicalCase}
            session={session}
            onUpdateSession={handleSessionUpdateWithMilestones}
            onCompleteStage={(score, feedback) => handleStageCompletion(7, score, feedback)}
          />
        )}

        {currentStage === 8 && (
          <Stage8DiagnosticChallenge
            clinicalCase={clinicalCase}
            session={session}
            onUpdateSession={handleSessionUpdateWithMilestones}
            onCompleteStage={(score, feedback) => handleStageCompletion(8, score, feedback)}
          />
        )}

        {currentStage === 9 && (
          <Stage9StagingMap
            clinicalCase={clinicalCase}
            session={session}
            onUpdateSession={handleSessionUpdateWithMilestones}
            onCompleteStage={(score, feedback) => handleStageCompletion(9, score, feedback)}
          />
        )}

        {currentStage === 10 && (
          <Stage10Management
            clinicalCase={clinicalCase}
            session={session}
            onUpdateSession={handleSessionUpdateWithMilestones}
            onCompleteStage={(score, feedback) => handleStageCompletion(10, score, feedback)}
          />
        )}

        {currentStage === 11 && (
          <Stage11ClinicalCourse
            clinicalCase={clinicalCase}
            session={session}
            onUpdateSession={handleSessionUpdateWithMilestones}
            onCompleteStage={(score, feedback) => handleStageCompletion(11, score, feedback)}
          />
        )}

        {currentStage === 12 && (
          <Stage12Debrief
            clinicalCase={clinicalCase}
            session={session}
            profile={profile}
            onRestartCase={onRestartCase}
            onExploreLibrary={onExploreLibrary}
            onOpenDashboard={onOpenDashboard}
          />
        )}
      </main>
    </div>
  );
};
