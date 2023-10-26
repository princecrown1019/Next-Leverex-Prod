import React, { FC, ReactNode, useEffect, useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ParallaxConstructor from 'parallax-js';

type Props = {
  className?: string;
  invertX?: boolean;
  invertY?: boolean;
  children: ReactNode | ReactNode[];
};

export const ParallaxComponent: FC<Props> = ({ className, invertX, invertY, children }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const parallax = new ParallaxConstructor(containerRef.current, {
      relativeInput: true,
      hoverOnly: true,
      scalarY: 3.5,
      pointerEvents: true,
      invertX: invertX ?? true,
      invertY: invertY ?? true
    });

    parallax.enable();

    return () => {
      parallax.disable();
    };
  }, []);

  return (
    <div className={className} id="scene" ref={containerRef}>
      {children}
    </div>
  );
};
