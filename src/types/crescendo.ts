export type CrescendoLetter = 'S' | 'A' | 'M' | 'E' | 'D' | 'I';

export const CRESCENDO_LETTERS: CrescendoLetter[] = ['S', 'A', 'M', 'E', 'D', 'I'];
export const MIN_NUMBER = 1;
export const MAX_NUMBER = 25;
export const DEFAULT_GRID_NUMBERS_COUNT = 10; // Grille officielle Crescendo FDJ : 10 numéros parmi 25 + 1 lettre aléatoire (SAMEDI)
export const DEFAULT_COST_PER_GRID = 2.0; // Coût unitaire standard en euros

export interface Combination {
  id: string;
  numbers: number[]; // triés par ordre croissant
  letter: CrescendoLetter;
  createdAt: string;
  sum: number;
  oddCount: number;
  evenCount: number;
  highCount: number; // 13-25
  lowCount: number;  // 1-12
}

export interface GeneratorConfig {
  count: number;
  gridSize: number; // 6, 7 ou 8 numéros
  favoriteNumbers: number[];
  excludedNumbers: number[];
  allowedLetters: CrescendoLetter[];
  mode: 'balanced' | 'random';
  filters: {
    minSum?: number;
    maxSum?: number;
    requireOddRange?: [number, number];
    consecutiveMax?: number;
  };
}

export interface ReductionConfig {
  poolNumbers: number[]; // 12 à 25 numéros
  targetLetter: CrescendoLetter;
  gridSize: number; // 7 numéros
  targetCombinationsCount: number; // ex: 8, 12, 16, 24
  targetGuarantee: 'pair_optimal' | 'triplet_optimal' | 'budget_cap';
}

export interface ReductionResult {
  id: string;
  timestamp: string;
  poolNumbers: number[];
  gridSize: number;
  letter: CrescendoLetter;
  totalCombinations: number;
  totalFullCost: number;
  retainedCombinations: Combination[];
  retainedCost: number;
  reductionPercentage: number;
  pairCoveragePercentage: number;
  tripletCoveragePercentage: number;
  coverageScore: number;
  guaranteeText: string;
  mathematicalExplanation: string;
}

export type EntitlementId =
  | 'unlimited_generator'
  | 'system_reducer'
  | 'pro_exports'
  | 'advanced_stats'
  | 'all_pack'
  | 'premium_all';

export interface PricingPlan {
  id: EntitlementId;
  title: string;
  price: number; // en euros TTC
  badge?: string;
  description: string;
  features: string[];
  recommended?: boolean;
}

export interface PurchaseTransaction {
  transactionId: string;
  timestamp: string;
  entitlementId: EntitlementId;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  paymentProvider: 'revolut_business' | 'stripe' | 'revolut_pay';
  revtagRecipient: string; // '@damienscheffer'
  recoveryCode: string; // Ex: CRES-8492-9104
}

export interface UserEntitlements {
  unlimited_generator: boolean;
  system_reducer: boolean;
  pro_exports: boolean;
  advanced_stats: boolean;
  all_pack: boolean;
  premium_all: boolean;
  installationId: string;
  recoveryCode: string;
  unlockedAt?: string;
}

export interface HistoricalDraw {
  id: string;
  date: string;
  numbers: number[];
  letter: CrescendoLetter;
  isOfficialFormat: boolean;
}

export interface StatsSummary {
  numberFrequencies: Record<number, number>;
  letterFrequencies: Record<CrescendoLetter, number>;
  mostFrequentNumbers: { number: number; count: number; percentage: number }[];
  leastFrequentNumbers: { number: number; count: number; percentage: number }[];
  pairOccurrences: { pair: [number, number]; count: number }[];
  highLowRatio: { high: number; low: number; highPercent: number };
  evenOddRatio: { even: number; odd: number; evenPercent: number };
  totalDrawsAnalyzed: number;
  dateRange: string;
}
