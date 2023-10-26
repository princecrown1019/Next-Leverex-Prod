import React, { FC, useCallback, useEffect, useRef, useState } from 'react';

import { NewsHeaderView, Props as ViewProps } from '~/modules/News/views/Header/HeaderView';

type Props = Omit<ViewProps, 'handleBurgerClick' | 'handleLogoClick' | 'referenceProgressBar' | 'open'> & {
  withProgressScroll?: boolean;
};

export const NewsHeaderContainer: FC<Props> = ({ withProgressScroll, ...props }) => {
  const progressBarRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);

  const handleBurgerClick = useCallback(() => {
    setOpen((prevOpen) => !prevOpen);
  }, []);

  const handleScroll = useCallback(() => {
    requestAnimationFrame(() => {
      if (!progressBarRef.current) return;

      const percentage = Math.floor((window.scrollY / (window.document.body.scrollHeight - window.innerHeight)) * 100);

      progressBarRef.current.style.width = `${percentage}%`;
    });
  }, []);

  useEffect(() => {
    if (!withProgressScroll) return;

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <NewsHeaderView
      {...props}
      open={open}
      handleBurgerClick={handleBurgerClick}
      referenceProgressBar={progressBarRef}
    />
  );
};
