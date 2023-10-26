import React, { FC, ReactNode, useState, useCallback, useRef, useEffect } from 'react';

import clsx from 'clsx';

import { ButtonComponent } from '~/components/Button/ButtonComponent';
import { DropdownArrowIcon } from '~/assets/Icons';

import style from './style.module.scss';

export type Props = {
  className?: string;
  headline: string;
  defaultValue?: boolean;
  children: ReactNode | ReactNode[];
};

export const FaqAccordionComponent: FC<Props> = ({ className, headline, defaultValue, children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [visible, setVisible] = useState(defaultValue || false);

  useEffect(() => {
    if (!contentRef.current || !containerRef.current) return;

    const height = (visible ? contentRef.current.clientHeight : 0) + 56;
    containerRef.current.style.height = `${height}px`;

    if (!visible) return;

    const timeout = setTimeout(() => {
      if (!containerRef.current) return;

      containerRef.current.style.height = 'auto';
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, [visible]);

  const handleToggleLocal = useCallback(() => {
    setVisible((prevVisible) => {
      if (prevVisible && contentRef.current && containerRef.current) {
        containerRef.current.style.height = `${contentRef.current.clientHeight + 56}px`;
      }

      return !prevVisible;
    });
  }, []);

  return (
    <div className={clsx(style.faqAccordion, className)} ref={containerRef}>
      <ButtonComponent className={style.faqAccordionHeader} withoutRipple onClick={handleToggleLocal}>
        <h2 className={style.faqAccordionHeadline}>{headline}</h2>
        <DropdownArrowIcon
          className={clsx(style.faqAccordionArrowIcon, visible && style.faqAccordionArrowIconVisible)}
        />
      </ButtonComponent>
      <div className={style.faqAccordionBody} ref={contentRef}>
        <div className={style.faqAccordionBodyContent}>{children}</div>
      </div>
    </div>
  );
};
