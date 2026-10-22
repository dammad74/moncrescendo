import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Cpu, Sliders } from 'lucide-react';
import { CRESCENDO_LETTERS, CrescendoLetter } from '../types/crescendo';

interface HeroSectionProps {
  onNavigate: (tab: string) => void;
  onOpenPricing: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate, onOpenPricing }) => {
  const [activeNumber, setActiveNumber] = useState<number>(7);
  const [activeLetter, setActiveLetter] = useState<CrescendoLetter>('S');
  const [previewBalls, setPreviewBalls] = useState<number[]>([2, 4, 7, 9, 11, 14, 18, 20, 22, 25]);

  const handleShufflePreview = () => {
    const all = Array.from({ length: 25 }, (_, i) => i + 1);
    const shuffled = all.sort(() => Math.random() - 0.5).slice(0, 10).sort((a, b) => a - b);
    setPreviewBalls(shuffled);
    setActiveNumber(shuffled[Math.floor(Math.random() * shuffled.length)]);
    setActiveLetter(CRESCENDO_LETTERS[Math.floor(Math.random() * CRESCENDO_LETTERS.length)]);
  };

  return (
    <section className="relative pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden border-b border-neutral-800/60">
      {/* Background ambient gradient */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-blue-600/15 via-indigo-600/10 to-violet-600/15 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Context metadata - unboxed per zero-pill rule */}
            <div className="flex items-center gap-2 text-xs text-neutral-400 mb-4 font-medium tracking-wide">
              <span className="text-blue-400 font-semibold">Crescendo FDJ</span>
              <span aria-hidden="true">·</span>
              <span>10 Numéros parmi 25 + Lettre SAMEDI</span>
              <span aria-hidden="true">·</span>
              <span>7 Tirages le Samedi · Jusqu&apos;à 700 000 €</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-neutral-100 tracking-tight leading-[1.12] mb-6 [text-wrap:balance]">
              Préparez vos grilles <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-violet-400 bg-clip-text text-transparent">Crescendo</span> intelligemment
            </h1>

            <p className="text-base sm:text-lg text-neutral-300 font-normal leading-relaxed mb-8 max-w-2xl">
              Générez, réduisez et analysez vos combinaisons en quelques secondes. Maîtrisez votre couverture mathématique et votre budget sans jamais surpayer vos grilles.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 mb-10 w-full sm:w-auto">
              <button
                onClick={() => onNavigate('generator')}
                className="flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-lg shadow-blue-600/25 transition-all whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Générer une grille</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('reducer')}
                className="flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-neutral-200 bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-700/80 rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Cpu className="w-4 h-4 text-indigo-400" />
                <span>Réduire mes combinaisons</span>
              </button>

              <button
                onClick={onOpenPricing}
                className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-neutral-300 hover:text-white transition-colors whitespace-nowrap shrink-0"
              >
                <Sparkles className="w-4 h-4 text-violet-400" />
                <span>Découvrir Premium</span>
              </button>
            </div>

            {/* Strict Regulatory Clarification Notice */}
            <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 text-xs text-neutral-300 max-w-2xl">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong className="text-neutral-100 font-semibold">Principe de transparence :</strong> Les tirages Crescendo sont rigoureusement aléatoires. Aucun système ne peut garantir un gain financier. Mon Crescendo optimise la dispersion mathématique de vos tickets pour rationaliser votre mise.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Visualizer with Real 3D Ball Rendering & Micro-interactions */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full relative glass-panel rounded-2xl p-6 border border-neutral-800 shadow-2xl overflow-hidden">
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-5 border border-neutral-800/80">
                <img
                  src="/src/assets/images/crescendo_hero_visual_1792584659146.jpg"
                  alt="Visualisation 3D sphères Crescendo"
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/30" />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-neutral-200">
                  <span className="font-medium">Modélisation Crescendo FDJ</span>
                  <button
                    onClick={handleShufflePreview}
                    className="text-xs text-blue-400 hover:text-blue-300 underline font-medium cursor-pointer"
                  >
                    Mélanger l&apos;échantillon
                  </button>
                </div>
              </div>

              {/* Live Interactive Spheres Bar */}
              <div className="mb-4">
                <div className="text-xs text-neutral-400 font-medium mb-2.5 flex items-center justify-between">
                  <span>Grille officielle (10 numéros + Lettre SAMEDI)</span>
                  <span className="font-mono text-neutral-400">Somme: {previewBalls.reduce((a, b) => a + b, 0)}</span>
                </div>

                <div className="flex items-center justify-center gap-2 sm:gap-2.5 flex-wrap py-2">
                  {previewBalls.map((num) => (
                    <button
                      key={num}
                      onClick={() => setActiveNumber(num)}
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold font-mono transition-transform hover:scale-105 cursor-pointer shadow-md ${
                        activeNumber === num
                          ? 'bg-blue-500 text-white ring-2 ring-blue-300 blue-glow'
                          : 'bg-neutral-800 text-neutral-200 border border-neutral-700 hover:bg-neutral-700'
                      }`}
                    >
                      {num}
                    </button>
                  ))}

                  <div className="w-px h-8 bg-neutral-800 mx-1" />

                  {/* Lettre Crescendo */}
                  <button
                    onClick={() => {
                      const nextIdx = (CRESCENDO_LETTERS.indexOf(activeLetter) + 1) % CRESCENDO_LETTERS.length;
                      setActiveLetter(CRESCENDO_LETTERS[nextIdx]);
                    }}
                    title="Cliquer pour changer la lettre"
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center text-sm font-black font-mono shadow-md violet-glow transition-transform hover:scale-105 cursor-pointer"
                  >
                    {activeLetter}
                  </button>
                </div>
              </div>

              {/* Quick stats of the selected sample */}
              <div className="pt-3 border-t border-neutral-800/80 grid grid-cols-3 gap-2 text-center text-xs">
                <div>
                  <span className="text-neutral-400 block text-[11px]">Parité</span>
                  <span className="text-neutral-200 font-semibold font-mono">
                    {previewBalls.filter((n) => n % 2 === 0).length}P / {previewBalls.filter((n) => n % 2 !== 0).length}I
                  </span>
                </div>
                <div>
                  <span className="text-neutral-400 block text-[11px]">Hauts / Bas</span>
                  <span className="text-neutral-200 font-semibold font-mono">
                    {previewBalls.filter((n) => n >= 13).length}H / {previewBalls.filter((n) => n < 13).length}B
                  </span>
                </div>
                <div>
                  <span className="text-neutral-400 block text-[11px]">Lettre tirée</span>
                  <span className="text-purple-400 font-semibold font-mono">{activeLetter}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Proof & KPI Strip below hero split */}
        <div className="mt-14 pt-8 border-t border-neutral-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
          <div>
            <div className="text-2xl font-bold font-mono text-neutral-100 tabular-nums">10 / 25 Numéros</div>
            <p className="text-xs text-neutral-400 mt-1">10 numéros choisis par grille sur le pool de 25</p>
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-neutral-100 tabular-nums">7 Tirages Samedi</div>
            <p className="text-xs text-neutral-400 mt-1">Tirages horaires avec lettres SAMEDI attribuées</p>
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-emerald-400 tabular-nums">Jusqu&apos;à 700 000 €</div>
            <p className="text-xs text-neutral-400 mt-1">Jackpot évolutif de rang 1 + gains fixes autres rangs</p>
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-blue-400 tabular-nums">0 Compte Requis</div>
            <p className="text-xs text-neutral-400 mt-1">Génération immédiate, réduction mathématique & budget</p>
          </div>
        </div>
      </div>
    </section>
  );
};
