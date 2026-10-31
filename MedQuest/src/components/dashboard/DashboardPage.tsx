import React, { useState } from 'react';
import { PlayerProfile, CaseSessionState, BadgeRarity } from '../../types/player';
import { CASE_001 } from '../../data/case001';
import { CASE_LIBRARY_CATALOG, SPECIALTY_CATEGORIES } from '../../data/casesLibrary';
import {
  Award,
  ArrowRight,
  Play,
  RotateCcw,
  AlertCircle,
  CheckCircle2,
  Flame,
  BrainCircuit,
  Activity,
  Eye,
  Search,
  GitBranch,
  ShieldAlert,
  Microscope,
  Sparkles,
  Lock
} from 'lucide-react';

interface Props {
  profile: PlayerProfile;
  onStartCase: (caseId: string) => void;
  onExploreLibrary: () => void;
  onOpenAchievements: () => void;
  onResetProgress: () => void;
}

export const DashboardPage: React.FC<Props> = ({
  profile,
  onStartCase,
  onExploreLibrary,
  onOpenAchievements,
  onResetProgress
}) => {
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const activeSession: CaseSessionState | undefined = profile.activeSessions[CASE_001.id];
  const isCaseCompleted = profile.completedCaseIds.includes(CASE_001.id);
  const currentStage = activeSession?.currentStage || 1;

  // Icon mapper for badges
  const renderBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Eye': return <Eye className="w-5 h-5" />;
      case 'Search': return <Search className="w-5 h-5" />;
      case 'Activity': return <Activity className="w-5 h-5" />;
      case 'GitBranch': return <GitBranch className="w-5 h-5" />;
      case 'CheckCircle2': return <CheckCircle2 className="w-5 h-5" />;
      case 'ShieldAlert': return <ShieldAlert className="w-5 h-5" />;
      case 'Microscope': return <Microscope className="w-5 h-5" />;
      case 'BrainCircuit': return <BrainCircuit className="w-5 h-5" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      default: return <Award className="w-5 h-5" />;
    }
  };

  // Calculate total scores earned across stages
  const totalScoreEarned = activeSession
    ? Object.values(activeSession.stageScores).reduce((acc, s) => acc + s.scoreEarned, 0)
    : 0;

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 py-10">
      <div className="max-w-7xl mx-auto px-6 space-y-10">
        {/* Welcome & Profile Summary */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                <span>GUEST SESSION</span>
                <span>·</span>
                <span>LOCAL INSTANCE</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Welcome, {profile.name}
              </h1>
              <p className="text-slate-400 text-sm max-w-xl">
                Current Standing: <span className="text-white font-medium">{profile.levelTitle}</span> (Level {profile.level})
              </p>
            </div>

            <div className="flex items-center gap-4 bg-slate-950/70 border border-slate-800 p-4 rounded-xl">
              <div className="text-center px-3 border-r border-slate-800">
                <div className="text-xs text-slate-400 font-medium">Experience</div>
                <div className="text-lg font-bold font-mono text-emerald-400 tabular-nums">{profile.xp} XP</div>
              </div>
              <div className="text-center px-3 border-r border-slate-800">
                <div className="text-xs text-slate-400 font-medium">Badges Earned</div>
                <div className="text-lg font-bold font-mono text-cyan-400 tabular-nums">
                  {profile.badges.filter(b => b.isUnlocked).length} / {profile.badges.length}
                </div>
              </div>
              <div className="text-center px-3">
                <div className="text-xs text-slate-400 font-medium flex items-center justify-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  <span>Streak</span>
                </div>
                <div className="text-lg font-bold font-mono text-amber-400 tabular-nums">{profile.streakDays} Day</div>
              </div>
            </div>
          </div>
        </div>

        {/* Continue Previous Case or Start */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400" />
                <span>Active Clinical Case</span>
              </h2>
              {activeSession && (
                <span className="text-xs font-mono text-slate-400">
                  Last active: {new Date(activeSession.lastUpdated).toLocaleDateString()}
                </span>
              )}
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                    <span className="font-mono text-emerald-400 font-semibold">CASE {CASE_001.caseNumber}</span>
                    <span>·</span>
                    <span>{CASE_001.specialty}</span>
                    <span>·</span>
                    <span>{CASE_001.difficulty}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">{CASE_001.title}</h3>
                  <p className="text-slate-300 text-xs mt-1 max-w-xl">{CASE_001.subtitle}</p>
                </div>

                <button
                  onClick={() => onStartCase(CASE_001.id)}
                  className="cursor-pointer px-5 py-2.5 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-colors flex items-center gap-2 shrink-0 shadow-sm"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{activeSession ? `Resume at Stage ${currentStage}` : 'Begin Case'}</span>
                </button>
              </div>

              {/* Stage Progress tracker */}
              <div className="mt-6 pt-6 border-t border-slate-800/80">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span>Investigation Progress: Stage {currentStage} of 12</span>
                  <span className="font-mono tabular-nums font-semibold text-white">
                    {Math.round(((activeSession?.completedStages.length || 0) / 12) * 100)}%
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300"
                    style={{
                      width: `${Math.max(5, ((activeSession?.completedStages.length || 0) / 12) * 100)}%`
                    }}
                  />
                </div>

                <div className="grid grid-cols-6 sm:grid-cols-12 gap-1.5 mt-3 text-center">
                  {Array.from({ length: 12 }).map((_, idx) => {
                    const stgNum = idx + 1;
                    const isDone = activeSession?.completedStages.includes(stgNum);
                    const isCurrent = activeSession?.currentStage === stgNum;
                    return (
                      <div
                        key={stgNum}
                        className={`text-[10px] font-mono py-1 rounded border transition-colors ${
                          isDone
                            ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300'
                            : isCurrent
                            ? 'bg-slate-800 border-cyan-400 text-cyan-300 font-bold'
                            : 'bg-slate-950/60 border-slate-800/80 text-slate-500'
                        }`}
                        title={`Stage ${stgNum}`}
                      >
                        {stgNum}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Performance & Clinical Reasoning Metrics */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <BrainCircuit className="w-4 h-4 text-cyan-400" />
                <span>Performance & Clinical Reasoning Feedback</span>
              </h3>

              {activeSession && Object.keys(activeSession.stageScores).length > 0 ? (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div className="bg-slate-950/60 border border-slate-800 p-3 rounded-xl">
                      <div className="text-[11px] text-slate-400">Total Score Earned</div>
                      <div className="text-base font-bold font-mono text-emerald-400 tabular-nums">
                        {totalScoreEarned} pts
                      </div>
                    </div>
                    <div className="bg-slate-950/60 border border-slate-800 p-3 rounded-xl">
                      <div className="text-[11px] text-slate-400">Stages Evaluated</div>
                      <div className="text-base font-bold font-mono text-cyan-400 tabular-nums">
                        {Object.keys(activeSession.stageScores).length} of 12
                      </div>
                    </div>
                    <div className="bg-slate-950/60 border border-slate-800 p-3 rounded-xl">
                      <div className="text-[11px] text-slate-400">Safety Critical Points</div>
                      <div className="text-base font-bold font-mono text-amber-400 tabular-nums">
                        {activeSession.selectedManagementOptions.includes('mgmt-1') ? 'Protected' : 'Pending'}
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="text-xs font-semibold text-slate-300 mb-2">Recent Stage Highlights:</div>
                    <div className="space-y-2">
                      {Object.values(activeSession.stageScores).slice(-3).map((sc, i) => (
                        <div key={i} className="text-xs bg-slate-950/40 border border-slate-800/80 p-2.5 rounded-lg flex items-start justify-between gap-3">
                          <div>
                            <span className="font-semibold text-slate-200">Stage {sc.stageNumber} ({sc.stageName}): </span>
                            <span className="text-slate-400">{sc.feedback[0] || 'Decisions recorded.'}</span>
                          </div>
                          <span className="font-mono text-emerald-400 font-bold shrink-0">+{sc.scoreEarned}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-slate-400 leading-relaxed">
                  No stage evaluations recorded yet. Start investigating Case 001 to generate real-time diagnostic performance metrics and areas for clinical improvement.
                </p>
              )}
            </div>
          </div>

          {/* Right Column: Badges & Curated Specialties */}
          <div className="space-y-6">
            {/* Badges Card */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Achievement Badges
                  </h3>
                </div>
                <button
                  onClick={onOpenAchievements}
                  className="cursor-pointer text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                >
                  <span>View All ({profile.badges.length})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-3">
                {profile.badges.slice(0, 5).map((badge) => {
                  const progressPct = Math.min(100, Math.round((badge.currentProgress / badge.targetProgress) * 100));

                  return (
                    <div
                      key={badge.id}
                      onClick={onOpenAchievements}
                      className={`p-3 rounded-xl border flex flex-col gap-2 transition-all cursor-pointer hover:border-slate-700 ${
                        badge.isUnlocked
                          ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                          : 'bg-slate-950/50 border-slate-800/80 text-slate-400'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg shrink-0 ${
                          badge.isUnlocked ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-500'
                        }`}>
                          {badge.isUnlocked ? renderBadgeIcon(badge.icon) : <Lock className="w-4 h-4" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-xs font-semibold text-white truncate">{badge.name}</span>
                            <span className="text-[10px] font-mono text-emerald-400">+{badge.xpReward} XP</span>
                          </div>
                          <div className="text-[11px] text-slate-400 leading-tight mt-0.5 line-clamp-1">{badge.description}</div>
                        </div>
                      </div>

                      {/* Progress bar on locked badge or unlocked date */}
                      {!badge.isUnlocked ? (
                        <div className="space-y-1 pt-1 border-t border-slate-900">
                          <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                            <span>Milestone Progress</span>
                            <span>{badge.currentProgress} / {badge.targetProgress}</span>
                          </div>
                          <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500/80" style={{ width: `${progressPct}%` }} />
                          </div>
                        </div>
                      ) : (
                        badge.unlockedAt && (
                          <div className="text-[10px] text-emerald-400 font-mono pt-1 border-t border-slate-900/60 flex items-center justify-between">
                            <span>Unlocked</span>
                            <span>{new Date(badge.unlockedAt).toLocaleDateString()}</span>
                          </div>
                        )
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recommended & Upcoming Cases Preview */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Case Catalog</h3>
                <button
                  onClick={onExploreLibrary}
                  className="cursor-pointer text-xs text-cyan-400 hover:text-cyan-300 font-semibold"
                >
                  View Library
                </button>
              </div>

              <div className="space-y-2.5">
                {CASE_LIBRARY_CATALOG.slice(1, 4).map((c) => (
                  <div key={c.id} className="p-3 bg-slate-950/40 border border-slate-800/80 rounded-xl">
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="font-mono text-slate-400">{c.specialty}</span>
                      <span className="text-[10px] text-amber-400/90 font-mono">{c.statusText}</span>
                    </div>
                    <div className="text-xs font-semibold text-slate-200">{c.title}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{c.subtitle}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reset Progress Section */}
            <div className="p-4 rounded-xl border border-rose-900/30 bg-rose-950/10 text-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-rose-300 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Reset Local Session
                </span>
              </div>
              <p className="text-slate-400 text-[11px] mb-3">
                Clear all simulated decisions, XP, and badges to restart from the beginning.
              </p>
              {showResetConfirm ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onResetProgress();
                      setShowResetConfirm(false);
                    }}
                    className="cursor-pointer px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded font-semibold text-xs"
                  >
                    Confirm Reset
                  </button>
                  <button
                    onClick={() => setShowResetConfirm(false)}
                    className="cursor-pointer px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowResetConfirm(true)}
                  className="cursor-pointer px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 rounded transition-colors flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Guest Progress</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
