import React, { forwardRef, MouseEvent } from 'react';

import clsx from 'clsx';

import { ButtonComponent } from '~/components/Button/ButtonComponent';
import { TagComponent } from '~/components/Tag/TagComponent';

import style from './style.module.scss';

type Props = {
  className?: string;
  label: string;
  disabled?: boolean;
  active: boolean;
  tag?: null | string;
  handleClick: (event: MouseEvent<HTMLButtonElement>) => void;
};

export const TabComponent = forwardRef<HTMLButtonElement, Props>(
  ({ className, active, label, disabled, tag, handleClick }, ref) => (
    <ButtonComponent
      className={clsx(style.tab, className, active && style.tabActive)}
      name={label}
      disabled={disabled}
      onClick={handleClick}
      ref={ref}
    >
      <span className={clsx(!!tag && style.tabLabelMarginRight)}>{label}</span>
      {tag && <TagComponent className={style.tabTag}>{tag}</TagComponent>}
    </ButtonComponent>
  )
);
