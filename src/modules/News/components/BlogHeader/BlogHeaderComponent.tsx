import React, { FC } from 'react';

import clsx from 'clsx';

import { ValueDateIsoComponent } from '~/components/ValueDateIso/ValueDateIsoComponent';
import { LinkTwitterShareComponent } from '~/components/LinkTwitterShare/LinkTwitterShareComponent';
import { ButtonCopyComponent } from '~/components/ButtonCopy/ButtonCopyComponent';

import style from './style.module.scss';

type Props = {
  className?: string;
  headline: string;
  author: string;
  timestamp: number;
};

export const SingleBlogHeaderComponent: FC<Props> = ({ className, headline, author, timestamp }) => {
  const url = typeof window === 'undefined' ? '' : window.location.href;

  return (
    <header className={clsx(style.blogHeader, className)}>
      <div>
        <h1 className={style.blogHeaderHeadline}>{headline}</h1>

        <div className={style.blogHeaderMetadata}>
          <span className={style.blogHeaderAuthor}>{author}</span>
          <time className={style.blogHeaderTime}>
            <ValueDateIsoComponent>{timestamp}</ValueDateIsoComponent>
          </time>

          <LinkTwitterShareComponent
            className={clsx(style.blogHeaderSocial, style.blogHeaderSocialTwitter)}
            text={headline}
            url={url}
          >
            Twitter
          </LinkTwitterShareComponent>

          <ButtonCopyComponent
            className={style.blogHeaderSocial}
            iconClassName={style.blogHeaderCopyLinkButtonIcon}
            value={url}
            withoutRipple
          />
        </div>
      </div>
    </header>
  );
};
