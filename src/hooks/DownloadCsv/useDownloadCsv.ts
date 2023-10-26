import { useCallback, useRef } from 'react';

export const useDownloadCsv = () => {
  const anchorRef = useRef<HTMLAnchorElement>(null);

  const download = useCallback((data: BlobPart, callback?: () => void) => {
    if (!anchorRef.current) return;

    const blob = new Blob([data], { type: 'text/csv;charset=utf-8;' });

    anchorRef.current.href = URL.createObjectURL(blob);
    anchorRef.current.click();

    URL.revokeObjectURL(anchorRef.current.href);

    callback?.();
  }, []);

  return { download, anchorRef };
};
