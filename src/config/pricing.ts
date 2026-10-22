import { PricingPlan } from '../types/crescendo';

export const REVOLUT_RECIPIENT = {
  revtag: '@damienscheffer',
  merchantName: 'Mon Crescendo',
  supportEmail: 'contact@mon-crescendo.fr',
  payoutMethod: 'Revolut Business / Stripe to Revolut IBAN',
};

export const DEFAULT_PRICING_PLANS: PricingPlan[] = [
  {
    id: 'unlimited_generator',
    title: 'Générateur Illimité',
    price: 1.49,
    description: 'Supprimez la limite des 5 grilles et générez jusqu’à 50 grilles par passe.',
    features: [
      'Génération jusqu’à 50 grilles simultanées',
      'Filtres avancés (sommes, parités, consécutifs)',
      'Sélection illimitée de favoris et exclus',
      'Copie groupée au format FDJ',
      'Accès permanent sur ce navigateur',
    ],
  },
  {
    id: 'system_reducer',
    title: 'Réducteur de Systèmes',
    price: 2.99,
    badge: 'Populaire',
    description: 'Algorithme mathématique de réduction de couverture (12 à 25 numéros).',
    features: [
      'Sélection élargie de 12 à 25 numéros',
      'Algorithme de couverture mathématique gloutonne',
      'Visualisation des grilles retenues vs écartées',
      'Calcul exact de taux de couverture et économie budgétaire',
      'Rappels méthodologiques & probabilités transparentes',
    ],
    recommended: false,
  },
  {
    id: 'pro_exports',
    title: 'Exports Pro (PDF & Excel)',
    price: 1.49,
    description: 'Exportez vos combinaisons au format PDF prêt à imprimer et tableur Excel/CSV.',
    features: [
      'Export PDF haute résolution type ticket de jeu',
      'Export Excel / CSV compatible tous tableurs',
      'Mise en page optimisée pour buraliste ou saisie en ligne',
      'Sans filigrane publicitaire',
    ],
  },
  {
    id: 'advanced_stats',
    title: 'Analyses & Statistiques Pro',
    price: 1.99,
    description: 'Accédez à l’analyse complète des historiques et matrices de co-occurrence.',
    features: [
      'Matrices de co-occurrences de paires',
      'Heatmap interactive 5x5 des numéros',
      'Filtres temporels (30, 100 tirages, historique complet)',
      'Gauges de répartition et alertes variance',
      'Avertissements d’indépendance stochastique',
    ],
  },
  {
    id: 'all_pack',
    title: 'Pack Outils Combinatoires',
    price: 4.99,
    badge: 'Pack Économique',
    description: 'Regroupe le Générateur Illimité, le Réducteur de Systèmes et les Exports Pro.',
    features: [
      'Générateur Illimité (jusqu’à 50 grilles)',
      'Réducteur de Systèmes complet',
      'Exports PDF & Excel illimités',
      'Code de restauration unique inclus',
      'Économisez plus de 40% par rapport à l’achat individuel',
    ],
  },
  {
    id: 'premium_all',
    title: 'Mon Crescendo Premium Intégral',
    price: 9.99,
    badge: 'Recommandé — Tout inclus',
    description: 'Débloquez l’ensemble des fonctionnalités actuelles et futures sans aucun abonnement.',
    features: [
      'Tout le Pack Outils Combinatoires inclus',
      'Analyses & Statistiques Pro complètes',
      'Simulateur de budget sans restriction',
      'Code de licence unique transférable',
      'Mises à jour et algorithmes futurs inclus à vie',
      'Support prioritaire par email',
    ],
    recommended: true,
  },
];
