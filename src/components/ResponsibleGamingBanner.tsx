import React from 'react';
import { AlertCircle, Phone } from 'lucide-react';

export const ResponsibleGamingBanner: React.FC = () => {
  return (
    <div className="bg-amber-50 dark:bg-slate-950/90 border-b border-amber-200/80 dark:border-neutral-800 text-xs py-2 px-4 text-amber-950 dark:text-neutral-300 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-center sm:text-left">
          <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
          <span>
            <strong className="text-amber-900 dark:text-neutral-100 font-semibold">Avertissement :</strong> Les tirages Crescendo sont aléatoires et indépendants. Aucun système ne garantit un gain. Mon Crescendo est un outil d&apos;optimisation combinatoire et budgétaire, non de prédiction.
          </span>
        </div>
        <div className="flex items-center gap-3 shrink-0 text-amber-800 dark:text-neutral-400">
          <span className="flex items-center gap-1.5 font-medium text-amber-700 dark:text-amber-300">
            <Phone className="w-3.5 h-3.5" />
            09 74 75 13 13
          </span>
          <span className="text-[11px] text-amber-700/80 dark:text-neutral-400">Joueurs Info Service (non surtaxé)</span>
        </div>
      </div>
    </div>
  );
};
