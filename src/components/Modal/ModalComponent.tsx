import React, { FC, ReactNode, useRef, useEffect } from 'react';

import clsx from 'clsx';

import { useOutsideClickOptional } from '~/hooks/OutsideClick/useOutsideClick';
import { useDebounce } from '~/hooks/Debounce/useDebounce';
import { usePrevious } from '~/hooks/Previous/usePrevious';
import { useDisabledScroll } from '~/hooks/DisabledScroll/useDisabledScroll';
import { ButtonComponent } from '~/components/Button/ButtonComponent';
import { BackArrowIcon, CloseIcon } from '~/assets/Icons';
import { PortalComponent } from '~/components/Portal/PortalComponent';
import { Portal } from '~/types/portalsTypes';

import style from './style.module.scss';

export type Props = {
  className?: string;
  visible: boolean;
  children: ReactNode | ReactNode[];
  handleClose?: () => void;
  handleBack?: () => void;
  handleClosed?: () => void;
};

// WARNING:
// If change is needed, do not forget to change
// the "tw-duration-<duration>" css-tailwind
// property in the ".modal" class.
const ANIMATION_DELAY = 300;

export const ModalComponent: FC<Props> = ({ className, visible, children, handleClosed, handleBack, handleClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  const debouncedVisible = useDebounce(visible, ANIMATION_DELAY);
  const wasOpen = usePrevious(!!modalRef.current);

  useDisabledScroll(visible);

  useOutsideClickOptional(modalRef, debouncedVisible, () => {
    handleClose?.();
  });

  useEffect(() => {
    modalRef.current?.classList.toggle(style.modalVisible, visible);
    backdropRef.current?.classList.toggle(style.backdropVisible, visible);
  }, [visible]);

  useEffect(() => {
    if (!wasOpen || debouncedVisible) return;

    handleClosed?.();
  }, [debouncedVisible]);

  return visible || debouncedVisible ? (
    <PortalComponent id={Portal.MODAL}>
      <div className={style.backdrop} ref={backdropRef}>
        <div className={clsx(style.modal, className)} ref={modalRef}>
          {!!handleBack && (
            <ButtonComponent className={style.backButton} onClick={handleBack}>
              <BackArrowIcon className={style.backIcon} />
            </ButtonComponent>
          )}
          {!!handleClose && (
            <ButtonComponent className={style.closeButton} onClick={handleClose}>
              <CloseIcon className={style.closeIcon} />
            </ButtonComponent>
          )}
          {children}
        </div>
      </div>
    </PortalComponent>
  ) : null;
};
