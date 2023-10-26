import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import Typewriter from 'typewriter-effect';

import { LandingIntroView, Props as ViewProps } from '~/modules/Landing/views/Intro/IntroView';
import styles from '~/modules/Landing/views/Intro/style.module.scss';

type Props = Pick<ViewProps, 'className'>;

const writerOptions = {
  cursor: '',
  autoStart: true,
  delay: 70,
  loop: false
};

export const LandingIntroContainer: FC<Props> = ({ className }) => {
  const imgContainerRef = useRef<HTMLDivElement>(null);

  const [pitchVisible, setPitchVisible] = useState(false);

  // Pitch animation
  useEffect(() => {
    const timeout = setTimeout(() => {
      setPitchVisible(true);
    }, 1400);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const headline = useMemo(() => <Typewriter options={{ ...writerOptions, strings: 'Leverage made simple' }} />, []);

  const pitch = useMemo(
    () => (
      <Typewriter
        options={{
          ...writerOptions,
          strings: 'Cash settled rolling futures with 10x leverage',
          delay: 17,
          autoStart: pitchVisible
        }}
      />
    ),
    [pitchVisible]
  );

  const handleImgLoad = useCallback(() => {
    imgContainerRef.current?.classList.add(styles.introPresentationLoaded);
  }, []);

  return (
    <LandingIntroView
      className={className}
      headline={headline}
      pitch={pitch}
      imgContainerRef={imgContainerRef}
      handleImgLoad={handleImgLoad}
    />
  );
};
