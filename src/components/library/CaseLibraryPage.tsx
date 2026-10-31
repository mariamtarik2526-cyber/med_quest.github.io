import React, { useState, useMemo } from 'react';
import { CASE_LIBRARY_CATALOG, SPECIALTY_CATEGORIES, CaseCardMeta } from '../../data/casesLibrary';
import { Search, Filter, Clock, Award, ArrowRight, Play, CheckCircle2, Lock } from 'lucide-react';

interface Props {
  onSelectCase: (caseId: string) => void;
  completedCaseIds: string[];
}

export const CaseLibraryPage: React.FC<Props> = ({ onSelectCase, completedCaseIds }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('All Specialties');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  const filteredCases = useMemo(() => {
    return CASE_LIBRARY_CATALOG.filter((c: CaseCardMeta) => {
      const matchesSearch =
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.subspecialty.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSpecialty =
        selectedSpecialty === 'All Specialties' ||
        c.specialty.toLowerCase() === selectedSpecialty.toLowerCase() ||
        c.subspecialty.toLowerCase().includes(selectedSpecialty.toLowerCase());

      const matchesDifficulty =
        selectedDifficulty === 'all' || c.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();

      return matchesSearch && matchesSpecialty && matchesDifficulty;
    });
  }, [searchQuery, selectedSpecialty, selectedDifficulty]);

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 py-10">
      <div className="max-w-7xl mx-auto px-6 space-y-8">
        {/* Header banner */}
        <div className="space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-emerald-400">Curated Clinical Curriculum</div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Clinical Case Library</h1>
          <p className="text-slate-400 text-sm max-w-2xl">
            Explore authentic diagnostic reasoning cases across 11 core medical specialties. Each case challenges you to formulate problem representations, select high-yield investigations, and make safe clinical management decisions.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search cases by title, pathology, chief complaint, or keyword..."
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-emerald-500 cursor-pointer"
              >
                <option value="all">All Difficulties</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>

          {/* Specialty Category Pills (functional filter buttons) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {SPECIALTY_CATEGORIES.map((cat) => {
              const isSelected = selectedSpecialty === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedSpecialty(cat)}
                  className={`cursor-pointer px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                    isSelected
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-slate-950/60 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Case Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCases.map((caseItem) => {
            const isCompleted = completedCaseIds.includes(caseItem.id);
            return (
              <div
                key={caseItem.id}
                className={`bg-slate-900/60 border rounded-2xl overflow-hidden flex flex-col justify-between transition-all ${
                  caseItem.isAvailable
                    ? 'border-slate-800 hover:border-emerald-500/40 hover:bg-slate-900/90'
                    : 'border-slate-800/60 opacity-80'
                }`}
              >
                <div>
                  {/* Card Cover image or colored header */}
                  {caseItem.coverImage ? (
                    <div className="h-40 w-full relative overflow-hidden bg-slate-950">
                      <img
                        src={caseItem.coverImage}
                        alt={caseItem.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                      <div className="absolute top-3 left-3 bg-slate-950/90 backdrop-blur-sm border border-slate-800 px-2 py-0.5 rounded text-[10px] font-mono text-emerald-400">
                        CASE {caseItem.caseNumber}
                      </div>
                      {isCompleted && (
                        <div className="absolute top-3 right-3 bg-emerald-950/90 border border-emerald-500/40 px-2 py-0.5 rounded text-[10px] font-mono text-emerald-300 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>COMPLETED</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="h-28 w-full bg-gradient-to-br from-slate-950 to-slate-900 p-4 relative flex flex-col justify-between border-b border-slate-800/80">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-mono text-slate-400">CASE {caseItem.caseNumber}</span>
                        <span className="text-[10px] font-mono text-amber-400/90">{caseItem.statusText}</span>
                      </div>
                      <div className="text-xs font-semibold text-slate-300">{caseItem.specialty}</div>
                    </div>
                  )}

                  {/* Body Content */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span className="text-emerald-400 font-medium">{caseItem.specialty}</span>
                      <span>·</span>
                      <span>{caseItem.difficulty}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{caseItem.estimatedMinutes}m</span>
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white leading-snug">{caseItem.title}</h3>
                    <p className="text-slate-300 text-xs leading-relaxed line-clamp-2">
                      {caseItem.subtitle}
                    </p>

                    <div className="pt-2 border-t border-slate-800/60">
                      <div className="text-[11px] font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                        Learning Focus:
                      </div>
                      <ul className="text-[11px] text-slate-400 space-y-1 list-disc list-inside">
                        {caseItem.learningObjectivesSummary.slice(0, 2).map((item, idx) => (
                          <li key={idx} className="line-clamp-1">{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-6 pt-0">
                  {caseItem.isAvailable ? (
                    <button
                      onClick={() => onSelectCase(caseItem.id)}
                      className="cursor-pointer w-full py-2.5 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>{isCompleted ? 'Review Investigation' : 'Start Investigation'}</span>
                    </button>
                  ) : (
                    <div className="w-full py-2.5 text-xs font-medium text-slate-500 bg-slate-950/60 border border-slate-800/80 rounded-xl flex items-center justify-center gap-2 cursor-not-allowed">
                      <Lock className="w-3.5 h-3.5" />
                      <span>{caseItem.statusText}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
