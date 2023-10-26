import React, { FC } from 'react';

import { ImgComponent } from '~/components/Img/ImgComponent';
import { LinkComponent } from '~/components/Link/LinkComponent';
import { LinkIcon } from '~/assets/Icons';
import { API_DOC_URL } from '~/constants/configConstants';

import style from './style.module.scss';

export const ToolsEnterpriseOneComponent: FC = () => (
  <div>
    <div className={style.toolsEnterprisePresentation}>
      <div className={style.toolsEnterpriseContent}>
        <p className={style.toolsEnterprisePitch}>
          We agonize over the right abstractions so you and your teams don’t need to stitch together disparate systems
          or spend months integrating trading functionality.
        </p>
        <div className={style.toolsEnterpriseLinks}>
          <LinkComponent className={style.toolsEnterpriseLink} href={API_DOC_URL} target="_blank">
            <LinkIcon className={style.toolsEnterpriseLinkIcon} />
            Public API
          </LinkComponent>
          <LinkComponent className={style.toolsEnterpriseLink} href={API_DOC_URL} target="_blank">
            <LinkIcon className={style.toolsEnterpriseLinkIcon} />
            Authorized API
          </LinkComponent>
        </div>
      </div>
    </div>
    <div className={style.toolsEnterpriseImg}>
      <ImgComponent
        src="/static/media/landing/enterprise-1.svg"
        alt="Update order response and Trading stats response"
      />
    </div>
  </div>
);
