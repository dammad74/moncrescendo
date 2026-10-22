import React, { useState } from 'react';
import {
  Sparkles,
  Copy,
  Check,
  FileDown,
  FileSpreadsheet,
  Bookmark,
  Trash2,
  SlidersHorizontal,
  Info,
  Lock,
  RotateCcw,
} from 'lucide-react';
import {
  Combination,
  CrescendoLetter,
  CRESCENDO_LETTERS,
  DEFAULT_GRID_NUMBERS_COUNT,
  GeneratorConfig,
  MIN_NUMBER,
  MAX_NUMBER,
} from '../types/crescendo';
import { generateCombinations } from '../services/generator';
import { exportToPdf, exportToCsv, copyCombinations } from '../services/export';
import { saveCombination } from '../services/storage';

interface GeneratorViewProps {
  hasUnlimited: boolean;
  hasProExports: boolean;
  onOpenPricing: (planId?: string) => void;
}

export const GeneratorView: React.FC<GeneratorViewProps> = ({
  hasUnlimited,
  hasProExports,
  onOpenPricing,
}) => {
  const maxAllowedGrids = hasUnlimited ? 50 : 5;

  const [gridCount, setGridCount] = useState<number>(5);
  const [gridSize, setGridSize] = useState<number>(DEFAULT_GRID_NUMBERS_COUNT);
  const [mode, setMode] = useState<'balanced' | 'random'>('balanced');
  const [favoriteNumbers, setFavoriteNumbers] = useState<number[]>([]);
  const [excludedNumbers, setExcludedNumbers] = useState<number[]>([]);
  const [selectedLetters, setSelectedLetters] = useState<CrescendoLetter[]>([...CRESCENDO_LETTERS]);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState<boolean>(false);

  // Filtres avancés adaptés à 10 numéros parmi 25 (somme théorique moyenne = 130)
  const [minSum, setMinSum] = useState<number>(105);
  const [maxSum, setMaxSum] = useState<number>(155);
  const [consecutiveMax, setConsecutiveMax] = useState<number>(3);

  // Résultats
  const [generatedGrids, setGeneratedGrids] = useState<Combination[]>(() => {
    return generateCombinations({
      count: 5,
      gridSize: DEFAULT_GRID_NUMBERS_COUNT,
      favoriteNumbers: [],
      excludedNumbers: [],
      allowedLetters: CRESCENDO_LETTERS,
      mode: 'balanced',
      filters: {},
    });
  });

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState<boolean>(false);
  const [savedSuccessId, setSavedSuccessId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Toggle numéro dans le pool (neutre -> favori -> exclu -> neutre)
  const handleToggleNumber = (num: number) => {
    setErrorMessage(null);
    if (favoriteNumbers.includes(num)) {
      setFavoriteNumbers((prev) => prev.filter((n) => n !== num));
      setExcludedNumbers((prev) => [...prev, num]);
    } else if (excludedNumbers.includes(num)) {
      setExcludedNumbers((prev) => prev.filter((n) => n !== num));
    } else {
      if (favoriteNumbers.length >= gridSize) {
        setErrorMessage(`Vous ne pouvez pas sélectionner plus de ${gridSize} favoris (taille de grille).`);
        return;
      }
      setFavoriteNumbers((prev) => [...prev, num]);
    }
  };

  const handleToggleLetter = (letter: CrescendoLetter) => {
    if (selectedLetters.includes(letter)) {
      if (selectedLetters.length === 1) {
        setErrorMessage('Au moins une lettre doit rester sélectionnée.');
        return;
      }
      setSelectedLetters((prev) => prev.filter((l) => l !== letter));
    } else {
      setSelectedLetters((prev) => [...prev, letter]);
    }
  };

  const handleGenerate = () => {
    setErrorMessage(null);
    try {
      const config: GeneratorConfig = {
        count: Math.min(gridCount, maxAllowedGrids),
        gridSize,
        favoriteNumbers,
        excludedNumbers,
        allowedLetters: selectedLetters,
        mode,
        filters: showAdvancedFilters
          ? {
              minSum,
              maxSum,
              consecutiveMax,
            }
          : {},
      };

      const results = generateCombinations(config);
      setGeneratedGrids(results);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Erreur de génération';
      setErrorMessage(msg);
    }
  };

  const handleCopySingle = async (comb: Combination) => {
    await copyCombinations([comb]);
    setCopiedId(comb.id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const handleCopyAll = async () => {
    if (generatedGrids.length === 0) return;
    await copyCombinations(generatedGrids);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const handleSaveSingle = (comb: Combination) => {
    saveCombination(comb);
    setSavedSuccessId(comb.id);
    setTimeout(() => setSavedSuccessId(null), 2000);
  };

  const handleExportPdf = () => {
    if (!hasProExports) {
      onOpenPricing('pro_exports');
      return;
    }
    exportToPdf(generatedGrids, 'Grilles Générées Crescendo');
  };

  const handleExportCsv = () => {
    if (!hasProExports) {
      onOpenPricing('pro_exports');
      return;
    }
    exportToCsv(generatedGrids, `crescendo-export-${Date.now().toString().slice(-4)}.csv`);
  };

  const handleResetFilters = () => {
    setFavoriteNumbers([]);
    setExcludedNumbers([]);
    setSelectedLetters([...CRESCENDO_LETTERS]);
    setMinSum(105);
    setMaxSum(155);
    setConsecutiveMax(3);
    setErrorMessage(null);
  };

  return (
    <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Title & context */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs text-neutral-400 mb-2 font-medium">
          <span>Outil Combinatoire</span>
          <span aria-hidden="true">·</span>
          <span>Générateur Officiel 10/25</span>
          <span aria-hidden="true">·</span>
          <span>Lettre SAMEDI aléatoire</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-100 tracking-tight">
          Générateur de Grilles (10 numéros sur 25)
        </h2>
        <p className="text-sm text-neutral-400 mt-1 max-w-3xl">
          Construisez vos grilles officielles de 10 numéros parmi 25. La lettre parmi S, A, M, E, D, I est attribuée aléatoirement comme en point de vente FDJ pour les tirages horaires du samedi.
        </p>
      </div>

      {/* Free mode limitation alert */}
      {!hasUnlimited && (
        <div className="mb-6 p-4 rounded-xl bg-blue-950/30 border border-blue-900/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-neutral-300">
            <Info className="w-4 h-4 text-blue-400 shrink-0" />
            <span>
              <strong>Version Gratuite :</strong> génération limitée à 5 grilles. Pour débloquer jusqu&apos;à 50 grilles simultanées et les filtres avancés, activez le Pack Générateur.
            </span>
          </div>
          <button
            onClick={() => onOpenPricing('unlimited_generator')}
            className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors shrink-0 cursor-pointer"
          >
            Débloquer (1,49 €)
          </button>
        </div>
      )}

      {/* Error alert */}
      {errorMessage && (
        <div className="mb-6 p-3.5 rounded-xl bg-rose-950/40 border border-rose-800/80 text-rose-200 text-xs">
          {errorMessage}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left column: Controls & Interactive pool */}
        <div className="lg:col-span-5 glass-panel rounded-2xl p-6 border border-neutral-800 space-y-6">
          {/* Numbers Pool Selector (1 to 25) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-neutral-200">
                Sélection des Numéros (1 à 25)
              </label>
              <button
                onClick={handleResetFilters}
                className="text-[11px] text-neutral-400 hover:text-neutral-200 flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                Réinitialiser
              </button>
            </div>
            <p className="text-[11px] text-neutral-400 mb-3">
              Cliquez pour basculer : <span className="text-emerald-400 font-medium">Vert = Favori</span>, <span className="text-rose-400 font-medium">Rouge = Exclu</span>, Gris = Neutre.
            </p>

            <div className="grid grid-cols-5 gap-2 sm:gap-2.5">
              {Array.from({ length: 25 }, (_, i) => i + 1).map((num) => {
                const isFavorite = favoriteNumbers.includes(num);
                const isExcluded = excludedNumbers.includes(num);

                let stateClass = 'bg-neutral-800/90 text-neutral-300 border-neutral-700/80 hover:bg-neutral-700';
                if (isFavorite) {
                  stateClass = 'bg-emerald-600 text-white border-emerald-400 shadow-sm shadow-emerald-500/30';
                } else if (isExcluded) {
                  stateClass = 'bg-rose-950/80 text-rose-400 border-rose-700 line-through';
                }

                return (
                  <button
                    key={num}
                    onClick={() => handleToggleNumber(num)}
                    className={`h-10 rounded-lg flex items-center justify-center font-mono font-bold text-xs sm:text-sm border transition-all cursor-pointer ${stateClass}`}
                  >
                    {num}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between mt-2.5 text-[11px] text-neutral-400">
              <span>Favoris : {favoriteNumbers.length}/{gridSize}</span>
              <span>Exclus : {excludedNumbers.length}</span>
              <span>Disponibles : {25 - excludedNumbers.length}</span>
            </div>
          </div>

          {/* Letter Selector (S, A, M, E, D, I) */}
          <div>
            <label className="text-xs font-semibold text-neutral-200 block mb-2">
              Lettres Crescendo à inclure (SAMEDI)
            </label>
            <div className="grid grid-cols-6 gap-2">
              {CRESCENDO_LETTERS.map((letter) => {
                const isSelected = selectedLetters.includes(letter);
                return (
                  <button
                    key={letter}
                    onClick={() => handleToggleLetter(letter)}
                    className={`h-10 rounded-lg font-mono font-bold text-sm border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-purple-600 text-white border-purple-400 shadow-sm shadow-purple-500/30'
                        : 'bg-neutral-800/60 text-neutral-400 border-neutral-800 hover:bg-neutral-700'
                    }`}
                  >
                    {letter}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Grid Count & Size */}
          <div className="space-y-4 pt-2 border-t border-neutral-800/80">
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-neutral-200 mb-1.5">
                <span>Nombre de grilles souhaitées</span>
                <span className="font-mono text-blue-400 font-bold">{gridCount}</span>
              </div>
              <input
                type="range"
                min={1}
                max={maxAllowedGrids}
                value={gridCount}
                onChange={(e) => setGridCount(Number(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-neutral-400 mt-1">
                <span>1 grille</span>
                <span>{hasUnlimited ? '50 grilles max' : '5 grilles (Limite gratuite)'}</span>
              </div>
            </div>

            {/* Mode selection: balanced vs random */}
            <div>
              <label className="text-xs font-semibold text-neutral-200 block mb-2">
                Mode de Répartition
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setMode('balanced')}
                  className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                    mode === 'balanced'
                      ? 'bg-blue-600 text-white border-blue-500 shadow-sm'
                      : 'bg-neutral-800 text-neutral-400 border-neutral-700 hover:text-neutral-200'
                  }`}
                >
                  Équilibrée (Recommandé)
                </button>
                <button
                  type="button"
                  onClick={() => setMode('random')}
                  className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                    mode === 'random'
                      ? 'bg-blue-600 text-white border-blue-500 shadow-sm'
                      : 'bg-neutral-800 text-neutral-400 border-neutral-700 hover:text-neutral-200'
                  }`}
                >
                  Aléatoire Pure
                </button>
              </div>
            </div>
          </div>

          {/* Advanced filters toggle */}
          <div className="pt-2 border-t border-neutral-800/80">
            <button
              onClick={() => {
                if (!hasUnlimited) {
                  onOpenPricing('unlimited_generator');
                  return;
                }
                setShowAdvancedFilters(!showAdvancedFilters);
              }}
              className="flex items-center justify-between w-full text-xs font-medium text-neutral-300 hover:text-white transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-blue-400" />
                Filtres mathématiques avancés
              </span>
              {!hasUnlimited ? (
                <span className="flex items-center gap-1 text-[11px] text-amber-400 font-semibold">
                  <Lock className="w-3 h-3" /> Premium
                </span>
              ) : (
                <span className="text-[11px] text-neutral-400">{showAdvancedFilters ? 'Masquer' : 'Afficher'}</span>
              )}
            </button>

            {showAdvancedFilters && hasUnlimited && (
              <div className="mt-4 space-y-3.5 p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800 text-xs">
                <div>
                  <div className="flex justify-between text-neutral-300 mb-1">
                    <span>Somme minimale : {minSum}</span>
                    <span>Somme maximale : {maxSum}</span>
                  </div>
                  <input
                    type="range"
                    min={40}
                    max={140}
                    value={minSum}
                    onChange={(e) => setMinSum(Number(e.target.value))}
                    className="w-full accent-blue-500 cursor-pointer"
                  />
                  <input
                    type="range"
                    min={minSum}
                    max={150}
                    value={maxSum}
                    onChange={(e) => setMaxSum(Number(e.target.value))}
                    className="w-full accent-blue-500 cursor-pointer mt-1"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-neutral-300 mb-1">
                    <span>Nombre consécutif maximum autorisé</span>
                    <span className="font-mono text-blue-400 font-bold">{consecutiveMax}</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={4}
                    value={consecutiveMax}
                    onChange={(e) => setConsecutiveMax(Number(e.target.value))}
                    className="w-full accent-blue-500 cursor-pointer"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Action generate button */}
          <button
            onClick={handleGenerate}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Générer {gridCount} Grille{gridCount > 1 ? 's' : ''}</span>
          </button>
        </div>

        {/* Right column: Results & Export Bar */}
        <div className="lg:col-span-7 space-y-4">
          {/* Action Bar */}
          <div className="glass-panel rounded-xl p-3.5 border border-neutral-800 flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs text-neutral-300 font-medium">
              <span>{generatedGrids.length} grille{generatedGrids.length > 1 ? 's' : ''} active{generatedGrids.length > 1 ? 's' : ''}</span>
              <span className="text-neutral-400 mx-2">·</span>
              <span className="font-mono text-neutral-300">Mise estimée : {(generatedGrids.length * 2).toFixed(2)} €</span>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={handleCopyAll}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-200 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors cursor-pointer"
              >
                {copiedAll ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedAll ? 'Copié !' : 'Tout Copier'}</span>
              </button>

              <button
                onClick={handleExportPdf}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-200 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors cursor-pointer"
              >
                <FileDown className="w-3.5 h-3.5 text-rose-400" />
                <span>Export PDF {!hasProExports && '(Pro)'}</span>
              </button>

              <button
                onClick={handleExportCsv}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-200 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors cursor-pointer"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                <span>Export Excel {!hasProExports && '(Pro)'}</span>
              </button>
            </div>
          </div>

          {/* Grids list */}
          <div className="space-y-3">
            {generatedGrids.map((grid, index) => (
              <div
                key={grid.id}
                className="glass-panel rounded-xl p-4 border border-neutral-800/90 hover:border-neutral-700/80 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-neutral-200 font-mono">
                      Grille #{index + 1}
                    </span>
                    <span className="text-neutral-400 text-xs">·</span>
                    <span className="text-xs text-neutral-400">Somme : <strong className="text-neutral-300 font-mono">{grid.sum}</strong></span>
                    <span className="text-neutral-400 text-xs">·</span>
                    <span className="text-xs text-neutral-400">{grid.evenCount}P / {grid.oddCount}I</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopySingle(grid)}
                      title="Copier cette grille"
                      className="p-1.5 text-neutral-400 hover:text-white rounded hover:bg-neutral-800 transition-colors cursor-pointer"
                    >
                      {copiedId === grid.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={() => handleSaveSingle(grid)}
                      title="Enregistrer dans mes favoris"
                      className="p-1.5 text-neutral-400 hover:text-white rounded hover:bg-neutral-800 transition-colors cursor-pointer"
                    >
                      {savedSuccessId === grid.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Bookmark className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Spheres Row */}
                <div className="flex items-center gap-2 flex-wrap">
                  {grid.numbers.map((num) => (
                    <span
                      key={num}
                      className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-b from-blue-500 to-blue-700 text-white font-mono font-bold text-xs sm:text-sm flex items-center justify-center shadow-sm"
                    >
                      {num}
                    </span>
                  ))}

                  <span className="text-neutral-400 font-mono text-sm mx-1">+</span>

                  {/* Letter */}
                  <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-mono font-black text-sm flex items-center justify-center shadow-md violet-glow">
                    {grid.letter}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
