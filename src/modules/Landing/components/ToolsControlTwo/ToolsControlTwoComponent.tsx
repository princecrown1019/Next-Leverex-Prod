import React, { FC } from 'react';

import { ImgComponent } from '~/components/Img/ImgComponent';

import style from './style.module.scss';

export const ToolsControlTwoComponent: FC = () => (
  <div className={style.toolsControl}>
    <ImgComponent src="/static/media/landing/control-1.svg" alt="Open positions section and Account summary section" />
  </div>
);
