import React, { useState, useMemo } from 'react';
import {
  Wallet,
  Calendar,
  AlertTriangle,
  TrendingDown,
  ShieldCheck,
  CheckCircle2,
  Phone,
} from 'lucide-react';
import { DEFAULT_COST_PER_GRID } from '../types/crescendo';

export const BudgetSimulator: React.FC = () => {
  const [gridsPerDraw, setGridsPerDraw] = useState<number>(3);
  const [drawsPerWeek, setDrawsPerWeek] = useState<number>(3);
  const [unitCost, setUnitCost] = useState<number>(DEFAULT_COST_PER_GRID);
  const [maxMonthlyThreshold, setMaxMonthlyThreshold] = useState<number>(60);
  const [hasThresholdAlert, setHasThresholdAlert] = useState<boolean>(true);

  // Calculs financiers stricts
  const costPerDraw = useMemo(() => gridsPerDraw * unitCost, [gridsPerDraw, unitCost]);
  const weeklyBudget = useMemo(() => costPerDraw * drawsPerWeek, [costPerDraw, drawsPerWeek]);
  const monthlyBudget = useMemo(() => Math.round((weeklyBudget * 52) / 12), [weeklyBudget]);
  const annualBudget = useMemo(() => weeklyBudget * 52, [weeklyBudget]);

  const isOverThreshold = hasThresholdAlert && monthlyBudget > maxMonthlyThreshold;

  // Projection sur 12 mois
  const monthlyProjection = useMemo(() => {
    const months = [
      'Janv', 'Févr', 'Mars', 'Avr', 'Mai', 'Juin',
      'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc',
    ];
    return months.map((m, idx) => ({
      month: m,
      standardCost: monthlyBudget,
      cumulative: monthlyBudget * (idx + 1),
      reducedCostWithOptimizer: Math.round(monthlyBudget * 0.4), // Avec système réducteur -60%
    }));
  }, [monthlyBudget]);

  return (
    <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs text-neutral-400 mb-2 font-medium">
          <span>Gestion Responsable</span>
          <span aria-hidden="true">·</span>
          <span>Simulateur Financier</span>
          <span aria-hidden="true">·</span>
          <span>Maîtrise des Mises</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-100 tracking-tight">
          Simulateur & Trajectoire Budgétaire
        </h2>
        <p className="text-sm text-neutral-400 mt-1 max-w-2xl">
          Visualisez l&apos;impact réel de vos habitudes de jeu dans le temps. Fixez un plafond strict et évitez les dépenses impulsives.
        </p>
      </div>

      {/* Threshold Alert if over budget */}
      {isOverThreshold && (
        <div className="mb-8 p-4 rounded-xl bg-amber-950/40 border border-amber-800/80 text-amber-200 text-xs space-y-2">
          <div className="flex items-center gap-2 font-semibold text-amber-300">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>Alerte Seuil Budgétaire : Votre budget mensuel ({monthlyBudget} €) dépasse votre plafond ({maxMonthlyThreshold} €)</span>
          </div>
          <p className="leading-relaxed text-amber-200/90 pl-6">
            Rappelez-vous que les loteries doivent rester un divertissement occasionnel. Ne misez jamais d&apos;argent dont vous avez besoin au quotidien. Si vous souhaitez maintenir une présence sur plusieurs tirages sans dépasser votre plafond, diminuez le nombre de grilles par tirage ou utilisez notre réducteur de systèmes.
          </p>
        </div>
      )}

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="glass-panel rounded-xl p-4 border border-neutral-800">
          <span className="text-[11px] text-neutral-400 uppercase font-semibold tracking-wider block mb-1">
            Coût par Tirage
          </span>
          <div className="text-2xl font-bold font-mono text-neutral-100 tabular-nums">
            {costPerDraw.toFixed(2)} €
          </div>
          <span className="text-[11px] text-neutral-400 block mt-0.5">
            {gridsPerDraw} grille{gridsPerDraw > 1 ? 's' : ''} à {unitCost.toFixed(2)} €
          </span>
        </div>

        <div className="glass-panel rounded-xl p-4 border border-neutral-800">
          <span className="text-[11px] text-neutral-400 uppercase font-semibold tracking-wider block mb-1">
            Budget Hebdomadaire
          </span>
          <div className="text-2xl font-bold font-mono text-blue-400 tabular-nums">
            {weeklyBudget.toFixed(2)} €
          </div>
          <span className="text-[11px] text-neutral-400 block mt-0.5">
            {drawsPerWeek} tirage{drawsPerWeek > 1 ? 's' : ''} par semaine
          </span>
        </div>

        <div className="glass-panel rounded-xl p-4 border border-neutral-800">
          <span className="text-[11px] text-neutral-400 uppercase font-semibold tracking-wider block mb-1">
            Budget Mensuel Estimé
          </span>
          <div className={`text-2xl font-bold font-mono tabular-nums ${isOverThreshold ? 'text-amber-400' : 'text-emerald-400'}`}>
            {monthlyBudget} €
          </div>
          <span className="text-[11px] text-neutral-400 block mt-0.5">
            Moyenne sur 4,33 semaines
          </span>
        </div>

        <div className="glass-panel rounded-xl p-4 border border-neutral-800">
          <span className="text-[11px] text-neutral-400 uppercase font-semibold tracking-wider block mb-1">
            Projection Annuelle
          </span>
          <div className="text-2xl font-bold font-mono text-purple-400 tabular-nums">
            {annualBudget.toLocaleString('fr-FR')} €
          </div>
          <span className="text-[11px] text-neutral-400 block mt-0.5">
            52 semaines complètes
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Sliders & Controls */}
        <div className="lg:col-span-5 glass-panel rounded-2xl p-6 border border-neutral-800 space-y-6">
          <h3 className="text-sm font-bold text-neutral-200 uppercase tracking-wider pb-3 border-b border-neutral-800 flex items-center gap-2">
            <Wallet className="w-4 h-4 text-blue-400" />
            Paramètres de votre budget
          </h3>

          {/* Grids per draw */}
          <div>
            <div className="flex justify-between items-center text-xs font-semibold text-neutral-200 mb-1.5">
              <span>Grilles jouées par tirage</span>
              <span className="font-mono text-blue-400 font-bold">{gridsPerDraw} grille{gridsPerDraw > 1 ? 's' : ''}</span>
            </div>
            <input
              type="range"
              min={1}
              max={15}
              value={gridsPerDraw}
              onChange={(e) => setGridsPerDraw(Number(e.target.value))}
              className="w-full accent-blue-500 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-neutral-400 mt-1">
              <span>1 grille</span>
              <span>15 grilles</span>
            </div>
          </div>

          {/* Draws per week */}
          <div>
            <div className="flex justify-between items-center text-xs font-semibold text-neutral-200 mb-1.5">
              <span>Nombre de tirages joués par semaine</span>
              <span className="font-mono text-indigo-400 font-bold">{drawsPerWeek} tirage{drawsPerWeek > 1 ? 's' : ''}</span>
            </div>
            <input
              type="range"
              min={1}
              max={7}
              value={drawsPerWeek}
              onChange={(e) => setDrawsPerWeek(Number(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-neutral-400 mt-1">
              <span>1 tirage</span>
              <span>7 tirages horaires (session complète du samedi)</span>
            </div>
          </div>

          {/* Unit cost */}
          <div>
            <div className="flex justify-between items-center text-xs font-semibold text-neutral-200 mb-1.5">
              <span>Tarif unitaire applicable</span>
              <span className="font-mono text-neutral-300 font-bold">{unitCost.toFixed(2)} €</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[1.0, 2.0, 3.0].map((rate) => (
                <button
                  key={rate}
                  onClick={() => setUnitCost(rate)}
                  className={`py-1.5 px-2 rounded-lg text-xs font-mono font-medium border cursor-pointer ${
                    unitCost === rate
                      ? 'bg-blue-600 text-white border-blue-500'
                      : 'bg-neutral-800 text-neutral-400 border-neutral-700 hover:text-white'
                  }`}
                >
                  {rate.toFixed(2)} €
                </button>
              ))}
            </div>
          </div>

          {/* Threshold setting */}
          <div className="pt-3 border-t border-neutral-800/80 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-neutral-200 flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasThresholdAlert}
                  onChange={(e) => setHasThresholdAlert(e.target.checked)}
                  className="rounded accent-blue-500"
                />
                Activer un plafond de vigilance mensuel
              </label>
              <span className="font-mono text-amber-400 font-bold text-xs">{maxMonthlyThreshold} €</span>
            </div>

            {hasThresholdAlert && (
              <input
                type="range"
                min={20}
                max={200}
                step={10}
                value={maxMonthlyThreshold}
                onChange={(e) => setMaxMonthlyThreshold(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            )}
          </div>

          {/* Budget 3D illustration visual */}
          <div className="rounded-xl overflow-hidden border border-neutral-800">
            <img
              src="/src/assets/images/budget_finance_analytics_1792584687156.jpg"
              alt="Graphique d'analyse financière et budgétaire"
              className="w-full h-32 object-cover object-center"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Right Column: Chart & Projection Table */}
        <div className="lg:col-span-7 space-y-6">
          {/* Monthly Trajectory Chart */}
          <div className="glass-panel rounded-2xl p-6 border border-neutral-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <span className="text-xs font-bold text-neutral-200 uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-blue-400" />
                Évolution du budget cumulé sur 12 mois
              </span>
              <span className="text-xs text-neutral-400 font-mono">Total : {annualBudget.toLocaleString('fr-FR')} €</span>
            </div>

            {/* Visual Bars for Months */}
            <div className="grid grid-cols-6 sm:grid-cols-12 gap-2 pt-4 items-end h-44">
              {monthlyProjection.map((item) => {
                const heightPct = Math.max(10, (item.cumulative / annualBudget) * 100);
                return (
                  <div key={item.month} className="flex flex-col items-center h-full justify-end group">
                    <div className="text-[10px] font-mono text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity mb-1 whitespace-nowrap">
                      {item.cumulative} €
                    </div>
                    <div
                      style={{ height: `${heightPct}%` }}
                      className="w-full bg-gradient-to-t from-blue-700 to-indigo-500 rounded-t transition-all group-hover:from-blue-600 group-hover:to-indigo-400"
                    />
                    <span className="text-[10px] font-mono text-neutral-400 mt-1.5">{item.month}</span>
                  </div>
                );
              })}
            </div>

            <div className="pt-3 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-blue-600" />
                Dépense standard cumulée
              </span>
              <span>Barres interactives au survol</span>
            </div>
          </div>

          {/* Responsible Gaming & Loss Recovery Warning */}
          <div className="p-5 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-3 text-xs text-neutral-300">
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-neutral-100 text-sm mb-1">
                  Charte de Protection et Jeu Responsable
                </h4>
                <ul className="space-y-1.5 text-neutral-300 list-disc pl-4 leading-relaxed">
                  <li>
                    <strong>Ne jamais chercher à &apos;se refaire&apos; :</strong> Augmenter les mises après une série sans gain (principe de la martingale) est une illusion mathématique dangereuse qui accroît l&apos;exposition au risque.
                  </li>
                  <li>
                    <strong>Considérez l&apos;argent engagé comme dépensé :</strong> Jouez uniquement pour le plaisir récréatif.
                  </li>
                  <li>
                    <strong>Prenez des pauses régulières :</strong> Si le jeu engendre du stress ou empiète sur vos obligations, interrompez immédiatement vos sessions.
                  </li>
                </ul>

                <div className="mt-4 pt-3 border-t border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <span className="text-neutral-400">Besoin d&apos;assistance ou de conseils neutres ?</span>
                  <a
                    href="tel:0974751313"
                    className="flex items-center gap-1.5 text-amber-300 hover:text-amber-200 font-bold"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    Joueurs Info Service : 09 74 75 13 13
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
