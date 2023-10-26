import React, { FC, ReactNode } from 'react';

import clsx from 'clsx';

import { useDefaultStyles } from '~/hooks/StaticLayout/useDefaultStyles';
import { LandingFooterContainer } from '~/modules/Landing/containers/Footer/FooterContainer';
import { SingleBlogHeaderComponent } from '~/modules/News/components/BlogHeader/BlogHeaderComponent';

import style from './style.module.scss';

type Props = {
  className?: string;
  headline: string;
  author: string;
  image: string;
  timestamp: number;
  children: ReactNode | ReactNode[];
};

export const NewsItemLayout: FC<Props> = ({ className, author, timestamp, headline, children }) => {
  useDefaultStyles();

  return (
    <>
      <article className={clsx(style.newsItemLayout, className)}>
        <SingleBlogHeaderComponent
          className={style.newsItemLayoutWrapper}
          headline={headline}
          author={author}
          timestamp={timestamp}
        />

        {/*<img className={style.newsItemHeaderImg} src={image} alt={headline} />*/}

        <div className={clsx(style.newsItemLayoutWrapper, style.newsItemLayoutContent)}>{children}</div>

        <LandingFooterContainer className={style.newsItemFooter} />
      </article>
    </>
  );
};
