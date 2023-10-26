import React, { forwardRef, MouseEvent, ReactNode, useCallback } from 'react';

import { CarouselCenteredSlideComponent } from '~/components/CarouselCenteredSlide/CarouselCenteredSlideComponent';

export type Props = {
  className?: string;
  itemClassName?: string;
  activeItemClassName?: string;
  activeIdx: number;
  children: ReactNode[];
  handleChange: (idx: number) => void;
};

export const CarouselCenteredSlidesComponent = forwardRef<HTMLDivElement, Props>(
  ({ className, itemClassName, activeItemClassName, activeIdx, children, handleChange }, ref) => {
    const handleClick = useCallback(({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
      handleChange(Number(currentTarget.name));
    }, []);

    return (
      <div className={className} ref={ref}>
        {children.map((child, idx) => (
          <CarouselCenteredSlideComponent
            className={itemClassName}
            activeClassName={activeItemClassName}
            key={idx}
            active={idx === activeIdx}
            idx={idx}
            handleClick={handleClick}
          >
            {child}
          </CarouselCenteredSlideComponent>
        ))}
      </div>
    );
  }
);
