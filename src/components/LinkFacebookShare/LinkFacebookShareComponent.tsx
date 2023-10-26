import React, { forwardRef, useMemo } from 'react';

import { LinkComponent, Props as LinkProps } from '~/components/Link/LinkComponent';

export type Props = Omit<LinkProps, 'href'> & {
  url: string;
};

export const LinkFacebookShareComponent = forwardRef<HTMLAnchorElement, Props>(({ children, url, ...props }, ref) => {
  const href = useMemo(() => `https://www.facebook.com/sharer/sharer.php?u=${url}`, [url]);

  return (
    <LinkComponent {...props} href={href} target="_blank" ref={ref}>
      {children}
    </LinkComponent>
  );
});
