import { CrescendoLetter, CRESCENDO_LETTERS, HistoricalDraw, StatsSummary } from '../types/crescendo';

// Historique des tirages modélisé sur la structure officielle Crescendo FDJ :
// 10 numéros parmi 25 + 1 lettre attribuée automatiquement (SAMEDI)
// 7 tirages horaires le samedi avec jackpot évolutif jusqu'à 700 000 €
export const SAMPLE_HISTORICAL_DRAWS: HistoricalDraw[] = [
  { id: 'tirage-samedi-7', date: '2026-10-17 19:00', numbers: [2, 4, 7, 9, 11, 14, 18, 20, 21, 24], letter: 'I', isOfficialFormat: true },
  { id: 'tirage-samedi-6', date: '2026-10-17 18:00', numbers: [1, 3, 5, 8, 12, 13, 17, 19, 22, 25], letter: 'D', isOfficialFormat: true },
  { id: 'tirage-samedi-5', date: '2026-10-17 17:00', numbers: [2, 6, 8, 10, 11, 15, 16, 20, 23, 25], letter: 'E', isOfficialFormat: true },
  { id: 'tirage-samedi-4', date: '2026-10-17 16:00', numbers: [3, 4, 7, 10, 12, 13, 16, 18, 21, 24], letter: 'M', isOfficialFormat: true },
  { id: 'tirage-samedi-3', date: '2026-10-17 15:00', numbers: [1, 5, 6, 9, 14, 15, 17, 22, 23, 25], letter: 'A', isOfficialFormat: true },
  { id: 'tirage-samedi-2', date: '2026-10-17 14:00', numbers: [2, 4, 8, 11, 13, 15, 18, 19, 21, 24], letter: 'S', isOfficialFormat: true },
  { id: 'tirage-samedi-1', date: '2026-10-17 13:00', numbers: [3, 6, 7, 10, 12, 14, 16, 20, 22, 25], letter: 'S', isOfficialFormat: true },

  // Samedi précédent (10 octobre)
  { id: 'tirage-prev-7', date: '2026-10-10 19:00', numbers: [1, 4, 5, 8, 9, 12, 17, 18, 23, 25], letter: 'I', isOfficialFormat: true },
  { id: 'tirage-prev-6', date: '2026-10-10 18:00', numbers: [2, 3, 7, 10, 11, 14, 16, 19, 21, 24], letter: 'D', isOfficialFormat: true },
  { id: 'tirage-prev-5', date: '2026-10-10 17:00', numbers: [4, 6, 8, 11, 13, 15, 17, 20, 22, 25], letter: 'E', isOfficialFormat: true },
  { id: 'tirage-prev-4', date: '2026-10-10 16:00', numbers: [1, 5, 7, 9, 10, 14, 18, 21, 23, 24], letter: 'M', isOfficialFormat: true },
  { id: 'tirage-prev-3', date: '2026-10-10 15:00', numbers: [2, 6, 8, 12, 13, 15, 19, 20, 22, 25], letter: 'A', isOfficialFormat: true },
  { id: 'tirage-prev-2', date: '2026-10-10 14:00', numbers: [3, 4, 7, 9, 11, 16, 17, 18, 21, 24], letter: 'S', isOfficialFormat: true },
  { id: 'tirage-prev-1', date: '2026-10-10 13:00', numbers: [1, 2, 5, 8, 10, 12, 14, 19, 22, 25], letter: 'S', isOfficialFormat: true },

  // Samedi 3 octobre
  { id: 'tirage-oct03-7', date: '2026-10-03 19:00', numbers: [2, 4, 6, 9, 11, 13, 15, 18, 20, 23], letter: 'I', isOfficialFormat: true },
  { id: 'tirage-oct03-6', date: '2026-10-03 18:00', numbers: [1, 3, 7, 8, 12, 14, 17, 19, 22, 25], letter: 'D', isOfficialFormat: true },
  { id: 'tirage-oct03-5', date: '2026-10-03 17:00', numbers: [4, 5, 8, 10, 11, 15, 16, 21, 24, 25], letter: 'E', isOfficialFormat: true },
  { id: 'tirage-oct03-4', date: '2026-10-03 16:00', numbers: [2, 3, 6, 9, 12, 14, 17, 18, 20, 23], letter: 'M', isOfficialFormat: true },
  { id: 'tirage-oct03-3', date: '2026-10-03 15:00', numbers: [1, 4, 7, 10, 13, 15, 19, 21, 22, 24], letter: 'A', isOfficialFormat: true },
  { id: 'tirage-oct03-2', date: '2026-10-03 14:00', numbers: [2, 5, 8, 11, 12, 16, 17, 20, 23, 25], letter: 'S', isOfficialFormat: true },
  { id: 'tirage-oct03-1', date: '2026-10-03 13:00', numbers: [3, 4, 6, 9, 10, 13, 14, 18, 21, 24], letter: 'S', isOfficialFormat: true },

  // Samedi 26 septembre
  { id: 'tirage-sep26-7', date: '2026-09-26 19:00', numbers: [1, 5, 7, 8, 11, 14, 16, 19, 22, 25], letter: 'I', isOfficialFormat: true },
  { id: 'tirage-sep26-6', date: '2026-09-26 18:00', numbers: [2, 4, 6, 10, 12, 13, 17, 20, 23, 24], letter: 'D', isOfficialFormat: true },
  { id: 'tirage-sep26-5', date: '2026-09-26 17:00', numbers: [3, 5, 8, 9, 11, 15, 18, 21, 22, 25], letter: 'E', isOfficialFormat: true },
  { id: 'tirage-sep26-4', date: '2026-09-26 16:00', numbers: [1, 4, 7, 10, 12, 14, 16, 19, 20, 24], letter: 'M', isOfficialFormat: true },
  { id: 'tirage-sep26-3', date: '2026-09-26 15:00', numbers: [2, 6, 8, 9, 13, 15, 17, 21, 23, 25], letter: 'A', isOfficialFormat: true },
  { id: 'tirage-sep26-2', date: '2026-09-26 14:00', numbers: [3, 4, 5, 11, 12, 14, 18, 20, 22, 24], letter: 'S', isOfficialFormat: true },
  { id: 'tirage-sep26-1', date: '2026-09-26 13:00', numbers: [1, 2, 7, 8, 10, 13, 16, 19, 21, 25], letter: 'S', isOfficialFormat: true },
];

export function computeStatistics(draws: HistoricalDraw[]): StatsSummary {
  const numberFrequencies: Record<number, number> = {};
  for (let i = 1; i <= 25; i++) {
    numberFrequencies[i] = 0;
  }

  const letterFrequencies: Record<CrescendoLetter, number> = {
    S: 0,
    A: 0,
    M: 0,
    E: 0,
    D: 0,
    I: 0,
  };

  const pairCounts: Record<string, number> = {};
  let highNumbersTotal = 0;
  let lowNumbersTotal = 0;
  let evenNumbersTotal = 0;
  let oddNumbersTotal = 0;
  let totalBallsDrawn = 0;

  for (const draw of draws) {
    // Fréquences des lettres
    if (letterFrequencies[draw.letter] !== undefined) {
      letterFrequencies[draw.letter]++;
    }

    // Fréquences des numéros
    const nums = draw.numbers;
    for (let i = 0; i < nums.length; i++) {
      const num = nums[i];
      if (numberFrequencies[num] !== undefined) {
        numberFrequencies[num]++;
      }
      totalBallsDrawn++;

      if (num >= 13) highNumbersTotal++;
      else lowNumbersTotal++;

      if (num % 2 === 0) evenNumbersTotal++;
      else oddNumbersTotal++;

      // Paires
      for (let j = i + 1; j < nums.length; j++) {
        const pairKey = `${Math.min(num, nums[j])}-${Math.max(num, nums[j])}`;
        pairCounts[pairKey] = (pairCounts[pairKey] || 0) + 1;
      }
    }
  }

  // Trier les numéros par fréquence
  const sortedNumberStats = Object.entries(numberFrequencies).map(([numStr, count]) => {
    const num = Number(numStr);
    const percentage = draws.length > 0 ? (count / draws.length) * 100 : 0;
    return { number: num, count, percentage: Math.round(percentage * 10) / 10 };
  });

  const mostFrequentNumbers = [...sortedNumberStats].sort((a, b) => b.count - a.count).slice(0, 7);
  const leastFrequentNumbers = [...sortedNumberStats].sort((a, b) => a.count - b.count).slice(0, 7);

  // Top paires
  const pairOccurrences = Object.entries(pairCounts)
    .map(([key, count]) => {
      const [n1, n2] = key.split('-').map(Number);
      return { pair: [n1, n2] as [number, number], count };
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  const highPercent = totalBallsDrawn > 0 ? (highNumbersTotal / totalBallsDrawn) * 100 : 50;
  const evenPercent = totalBallsDrawn > 0 ? (evenNumbersTotal / totalBallsDrawn) * 100 : 50;

  const dateRange = draws.length > 0 ? `${draws[draws.length - 1].date} au ${draws[0].date}` : 'Période récente';

  return {
    numberFrequencies,
    letterFrequencies,
    mostFrequentNumbers,
    leastFrequentNumbers,
    pairOccurrences,
    highLowRatio: {
      high: highNumbersTotal,
      low: lowNumbersTotal,
      highPercent: Math.round(highPercent * 10) / 10,
    },
    evenOddRatio: {
      even: evenNumbersTotal,
      odd: oddNumbersTotal,
      evenPercent: Math.round(evenPercent * 10) / 10,
    },
    totalDrawsAnalyzed: draws.length,
    dateRange,
  };
}
