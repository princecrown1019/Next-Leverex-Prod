import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentProductLiveCutOffPrice } from '~/store/Market/selectors';
import { roundNumber } from '~/services/Number/nubmerServices';

export const useLadderAlignment = (spread: number) => {
  const ladderContainerRef = useRef<HTMLDivElement>(null);

  const [midPrice, setMidPrice] = useState(0);

  const liveCutOffPrice = useSelector(selectCurrentProductLiveCutOffPrice);

  const align = useCallback(() => {
    const body = ladderContainerRef.current?.children.item(1);
    if (!body) return;

    setMidPrice(roundNumber(liveCutOffPrice, spread, false));
    body.scrollTo({ top: body.scrollHeight / 2 - body.clientHeight / 2 });
  }, [liveCutOffPrice, ladderContainerRef.current]);

  useEffect(align, [ladderContainerRef.current]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.code !== 'Space') return;

      event.preventDefault();
      align();
    },
    [liveCutOffPrice]
  );

  const handleMouseDown = useCallback((event: MouseEvent) => {
    if (event.button !== 1) return;

    event.stopPropagation();
    event.preventDefault();
    align();
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    ladderContainerRef.current?.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      ladderContainerRef.current?.removeEventListener('mousedown', handleMouseDown);
    };
  }, [liveCutOffPrice]);

  return { midPrice, align, ladderContainerRef };
};
