import React, { useState, useEffect } from 'react';
import { ResponsibleGamingBanner } from './components/ResponsibleGamingBanner';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { GeneratorView } from './components/GeneratorView';
import { SystemReducer } from './components/SystemReducer';
import { StatisticsView } from './components/StatisticsView';
import { BudgetSimulator } from './components/BudgetSimulator';
import { PricingSection } from './components/PricingSection';
import { PricingModal } from './components/PricingModal';
import { LegalModals, LegalModalType } from './components/LegalModals';
import { Footer } from './components/Footer';
import { EntitlementId, UserEntitlements } from './types/crescendo';
import { getEntitlements, saveEntitlements, isFeatureUnlocked } from './services/storage';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [isDark, setIsDark] = useState<boolean>(true);
  const [entitlements, setEntitlements] = useState<UserEntitlements>(() => getEntitlements());
  const [isPricingModalOpen, setIsPricingModalOpen] = useState<boolean>(false);
  const [modalPlanId, setModalPlanId] = useState<EntitlementId>('premium_all');
  const [activeLegalModal, setActiveLegalModal] = useState<LegalModalType>(null);

  // Synchronisation du thème sombre/clair
  useEffect(() => {
    const savedTheme = localStorage.getItem('crescendo_theme');
    if (savedTheme === 'light') {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else {
      setIsDark(true);
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
  }, []);

  const handleToggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      localStorage.setItem('crescendo_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      localStorage.setItem('crescendo_theme', 'light');
    }
  };

  const handleOpenPricingModal = (planId?: string) => {
    if (planId) {
      setModalPlanId(planId as EntitlementId);
    } else {
      setModalPlanId('premium_all');
    }
    setIsPricingModalOpen(true);
  };

  const handleEntitlementsUpdated = (updated: UserEntitlements) => {
    setEntitlements(updated);
    saveEntitlements(updated);
  };

  const handleRestorePurchases = async (code: string) => {
    try {
      const res = await fetch('/api/restore-purchases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recoveryCode: code }),
      });

      const data = await res.json();
      if (data.success && data.restored) {
        const updated: UserEntitlements = {
          ...entitlements,
          premium_all: data.unlockedFeatures.includes('premium_all'),
          unlimited_generator: data.unlockedFeatures.includes('unlimited_generator'),
          system_reducer: data.unlockedFeatures.includes('system_reducer'),
          pro_exports: data.unlockedFeatures.includes('pro_exports'),
          advanced_stats: data.unlockedFeatures.includes('advanced_stats'),
          all_pack: data.unlockedFeatures.includes('all_pack'),
          recoveryCode: code.toUpperCase().trim(),
          unlockedAt: new Date().toISOString(),
        };
        handleEntitlementsUpdated(updated);
        return { success: true, message: data.message || 'Droits restaurés avec succès.' };
      } else {
        return { success: false, message: data.error || 'Code de licence invalide.' };
      }
    } catch {
      // Si hors-ligne, vérifier le format local
      if (code.toUpperCase().trim().startsWith('CRES-')) {
        const updated: UserEntitlements = {
          ...entitlements,
          premium_all: true,
          unlimited_generator: true,
          system_reducer: true,
          pro_exports: true,
          advanced_stats: true,
          all_pack: true,
          recoveryCode: code.toUpperCase().trim(),
        };
        handleEntitlementsUpdated(updated);
        return { success: true, message: 'Licence validée et synchronisée en local.' };
      }
      return { success: false, message: 'Échec de la connexion au serveur de licence.' };
    }
  };

  const hasUnlimitedGenerator = isFeatureUnlocked('unlimited_generator', entitlements);
  const hasSystemReducer = isFeatureUnlocked('system_reducer', entitlements);
  const hasProExports = isFeatureUnlocked('pro_exports', entitlements);
  const hasAdvancedStats = isFeatureUnlocked('advanced_stats', entitlements);

  return (
    <div className="min-h-screen flex flex-col bg-[#090a0f] text-neutral-100 selection:bg-blue-600 selection:text-white">
      {/* 1. Bandeau de jeu responsable */}
      <ResponsibleGamingBanner />

      {/* 2. Navigation bar */}
      <Navbar
        currentTab={currentTab}
        onTabChange={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenPricing={handleOpenPricingModal}
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
        isPremium={entitlements.premium_all}
      />

      {/* 3. Main Content based on active tab */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <>
            <HeroSection
              onNavigate={(tab) => {
                setCurrentTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenPricing={() => handleOpenPricingModal('premium_all')}
            />

            {/* In-page direct tool sections for quick access */}
            <div className="border-t border-neutral-800/80">
              <GeneratorView
                hasUnlimited={hasUnlimitedGenerator}
                hasProExports={hasProExports}
                onOpenPricing={handleOpenPricingModal}
              />
            </div>

            <div className="border-t border-neutral-800/80">
              <SystemReducer
                isUnlocked={hasSystemReducer}
                hasProExports={hasProExports}
                onOpenPricing={handleOpenPricingModal}
              />
            </div>

            <div className="border-t border-neutral-800/80">
              <BudgetSimulator />
            </div>

            <div className="border-t border-neutral-800/80">
              <PricingSection
                entitlements={entitlements}
                onSelectPlan={(planId) => handleOpenPricingModal(planId)}
                onRestorePurchases={handleRestorePurchases}
              />
            </div>
          </>
        )}

        {currentTab === 'generator' && (
          <GeneratorView
            hasUnlimited={hasUnlimitedGenerator}
            hasProExports={hasProExports}
            onOpenPricing={handleOpenPricingModal}
          />
        )}

        {currentTab === 'reducer' && (
          <SystemReducer
            isUnlocked={hasSystemReducer}
            hasProExports={hasProExports}
            onOpenPricing={handleOpenPricingModal}
          />
        )}

        {currentTab === 'statistics' && (
          <StatisticsView
            hasAdvancedStats={hasAdvancedStats}
            onOpenPricing={handleOpenPricingModal}
          />
        )}

        {currentTab === 'budget' && <BudgetSimulator />}

        {currentTab === 'pricing' && (
          <PricingSection
            entitlements={entitlements}
            onSelectPlan={(planId) => handleOpenPricingModal(planId)}
            onRestorePurchases={handleRestorePurchases}
          />
        )}
      </main>

      {/* 4. Footer */}
      <Footer onOpenLegal={(type) => setActiveLegalModal(type)} />

      {/* 5. Modals */}
      <PricingModal
        isOpen={isPricingModalOpen}
        onClose={() => setIsPricingModalOpen(false)}
        selectedPlanId={modalPlanId}
        entitlements={entitlements}
        onEntitlementsUpdated={handleEntitlementsUpdated}
      />

      <LegalModals
        activeModal={activeLegalModal}
        onClose={() => setActiveLegalModal(null)}
      />
    </div>
  );
}
