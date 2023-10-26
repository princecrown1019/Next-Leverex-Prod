import React, { FC } from 'react';

import { LinkComponent } from '~/components/Link/LinkComponent';
import { ButtonCopyComponent } from '~/components/ButtonCopy/ButtonCopyComponent';

import style from './style.module.scss';

type Props = {
  className?: string;
  category?: string;
  headline: string;
  description: string;
  author: string;
  image: string;
  href?: string;
};

export const BlogPreviewComponent: FC<Props> = ({
  className,
  category,
  headline,
  description,
  author,
  image,
  href
}) => {
  const hrefToCopy = typeof window === 'undefined' ? '' : `${window.location.href}/${href}`;

  return (
    <article className={className}>
      <div className={style.blogPreview}>
        <LinkComponent href={href}>
          <img className={style.blogPreviewImg} src={image} alt={headline} />
        </LinkComponent>
        <div className={style.blogPreviewContent}>
          <LinkComponent className={style.blogPreviewContentLink} href={href}>
            {category && <span className={style.blogPreviewCategory}>{category}</span>}

            <h3 className={style.blogPreviewHeadline}>{headline}</h3>
            <p className={style.blogPreviewDescription}>{description}</p>
          </LinkComponent>

          <div className={style.blogPreviewFooter}>
            <LinkComponent className={style.blogPreviewAuthor} href={href}>
              {author}
            </LinkComponent>

            <ButtonCopyComponent
              className={style.blogPreviewCopy}
              iconClassName={style.blogPreviewCopyIcon}
              value={hrefToCopy}
              withoutRipple
            />
          </div>
        </div>
      </div>
    </article>
  );
};
