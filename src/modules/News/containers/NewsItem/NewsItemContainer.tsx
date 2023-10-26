import React, { FC } from 'react';

import { NewsItemView, Props as ViewProps } from '~/modules/News/views/NewsItem/NewsItemView';

type Props = Pick<ViewProps, 'className'>;

export const NewsItemContainer: FC<Props> = ({ className }) => {
  return <NewsItemView className={className} />;
};
