import React, { useState, useCallback, memo, MouseEvent, useRef, useEffect } from 'react';

import clsx from 'clsx';

import { useHorizontalResize } from '~/hooks/Resize/useResize';
import { TabComponent } from '~/components/Tab/TabComponent';

import style from './style.module.scss';

type Props = {
  className?: string;
  tabClassName?: string;
  tabs: string[];
  tabIdx?: number;
  disabled?: boolean[];
  rounded?: boolean;
  tags?: (null | string | number)[];
  tagsVisible?: null | boolean;
  handleChange?: (idx: number) => void;
};

export const TabsComponent = memo<Props>(
  ({ className, tabClassName, tabIdx, disabled, tags, tagsVisible, tabs, rounded, handleChange }) => {
    const tabsRef = useRef<HTMLDivElement>(null);
    const indicatorRef = useRef<HTMLSpanElement>(null);

    const [idx, setIdx] = useState(tabIdx ?? 0);

    const moveIndicator = useCallback(() => {
      if (!tabsRef.current || !indicatorRef.current) return;

      indicatorRef.current.style.width = `calc(100% / ${tabs.length} - 2px)`;
      indicatorRef.current.style.marginLeft = `calc((100% / ${tabs.length}) * ${idx} + 1px)`;
    }, [idx, tabs.length]);

    useHorizontalResize(moveIndicator, tabsRef);
    useEffect(moveIndicator, [idx]);

    const handleItemClick = useCallback(
      ({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
        const index = tabs.indexOf(currentTarget.name);
        if (index === idx || !indicatorRef.current || disabled?.[index]) return;

        setIdx(index);
        handleChange?.(index);
      },
      [idx, tabs, disabled]
    );

    return (
      <div className={clsx(style.tabs, className)}>
        <div className={clsx(style.tabsWrapper, rounded && style.tabsWrapperRounded)} ref={tabsRef}>
          {tabs.map((tab, itemIdx) => (
            <TabComponent
              className={tabClassName}
              active={itemIdx === idx}
              label={tab}
              disabled={disabled?.[itemIdx]}
              key={tab}
              tag={tagsVisible ? tags?.[itemIdx]?.toString() : null}
              handleClick={handleItemClick}
            />
          ))}
        </div>
        <span className={style.indicator} ref={indicatorRef} />
      </div>
    );
  }
);
