import React, { useState, useMemo } from 'react';
import {
  Cpu,
  Layers,
  Copy,
  Check,
  FileDown,
  FileSpreadsheet,
  AlertTriangle,
  Lock,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import {
  CrescendoLetter,
  CRESCENDO_LETTERS,
  DEFAULT_GRID_NUMBERS_COUNT,
  DEFAULT_COST_PER_GRID,
  ReductionConfig,
} from '../types/crescendo';
import { combinationsCount, generateReducedSystem } from '../services/combinatorics';
import { exportToPdf, exportToCsv, copyCombinations } from '../services/export';

interface SystemReducerProps {
  isUnlocked: boolean;
  hasProExports: boolean;
  onOpenPricing: (planId?: string) => void;
}

export const SystemReducer: React.FC<SystemReducerProps> = ({
  isUnlocked,
  hasProExports,
  onOpenPricing,
}) => {
  // Pool de numéros sélectionnés (12 à 25)
  const [selectedPool, setSelectedPool] = useState<number[]>([
    1, 3, 5, 7, 8, 10, 12, 14, 16, 18, 20, 22, 24, 25,
  ]);
  const [targetLetter, setTargetLetter] = useState<CrescendoLetter>('S');
  const [targetCount, setTargetCount] = useState<number>(12);
  const [costPerGrid, setCostPerGrid] = useState<number>(DEFAULT_COST_PER_GRID);

  const [copiedAll, setCopiedAll] = useState<boolean>(false);

  // Toggle numéro dans le pool
  const handleToggleNumber = (num: number) => {
    if (selectedPool.includes(num)) {
      if (selectedPool.length <= 12) {
        return; // Au moins 12 numéros requis pour un système réducteur pertinent
      }
      setSelectedPool((prev) => prev.filter((n) => n !== num));
    } else {
      setSelectedPool((prev) => [...prev, num].sort((a, b) => a - b));
    }
  };

  const handleSelectAll = () => {
    setSelectedPool(Array.from({ length: 25 }, (_, i) => i + 1));
  };

  const handleResetPool = () => {
    setSelectedPool([1, 3, 5, 7, 8, 10, 12, 14, 16, 18, 20, 22, 24, 25]);
  };

  // Calcul combinatoire
  const reductionConfig: ReductionConfig = useMemo(() => {
    return {
      poolNumbers: selectedPool,
      targetLetter,
      gridSize: DEFAULT_GRID_NUMBERS_COUNT,
      targetCombinationsCount: targetCount,
      targetGuarantee: 'pair_optimal',
    };
  }, [selectedPool, targetLetter, targetCount]);

  const reductionResult = useMemo(() => {
    return generateReducedSystem(reductionConfig, costPerGrid);
  }, [reductionConfig, costPerGrid]);

  const totalPossible = combinationsCount(selectedPool.length, DEFAULT_GRID_NUMBERS_COUNT);
  const totalIntegralCost = totalPossible * costPerGrid;

  const handleCopy = async () => {
    if (!isUnlocked) {
      onOpenPricing('system_reducer');
      return;
    }
    await copyCombinations(reductionResult.retainedCombinations);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const handleExportPdf = () => {
    if (!isUnlocked) {
      onOpenPricing('system_reducer');
      return;
    }
    if (!hasProExports) {
      onOpenPricing('pro_exports');
      return;
    }
    exportToPdf(reductionResult.retainedCombinations, `Système Réduit (${selectedPool.length} numéros)`);
  };

  const handleExportCsv = () => {
    if (!isUnlocked) {
      onOpenPricing('system_reducer');
      return;
    }
    if (!hasProExports) {
      onOpenPricing('pro_exports');
      return;
    }
    exportToCsv(reductionResult.retainedCombinations, `crescendo-reducteur-${selectedPool.length}nums.csv`);
  };

  // En mode verrouillé, n'afficher que les 3 premières grilles
  const displayedGrids = isUnlocked
    ? reductionResult.retainedCombinations
    : reductionResult.retainedCombinations.slice(0, 3);

  return (
    <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Title */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs text-neutral-400 mb-2 font-medium">
          <span>Outil Mathématique</span>
          <span aria-hidden="true">·</span>
          <span>Algorithme de Couverture Gloutonne</span>
          <span aria-hidden="true">·</span>
          <span>Optimisation Budgétaire</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-100 tracking-tight">
          Réducteur Mathématique de Grilles (10 numéros)
        </h2>
        <p className="text-sm text-neutral-400 mt-1 max-w-3xl">
          Sélectionnez entre 12 et 25 numéros. Notre moteur construit des grilles officielles de 10 numéros en éliminant les redondances de sous-ensembles, divisant drastiquement le coût par rapport au système intégral pour les tirages horaires du samedi.
        </p>
      </div>

      {/* Paywall Banner if locked */}
      {!isUnlocked && (
        <div className="mb-6 p-4 rounded-xl bg-purple-950/40 border border-purple-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-purple-600/30 border border-purple-500/40 flex items-center justify-center shrink-0">
              <Lock className="w-4 h-4 text-purple-300" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-neutral-100">Outil Avancé : Réducteur de Systèmes</h4>
              <p className="text-xs text-neutral-400 mt-0.5">
                Débloquez l&apos;intégralité des {reductionResult.retainedCombinations.length} grilles calculées, l&apos;algorithme complet et l&apos;export illimité pour seulement 2,99 € (sans abonnement).
              </p>
            </div>
          </div>

          <button
            onClick={() => onOpenPricing('system_reducer')}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs rounded-lg transition-all shadow-md shrink-0 cursor-pointer"
          >
            Débloquer à 2,99 €
          </button>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Configuration Controls */}
        <div className="lg:col-span-5 glass-panel rounded-2xl p-6 border border-neutral-800 space-y-6">
          {/* Pool Selection */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-neutral-200">
                Sélection du Pool ({selectedPool.length} numéros choisis)
              </label>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSelectAll}
                  className="text-[11px] text-blue-400 hover:text-blue-300 cursor-pointer"
                >
                  Tous (25)
                </button>
                <span className="text-neutral-400">·</span>
                <button
                  onClick={handleResetPool}
                  className="text-[11px] text-neutral-400 hover:text-neutral-200 flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  Défaut (14)
                </button>
              </div>
            </div>
            <p className="text-[11px] text-neutral-400 mb-3">
              Choisissez entre 12 et 25 numéros que vous souhaitez couvrir.
            </p>

            <div className="grid grid-cols-5 gap-2 sm:gap-2.5">
              {Array.from({ length: 25 }, (_, i) => i + 1).map((num) => {
                const isSelected = selectedPool.includes(num);
                return (
                  <button
                    key={num}
                    onClick={() => handleToggleNumber(num)}
                    className={`h-10 rounded-lg flex items-center justify-center font-mono font-bold text-xs sm:text-sm border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-600 text-white border-blue-400 shadow-sm shadow-blue-500/30'
                        : 'bg-neutral-800/60 text-neutral-400 border-neutral-800 hover:bg-neutral-700'
                    }`}
                  >
                    {num}
                  </button>
                );
              })}
            </div>
            {selectedPool.length < 12 && (
              <p className="text-[11px] text-amber-400 mt-2">
                Sélectionnez au moins 12 numéros pour constituer un système réducteur.
              </p>
            )}
          </div>

          {/* Letter Selection */}
          <div>
            <label className="text-xs font-semibold text-neutral-200 block mb-2">
              Lettre Crescendo associée (SAMEDI)
            </label>
            <div className="grid grid-cols-6 gap-2">
              {CRESCENDO_LETTERS.map((letter) => (
                <button
                  key={letter}
                  onClick={() => setTargetLetter(letter)}
                  className={`h-10 rounded-lg font-mono font-bold text-sm border transition-all cursor-pointer ${
                    targetLetter === letter
                      ? 'bg-purple-600 text-white border-purple-400 shadow-sm shadow-purple-500/30'
                      : 'bg-neutral-800/60 text-neutral-400 border-neutral-800 hover:bg-neutral-700'
                  }`}
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>

          {/* Number of Desired Reduced Combinations */}
          <div className="space-y-4 pt-2 border-t border-neutral-800/80">
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-neutral-200 mb-1.5">
                <span>Objectif de grilles retenues (budget cible)</span>
                <span className="font-mono text-purple-400 font-bold">{targetCount} grilles</span>
              </div>
              <input
                type="range"
                min={4}
                max={30}
                step={2}
                value={targetCount}
                onChange={(e) => setTargetCount(Number(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-neutral-400 mt-1">
                <span>4 grilles ({4 * costPerGrid} €)</span>
                <span>30 grilles ({30 * costPerGrid} €)</span>
              </div>
            </div>

            {/* Configurable Unit Cost */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-neutral-200 mb-1.5">
                <span>Tarif officiel unitaire par grille</span>
                <span className="font-mono text-neutral-300 font-bold">{costPerGrid.toFixed(2)} €</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[1.0, 2.0, 3.0].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => setCostPerGrid(rate)}
                    className={`py-1.5 px-2 rounded-lg text-xs font-mono font-medium border cursor-pointer ${
                      costPerGrid === rate
                        ? 'bg-blue-600 text-white border-blue-500'
                        : 'bg-neutral-800 text-neutral-400 border-neutral-700 hover:text-white'
                    }`}
                  >
                    {rate.toFixed(2)} €
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Mesh preview illustration */}
          <div className="rounded-xl overflow-hidden border border-neutral-800">
            <img
              src="/src/assets/images/system_reduction_mesh_1792584673327.jpg"
              alt="Maillage combinatoire du réducteur"
              className="w-full h-32 object-cover object-center"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Right Column: Mathematical Analysis & Retained Grids */}
        <div className="lg:col-span-7 space-y-6">
          {/* Key Metrics Comparison Bar */}
          <div className="glass-panel rounded-2xl p-5 border border-neutral-800">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-800">
              <span className="text-xs font-bold text-neutral-200 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-blue-400" />
                Bilan Comparatif : Système Intégral vs Système Réduit
              </span>
              <span className="text-xs font-mono text-emerald-400 font-bold">
                -{reductionResult.reductionPercentage.toFixed(1)}% d&apos;économie
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <span className="text-[11px] text-neutral-400 block">Système Intégral</span>
                <span className="text-lg font-bold font-mono text-neutral-100 tabular-nums">
                  {totalPossible.toLocaleString('fr-FR')}
                </span>
                <span className="text-[11px] text-neutral-400 block mt-0.5">
                  Coût : {totalIntegralCost.toLocaleString('fr-FR', { minimumFractionDigits: 0 })} €
                </span>
              </div>

              <div>
                <span className="text-[11px] text-neutral-400 block">Grilles Retenues</span>
                <span className="text-lg font-bold font-mono text-purple-400 tabular-nums">
                  {reductionResult.retainedCombinations.length}
                </span>
                <span className="text-[11px] text-neutral-400 block mt-0.5">
                  Coût : {reductionResult.retainedCost.toFixed(2)} €
                </span>
              </div>

              <div>
                <span className="text-[11px] text-neutral-400 block">Couverture Paires</span>
                <span className="text-lg font-bold font-mono text-blue-400 tabular-nums">
                  {reductionResult.pairCoveragePercentage}%
                </span>
                <span className="text-[11px] text-neutral-400 block mt-0.5">des 2-tuples du pool</span>
              </div>

              <div>
                <span className="text-[11px] text-neutral-400 block">Score Global</span>
                <span className="text-lg font-bold font-mono text-emerald-400 tabular-nums">
                  {reductionResult.coverageScore}/100
                </span>
                <span className="text-[11px] text-neutral-400 block mt-0.5">Efficacité couverture</span>
              </div>
            </div>
          </div>

          {/* Mathematical Pedagogical Note */}
          <div className="p-4 rounded-xl bg-neutral-900/90 border border-neutral-800 text-xs text-neutral-300 space-y-2">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-neutral-100 font-semibold block mb-1">
                  Définition stricte de la couverture mathématique :
                </strong>
                <p className="leading-relaxed">
                  {reductionResult.guaranteeText}
                </p>
                <p className="text-neutral-400 mt-1 leading-relaxed">
                  <span className="text-amber-300 font-medium">Important :</span> La réduction n&apos;augmente en aucun cas vos chances absolues de gain au tirage. Elle permet uniquement de jouer un large panel de numéros ({selectedPool.length} numéros) pour une fraction du coût d&apos;un système complet, en acceptant une couverture partielle ciblée.
                </p>
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 glass-panel rounded-xl border border-neutral-800">
            <span className="text-xs text-neutral-300 font-medium">
              Affichage de {displayedGrids.length} sur {reductionResult.retainedCombinations.length} grilles
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-neutral-200 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors cursor-pointer"
              >
                {copiedAll ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedAll ? 'Copié !' : 'Copier'}</span>
              </button>

              <button
                onClick={handleExportPdf}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-neutral-200 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors cursor-pointer"
              >
                <FileDown className="w-3.5 h-3.5 text-rose-400" />
                <span>PDF {!hasProExports && '(Pro)'}</span>
              </button>

              <button
                onClick={handleExportCsv}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-neutral-200 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors cursor-pointer"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                <span>Excel {!hasProExports && '(Pro)'}</span>
              </button>
            </div>
          </div>

          {/* Retained Grids List */}
          <div className="space-y-3">
            {displayedGrids.map((grid, index) => (
              <div
                key={grid.id}
                className="glass-panel rounded-xl p-3.5 border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono">
                  <span className="font-bold text-neutral-200">Grille #{index + 1}</span>
                  <span>·</span>
                  <span>Somme : {grid.sum}</span>
                  <span>·</span>
                  <span>{grid.evenCount}P / {grid.oddCount}I</span>
                </div>

                <div className="flex items-center gap-1.5 flex-wrap">
                  {grid.numbers.map((num) => (
                    <span
                      key={num}
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-600 text-white font-mono font-bold text-xs flex items-center justify-center shadow-sm"
                    >
                      {num}
                    </span>
                  ))}
                  <span className="text-neutral-400 font-mono text-xs mx-1">+</span>
                  <span className="w-8 h-8 rounded-full bg-purple-600 text-white font-mono font-black text-xs flex items-center justify-center shadow-sm">
                    {grid.letter}
                  </span>
                </div>
              </div>
            ))}

            {/* Lock Overlay for remaining grids */}
            {!isUnlocked && reductionResult.retainedCombinations.length > 3 && (
              <div className="p-6 rounded-2xl glass-panel border border-purple-900/60 text-center space-y-3 bg-purple-950/20">
                <div className="w-10 h-10 rounded-full bg-purple-600/30 text-purple-300 flex items-center justify-center mx-auto">
                  <Lock className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-neutral-100">
                  + {reductionResult.retainedCombinations.length - 3} autres grilles réduites masquées
                </h4>
                <p className="text-xs text-neutral-400 max-w-md mx-auto">
                  Débloquez le système réducteur complet pour afficher l&apos;intégralité des combinaisons optimisées, les exporter en PDF ou tableur et les sauvegarder.
                </p>
                <button
                  onClick={() => onOpenPricing('system_reducer')}
                  className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-600/25 transition-all cursor-pointer inline-flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Débloquer le Réducteur de Systèmes — 2,99 € TTC</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
