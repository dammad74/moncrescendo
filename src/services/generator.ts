import { Combination, CrescendoLetter, CRESCENDO_LETTERS, GeneratorConfig, MIN_NUMBER, MAX_NUMBER } from '../types/crescendo';

/**
 * Génère un tirage aléatoire ou équilibré selon la configuration
 */
export function generateCombinations(config: GeneratorConfig): Combination[] {
  const {
    count,
    gridSize,
    favoriteNumbers,
    excludedNumbers,
    allowedLetters,
    mode,
    filters,
  } = config;

  const validLetters = allowedLetters.length > 0 ? allowedLetters : CRESCENDO_LETTERS;
  const favorites = [...new Set(favoriteNumbers)].filter((n) => n >= MIN_NUMBER && n <= MAX_NUMBER);
  const exclusions = new Set(excludedNumbers);

  // Pool de numéros disponibles (1 à 25 sans les exclus)
  const availablePool: number[] = [];
  for (let i = MIN_NUMBER; i <= MAX_NUMBER; i++) {
    if (!exclusions.has(i)) {
      availablePool.push(i);
    }
  }

  // Vérifier qu'il y a assez de numéros disponibles
  if (availablePool.length < gridSize) {
    throw new Error(`Pas assez de numéros disponibles (${availablePool.length}) pour former une grille de ${gridSize} numéros.`);
  }

  // Vérifier que les favoris ne dépassent pas la taille de la grille
  const validFavorites = favorites.filter((f) => !exclusions.has(f));
  if (validFavorites.length > gridSize) {
    throw new Error(`Le nombre de favoris (${validFavorites.length}) ne peut pas dépasser la taille de la grille (${gridSize}).`);
  }

  const results: Combination[] = [];
  const existingSignatures = new Set<string>();
  let attempts = 0;
  const maxAttempts = count * 200;

  while (results.length < count && attempts < maxAttempts) {
    attempts++;

    // 1. Démarrer avec les favoris
    const selected = new Set<number>(validFavorites);
    const poolWithoutFavorites = availablePool.filter((n) => !selected.has(n));

    // 2. Sélectionner les numéros restants
    const needed = gridSize - selected.size;

    if (mode === 'balanced') {
      // Stratégie équilibrée : cibler une parité et une répartition haut/bas homogène
      const shuffled = [...poolWithoutFavorites].sort(() => Math.random() - 0.5);
      
      for (const num of shuffled) {
        if (selected.size >= gridSize) break;

        // Évaluer l'équilibre actuel
        const currentNums = Array.from(selected);
        const currentOdds = currentNums.filter((x) => x % 2 !== 0).length;
        const currentHighs = currentNums.filter((x) => x >= 13).length;

        const isOdd = num % 2 !== 0;
        const isHigh = num >= 13;

        // Si on a déjà trop d'impairs ou de pairs, essayer de varier
        const wouldExceedOdds = isOdd && currentOdds >= Math.ceil(gridSize / 2) + 1;
        const wouldExceedEvens = !isOdd && (currentNums.length - currentOdds) >= Math.ceil(gridSize / 2) + 1;
        const wouldExceedHighs = isHigh && currentHighs >= Math.ceil(gridSize / 2) + 1;
        const wouldExceedLows = !isHigh && (currentNums.length - currentHighs) >= Math.ceil(gridSize / 2) + 1;

        if (!wouldExceedOdds && !wouldExceedEvens && !wouldExceedHighs && !wouldExceedLows) {
          selected.add(num);
        }
      }

      // Compléter si le filtre strict n'a pas suffi
      if (selected.size < gridSize) {
        for (const num of shuffled) {
          if (selected.size >= gridSize) break;
          selected.add(num);
        }
      }
    } else {
      // Mode aléatoire standard (uniforme)
      const shuffled = [...poolWithoutFavorites].sort(() => Math.random() - 0.5);
      for (let i = 0; i < needed && i < shuffled.length; i++) {
        selected.add(shuffled[i]);
      }
    }

    if (selected.size < gridSize) continue;

    const sortedNums = Array.from(selected).sort((a, b) => a - b);
    const sum = sortedNums.reduce((acc, curr) => acc + curr, 0);

    // 3. Appliquer les filtres personnalisés
    if (filters.minSum !== undefined && sum < filters.minSum) continue;
    if (filters.maxSum !== undefined && sum > filters.maxSum) continue;

    const oddCount = sortedNums.filter((x) => x % 2 !== 0).length;
    const evenCount = sortedNums.length - oddCount;

    if (filters.requireOddRange) {
      const [minOdd, maxOdd] = filters.requireOddRange;
      if (oddCount < minOdd || oddCount > maxOdd) continue;
    }

    if (filters.consecutiveMax !== undefined) {
      let maxConsecutive = 1;
      let currentStreak = 1;
      for (let i = 1; i < sortedNums.length; i++) {
        if (sortedNums[i] === sortedNums[i - 1] + 1) {
          currentStreak++;
          if (currentStreak > maxConsecutive) maxConsecutive = currentStreak;
        } else {
          currentStreak = 1;
        }
      }
      if (maxConsecutive > filters.consecutiveMax) continue;
    }

    // 4. Attribuer une lettre parmi celles autorisées
    const chosenLetter = validLetters[Math.floor(Math.random() * validLetters.length)];

    const signature = `${sortedNums.join('-')}-${chosenLetter}`;
    if (existingSignatures.has(signature)) continue;

    existingSignatures.add(signature);
    const highCount = sortedNums.filter((x) => x >= 13).length;
    const lowCount = sortedNums.length - highCount;

    results.push({
      id: `comb-${Date.now()}-${results.length + 1}-${Math.random().toString(36).substring(2, 6)}`,
      numbers: sortedNums,
      letter: chosenLetter,
      createdAt: new Date().toISOString(),
      sum,
      oddCount,
      evenCount,
      highCount,
      lowCount,
    });
  }

  return results;
}
