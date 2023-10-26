import React, { forwardRef, useMemo } from 'react';

import { LinkComponent, Props as LinkProps } from '~/components/Link/LinkComponent';

export type Props = Omit<LinkProps, 'href'> & {
  text: string;
  url: string;
};

export const LinkTwitterShareComponent = forwardRef<HTMLAnchorElement, Props>(
  ({ children, text, url, ...props }, ref) => {
    const href = useMemo(() => `https://twitter.com/share?text=${text}&url=${url}`, [text, url]);

    return (
      <LinkComponent {...props} href={href} target="_blank" ref={ref}>
        {children}
      </LinkComponent>
    );
  }
);
