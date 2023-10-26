import React, { memo, ReactNode } from 'react';

import { ImgComponent } from '~/components/Img/ImgComponent';
import { ActionButtonComponent } from '~/components/ActionButton/ActionButtonComponent';

import style from './style.module.scss';

export type Props = {
  title: string;
  button?: string;
  children: ReactNode | ReactNode[];
  handleButtonClick: () => void;
};

export const AuthEidInstructionsComponent = memo<Props>(({ title, button, children, handleButtonClick }) => (
  <>
    <ImgComponent
      className={style.authEidInstructionsModalBrand}
      src="/static/media/landing/auth-eid.svg"
      alt="auth-eid"
    />
    <h4 className={style.authEidInstructionsModalHeadline}>{title}</h4>
    {children}
    {button && (
      <ActionButtonComponent className={style.authEidInstructionsModalButton} handleClick={handleButtonClick}>
        {button}
      </ActionButtonComponent>
    )}
  </>
));
