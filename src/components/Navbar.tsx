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
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-neutral-800/80 bg-neutral-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onTabChange('home')}
          className="flex items-center gap-2 text-left text-neutral-100 font-bold tracking-tight text-lg whitespace-nowrap shrink-0 hover:text-white transition-colors"
        >
          <span className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white text-sm font-black shadow-sm">
            M
          </span>
          <span>Mon Crescendo</span>
        </button>

        {/* Zone 2: 4-5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-300">
          <button
            onClick={() => onTabChange('generator')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white ${
              currentTab === 'generator' ? 'text-white font-semibold border-b-2 border-blue-500 pb-0.5' : 'text-neutral-400'
            }`}
          >
            Générateur
          </button>
          <button
            onClick={() => onTabChange('reducer')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white ${
              currentTab === 'reducer' ? 'text-white font-semibold border-b-2 border-blue-500 pb-0.5' : 'text-neutral-400'
            }`}
          >
            Réducteur
          </button>
          <button
            onClick={() => onTabChange('statistics')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white ${
              currentTab === 'statistics' ? 'text-white font-semibold border-b-2 border-blue-500 pb-0.5' : 'text-neutral-400'
            }`}
          >
            Statistiques
          </button>
          <button
            onClick={() => onTabChange('budget')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white ${
              currentTab === 'budget' ? 'text-white font-semibold border-b-2 border-blue-500 pb-0.5' : 'text-neutral-400'
            }`}
          >
            Simulateur Budget
          </button>
          <button
            onClick={() => onTabChange('pricing')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white ${
              currentTab === 'pricing' ? 'text-white font-semibold border-b-2 border-blue-500 pb-0.5' : 'text-neutral-400'
            }`}
          >
            Offres & Tarifs
          </button>
        </nav>

        {/* Zone 3: 1 primary action + theme toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onToggleTheme}
            aria-label="Changer de thème"
            className="p-2 text-neutral-400 hover:text-neutral-100 rounded-lg hover:bg-neutral-800/60 transition-colors"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={() => onOpenPricing()}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 shadow-sm ${
              isPremium
                ? 'bg-neutral-800 text-blue-400 border border-blue-500/30 hover:bg-neutral-700'
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500 shadow-blue-500/20'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isPremium ? 'Premium Actif' : 'Débloquer Premium'}</span>
          </button>
        </div>
      </div>

      {/* Mobile nav bar */}
      <div className="flex md:hidden items-center justify-around border-t border-neutral-800/60 px-2 py-2 text-xs text-neutral-300 overflow-x-auto">
        <button
          onClick={() => onTabChange('generator')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${currentTab === 'generator' ? 'bg-neutral-800 text-white font-semibold' : 'text-neutral-400'}`}
        >
          Générateur
        </button>
        <button
          onClick={() => onTabChange('reducer')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${currentTab === 'reducer' ? 'bg-neutral-800 text-white font-semibold' : 'text-neutral-400'}`}
        >
          Réducteur
        </button>
        <button
          onClick={() => onTabChange('statistics')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${currentTab === 'statistics' ? 'bg-neutral-800 text-white font-semibold' : 'text-neutral-400'}`}
        >
          Statistiques
        </button>
        <button
          onClick={() => onTabChange('budget')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${currentTab === 'budget' ? 'bg-neutral-800 text-white font-semibold' : 'text-neutral-400'}`}
        >
          Budget
        </button>
        <button
          onClick={() => onTabChange('pricing')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${currentTab === 'pricing' ? 'bg-neutral-800 text-white font-semibold' : 'text-neutral-400'}`}
        >
          Tarifs
        </button>
      </div>
    </header>
  );
};
