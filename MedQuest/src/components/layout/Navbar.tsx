import React from 'react';
import { Stethoscope } from 'lucide-react';

interface Props {
  currentView: 'landing' | 'dashboard' | 'library' | 'game' | 'admin' | 'achievements';
  onNavigate: (view: 'landing' | 'dashboard' | 'library' | 'game' | 'admin' | 'achievements') => void;
  activeCaseId?: string;
  hasActiveSession?: boolean;
  unlockedBadgeCount?: number;
  totalBadgeCount?: number;
}

export const Navbar: React.FC<Props> = ({
  currentView,
  onNavigate,
  hasActiveSession,
  unlockedBadgeCount = 0,
  totalBadgeCount = 10
}) => {
  return (
    <header className="sticky top-0 z-50 bg-[#090d16]/95 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Single text element wordmark with icon */}
        <button
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-white hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 group text-left cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:border-emerald-400/60 transition-colors">
            <Stethoscope className="w-4 h-4" />
          </div>
          <span>MEDQUEST</span>
        </button>

        {/* Zone 2: 5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <button
            onClick={() => onNavigate('dashboard')}
            className={`cursor-pointer transition-colors whitespace-nowrap shrink-0 hover:text-emerald-400 ${
              currentView === 'dashboard' ? 'text-emerald-400 font-semibold' : 'text-slate-300'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => onNavigate('library')}
            className={`cursor-pointer transition-colors whitespace-nowrap shrink-0 hover:text-emerald-400 ${
              currentView === 'library' ? 'text-emerald-400 font-semibold' : 'text-slate-300'
            }`}
          >
            Case Library
          </button>
          <button
            onClick={() => onNavigate('game')}
            className={`cursor-pointer transition-colors whitespace-nowrap shrink-0 hover:text-emerald-400 ${
              currentView === 'game' ? 'text-emerald-400 font-semibold' : 'text-slate-300'
            }`}
          >
            Clinical Workspace
          </button>
          <button
            onClick={() => onNavigate('achievements')}
            className={`cursor-pointer transition-colors whitespace-nowrap shrink-0 hover:text-emerald-400 flex items-center gap-1.5 ${
              currentView === 'achievements' ? 'text-emerald-400 font-semibold' : 'text-slate-300'
            }`}
          >
            <span>Achievements</span>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-1.5 py-0.2 rounded">
              {unlockedBadgeCount}
            </span>
          </button>
          <button
            onClick={() => onNavigate('admin')}
            className={`cursor-pointer transition-colors whitespace-nowrap shrink-0 hover:text-emerald-400 ${
              currentView === 'admin' ? 'text-emerald-400 font-semibold' : 'text-slate-400'
            }`}
          >
            Case Studio
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigate('game')}
            className="cursor-pointer px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0 flex items-center gap-2"
          >
            <span>{hasActiveSession ? 'Resume Case' : 'Start Case 001'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
