import React from 'react';
import { Sun, Moon, Sparkles } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  onOpenPricing: (planId?: string) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  isPremium: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onTabChange,
  onOpenPricing,
  isDark,
  onToggleTheme,
  isPremium,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-200/90 dark:border-neutral-800/80 bg-white/90 dark:bg-neutral-950/80 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onTabChange('home')}
          className="flex items-center gap-2 text-left text-slate-900 dark:text-neutral-100 font-bold tracking-tight text-lg whitespace-nowrap shrink-0 hover:text-blue-600 dark:hover:text-white transition-colors cursor-pointer"
        >
          <span className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white text-sm font-black shadow-sm">
            M
          </span>
          <span>Mon Crescendo</span>
        </button>

        {/* Zone 2: Clean navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <button
            onClick={() => onTabChange('generator')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentTab === 'generator'
                ? 'text-blue-600 dark:text-white font-semibold border-b-2 border-blue-500 pb-0.5'
                : 'text-slate-600 hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white'
            }`}
          >
            Générateur
          </button>
          <button
            onClick={() => onTabChange('reducer')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentTab === 'reducer'
                ? 'text-blue-600 dark:text-white font-semibold border-b-2 border-blue-500 pb-0.5'
                : 'text-slate-600 hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white'
            }`}
          >
            Réducteur
          </button>
          <button
            onClick={() => onTabChange('statistics')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentTab === 'statistics'
                ? 'text-blue-600 dark:text-white font-semibold border-b-2 border-blue-500 pb-0.5'
                : 'text-slate-600 hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white'
            }`}
          >
            Statistiques
          </button>
          <button
            onClick={() => onTabChange('budget')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentTab === 'budget'
                ? 'text-blue-600 dark:text-white font-semibold border-b-2 border-blue-500 pb-0.5'
                : 'text-slate-600 hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white'
            }`}
          >
            Simulateur Budget
          </button>
          <button
            onClick={() => onTabChange('pricing')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentTab === 'pricing'
                ? 'text-blue-600 dark:text-white font-semibold border-b-2 border-blue-500 pb-0.5'
                : 'text-slate-600 hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white'
            }`}
          >
            Offres & Tarifs
          </button>
        </nav>

        {/* Zone 3: 1 primary action + theme toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onToggleTheme}
            aria-label={isDark ? 'Passer en mode clair' : 'Passer en mode sombre'}
            title={isDark ? 'Passer en mode clair' : 'Passer en mode sombre'}
            className="p-2 text-slate-600 hover:text-slate-900 dark:text-neutral-400 dark:hover:text-neutral-100 rounded-lg hover:bg-slate-100 dark:hover:bg-neutral-800/60 transition-colors cursor-pointer"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
          </button>

          <button
            onClick={() => onOpenPricing()}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 shadow-sm cursor-pointer ${
              isPremium
                ? 'bg-slate-100 dark:bg-neutral-800 text-blue-600 dark:text-blue-400 border border-blue-500/30 hover:bg-slate-200 dark:hover:bg-neutral-700'
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500 shadow-blue-500/20'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isPremium ? 'Premium Actif' : 'Débloquer Premium'}</span>
          </button>
        </div>
      </div>

      {/* Mobile nav bar */}
      <div className="flex md:hidden items-center justify-around border-t border-slate-200/90 dark:border-neutral-800/60 px-2 py-2 text-xs overflow-x-auto bg-slate-50/90 dark:bg-neutral-950/90">
        <button
          onClick={() => onTabChange('generator')}
          className={`px-2.5 py-1 rounded whitespace-nowrap cursor-pointer ${
            currentTab === 'generator'
              ? 'bg-blue-600 text-white font-semibold'
              : 'text-slate-600 dark:text-neutral-400'
          }`}
        >
          Générateur
        </button>
        <button
          onClick={() => onTabChange('reducer')}
          className={`px-2.5 py-1 rounded whitespace-nowrap cursor-pointer ${
            currentTab === 'reducer'
              ? 'bg-blue-600 text-white font-semibold'
              : 'text-slate-600 dark:text-neutral-400'
          }`}
        >
          Réducteur
        </button>
        <button
          onClick={() => onTabChange('statistics')}
          className={`px-2.5 py-1 rounded whitespace-nowrap cursor-pointer ${
            currentTab === 'statistics'
              ? 'bg-blue-600 text-white font-semibold'
              : 'text-slate-600 dark:text-neutral-400'
          }`}
        >
          Statistiques
        </button>
        <button
          onClick={() => onTabChange('budget')}
          className={`px-2.5 py-1 rounded whitespace-nowrap cursor-pointer ${
            currentTab === 'budget'
              ? 'bg-blue-600 text-white font-semibold'
              : 'text-slate-600 dark:text-neutral-400'
          }`}
        >
          Budget
        </button>
        <button
          onClick={() => onTabChange('pricing')}
          className={`px-2.5 py-1 rounded whitespace-nowrap cursor-pointer ${
            currentTab === 'pricing'
              ? 'bg-blue-600 text-white font-semibold'
              : 'text-slate-600 dark:text-neutral-400'
          }`}
        >
          Tarifs
        </button>
      </div>
    </header>
  );
};
