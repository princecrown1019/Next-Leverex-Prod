import React, { FC } from 'react';

import clsx from 'clsx';

import { DISCORD_URL, TELEGRAM_URL, TWITTER_URL } from '~/constants/configConstants';
import { LinkComponent } from '~/components/Link/LinkComponent';

import style from './style.module.scss';

type Props = {
  className?: string;
};

export const SocialsComponent: FC<Props> = ({ className }) => (
  <ul className={clsx(style.list, style.socialsList, className)}>
    <li className={style.socialsListItem}>
      <LinkComponent
        className={clsx(style.socialsListLink, style.socialsListLinkTwitter)}
        href={TWITTER_URL}
        target="_blank"
      >
        Twitter
      </LinkComponent>
    </li>
    <li className={style.socialsListItem}>
      <LinkComponent
        className={clsx(style.socialsListLink, style.socialsListLinkTelegram)}
        href={TELEGRAM_URL}
        target="_blank"
      >
        Telegram
      </LinkComponent>
    </li>
    <li className={style.socialsListItem}>
      <LinkComponent
        className={clsx(style.socialsListLink, style.socialsListLinkDiscord)}
        href={DISCORD_URL}
        target="_blank"
      >
        Discord
      </LinkComponent>
    </li>
  </ul>
);
