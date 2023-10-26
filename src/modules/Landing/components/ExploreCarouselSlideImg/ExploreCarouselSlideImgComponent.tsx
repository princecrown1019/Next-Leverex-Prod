import React, { FC } from 'react';

import { ImgComponent } from '~/components/Img/ImgComponent';

import style from './style.module.scss';

type Props = {
  src: string;
  alt: string;
};

export const ExploreCarouselSlideImgComponent: FC<Props> = ({ src, alt }) => (
  <div className={style.exploreSlidePresentation}>
    <ImgComponent className={style.exploreSlideImage} src={src} alt={alt} loading="eager" />
  </div>
);
