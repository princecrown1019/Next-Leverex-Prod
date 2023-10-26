import React, { FC } from 'react';

import clsx from 'clsx';

import { DropdownArrowIcon } from '~/assets/Icons';

import style from './style.module.scss';

type Props = {
  className?: string;
  open: boolean;
};

export const DropdownArrowComponent: FC<Props> = ({ className, open }) => (
  <DropdownArrowIcon className={clsx(style.dropdownArrow, className, open && style.dropdownArrowOpen)} />
);
