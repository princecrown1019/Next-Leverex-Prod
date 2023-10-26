import React, { memo } from 'react';

import clsx from 'clsx';

import style from './style.module.scss';

type Props = {
  className?: string;
  label?: string;
  value: number;
  min?: number;
  max?: number;
};

const marks = Array.from({ length: 11 }, (_, idx) => `${idx + 1}`);

export const LeverageComponent = memo<Props>(({ className, label, value, min = 0, max = 10 }) => {
  const steps = max - min;

  const classNameLeft = value < 0.3 && style.thumbLeft;
  const classNameRight = value > 9.7 && style.thumbRight;

  return (
    <div className={clsx(style.leverage, className)}>
      <label className={style.label}>{label || 'Account leverage'}</label>
      <div className={style.track}>
        {marks.map((idx) => (
          <div className={style.dot} key={idx} />
        ))}
        <span className={clsx(style.thumb, classNameLeft, classNameRight)} style={{ left: `${value * steps}%` }}>
          x{value.toFixed(2)}
        </span>
      </div>
      <div className={style.marks}>
        <span className={style.mark}>{min?.toFixed(2)}</span>
        <span className={style.mark}>{max?.toFixed(2)}</span>
      </div>
    </div>
  );
});
