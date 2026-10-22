import React from 'react';
import { X, ShieldCheck, Scale, FileText, HelpCircle } from 'lucide-react';
import { REVOLUT_RECIPIENT } from '../config/pricing';

export type LegalModalType = 'mentions' | 'cgv' | 'privacy' | 'refund' | 'faq' | null;

interface LegalModalsProps {
  activeModal: LegalModalType;
  onClose: () => void;
}

export const LegalModals: React.FC<LegalModalsProps> = ({ activeModal, onClose }) => {
  if (!activeModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl max-h-[85vh] glass-panel rounded-2xl border border-neutral-700 bg-neutral-950 p-6 sm:p-8 shadow-2xl overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {activeModal === 'mentions' && (
          <div className="space-y-4 text-xs text-neutral-300">
            <div className="flex items-center gap-2 text-blue-400 font-semibold mb-2">
              <Scale className="w-5 h-5" />
              <h3 className="text-lg font-bold text-neutral-100">Mentions Légales</h3>
            </div>

            <p>
              Conformément aux dispositions de l&apos;article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l&apos;économie numérique (LCEN) :
            </p>

            <h4 className="font-bold text-neutral-100 text-sm mt-3">1. Éditeur du site</h4>
            <p>
              Le site <strong>Mon Crescendo</strong> est édité à titre indépendant par Damien Scheffer.<br />
              Contact de contact & réclamations : {REVOLUT_RECIPIENT.supportEmail}<br />
              Identifiant marchand / Payouts : {REVOLUT_RECIPIENT.revtag}
            </p>

            <h4 className="font-bold text-neutral-100 text-sm mt-3">2. Hébergement</h4>
            <p>
              L&apos;application est déployée et hébergée sur des infrastructures cloud européennes sécurisées répondant aux normes ISO 27001 et RGPD.
            </p>

            <h4 className="font-bold text-neutral-100 text-sm mt-3">3. Propriété intellectuelle & Indépendance vis-à-vis de la FDJ</h4>
            <p>
              &apos;Crescendo&apos; est une marque déposée appartenant à la Française des Jeux (FDJ). Le site Mon Crescendo est un logiciel d&apos;utilité combinatoire et d&apos;aide à la gestion budgétaire totalement indépendant. Il n&apos;est ni affilié, ni sponsorisé, ni validé par la Française des Jeux. Les grilles générées sont destinées à la préparation personnelle du joueur.
            </p>
          </div>
        )}

        {activeModal === 'cgv' && (
          <div className="space-y-4 text-xs text-neutral-300">
            <div className="flex items-center gap-2 text-indigo-400 font-semibold mb-2">
              <FileText className="w-5 h-5" />
              <h3 className="text-lg font-bold text-neutral-100">Conditions Générales de Vente (CGV)</h3>
            </div>

            <h4 className="font-bold text-neutral-100 text-sm">1. Objet</h4>
            <p>
              Les présentes CGV régissent la vente de licences d&apos;accès numériques individuelles ou intégrales (Pack Outils, Réducteur de systèmes, Exports PDF/Excel, Accès Premium) au sein du service Mon Crescendo.
            </p>

            <h4 className="font-bold text-neutral-100 text-sm mt-3">2. Prix et Modalités de Règlement</h4>
            <p>
              Les tarifs sont indiqués en Euros toutes taxes comprises (TTC). Les paiements sont sécurisés par transaction chiffrée, compatibles avec Revolut Pay, les cartes bancaires et les virements instantanés. Aucun abonnement tacitement reconductible n&apos;est mis en place.
            </p>

            <h4 className="font-bold text-neutral-100 text-sm mt-3">3. Droit de Rétractation et Exécution Immédiate</h4>
            <p>
              Conformément à l&apos;article L.221-28 13° du Code de la consommation, le droit de rétractation ne peut être exercé pour les contrats de fourniture d&apos;un contenu numérique sans support matériel dont l&apos;exécution a commencé avec l&apos;accord préalable exprès du consommateur et renoncement exprès à son droit de rétractation. En validant son paiement pour accéder immédiatement aux algorithmes ou exports, l&apos;utilisateur consent à cette exécution instantanée.
            </p>

            <h4 className="font-bold text-neutral-100 text-sm mt-3">4. Absence Totale de Garantie de Gain</h4>
            <p>
              L&apos;utilisateur reconnaît expressément que l&apos;outil fournit des calculs d&apos;optimisation combinatoire (couverture de sous-ensembles) et ne garantit aucunement un gain financier au tirage officiel.
            </p>
          </div>
        )}

        {activeModal === 'privacy' && (
          <div className="space-y-4 text-xs text-neutral-300">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-2">
              <ShieldCheck className="w-5 h-5" />
              <h3 className="text-lg font-bold text-neutral-100">Politique de Confidentialité (RGPD)</h3>
            </div>

            <p>
              Mon Crescendo applique le principe fondamental du <em>Privacy by Design</em> :
            </p>
            <ul className="list-disc pl-4 space-y-1.5">
              <li><strong>Zéro Inscription requise :</strong> Aucun mot de passe, adresse email ou identité n&apos;est exigé pour utiliser l&apos;application.</li>
              <li><strong>Stockage Local Exclusif :</strong> Vos combinaisons préférées, vos exclusions et vos paramètres budgétaires sont conservés exclusivement sur votre propre appareil via l&apos;API standard localStorage.</li>
              <li><strong>Zéro Traceur Publicitaire :</strong> Aucun cookie tiers de profilage ou de revente de données n&apos;est intégré.</li>
              <li><strong>Sécurité des Paiements :</strong> Vos coordonnées bancaires sont traitées exclusivement par les serveurs agréés de paiement ; aucune donnée bancaire ne transite ni n&apos;est conservée par notre serveur.</li>
            </ul>
          </div>
        )}

        {activeModal === 'refund' && (
          <div className="space-y-4 text-xs text-neutral-300">
            <div className="flex items-center gap-2 text-rose-400 font-semibold mb-2">
              <Scale className="w-5 h-5" />
              <h3 className="text-lg font-bold text-neutral-100">Politique de Remboursement</h3>
            </div>

            <p>
              Nous nous engageons à la satisfaction de nos utilisateurs. En cas d&apos;anomalie technique avérée (par exemple : double débit bancaire involontaire ou impossibilité technique de débloquer une fonctionnalité malgré la transaction confirmée), contactez notre support à <strong>{REVOLUT_RECIPIENT.supportEmail}</strong> en précisant votre code de licence.
            </p>
            <p>
              Toute réclamation légitime fait l&apos;objet d&apos;un remboursement intégral sous 5 jours ouvrés sur le moyen de paiement d&apos;origine.
            </p>
          </div>
        )}

        {activeModal === 'faq' && (
          <div className="space-y-4 text-xs text-neutral-300">
            <div className="flex items-center gap-2 text-blue-400 font-semibold mb-2">
              <HelpCircle className="w-5 h-5" />
              <h3 className="text-lg font-bold text-neutral-100">Foire Aux Questions & Mathématiques</h3>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800">
                <h4 className="font-bold text-neutral-100 mb-1">Quelles sont les règles officielles de Crescendo FDJ ?</h4>
                <p className="text-neutral-400 leading-relaxed">
                  Crescendo est un jeu de tirage où chaque grille se compose de <strong>10 numéros choisis parmi 25</strong> et d&apos;une <strong>lettre attribuée automatiquement</strong> parmi S, A, M, E, D, I. Il comprend 7 tirages horaires le samedi avec un jackpot évolutif de rang 1 pouvant grimper jusqu&apos;à 700 000 € (répartition) et des gains fixes aux autres rangs (contrepartie).
                </p>
              </div>

              <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800">
                <h4 className="font-bold text-neutral-100 mb-1">Comment fonctionne la réduction de système sur 10 numéros ?</h4>
                <p className="text-neutral-400 leading-relaxed">
                  Jouer un grand nombre de numéros (par exemple 14 numéros sur les 25) en formule intégrale de 10 numéros exigerait 1 001 grilles (2 002 €). Notre réducteur utilise un algorithme de couverture d&apos;ensembles (greedy set cover) qui retient seulement 12 grilles (24 €) tout en garantissant qu&apos;un maximum de paires et de triplets soit couvert.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800">
                <h4 className="font-bold text-neutral-100 mb-1">Un réducteur augmente-t-il mes chances de gagner ?</h4>
                <p className="text-neutral-400 leading-relaxed">
                  Non. Chaque grille individuelle a exactement la même probabilité de sortir. Le réducteur vous permet uniquement d&apos;optimiser votre budget : pour une même dépense de 24 €, vos grilles sont mathématiquement mieux dispersées que si vous les remplissiez au hasard.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800">
                <h4 className="font-bold text-neutral-100 mb-1">Puis-je restaurer mes achats si je change d&apos;ordinateur ?</h4>
                <p className="text-neutral-400 leading-relaxed">
                  Oui ! Lors de chaque achat, un code unique de licence (type CRES-XXXX-XXXX) est généré. Il vous suffit de le copier et de l&apos;entrer dans l&apos;onglet &apos;Restaurer mes achats&apos; sur votre nouveau navigateur pour retrouver immédiatement vos fonctionnalités.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-neutral-800 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white font-medium text-xs rounded-lg transition-colors cursor-pointer"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
