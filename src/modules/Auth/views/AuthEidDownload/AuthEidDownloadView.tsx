import React, { memo } from 'react';

import clsx from 'clsx';

import { TabsComponent } from '~/components/Tabs/TabsComponent';
import { QrCodeComponent } from '~/components/QrCode/QrCodeComponent';
import { ModalComponent, Props as ModalProps } from '~/components/Modal/ModalComponent';
import { LinkComponent } from '~/components/Link/LinkComponent';
import { AuthEidInstructionsComponent } from '~/modules/Auth/components/AuthEidInstructions/AuthEidInstructionsComponent';

import style from './style.module.scss';

type Props = Omit<ModalProps, 'children'> & {
  link: string;
  tabIdx: number;
  androidSelected: boolean;
  handleTabChange: (idx: number) => void;
  handleContinueClick: () => void;
};

export const AuthEidDownloadView = memo<Props>(
  ({
    visible,
    tabIdx,
    link,
    androidSelected,
    handleClose,
    handleClosed,
    handleBack,
    handleContinueClick,
    handleTabChange
  }) => {
    const linkClassName = androidSelected
      ? style.authEidDownloadModalLinkGooglePlay
      : style.authEidDownloadModalLinkAppStore;

    return (
      <ModalComponent visible={visible} handleClose={handleClose} handleClosed={handleClosed} handleBack={handleBack}>
        <AuthEidInstructionsComponent
          title="Download the app - it’s simple, secure and free"
          button="Continue"
          handleButtonClick={handleContinueClick}
        >
          <TabsComponent
            className={style.authEidDownloadModalTabs}
            tabClassName={style.authEidDownloadModalTab}
            tabIdx={tabIdx}
            tabs={['Android', 'iOS']}
            handleChange={handleTabChange}
          />

          <QrCodeComponent className={style.authEidDownloadModalQrCode} size={128} value={link} />

          <LinkComponent className={clsx(style.authEidDownloadModalLink, linkClassName)} href={link} target="_blank">
            {androidSelected ? 'Google Play' : 'App Store'}
          </LinkComponent>
        </AuthEidInstructionsComponent>
      </ModalComponent>
    );
  }
);
