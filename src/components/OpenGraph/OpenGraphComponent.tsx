import React, { FC } from 'react';

type Props = {
  title: string;
  description: string;
  img?: string;
  type?: string;
  twitterType?: string;
  site?: string;
  articleAuthor?: string;
  twitterSite?: string;
};

export const OpenGraphComponent: FC<Props> = ({
  title,
  description,
  img,
  type = 'website',
  twitterType = 'app',
  articleAuthor,
  site = 'Leverex',
  twitterSite
}) => (
  <>
    <meta property="og:title" content={title} />
    <meta property="twitter:title" content={title} />

    <meta property="description" content={description} />
    <meta property="og:description" content={description} />
    <meta property="twitter:description" content={description} />

    <meta property="og:site_name" content={site} />
    <meta property="twitter:site" content={twitterSite} />

    <meta property="og:type" content={type} />
    <meta property="twitter:card" content={twitterType} />

    {img && <meta property="og:image" content={img} />}
    {img && <meta property="twitter:image" content={img} />}

    {articleAuthor && <meta property="og:article:author" content={articleAuthor} />}
  </>
);
