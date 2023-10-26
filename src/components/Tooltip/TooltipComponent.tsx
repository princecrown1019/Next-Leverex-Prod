import React, { CSSProperties, FC, ReactNode, useCallback, useEffect, useRef, useState } from 'react';

import clsx from 'clsx';

import { PortalComponent } from '~/components/Portal/PortalComponent';
import { Portal } from '~/types/portalsTypes';
import { useDebounce } from '~/hooks/Debounce/useDebounce';

import style from './style.module.scss';

type Props = {
  className?: string;
  tooltipClassName?: string;
  delay?: number;
  tooltip: ReactNode;
  left?: boolean;
  top?: boolean;
  bottom?: boolean;
  right?: boolean;
  children: ReactNode | ReactNode[];
};

export const TooltipComponent: FC<Props> = ({
  className,
  tooltipClassName,
  delay = 200,
  left,
  top,
  bottom = true,
  right,
  tooltip,
  children
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeout = useRef<NodeJS.Timeout>();

  const [visible, setVisible] = useState(false);
  const [styles, setStyles] = useState<CSSProperties>();

  const debouncedVisible = useDebounce(visible, 200);

  const topClassName = top && style.tooltipTop;
  const leftClassName = left && style.tooltipLeft;
  const rightClassName = right && style.tooltipRight;
  const bottomClassName = bottom && style.tooltipBottom;
  const tooltipDirectionClassName = topClassName || leftClassName || bottomClassName || rightClassName;

  useEffect(() => {
    if (!tooltipRef.current) return;

    setTimeout(() => {
      tooltipRef.current?.classList.toggle(style.tooltipVisible, visible);
    }, 0);
  }, [visible]);

  const handleMouseEnter = useCallback(() => {
    if (!wrapperRef.current) return;

    const dimensions = wrapperRef.current.getBoundingClientRect();
    const newStyle: CSSProperties = {};

    newStyle.left = dimensions.left + dimensions.width / 2;
    newStyle.left = Math.min(newStyle.left, document.body.clientWidth);

    if (dimensions.top < window.innerHeight / 2) {
      newStyle.top = top ? dimensions.top - dimensions.height : dimensions.top + dimensions.height;
    } else {
      newStyle.bottom = window.innerHeight - dimensions.top;
    }

    timeout.current = setTimeout(() => {
      setStyles(newStyle);
      setVisible(true);
    }, delay);
  }, []);

  const handleMouseLeave = useCallback(() => {
    clearTimeout(timeout.current!);
    setVisible(false);
  }, []);

  return (
    <div className={clsx(style.tooltipWrapper, className)} ref={wrapperRef}>
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {children}
      </div>
      {(visible || debouncedVisible) && (
        <PortalComponent id={Portal.TOOLTIP}>
          <div
            className={clsx(style.tooltip, tooltipClassName, tooltipDirectionClassName)}
            style={styles}
            ref={tooltipRef}
          >
            {tooltip}
          </div>
        </PortalComponent>
      )}
    </div>
  );
};
