import React, { FC } from 'react';

import clsx from 'clsx';

import { DISCORD_URL, TELEGRAM_URL, TWITTER_URL } from '~/constants/configConstants';
import { LinkComponent } from '~/components/Link/LinkComponent';

import style from './style.module.scss';

type Props = {
  className?: string;
};

export const LandingSocialsComponent: FC<Props> = ({ className }) => (
  <ul className={clsx(style.socials, className)}>
    <li className={style.socialsItem}>
      <LinkComponent className={clsx(style.socialsLink, style.socialsLinkTwitter)} href={TWITTER_URL} target="_blank">
        Twitter
      </LinkComponent>
    </li>
    <li className={style.socialsItem}>
      <LinkComponent className={clsx(style.socialsLink, style.socialsLinkTelegram)} href={TELEGRAM_URL} target="_blank">
        Telegram
      </LinkComponent>
    </li>
    <li className={style.socialsItem}>
      <LinkComponent className={clsx(style.socialsLink, style.socialsLinkDiscord)} href={DISCORD_URL} target="_blank">
        Discord
      </LinkComponent>
    </li>
  </ul>
);
