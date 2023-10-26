import React, { FC } from 'react';

import { NewsView, Props as ViewProps } from '~/modules/News/views/News/NewsView';

type Props = Pick<ViewProps, 'className'>;

export const NewsContainer: FC<Props> = ({ className }) => {
  return <NewsView className={className} />;
};
