import React, { FC } from 'react';

import { ImgComponent } from '~/components/Img/ImgComponent';

import style from './style.module.scss';

export const ToolsEnterpriseThreeComponent: FC = () => (
  <div className={style.toolsEnterprise}>
    <ImgComponent
      src="/static/media/landing/enterprise-3.svg"
      alt="Dealer data response, Subscribe dealers and Unsubscribe dealers response"
    />
  </div>
);
