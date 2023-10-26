import React, { forwardRef, ReactText, useMemo } from 'react';

import { LinkComponent, Props as LinkProps } from '~/components/Link/LinkComponent';

export type Props = Omit<LinkProps, 'href'> & {
  children: ReactText;
};

export const LinkEmailComponent = forwardRef<HTMLAnchorElement, Props>(({ children, ...props }, ref) => {
  const href = useMemo(() => `mailto:${children}`, [children]);

  return (
    <LinkComponent {...props} ref={ref} href={href} target="_blank">
      {children}
    </LinkComponent>
  );
});
