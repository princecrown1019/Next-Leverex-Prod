import React, { useCallback, useState, FC, ImgHTMLAttributes, SyntheticEvent } from 'react';

import clsx from 'clsx';

import style from './style.module.scss';

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  withoutAnimation?: boolean;
};

export const ImgComponent: FC<Props> = ({ className, withoutAnimation, ...props }) => {
  const [loaded, setLoaded] = useState(false);

  const handleLocalLoad = useCallback((event: SyntheticEvent<HTMLImageElement>) => {
    setLoaded(true);
    props.onLoad?.(event);
  }, []);

  return (
    <img
      {...props}
      className={clsx(!withoutAnimation && style.img, className, loaded && style.imgLoaded)}
      onLoad={withoutAnimation ? props.onLoad : handleLocalLoad}
      alt={props.alt || ''}
    />
  );
};
