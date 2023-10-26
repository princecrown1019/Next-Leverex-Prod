import React, { FC } from 'react';

import clsx from 'clsx';

import { ImgComponent } from '~/components/Img/ImgComponent';
import { ParallaxComponent } from '~/components/Parallax/ParallaxComponent';

import style from './style.module.scss';

export type Props = {
  className?: string;
};

export const CorporatesParallaxView: FC<Props> = ({ className }) => (
  <>
    <ParallaxComponent className={clsx(style.parallax, className)}>
      <ImgComponent
        className={clsx(style.parallaxEllipse, style.parallaxEllipseOne)}
        src="/static/media/landing/ellipse-1.png"
        alt="1"
        loading="eager"
        data-depth="1.50"
      />
    </ParallaxComponent>
    <ParallaxComponent className={clsx(style.parallax, className)} invertX={false} invertY={false}>
      <ImgComponent
        className={clsx(style.parallaxEllipse, style.parallaxEllipseTwo)}
        src="/static/media/landing/ellipse-2.png"
        alt="2"
        loading="eager"
        data-depth="0.75"
      />
    </ParallaxComponent>
    <ParallaxComponent className={clsx(style.parallax, className)} invertX={false}>
      <ImgComponent
        className={clsx(style.parallaxEllipse, style.parallaxEllipseThree)}
        src="/static/media/landing/ellipse-3.png"
        alt="3"
        loading="eager"
        data-depth="1.9"
      />
    </ParallaxComponent>
    <ParallaxComponent className={clsx(style.parallax, className)} invertY={false}>
      <ImgComponent
        className={clsx(style.parallaxEllipse, style.parallaxEllipseFour)}
        src="/static/media/landing/ellipse-4.png"
        alt="4"
        loading="eager"
        data-depth="1.50"
      />
    </ParallaxComponent>
    <ParallaxComponent className={clsx(style.parallax, className)}>
      <ImgComponent
        className={clsx(style.parallaxEllipse, style.parallaxEllipseFive)}
        src="/static/media/landing/ellipse-5.png"
        alt="5"
        data-depth="0.60"
      />
    </ParallaxComponent>
  </>
);
