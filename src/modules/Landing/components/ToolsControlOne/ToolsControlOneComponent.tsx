import React, { FC } from 'react';

import { ImgComponent } from '~/components/Img/ImgComponent';

import style from './style.module.scss';

export const ToolsControlOneComponent: FC = () => (
  <div className={style.toolsControl}>
    <ImgComponent
      src="/static/media/landing/control-2.svg"
      alt="Trade history section, Profit loss section and Leverage section"
    />
  </div>
);
