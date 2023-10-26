import React, { memo, useEffect, useRef } from 'react';

import clsx from 'clsx';

import { ActionButtonComponent } from '~/components/ActionButton/ActionButtonComponent';
import { ProgressBarComponent } from '~/components/ProgressBar/ProgressBarComponent';

import style from './style.module.scss';

export type Props = {
  handleTryAgainClick: () => void;
};

const initialTime = 59;

export const AuthEidCountDown = memo<Props>(({ handleTryAgainClick }) => {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const timeRef = useRef<HTMLSpanElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!progressBarRef.current || !timeRef.current || !buttonRef.current) return;
      const value = Number(timeRef.current.textContent) - 1;

      progressBarRef.current.style.width = `${(value / initialTime) * 100}%`;

      if (value < 1) {
        clearInterval(interval);

        timeRef.current.parentElement?.classList.add(style.authEidCountDownTimerHidden);
        buttonRef.current.classList.remove(style.authEidCountDownButtonHidden);
      } else {
        timeRef.current.textContent = `${value}`;
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={style.authEidCountDown}>
      <p className={style.authEidCountDownPitch}>Sign with the app</p>

      <div className={style.authEidCountDownProgressContainer}>
        <ProgressBarComponent value={100} ref={progressBarRef} />
      </div>

      <p className={style.authEidCountDownTimer}>
        <span ref={timeRef}>{initialTime}</span>s left
      </p>

      <ActionButtonComponent
        className={clsx(style.authEidCountDownButton, style.authEidCountDownButtonHidden)}
        handleClick={handleTryAgainClick}
        ref={buttonRef}
      >
        Try again
      </ActionButtonComponent>
    </div>
  );
});
