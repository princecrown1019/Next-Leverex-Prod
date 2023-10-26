import { useCallback, useRef } from 'react';

import { jsPDF } from 'jspdf';
import { default as autoTable } from 'jspdf-autotable';

type DocExtended = jsPDF & {
  lastAutoTable?: {
    finalY: number;
  };
};

export const usePdfDocument = (margin: number) => {
  const docRef = useRef<null | DocExtended>(null);

  const applyFontStyle = useCallback((style: 400 | 700) => {
    if (!docRef.current) return;

    docRef.current.setFont('helvetica', 'normal', style);
  }, []);

  const applyHeadlineSettings = useCallback((fontSize = 14) => {
    if (!docRef.current) return;

    docRef.current.setFontSize(fontSize);
    docRef.current.setTextColor('#1C1C27');
    applyFontStyle(700);
  }, []);

  const applySecondaryTextSettings = useCallback((fontSize = 14) => {
    if (!docRef.current) return;

    docRef.current.setFontSize(fontSize);
    docRef.current.setTextColor('#636383');
    applyFontStyle(400);
  }, []);

  const getFinalY = useCallback(() => {
    if (!docRef.current) return 0;

    return docRef.current.lastAutoTable?.finalY || 0;
  }, []);

  const initDocument = useCallback(() => {
    docRef.current = new jsPDF('portrait', 'pt', 'a4');
  }, []);

  const addCenteredHeadline = useCallback((text: string, y?: number) => {
    if (!docRef.current) return;

    applyHeadlineSettings(20);
    docRef.current.text(text, 300, y ?? getFinalY(), { align: 'center' });
  }, []);

  const addHeadline = useCallback((text: string, x: number, y?: number) => {
    if (!docRef.current) return;

    applyHeadlineSettings();
    docRef.current.text(text, x, y ?? getFinalY());
  }, []);

  const addCenteredSecondaryText = useCallback((text: string, y?: number) => {
    if (!docRef.current) return;

    applySecondaryTextSettings(12);
    docRef.current.text(text, 300, y ?? getFinalY(), { align: 'center' });
  }, []);

  const addSecondaryText = useCallback((text: string, x: number, y?: number) => {
    if (!docRef.current) return;

    applySecondaryTextSettings();
    docRef.current.text(text, x, y ?? getFinalY());
  }, []);

  const addImage = useCallback((url: string, x: number, y: number, w: number, h: number, callback: () => void) => {
    if (!docRef.current) return;

    const image = new Image();

    image.setAttribute('crossOrigin', 'anonymous');
    image.setAttribute('src', url);

    image.addEventListener('load', () => {
      docRef.current!.addImage(image, 'PNG', x, y, w, h);
      callback();
    });
  }, []);

  const addTable = useCallback((head: string[], body: string[][], y?: number, boldRow?: (row: string[]) => boolean) => {
    if (!docRef.current) return;

    const cellWidth = head.length === 2 ? (docRef.current.internal.pageSize.getWidth() - margin * 2) / 2 : undefined;

    autoTable(docRef.current, {
      head: [head],
      body,
      headStyles: { fillColor: '#1C1C27', cellWidth },
      margin: margin,
      startY: getFinalY() + (y || 0),
      willDrawCell: (data) => {
        console.log(data.row.raw);

        if (boldRow?.(data.row.raw as string[])) {
          applyFontStyle(700);
        }
      }
    });
  }, []);

  const addTableWithHeadline = useCallback(
    (headline: string, head: string[], body: string[][], y?: number, boldRow?: (row: string[]) => boolean) => {
      if (!docRef.current) return;

      addHeadline(headline, margin, getFinalY() + (y || 0) + 35);
      addTable(head, body, (y || 0) + 50, boldRow);
    },
    []
  );

  const download = useCallback((fileName?: null | string) => {
    if (!docRef.current || !fileName) return;

    docRef.current.save(fileName);
    docRef.current = null;
  }, []);

  return {
    initDocument,
    addCenteredHeadline,
    addHeadline,
    addCenteredSecondaryText,
    addSecondaryText,
    addImage,
    addTable,
    addTableWithHeadline,
    download
  };
};
