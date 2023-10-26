import React, { FC, MouseEvent } from 'react';

import { LinkComponent } from '~/components/Link/LinkComponent';

type Props = {
  handleClick: (event: MouseEvent<HTMLAnchorElement>) => void;
};

export const ContactButtonView: FC<Props> = ({ handleClick }) => (
  <LinkComponent onClick={handleClick}>Contact us</LinkComponent>
);
