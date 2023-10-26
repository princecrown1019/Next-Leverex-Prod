import React, { FC } from 'react';

import { ImgComponent } from '~/components/Img/ImgComponent';

import style from './style.module.scss';

export const ToolsTradeTwoComponent: FC = () => (
  <div className={style.toolsTrade}>
    <ImgComponent src="/static/media/landing/trade-2.svg" alt="Trade data section and Trade stats section" />
  </div>
);
