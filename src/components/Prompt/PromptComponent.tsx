import React, { memo, ReactNode, useLayoutEffect, useRef } from 'react';

import { ModalHeadlineComponent } from '~/components/ModalHeadline/ModalHeadlineComponent';
import { ActionButtonComponent } from '~/components/ActionButton/ActionButtonComponent';
import { ButtonComponent } from '~/components/Button/ButtonComponent';
import { ModalComponent, Props as ModalProps } from '~/components/Modal/ModalComponent';

import style from './style.module.scss';

type Props = Omit<ModalProps, 'children'> & {
  children?: ReactNode;
  headline: string;
  handleConfirmClick: () => void;
};

export const PromptComponent = memo<Props>(
  ({ visible, headline, children, handleClose, handleClosed, handleConfirmClick }) => {
    const confirmButtonRef = useRef<HTMLButtonElement>(null);

    useLayoutEffect(() => {
      confirmButtonRef.current?.focus();
    }, []);

    return (
      <ModalComponent visible={visible} handleClose={handleClose} handleClosed={handleClosed}>
        <ModalHeadlineComponent className={style.promptHeadline}>{headline}</ModalHeadlineComponent>

        {children}

        <ActionButtonComponent className={style.promptButton} ref={confirmButtonRef} handleClick={handleConfirmClick}>
          Confirm
        </ActionButtonComponent>

        <ButtonComponent className={style.promptButtonButton} withoutRipple onClick={handleClose}>
          Cancel
        </ButtonComponent>
      </ModalComponent>
    );
  }
);
