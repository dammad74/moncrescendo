import React from 'react';
import { ShieldCheck, Phone, Heart } from 'lucide-react';
import { LegalModalType } from './LegalModals';

interface FooterProps {
  onOpenLegal: (type: LegalModalType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegal }) => {
  return (
    <footer className="border-t border-neutral-800/80 bg-neutral-950/80 text-neutral-400 text-xs py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-neutral-100 font-bold text-sm tracking-tight mb-1">
              <span className="w-5 h-5 rounded-md bg-blue-600 flex items-center justify-center text-white text-[11px] font-black">
                M
              </span>
              <span>Mon Crescendo</span>
            </div>
            <p className="text-xs text-neutral-400 max-w-md">
              Outil combinatoire indépendant d&apos;optimisation et de gestion budgétaire pour les grilles du jeu Crescendo FDJ.
            </p>
          </div>

          {/* Legal and policy links */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-neutral-300">
            <button
              onClick={() => onOpenLegal('faq')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              F.A.Q & Mathématiques
            </button>
            <button
              onClick={() => onOpenLegal('mentions')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Mentions Légales
            </button>
            <button
              onClick={() => onOpenLegal('cgv')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              CGV & Tarifs
            </button>
            <button
              onClick={() => onOpenLegal('privacy')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Confidentialité RGPD
            </button>
            <button
              onClick={() => onOpenLegal('refund')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Remboursements
            </button>
          </div>
        </div>

        {/* Responsible gambling banner row */}
        <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-neutral-300 text-[11px]">
              Famille, amis, finances : ne laissez pas le jeu prendre le dessus.
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <a
              href="tel:0974751313"
              className="text-neutral-200 hover:text-white font-bold font-mono text-xs"
            >
              09 74 75 13 13 (Appel non surtaxé)
            </a>
          </div>
        </div>

        {/* Copyright notice */}
        <div className="pt-4 border-t border-neutral-800/60 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-neutral-400">
          <span>© {new Date().getFullYear()} Mon Crescendo. Tous droits réservés. Service indépendant.</span>
          <span>Fait pour les joueurs exigeants et soucieux de leur budget</span>
        </div>
      </div>
    </footer>
  );
};
