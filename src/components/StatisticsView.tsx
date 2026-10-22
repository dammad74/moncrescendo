import React, { useState, useMemo } from 'react';
import {
  BarChart3,
  TrendingUp,
  AlertCircle,
  Lock,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { CrescendoLetter, CRESCENDO_LETTERS } from '../types/crescendo';
import { SAMPLE_HISTORICAL_DRAWS, computeStatistics } from '../services/statistics';

interface StatisticsViewProps {
  hasAdvancedStats: boolean;
  onOpenPricing: (planId?: string) => void;
}

export const StatisticsView: React.FC<StatisticsViewProps> = ({
  hasAdvancedStats,
  onOpenPricing,
}) => {
  const [period, setPeriod] = useState<'30' | '100' | 'all'>('30');
  const [sortBy, setSortBy] = useState<'number' | 'frequency'>('frequency');

  const filteredDraws = useMemo(() => {
    if (period === '30') return SAMPLE_HISTORICAL_DRAWS.slice(0, 15);
    if (period === '100') return SAMPLE_HISTORICAL_DRAWS.slice(0, 30);
    return SAMPLE_HISTORICAL_DRAWS;
  }, [period]);

  const stats = useMemo(() => {
    return computeStatistics(filteredDraws);
  }, [filteredDraws]);

  // Numéros triés pour le graphique
  const numbersData = useMemo(() => {
    const list = Object.entries(stats.numberFrequencies).map(([n, freq]) => {
      const num = Number(n);
      return {
        number: num,
        count: freq,
        percent: filteredDraws.length > 0 ? Math.round((freq / filteredDraws.length) * 100) : 0,
      };
    });

    if (sortBy === 'frequency') {
      return list.sort((a, b) => b.count - a.count);
    }
    return list.sort((a, b) => a.number - b.number);
  }, [stats, filteredDraws, sortBy]);

  const maxFreq = Math.max(...numbersData.map((d) => d.count), 1);

  return (
    <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs text-neutral-400 mb-2 font-medium">
          <span>Données & Historique</span>
          <span aria-hidden="true">·</span>
          <span>Analyse Descriptive</span>
          <span aria-hidden="true">·</span>
          <span>Tirages Indépendants</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-100 tracking-tight">
              Analyse Statistique & Fréquences
            </h2>
            <p className="text-sm text-neutral-400 mt-1 max-w-2xl">
              Distribution des 25 numéros et des 6 lettres Crescendo. Analyse observationnelle des tirages répertoriés.
            </p>
          </div>

          {/* Filter Period */}
          <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 p-1 rounded-lg text-xs font-medium self-start sm:self-auto">
            <Calendar className="w-3.5 h-3.5 text-neutral-400 ml-2" />
            <button
              onClick={() => setPeriod('30')}
              className={`px-2.5 py-1 rounded cursor-pointer ${
                period === '30' ? 'bg-blue-600 text-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              15 Tirages
            </button>
            <button
              onClick={() => setPeriod('100')}
              className={`px-2.5 py-1 rounded cursor-pointer ${
                period === '100' ? 'bg-blue-600 text-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              30 Tirages
            </button>
            <button
              onClick={() => {
                if (!hasAdvancedStats) {
                  onOpenPricing('advanced_stats');
                  return;
                }
                setPeriod('all');
              }}
              className={`px-2.5 py-1 rounded cursor-pointer flex items-center gap-1 ${
                period === 'all' ? 'bg-blue-600 text-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Historique complet {!hasAdvancedStats && <Lock className="w-3 h-3 text-amber-400" />}
            </button>
          </div>
        </div>
      </div>

      {/* Required Stochastic Disclaimer Banner */}
      <div className="mb-8 p-4 rounded-xl bg-neutral-900/90 border border-neutral-800 text-xs text-neutral-300">
        <div className="flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-neutral-100 font-semibold block mb-0.5">
              Rappel fondamental sur les probabilités de tirage :
            </strong>
            <p className="leading-relaxed">
              Les tirages de la Française des Jeux sont stochastiquement indépendants : chaque boule a rigoureusement la même probabilité de sortir à chaque tirage, sans mémoire des tirages antérieurs. Les fréquences historiques présentées ci-dessous ont une vocation d&apos;observation empirique et ne constituent en aucun cas une prédiction des résultats futurs.
            </p>
          </div>
        </div>
      </div>

      {/* Top Cards Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="glass-panel rounded-xl p-4 border border-neutral-800">
          <span className="text-[11px] text-neutral-400 uppercase font-semibold tracking-wider block mb-1">
            Numéros les plus sortis
          </span>
          <div className="flex items-center gap-1.5 flex-wrap mt-2">
            {stats.mostFrequentNumbers.slice(0, 4).map((item) => (
              <span
                key={item.number}
                className="w-7 h-7 rounded-full bg-blue-600/30 border border-blue-500/40 text-blue-300 text-xs font-mono font-bold flex items-center justify-center"
              >
                {item.number}
              </span>
            ))}
          </div>
        </div>

        <div className="glass-panel rounded-xl p-4 border border-neutral-800">
          <span className="text-[11px] text-neutral-400 uppercase font-semibold tracking-wider block mb-1">
            Numéros en écart
          </span>
          <div className="flex items-center gap-1.5 flex-wrap mt-2">
            {stats.leastFrequentNumbers.slice(0, 4).map((item) => (
              <span
                key={item.number}
                className="w-7 h-7 rounded-full bg-neutral-800 border border-neutral-700 text-neutral-300 text-xs font-mono font-bold flex items-center justify-center"
              >
                {item.number}
              </span>
            ))}
          </div>
        </div>

        <div className="glass-panel rounded-xl p-4 border border-neutral-800">
          <span className="text-[11px] text-neutral-400 uppercase font-semibold tracking-wider block mb-1">
            Équilibre Pairs / Impairs
          </span>
          <div className="text-base font-bold font-mono text-neutral-100 mt-2">
            {stats.evenOddRatio.evenPercent}% P / {(100 - stats.evenOddRatio.evenPercent).toFixed(1)}% I
          </div>
          <span className="text-[11px] text-neutral-400 block mt-0.5">Normale théorique ~ 50%</span>
        </div>

        <div className="glass-panel rounded-xl p-4 border border-neutral-800">
          <span className="text-[11px] text-neutral-400 uppercase font-semibold tracking-wider block mb-1">
            Équilibre Hauts / Bas (13-25)
          </span>
          <div className="text-base font-bold font-mono text-neutral-100 mt-2">
            {stats.highLowRatio.highPercent}% H / {(100 - stats.highLowRatio.highPercent).toFixed(1)}% B
          </div>
          <span className="text-[11px] text-neutral-400 block mt-0.5">Normale théorique ~ 52%</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Numbers Histogram Chart */}
        <div className="lg:col-span-8 glass-panel rounded-2xl p-6 border border-neutral-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
            <span className="text-xs font-bold text-neutral-200 uppercase tracking-wider flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-blue-400" />
              Fréquence des Numéros (1 à 25)
            </span>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-neutral-400">Trier par :</span>
              <button
                onClick={() => setSortBy('frequency')}
                className={`px-2 py-0.5 rounded cursor-pointer ${
                  sortBy === 'frequency' ? 'bg-neutral-800 text-white font-medium' : 'text-neutral-400'
                }`}
              >
                Fréquence
              </button>
              <button
                onClick={() => setSortBy('number')}
                className={`px-2 py-0.5 rounded cursor-pointer ${
                  sortBy === 'number' ? 'bg-neutral-800 text-white font-medium' : 'text-neutral-400'
                }`}
              >
                Numéro (1-25)
              </button>
            </div>
          </div>

          {/* Bar Chart list */}
          <div className="space-y-2 pt-2">
            {numbersData.map((d) => {
              const barWidth = Math.max(8, (d.count / maxFreq) * 100);
              return (
                <div key={d.number} className="flex items-center gap-3 text-xs">
                  <span className="w-6 text-right font-mono font-bold text-neutral-300 shrink-0">
                    {d.number}
                  </span>

                  <div className="flex-1 bg-neutral-900 rounded-md h-6 overflow-hidden flex items-center p-1 border border-neutral-800/60">
                    <div
                      style={{ width: `${barWidth}%` }}
                      className="h-full rounded bg-gradient-to-r from-blue-600 to-indigo-500 transition-all duration-300 flex items-center justify-end pr-2"
                    >
                      <span className="text-[10px] text-white font-mono font-bold leading-none">
                        {d.count}
                      </span>
                    </div>
                  </div>

                  <span className="w-12 text-right font-mono text-[11px] text-neutral-400 shrink-0">
                    {d.percent}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Letter Frequencies & Observed Pairs */}
        <div className="lg:col-span-4 space-y-6">
          {/* Letters Frequencies (S, A, M, E, D, I) */}
          <div className="glass-panel rounded-2xl p-6 border border-neutral-800 space-y-4">
            <span className="text-xs font-bold text-neutral-200 uppercase tracking-wider block pb-2 border-b border-neutral-800">
              Fréquence des Lettres Crescendo
            </span>

            <div className="grid grid-cols-2 gap-3">
              {CRESCENDO_LETTERS.map((letter) => {
                const count = stats.letterFrequencies[letter] || 0;
                const total = filteredDraws.length || 1;
                const pct = Math.round((count / total) * 100);

                return (
                  <div
                    key={letter}
                    className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-purple-600/30 border border-purple-500/40 text-purple-300 font-mono font-black text-sm flex items-center justify-center">
                        {letter}
                      </span>
                      <span className="text-xs text-neutral-400 font-medium">{count} sorties</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-neutral-200">{pct}%</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top Observed Pairs */}
          <div className="glass-panel rounded-2xl p-6 border border-neutral-800 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
              <span className="text-xs font-bold text-neutral-200 uppercase tracking-wider flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                Paires les plus observées
              </span>
              {!hasAdvancedStats && (
                <span className="text-[10px] text-amber-400 font-medium flex items-center gap-1">
                  <Lock className="w-3 h-3" /> Pro
                </span>
              )}
            </div>

            <div className="space-y-2">
              {stats.pairOccurrences.slice(0, 6).map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 rounded-lg bg-neutral-900/50 border border-neutral-800/80 text-xs"
                >
                  <div className="flex items-center gap-2 font-mono">
                    <span className="w-6 h-6 rounded-full bg-blue-600/20 text-blue-300 font-bold flex items-center justify-center text-[11px]">
                      {item.pair[0]}
                    </span>
                    <span className="text-neutral-400">+</span>
                    <span className="w-6 h-6 rounded-full bg-blue-600/20 text-blue-300 font-bold flex items-center justify-center text-[11px]">
                      {item.pair[1]}
                    </span>
                  </div>
                  <span className="font-mono text-neutral-300 text-xs">
                    {item.count} fois ({Math.round((item.count / filteredDraws.length) * 100)}%)
                  </span>
                </div>
              ))}
            </div>

            {!hasAdvancedStats && (
              <button
                onClick={() => onOpenPricing('advanced_stats')}
                className="w-full mt-2 py-2 px-3 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>Débloquer matrice complète (1,99 €)</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
