import React, { FC, RefObject } from 'react';

import clsx from 'clsx';

import { ButtonComponent } from '~/components/Button/ButtonComponent';

import style from './style.module.scss';

export type Props = {
  className?: string;
  containerRef: RefObject<HTMLDivElement>;
  handleClick: () => void;
};

export const InstitutionsSolutionsView: FC<Props> = ({ className, containerRef, handleClick }) => (
  <section className={clsx(style.solutions, className)} ref={containerRef}>
    <ButtonComponent className={style.solutionsLink} withoutRipple onClick={handleClick}>
      <h2 className={style.solutionsHeadline}>Develop your crypto solution with Leverex [Placeholder]</h2>
      <div className={style.solutionsPitches}>
        <p className={style.solutionsPitch}>
          Collaborate with our team of tech and business development experts to implement a solution tailored to your
          needs.
        </p>
        <p className={style.solutionsPitch}>
          Work with a dedicated account manager responsible for delivering industry-leading client services.
        </p>
      </div>
      <span className={style.solutionsButton}>Contact us</span>
    </ButtonComponent>
  </section>
);
