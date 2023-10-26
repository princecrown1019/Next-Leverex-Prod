import React, { ChangeEvent, memo, MouseEvent, useCallback, useEffect, useMemo, useRef } from 'react';

import clsx from 'clsx';

import { ButtonComponent } from '~/components/Button/ButtonComponent';
import { fixDecimals } from '~/services/NumberFormat/numberFormatService';

import style from './style.module.scss';

type Props = {
  className?: string;
  value?: number;
  min?: number;
  disabled?: boolean;
  step?: number;
  markers?: number;
  max: number;
  handleChange?: (value: number) => void;
  handleMouseDown?: () => void;
  handleMouseUp?: (value: number) => void;
  withMin?: boolean;
  withMax?: boolean;
};

const MAX_WIDTH = 100;

export const SliderComponent = memo<Props>(
  ({
    className,
    value,
    markers,
    withMax,
    withMin,
    disabled,
    min = 0,
    step = 1,
    max,
    handleChange,
    handleMouseUp,
    handleMouseDown
  }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const thumbRef = useRef<HTMLSpanElement>(null);
    const trackRef = useRef<HTMLSpanElement>(null);
    const tickersRef = useRef<HTMLSpanElement>(null);
    const tickerButtonsRef = useRef<HTMLSpanElement>(null);

    const withButtons = useMemo(() => withMax || withMin, [withMax, withMin]);
    const localStep = useMemo(() => Number(fixDecimals(MAX_WIDTH / (max / step), 8)), [max, step]);

    const markerStep = useMemo(() => (markers ? MAX_WIDTH / markers : null), [markers]);
    const markersArray = useMemo(
      () => (markers ? Array.from({ length: markers + 1 }).map((_, idx) => idx) : []),
      [markers]
    );
    const markersValues = useMemo(() => {
      if (!markers || !markersArray.length) return [];

      return markersArray.map((tickIdx) => (tickIdx / markers) * 100);
    }, [markersArray.length, markers]);

    const applyTickerStyles = useCallback(
      (newWidth: number) => {
        if (!tickersRef.current || !tickerButtonsRef.current || !markers || !markerStep) return;

        const tickers = [...tickersRef.current.children];

        for (const [idx] of [...tickersRef.current.children].entries()) {
          const tickerValue = idx * markerStep;

          tickers[idx].classList.toggle(style.tickActive, tickerValue <= newWidth);
        }
      },
      [tickersRef.current, tickerButtonsRef.current, markers, markerStep]
    );

    const applyWidth = useCallback(
      (newWidth: number) => {
        if (!thumbRef.current || !trackRef.current || !inputRef.current) return;

        const width = Math.min(newWidth, MAX_WIDTH);

        applyTickerStyles(width);

        inputRef.current.value = `${width}`;
        thumbRef.current.style.left = `${width}%`;
        trackRef.current.style.width = `${width}%`;
      },
      [thumbRef.current, trackRef.current]
    );

    useEffect(() => {
      if (!inputRef.current || typeof value === 'undefined' || disabled) return;

      applyWidth(Number(((value / max) * 100).toFixed(2)));
    }, [value, thumbRef.current, trackRef.current]);

    const handleLocalChange = useCallback(
      ({ currentTarget }: ChangeEvent<HTMLInputElement>) => {
        if (!inputRef.current || disabled || !markers) return;

        const width = Number(currentTarget.value);
        const roundedWidth = markersValues.find((w) => Math.abs(width - w) <= 2) || null;
        const newWidth = roundedWidth || width;

        applyWidth(newWidth);

        handleChange?.(newWidth >= 100 ? max : Number((max * (newWidth / 100)).toFixed(8)));
      },
      [disabled, max, handleChange, inputRef.current, applyWidth, markersValues.length]
    );

    const handleMinClick = useCallback(() => {
      if (disabled) return;

      applyWidth(0);
      handleChange?.(min);
    }, [disabled, handleChange, min]);

    const handleMaxClick = useCallback(() => {
      if (disabled) return;

      applyWidth(MAX_WIDTH);
      handleChange?.(max);
    }, [disabled, handleChange, max]);

    const handleLocalMouseUp = useCallback(({ currentTarget }: MouseEvent<HTMLInputElement>) => {
      handleMouseUp?.(Number(currentTarget.value));
    }, []);

    return (
      <div className={clsx(style.sliderContainer, className)}>
        {withButtons && (
          <div className={style.sliderButtons}>
            <ButtonComponent className={style.sliderButton} onClick={handleMinClick} disabled={disabled} withoutRipple>
              Min
            </ButtonComponent>
            <ButtonComponent className={style.sliderButton} onClick={handleMaxClick} disabled={disabled} withoutRipple>
              Max
            </ButtonComponent>
          </div>
        )}
        <div className={clsx(style.sliderWrapper, withButtons && style.sliderWrapperMarginTop)}>
          <input
            className={style.sliderInput}
            type="range"
            min={0}
            spellCheck={false}
            step={localStep}
            onMouseUp={handleLocalMouseUp}
            max={MAX_WIDTH}
            onMouseDown={handleMouseDown}
            defaultValue={0}
            disabled={disabled}
            ref={inputRef}
            onChange={handleLocalChange}
          />
          <span className={style.slider}>
            <span className={style.track} ref={trackRef} />
            <span className={style.thumb} ref={thumbRef} />
          </span>

          {!!markersArray.length && (
            <>
              <span className={style.ticks} ref={tickersRef}>
                {markersArray.map((tick) => (
                  <span className={style.tick} key={tick} />
                ))}
              </span>
              <span className={style.tickButtons} ref={tickerButtonsRef}>
                {markersArray.map((tick) => (
                  <ButtonComponent
                    className={style.tickButton}
                    key={tick}
                    onMouseDown={handleMouseDown}
                    withoutRipple
                  />
                ))}
              </span>
            </>
          )}
        </div>
      </div>
    );
  }
);
