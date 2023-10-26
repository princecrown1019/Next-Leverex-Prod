import React from 'react';

import { NextPage } from 'next';
import Head from 'next/head';
import clsx from 'clsx';

import { DISCORD_URL, INFO_EMAIL, SUPPORT_EMAIL, TELEGRAM_URL, TWITTER_URL } from '~/constants/configConstants';
import { accountPagePaths } from '~/constants/pathsConstants';
import { withSession } from '~/hocs/Session/withSession';
import { ProtectedLayout } from '~/layouts/Protected/ProtectedLayout';
import { ProtectedLayoutHeadlineComponent } from '~/components/ProtectedLayoutHeadline/ProtectedLayoutHeadlineComponents';
import { LinkComponent } from '~/components/Link/LinkComponent';
import { LinkEmailComponent } from '~/components/LinkEmail/LinkEmailComponent';
import { OpenGraphComponent } from '~/components/OpenGraph/OpenGraphComponent';

import style from './style.module.scss';

const Contacts: NextPage = () => {
  return (
    <>
      <Head>
        <title>Contacts</title>

        <OpenGraphComponent title="Contacts" description="Contacts" img="/static/media/og-picture.jpeg" />
      </Head>

      <ProtectedLayout links={accountPagePaths}>
        <div className={style.contacts}>
          <ProtectedLayoutHeadlineComponent>Contact us</ProtectedLayoutHeadlineComponent>
          <p className={style.contactsPitch}>
            Our service is built around the recognition that the needs of our participants should come first. Whether
            it’s an inquiry with support, a question or a desire to utilize our service, we’re here to support your
            needs.
          </p>

          <div className={style.contactsSection}>
            <h3 className={style.contactsSectionHeadline}>Support</h3>
            <div className={style.contactsSectionContent}>
              <LinkEmailComponent className={style.contactsSectionLink}>{SUPPORT_EMAIL}</LinkEmailComponent>
            </div>
          </div>

          <div className={style.contactsSection}>
            <h3 className={style.contactsSectionHeadline}>Info</h3>
            <div className={style.contactsSectionContent}>
              <LinkEmailComponent className={style.contactsSectionLink}>{INFO_EMAIL}</LinkEmailComponent>
            </div>
          </div>

          <div className={style.contactsSection}>
            <h3 className={style.contactsSectionHeadline}>Join our communities</h3>
            <div className={style.contactsSectionContent}>
              <LinkComponent
                className={clsx(style.contactsSectionSocialLink, style.contactsSectionSocialLinkTwitter)}
                href={TWITTER_URL}
                target="_blank"
              >
                Twitter
              </LinkComponent>
              <LinkComponent
                className={clsx(style.contactsSectionSocialLink, style.contactsSectionSocialLinkTelegram)}
                href={TELEGRAM_URL}
                target="_blank"
              >
                Telegram
              </LinkComponent>
              <LinkComponent
                className={clsx(style.contactsSectionSocialLink, style.contactsSectionSocialLinkDiscord)}
                href={DISCORD_URL}
                target="_blank"
              >
                Discord
              </LinkComponent>
            </div>
          </div>
        </div>
      </ProtectedLayout>
    </>
  );
};

export default withSession(Contacts);
