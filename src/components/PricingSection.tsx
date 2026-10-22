import React, { useState } from 'react';
import {
  Check,
  Sparkles,
  Lock,
  RotateCcw,
  ShieldCheck,
  CreditCard,
  Layers,
  ArrowRight,
  Info,
} from 'lucide-react';
import { EntitlementId, PricingPlan, UserEntitlements } from '../types/crescendo';
import { DEFAULT_PRICING_PLANS, REVOLUT_RECIPIENT } from '../config/pricing';

interface PricingSectionProps {
  entitlements: UserEntitlements;
  onSelectPlan: (planId: EntitlementId) => void;
  onRestorePurchases: (code: string) => Promise<{ success: boolean; message: string }>;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  entitlements,
  onSelectPlan,
  onRestorePurchases,
}) => {
  const [restoreInput, setRestoreInput] = useState<string>('');
  const [restoreStatus, setRestoreStatus] = useState<{ loading: boolean; message: string | null; isError: boolean }>({
    loading: false,
    message: null,
    isError: false,
  });

  const handleRestoreSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!restoreInput.trim()) return;

    setRestoreStatus({ loading: true, message: null, isError: false });
    const res = await onRestorePurchases(restoreInput.trim());
    setRestoreStatus({
      loading: false,
      message: res.message,
      isError: !res.success,
    });
  };

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="flex items-center justify-center gap-2 text-xs text-neutral-400 mb-2 font-medium">
          <span>Tarification Transparente</span>
          <span aria-hidden="true">·</span>
          <span>Prix TTC</span>
          <span aria-hidden="true">·</span>
          <span>Sans Abonnement Caché</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-100 tracking-tight">
          Tarifs Clairs & Déblocages à la Carte
        </h2>
        <p className="text-base text-neutral-400 mt-2">
          Profitez d&apos;outils gratuits au quotidien ou débloquez les fonctionnalités avancées à l&apos;unité ou via le Pass Premium complet. Aucun compte requis.
        </p>

        {/* Active Entitlement Notice */}
        {entitlements.premium_all && (
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Votre accès Premium Intégral est actuellement actif sur ce navigateur</span>
          </div>
        )}
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {DEFAULT_PRICING_PLANS.map((plan) => {
          const isPurchased =
            entitlements.premium_all ||
            (plan.id === 'all_pack' && entitlements.all_pack) ||
            entitlements[plan.id as keyof UserEntitlements];

          const isHighlight = plan.recommended;

          return (
            <div
              key={plan.id}
              className={`glass-panel rounded-2xl p-6 border transition-all flex flex-col justify-between relative ${
                isHighlight
                  ? 'border-blue-500/80 shadow-xl shadow-blue-600/10 bg-neutral-900/90'
                  : 'border-neutral-800 hover:border-neutral-700 bg-neutral-950/60'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[11px] font-bold shadow-sm">
                  {plan.badge}
                </div>
              )}

              <div>
                <h3 className="text-lg font-bold text-neutral-100">{plan.title}</h3>
                <p className="text-xs text-neutral-400 mt-1 min-h-[32px]">{plan.description}</p>

                {/* Price Display */}
                <div className="my-5 flex items-baseline gap-1.5">
                  <span className="text-3xl sm:text-4xl font-extrabold font-mono text-neutral-100 tracking-tight">
                    {plan.price.toFixed(2)} €
                  </span>
                  <span className="text-xs text-neutral-400 font-medium">TTC · Paiement unique</span>
                </div>

                {/* Features List */}
                <ul className="space-y-2.5 text-xs text-neutral-300 my-6">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <button
                  onClick={() => onSelectPlan(plan.id)}
                  disabled={Boolean(isPurchased)}
                  className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isPurchased
                      ? 'bg-neutral-800 text-neutral-400 cursor-not-allowed border border-neutral-700'
                      : isHighlight
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-600/25'
                      : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-100 border border-neutral-700'
                  }`}
                >
                  {isPurchased ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Déjà Débloqué</span>
                    </>
                  ) : (
                    <>
                      <span>Débloquer pour {plan.price.toFixed(2)} €</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Comparison Matrix: Gratuit vs À la carte vs Premium */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-neutral-800 mb-16">
        <h3 className="text-lg font-bold text-neutral-100 mb-4 pb-3 border-b border-neutral-800">
          Tableau Comparatif des Versions
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-neutral-800 text-neutral-400 font-semibold">
                <th className="py-3 pr-4">Fonctionnalité</th>
                <th className="py-3 px-4">Gratuit (Sans compte)</th>
                <th className="py-3 px-4">Achat à l&apos;unité</th>
                <th className="py-3 pl-4 text-blue-400">Premium Intégral</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60 text-neutral-300">
              <tr>
                <td className="py-3 pr-4 font-medium">Génération de combinaisons</td>
                <td className="py-3 px-4 text-neutral-400">Jusqu&apos;à 5 grilles</td>
                <td className="py-3 px-4">Jusqu&apos;à 50 grilles (1,49 €)</td>
                <td className="py-3 pl-4 text-emerald-400 font-bold">Illimité</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-medium">Réducteur de Systèmes Mathématique</td>
                <td className="py-3 px-4 text-neutral-400">Aperçu limité (3 grilles)</td>
                <td className="py-3 px-4">Système complet (2,99 €)</td>
                <td className="py-3 pl-4 text-emerald-400 font-bold">Inclus</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-medium">Exports PDF & Excel Pro</td>
                <td className="py-3 px-4 text-neutral-400">Copie texte simple</td>
                <td className="py-3 px-4">Déblocage (1,49 €)</td>
                <td className="py-3 pl-4 text-emerald-400 font-bold">Inclus</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-medium">Statistiques & Paires approfondies</td>
                <td className="py-3 px-4 text-neutral-400">15 tirages</td>
                <td className="py-3 px-4">Matrice complète (1,99 €)</td>
                <td className="py-3 pl-4 text-emerald-400 font-bold">Inclus</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-medium">Sauvegarde locale & Code de licence</td>
                <td className="py-3 px-4 text-emerald-400">Inclus</td>
                <td className="py-3 px-4 text-emerald-400">Inclus</td>
                <td className="py-3 pl-4 text-emerald-400 font-bold">Inclus (Transférable)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Restore Purchases Section (No account required) */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-neutral-800 max-w-2xl mx-auto text-left">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center shrink-0">
            <RotateCcw className="w-5 h-5 text-blue-400" />
          </div>
          <div className="flex-1">
            <h4 className="text-base font-bold text-neutral-100">Restaurer vos achats sur ce navigateur</h4>
            <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
              Vous avez déjà effectué un achat sur un autre appareil ou nettoyé vos cookies ? Entrez simplement votre code de licence unique reçu lors de votre commande pour restaurer instantanément vos droits.
            </p>

            <form onSubmit={handleRestoreSubmit} className="mt-4 flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Ex : CRES-8492-9104"
                value={restoreInput}
                onChange={(e) => setRestoreInput(e.target.value.toUpperCase())}
                className="flex-1 px-4 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-xs font-mono text-neutral-100 focus:outline-none focus:border-blue-500 uppercase"
              />
              <button
                type="submit"
                disabled={restoreStatus.loading}
                className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-100 text-xs font-semibold rounded-lg transition-colors cursor-pointer shrink-0"
              >
                {restoreStatus.loading ? 'Vérification...' : 'Restaurer'}
              </button>
            </form>

            {restoreStatus.message && (
              <p
                className={`text-xs mt-2 font-medium ${
                  restoreStatus.isError ? 'text-rose-400' : 'text-emerald-400'
                }`}
              >
                {restoreStatus.message}
              </p>
            )}

            <div className="mt-3 flex items-center gap-2 text-[11px] text-neutral-400">
              <Info className="w-3.5 h-3.5 shrink-0" />
              <span>Votre code actuel sur ce navigateur : <strong className="text-neutral-300 font-mono">{entitlements.recoveryCode}</strong></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
