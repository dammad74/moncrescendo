import jsPDF from 'jspdf';
import { Combination } from '../types/crescendo';

/**
 * Exporte un jeu de combinaisons au format PDF haute fidélité
 */
export function exportToPdf(combinations: Combination[], title = 'Grilles Mon Crescendo'): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 18;

  // En-tête
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, pageWidth, 28, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('MON CRESCENDO', 14, 12);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(203, 213, 225);
  doc.text('Récapitulatif des combinaisons générées — Usage personnel FDJ', 14, 19);

  const formattedDate = new Date().toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  doc.text(`Édité le : ${formattedDate}`, pageWidth - 14, 19, { align: 'right' });

  y = 38;

  // Avertissement légal en bandeau
  doc.setFillColor(241, 245, 249);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(14, y, pageWidth - 28, 12, 2, 2, 'FD');

  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  doc.text(
    'Avertissement : Les tirages de loterie sont strictement aléatoires et indépendants. Aucun outil ne garantit un gain.',
    pageWidth / 2,
    y + 5,
    { align: 'center' }
  );
  doc.text(
    'Jouer comporte des risques : endettement, isolement, dépendance. Appelez le 09 74 75 13 13 (appel non surtaxé).',
    pageWidth / 2,
    y + 9,
    { align: 'center' }
  );

  y += 20;

  // Titre de section
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(`${title} (${combinations.length} grille${combinations.length > 1 ? 's' : ''})`, 14, y);

  y += 6;

  // Grilles
  combinations.forEach((comb, index) => {
    // Nouvelle page si on approche du bas
    if (y > 265) {
      doc.addPage();
      y = 20;
    }

    doc.setFillColor(index % 2 === 0 ? 255 : 248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(14, y, pageWidth - 28, 14, 2, 2, 'FD');

    // Label grille
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 41, 59);
    doc.text(`Grille ${index + 1}`, 18, y + 9);

    // Boules numéros (10 numéros Crescendo)
    let ballX = 35;
    comb.numbers.forEach((num) => {
      doc.setFillColor(37, 99, 235); // blue-600
      doc.circle(ballX, y + 7, 3.8, 'F');

      doc.setFontSize(7.5);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(255, 255, 255);
      doc.text(num.toString(), ballX, y + 8.3, { align: 'center' });

      ballX += 9.2;
    });

    // Lettre Crescendo attribuée
    ballX += 2.5;
    doc.setFillColor(147, 51, 234); // purple-600
    doc.circle(ballX, y + 7, 4.3, 'F');

    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    doc.text(comb.letter, ballX, y + 8.5, { align: 'center' });

    // Somme & Parité à droite
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 116, 139);
    doc.text(
      `Somme: ${comb.sum} | P:${comb.evenCount} / I:${comb.oddCount}`,
      pageWidth - 20,
      y + 9,
      { align: 'right' }
    );

    y += 16;
  });

  // Pied de page
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(148, 163, 184);
    doc.text(
      `Mon Crescendo — Document généré pour validation de grilles FDJ — Page ${i} sur ${pageCount}`,
      pageWidth / 2,
      290,
      { align: 'center' }
    );
  }

  doc.save(`mon-crescendo-grilles-${Date.now().toString().slice(-6)}.pdf`);
}

/**
 * Exporte un jeu de combinaisons au format CSV / Excel
 */
export function exportToCsv(combinations: Combination[], filename = 'mon-crescendo-combinaisons.csv'): void {
  const headers = [
    'N° Grille',
    'Numéros',
    'Lettre',
    'Somme',
    'Pairs',
    'Impairs',
    'Hauts (13-25)',
    'Bas (1-12)',
    'Date de génération',
  ];

  const rows = combinations.map((c, i) => [
    `Grille ${i + 1}`,
    `"${c.numbers.join(' - ')}"`,
    c.letter,
    c.sum,
    c.evenCount,
    c.oddCount,
    c.highCount,
    c.lowCount,
    c.createdAt,
  ]);

  // Ajouter le BOM UTF-8 (\uFEFF) pour qu'Excel ouvre le fichier avec le bon encodage
  const csvContent =
    '\uFEFF' +
    [headers.join(';'), ...rows.map((r) => r.join(';'))].join('\r\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Copie au format texte presse-papier
 */
export async function copyCombinations(combinations: Combination[]): Promise<boolean> {
  const textLines = combinations.map(
    (c, i) => `Grille ${i + 1} : [ ${c.numbers.join(' - ')} ] + Lettre [ ${c.letter} ] (Somme : ${c.sum})`
  );
  const text = [
    '=== MON CRESCENDO — GRILLES SÉLECTIONNÉES ===',
    ...textLines,
    '==================================================',
    'Avertissement : Les tirages de loterie sont strictement aléatoires.',
  ].join('\n');

  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
