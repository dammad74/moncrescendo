import { Combination, EntitlementId, UserEntitlements } from '../types/crescendo';

const STORAGE_KEYS = {
  INSTALLATION_ID: 'crescendo_install_id',
  ENTITLEMENTS: 'crescendo_entitlements',
  SAVED_COMBINATIONS: 'crescendo_saved_combinations',
  THEME: 'crescendo_theme',
  BUDGET_CONFIG: 'crescendo_budget_prefs',
  RECOVERY_HISTORY: 'crescendo_recovery_history',
};

export function getInstallationId(): string {
  let id = localStorage.getItem(STORAGE_KEYS.INSTALLATION_ID);
  if (!id) {
    id = `usr-${Math.random().toString(36).substring(2, 10)}-${Date.now().toString(36)}`;
    localStorage.setItem(STORAGE_KEYS.INSTALLATION_ID, id);
  }
  return id;
}

export function generateRecoveryCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const part1 = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  const part2 = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  return `CRES-${part1}-${part2}`;
}

export function getEntitlements(): UserEntitlements {
  const installId = getInstallationId();
  const raw = localStorage.getItem(STORAGE_KEYS.ENTITLEMENTS);
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      return {
        unlimited_generator: !!parsed.unlimited_generator,
        system_reducer: !!parsed.system_reducer,
        pro_exports: !!parsed.pro_exports,
        advanced_stats: !!parsed.advanced_stats,
        all_pack: !!parsed.all_pack,
        premium_all: !!parsed.premium_all,
        installationId: parsed.installationId || installId,
        recoveryCode: parsed.recoveryCode || generateRecoveryCode(),
        unlockedAt: parsed.unlockedAt,
      };
    } catch {
      // Fallback
    }
  }

  const defaultEntitlements: UserEntitlements = {
    unlimited_generator: false,
    system_reducer: false,
    pro_exports: false,
    advanced_stats: false,
    all_pack: false,
    premium_all: false,
    installationId: installId,
    recoveryCode: generateRecoveryCode(),
  };
  localStorage.setItem(STORAGE_KEYS.ENTITLEMENTS, JSON.stringify(defaultEntitlements));
  return defaultEntitlements;
}

export function saveEntitlements(entitlements: UserEntitlements): void {
  localStorage.setItem(STORAGE_KEYS.ENTITLEMENTS, JSON.stringify(entitlements));
}

export function unlockFeature(featureId: EntitlementId): UserEntitlements {
  const current = getEntitlements();
  const updated: UserEntitlements = { ...current, unlockedAt: new Date().toISOString() };

  if (featureId === 'premium_all') {
    updated.premium_all = true;
    updated.unlimited_generator = true;
    updated.system_reducer = true;
    updated.pro_exports = true;
    updated.advanced_stats = true;
    updated.all_pack = true;
  } else if (featureId === 'all_pack') {
    updated.all_pack = true;
    updated.unlimited_generator = true;
    updated.system_reducer = true;
    updated.pro_exports = true;
  } else {
    updated[featureId] = true;
  }

  saveEntitlements(updated);
  return updated;
}

export function isFeatureUnlocked(featureId: EntitlementId, entitlements?: UserEntitlements): boolean {
  const ents = entitlements || getEntitlements();
  if (ents.premium_all) return true;
  if (featureId === 'unlimited_generator' && ents.all_pack) return true;
  if (featureId === 'system_reducer' && ents.all_pack) return true;
  if (featureId === 'pro_exports' && ents.all_pack) return true;
  return !!ents[featureId];
}

export function getSavedCombinations(): Combination[] {
  const raw = localStorage.getItem(STORAGE_KEYS.SAVED_COMBINATIONS);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveCombination(comb: Combination): Combination[] {
  const list = getSavedCombinations();
  if (list.some((item) => item.id === comb.id)) return list;
  const updated = [comb, ...list].slice(0, 100);
  localStorage.setItem(STORAGE_KEYS.SAVED_COMBINATIONS, JSON.stringify(updated));
  return updated;
}

export function removeSavedCombination(id: string): Combination[] {
  const list = getSavedCombinations();
  const updated = list.filter((item) => item.id !== id);
  localStorage.setItem(STORAGE_KEYS.SAVED_COMBINATIONS, JSON.stringify(updated));
  return updated;
}

export function clearSavedCombinations(): void {
  localStorage.removeItem(STORAGE_KEYS.SAVED_COMBINATIONS);
}
