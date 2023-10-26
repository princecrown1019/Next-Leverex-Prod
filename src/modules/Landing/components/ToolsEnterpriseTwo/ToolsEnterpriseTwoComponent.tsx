import React, { FC } from 'react';

import { ImgComponent } from '~/components/Img/ImgComponent';

import style from './style.module.scss';

export const ToolsEnterpriseTwoComponent: FC = () => (
  <div className={style.toolsEnterprise}>
    <ImgComponent src="/static/media/landing/enterprise-2.svg" alt="Balance response and Market order" />
  </div>
);
