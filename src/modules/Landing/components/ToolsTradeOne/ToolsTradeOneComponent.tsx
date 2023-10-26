import React, { FC } from 'react';

import { ImgComponent } from '~/components/Img/ImgComponent';

import style from './style.module.scss';

export const ToolsTradeOneComponent: FC = () => (
  <div className={style.toolsTrade}>
    <ImgComponent src="/static/media/landing/trade-1.svg" alt="Trade estimations section and Trade entry section" />
  </div>
);
