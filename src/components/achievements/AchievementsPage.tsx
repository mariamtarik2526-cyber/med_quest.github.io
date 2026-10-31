import React, { useState } from 'react';
import { PlayerProfile, Badge, BadgeCategory, BadgeRarity } from '../../types/player';
import { getLevelInfo } from '../../services/playerStore';
import {
  Award,
  CheckCircle2,
  Lock,
  Search,
  Eye,
  Activity,
  GitBranch,
  ShieldAlert,
  Microscope,
  BrainCircuit,
  Sparkles,
  Layers,
  ArrowRight,
  Flame,
  Info,
  X
} from 'lucide-react';

interface Props {
  profile: PlayerProfile;
  onNavigateToCase: () => void;
  onExploreLibrary: () => void;
}

export const AchievementsPage: React.FC<Props> = ({
  profile,
  onNavigateToCase,
  onExploreLibrary
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'unlocked' | 'locked'>('all');
  const [inspectingBadge, setInspectingBadge] = useState<Badge | null>(null);

  const levelInfo = getLevelInfo(profile.xp);
  const totalBadges = profile.badges.length;
  const unlockedBadges = profile.badges.filter(b => b.isUnlocked);
  const unlockedCount = unlockedBadges.length;
  const completionPercentage = Math.round((unlockedCount / totalBadges) * 100);

  // Calculate total XP gained specifically from achievements
  const achievementXpEarned = unlockedBadges.reduce((sum, b) => sum + b.xpReward, 0);

  // Icon mapper
  const renderBadgeIcon = (iconName: string, className = 'w-6 h-6') => {
    switch (iconName) {
      case 'Eye': return <Eye className={className} />;
      case 'Search': return <Search className={className} />;
      case 'Activity': return <Activity className={className} />;
      case 'GitBranch': return <GitBranch className={className} />;
      case 'CheckCircle2': return <CheckCircle2 className={className} />;
      case 'ShieldAlert': return <ShieldAlert className={className} />;
      case 'Microscope': return <Microscope className={className} />;
      case 'BrainCircuit': return <BrainCircuit className={className} />;
      case 'Sparkles': return <Sparkles className={className} />;
      default: return <Award className={className} />;
    }
  };

  const getRarityBadgeStyle = (rarity: BadgeRarity) => {
    switch (rarity) {
      case 'Legendary':
        return 'text-amber-400 bg-amber-950/60 border-amber-500/40';
      case 'Epic':
        return 'text-purple-400 bg-purple-950/60 border-purple-500/40';
      case 'Rare':
        return 'text-emerald-400 bg-emerald-950/60 border-emerald-500/40';
      default:
        return 'text-cyan-400 bg-cyan-950/60 border-cyan-500/40';
    }
  };

  // Filtered badges
  const filteredBadges = profile.badges.filter(b => {
    const matchesCategory = selectedCategory === 'all' || b.category === selectedCategory;
    const matchesStatus =
      selectedStatus === 'all' ||
      (selectedStatus === 'unlocked' && b.isUnlocked) ||
      (selectedStatus === 'locked' && !b.isUnlocked);
    return matchesCategory && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 py-10">
      <div className="max-w-7xl mx-auto px-6 space-y-10">
        {/* Header & Overview Card */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-8 border-b border-slate-800">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                <Award className="w-4 h-4" />
                <span>CLINICAL REASONING HONORS & MILESTONES</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Achievements & Badges
              </h1>
              <p className="text-slate-300 text-sm max-w-xl leading-relaxed">
                Earn specialized badges as you demonstrate clinical excellence across patient encounters, problem synthesis, diagnostic investigations, and emergency safety triage.
              </p>
            </div>

            {/* Quick Metrics Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl text-center">
                <div className="text-xs text-slate-400 font-medium">Badges Unlocked</div>
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400 tabular-nums mt-1">
                  {unlockedCount} / {totalBadges}
                </div>
                <div className="text-[11px] font-mono text-slate-500 mt-0.5">{completionPercentage}% Completed</div>
              </div>

              <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl text-center">
                <div className="text-xs text-slate-400 font-medium">Achievement XP</div>
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-cyan-400 tabular-nums mt-1">
                  +{achievementXpEarned}
                </div>
                <div className="text-[11px] font-mono text-slate-500 mt-0.5">Bonus Points</div>
              </div>

              <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl text-center col-span-2 sm:col-span-1">
                <div className="text-xs text-slate-400 font-medium">Clinician Rank</div>
                <div className="text-sm sm:text-base font-bold text-white mt-1 truncate">
                  {profile.levelTitle}
                </div>
                <div className="text-[11px] font-mono text-amber-400 mt-0.5">Level {profile.level}</div>
              </div>
            </div>
          </div>

          {/* Level Progress Bar */}
          <div className="pt-6 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Next Rank Progress: Level {profile.level + 1} ({levelInfo.title})</span>
              <span className="font-mono text-white font-semibold">
                {profile.xp} / {levelInfo.nextLevelXp} XP
              </span>
            </div>
            <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 transition-all duration-500"
                style={{
                  width: `${Math.min(100, Math.max(5, ((profile.xp - levelInfo.prevLevelXp) / (levelInfo.nextLevelXp - levelInfo.prevLevelXp)) * 100))}%`
                }}
              />
            </div>
          </div>
        </div>

        {/* Milestone Statistics Tracker Bar */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
          <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Clinical Milestone Counters Stored in Profile</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
            <div className="bg-slate-950/70 border border-slate-800/80 p-3 rounded-xl">
              <div className="text-slate-500 text-[11px]">Red Flags Found</div>
              <div className="text-lg font-bold font-mono text-emerald-400 tabular-nums mt-0.5">
                {profile.milestones?.totalRedFlagsIdentified || 0}
              </div>
            </div>

            <div className="bg-slate-950/70 border border-slate-800/80 p-3 rounded-xl">
              <div className="text-slate-500 text-[11px]">Investigations Ordered</div>
              <div className="text-lg font-bold font-mono text-cyan-400 tabular-nums mt-0.5">
                {profile.milestones?.totalInvestigationsOrdered || 0}
              </div>
            </div>

            <div className="bg-slate-950/70 border border-slate-800/80 p-3 rounded-xl">
              <div className="text-slate-500 text-[11px]">Pathology Landmarks</div>
              <div className="text-lg font-bold font-mono text-amber-400 tabular-nums mt-0.5">
                {profile.milestones?.totalHistologyHotspotsInspected || 0}
              </div>
            </div>

            <div className="bg-slate-950/70 border border-slate-800/80 p-3 rounded-xl">
              <div className="text-slate-500 text-[11px]">Correct Diagnoses</div>
              <div className="text-lg font-bold font-mono text-emerald-400 tabular-nums mt-0.5">
                {profile.milestones?.correctDiagnosesCount || 0}
              </div>
            </div>

            <div className="bg-slate-950/70 border border-slate-800/80 p-3 rounded-xl">
              <div className="text-slate-500 text-[11px]">Safe Triage Decisions</div>
              <div className="text-lg font-bold font-mono text-purple-400 tabular-nums mt-0.5">
                {profile.milestones?.safeManagementDecisions || 0}
              </div>
            </div>

            <div className="bg-slate-950/70 border border-slate-800/80 p-3 rounded-xl">
              <div className="text-slate-500 text-[11px]">Highest Score</div>
              <div className="text-lg font-bold font-mono text-emerald-400 tabular-nums mt-0.5">
                {profile.milestones?.highestCaseScorePercent || 0}%
              </div>
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-slate-900/70 border border-slate-800 rounded-2xl p-4">
          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {[
              { id: 'all', label: 'All Categories' },
              { id: 'diagnostics', label: 'Diagnostics' },
              { id: 'investigation', label: 'Investigation & Lab' },
              { id: 'reasoning', label: 'Clinical Reasoning' },
              { id: 'safety', label: 'Patient Safety' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`cursor-pointer px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-slate-950/60 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Status Tabs */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 shrink-0">
            {[
              { id: 'all', label: 'All' },
              { id: 'unlocked', label: `Unlocked (${unlockedCount})` },
              { id: 'locked', label: `In Progress (${totalBadges - unlockedCount})` }
            ].map(st => (
              <button
                key={st.id}
                onClick={() => setSelectedStatus(st.id as any)}
                className={`cursor-pointer px-3 py-1 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  selectedStatus === st.id
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBadges.map((badge) => {
            const progressPercent = Math.min(100, Math.round((badge.currentProgress / badge.targetProgress) * 100));

            return (
              <div
                key={badge.id}
                onClick={() => setInspectingBadge(badge)}
                className={`cursor-pointer rounded-2xl border p-6 flex flex-col justify-between transition-all hover:scale-[1.01] ${
                  badge.isUnlocked
                    ? 'bg-slate-900/80 border-emerald-500/40 hover:border-emerald-400 shadow-lg shadow-emerald-950/20'
                    : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 opacity-80'
                }`}
              >
                <div>
                  {/* Top Bar of Card */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${getRarityBadgeStyle(badge.rarity)}`}>
                      {badge.rarity}
                    </span>

                    <span className="text-[11px] font-mono text-emerald-400 font-bold">
                      +{badge.xpReward} XP
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-start gap-4 mb-3">
                    <div className={`p-3.5 rounded-2xl shrink-0 ${
                      badge.isUnlocked
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-slate-950 text-slate-600 border border-slate-800'
                    }`}>
                      {badge.isUnlocked ? renderBadgeIcon(badge.icon) : <Lock className="w-6 h-6" />}
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-white leading-snug">{badge.name}</h3>
                      <div className="text-[10px] font-mono text-slate-400 uppercase mt-0.5">
                        {badge.category.replace('_', ' ')}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {badge.description}
                  </p>
                </div>

                {/* Progress / Status Bottom Section */}
                <div className="pt-4 border-t border-slate-800/80 space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">
                      {badge.isUnlocked ? 'Requirement Satisfied' : 'Progress Towards Badge'}
                    </span>
                    <span className={`font-mono font-semibold ${badge.isUnlocked ? 'text-emerald-400' : 'text-slate-300'}`}>
                      {badge.isUnlocked ? (
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Unlocked</span>
                        </span>
                      ) : (
                        <span>{badge.currentProgress} / {badge.targetProgress}</span>
                      )}
                    </span>
                  </div>

                  {!badge.isUnlocked && (
                    <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                      <div
                        className="h-full bg-emerald-500/80 transition-all duration-300"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  )}

                  {badge.isUnlocked && badge.unlockedAt && (
                    <div className="text-[10px] font-mono text-slate-500">
                      Unlocked on {new Date(badge.unlockedAt).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state if filter yields zero */}
        {filteredBadges.length === 0 && (
          <div className="text-center py-16 bg-slate-900/40 border border-slate-800 rounded-2xl p-8 space-y-3">
            <Award className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="text-base font-bold text-white">No Badges Match Your Filter</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Try switching your category or status filter to view all available clinical achievements.
            </p>
          </div>
        )}

        {/* CTA Strip */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="text-sm font-bold text-white">Ready to Unlock More Clinical Honors?</div>
            <p className="text-xs text-slate-400">
              Apply evidence-based reasoning in Case 001 to earn The Investigator, The Safe Clinician, and The Diagnostician.
            </p>
          </div>

          <button
            onClick={onNavigateToCase}
            className="cursor-pointer px-6 py-2.5 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-sm flex items-center gap-2 shrink-0"
          >
            <span>Resume Clinical Case 001</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Inspect Badge Modal */}
      {inspectingBadge && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setInspectingBadge(null)}
              className="cursor-pointer absolute top-6 right-6 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-start gap-4">
              <div className={`p-4 rounded-2xl ${
                inspectingBadge.isUnlocked
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-slate-950 text-slate-600 border border-slate-800'
              }`}>
                {renderBadgeIcon(inspectingBadge.icon, 'w-8 h-8')}
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${getRarityBadgeStyle(inspectingBadge.rarity)}`}>
                    {inspectingBadge.rarity}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">
                    +{inspectingBadge.xpReward} XP
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white">{inspectingBadge.name}</h3>
                <div className="text-xs text-slate-400 font-mono uppercase mt-0.5">
                  {inspectingBadge.category.replace('_', ' ')}
                </div>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                <div className="font-semibold text-slate-400 uppercase tracking-wider text-[10px]">
                  Clinical Milestone Objective:
                </div>
                <div className="text-slate-200 text-sm leading-relaxed">
                  {inspectingBadge.description}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/20 space-y-1">
                <div className="font-semibold text-cyan-300 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5" />
                  <span>Exact Qualification Criteria:</span>
                </div>
                <div className="text-cyan-100 leading-relaxed">
                  {inspectingBadge.criteriaDescription}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono text-slate-500 uppercase">STATUS</div>
                  <div className="font-bold text-white text-sm">
                    {inspectingBadge.isUnlocked ? 'Unlocked & Awarded' : 'In Progress'}
                  </div>
                  {inspectingBadge.unlockedAt && (
                    <div className="text-[11px] text-slate-400">
                      Earned on {new Date(inspectingBadge.unlockedAt).toLocaleDateString()}
                    </div>
                  )}
                </div>

                <div className="text-right">
                  <div className="text-[10px] font-mono text-slate-500 uppercase">PROGRESS</div>
                  <div className="font-mono text-emerald-400 font-bold text-sm">
                    {inspectingBadge.currentProgress} / {inspectingBadge.targetProgress}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setInspectingBadge(null)}
                className="cursor-pointer px-5 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-colors"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
