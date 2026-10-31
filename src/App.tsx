/**
 * MEDQUEST - Think. Investigate. Diagnose.
 * Interactive Clinical Reasoning & Medical Education Platform
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LandingPage } from './components/landing/LandingPage';
import { DashboardPage } from './components/dashboard/DashboardPage';
import { CaseLibraryPage } from './components/library/CaseLibraryPage';
import { CaseRunner } from './components/game/CaseRunner';
import { CaseAuthoringPage } from './components/admin/CaseAuthoringPage';
import { AchievementsPage } from './components/achievements/AchievementsPage';
import { CASE_001 } from './data/case001';
import {
  loadPlayerProfile,
  savePlayerProfile,
  createInitialSession,
  resetPlayerProfile,
} from './services/playerStore';
import { PlayerProfile, CaseSessionState } from './types/player';

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard' | 'library' | 'game' | 'admin' | 'achievements'>('landing');
  const [profile, setProfile] = useState<PlayerProfile>(() => loadPlayerProfile());

  // Save profile changes to local storage
  const handleUpdateProfile = (newProfile: PlayerProfile) => {
    setProfile(newProfile);
    savePlayerProfile(newProfile);
  };

  // Get or initialize active session for Case 001
  const activeSession: CaseSessionState = profile.activeSessions[CASE_001.id] || createInitialSession(CASE_001.id);

  const handleUpdateSession = (updates: Partial<CaseSessionState>) => {
    const updatedSession = { ...activeSession, ...updates, lastUpdated: new Date().toISOString() };
    const updatedProfile: PlayerProfile = {
      ...profile,
      activeSessions: {
        ...profile.activeSessions,
        [CASE_001.id]: updatedSession,
      },
    };
    handleUpdateProfile(updatedProfile);
  };

  const handleStartCase = (caseId: string) => {
    if (!profile.activeSessions[caseId]) {
      const newSession = createInitialSession(caseId);
      const updatedProfile = {
        ...profile,
        activeSessions: {
          ...profile.activeSessions,
          [caseId]: newSession,
        },
      };
      handleUpdateProfile(updatedProfile);
    }
    setCurrentView('game');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestartCase = () => {
    const freshSession = createInitialSession(CASE_001.id);
    const updatedProfile = {
      ...profile,
      activeSessions: {
        ...profile.activeSessions,
        [CASE_001.id]: freshSession,
      },
    };
    handleUpdateProfile(updatedProfile);
    setCurrentView('game');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetProgress = () => {
    const fresh = resetPlayerProfile();
    setProfile(fresh);
    setCurrentView('dashboard');
  };

  const handleNavigate = (view: 'landing' | 'dashboard' | 'library' | 'game' | 'admin' | 'achievements') => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const unlockedCount = profile.badges.filter(b => b.isUnlocked).length;

  return (
    <div className="min-h-screen flex flex-col bg-[#090d16] text-slate-100 font-sans selection:bg-emerald-500/20 selection:text-emerald-300">
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        activeCaseId={CASE_001.id}
        hasActiveSession={!!profile.activeSessions[CASE_001.id]}
        unlockedBadgeCount={unlockedCount}
        totalBadgeCount={profile.badges.length}
      />

      <main className="flex-1">
        {currentView === 'landing' && (
          <LandingPage
            onStartCase={handleStartCase}
            onExploreLibrary={() => handleNavigate('library')}
            onOpenDashboard={() => handleNavigate('dashboard')}
          />
        )}

        {currentView === 'dashboard' && (
          <DashboardPage
            profile={profile}
            onStartCase={handleStartCase}
            onExploreLibrary={() => handleNavigate('library')}
            onOpenAchievements={() => handleNavigate('achievements')}
            onResetProgress={handleResetProgress}
          />
        )}

        {currentView === 'achievements' && (
          <AchievementsPage
            profile={profile}
            onNavigateToCase={() => handleNavigate('game')}
            onExploreLibrary={() => handleNavigate('library')}
          />
        )}

        {currentView === 'library' && (
          <CaseLibraryPage
            onSelectCase={handleStartCase}
            completedCaseIds={profile.completedCaseIds}
          />
        )}

        {currentView === 'game' && (
          <CaseRunner
            clinicalCase={CASE_001}
            session={activeSession}
            profile={profile}
            onUpdateSession={handleUpdateSession}
            onUpdateProfile={handleUpdateProfile}
            onExploreLibrary={() => handleNavigate('library')}
            onOpenDashboard={() => handleNavigate('dashboard')}
            onOpenAchievements={() => handleNavigate('achievements')}
            onRestartCase={handleRestartCase}
          />
        )}

        {currentView === 'admin' && (
          <CaseAuthoringPage />
        )}
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
