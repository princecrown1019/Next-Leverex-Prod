import React, { FC, useCallback, useState } from 'react';

import { OverviewView, Props as ViewProps } from '~/modules/Overview/views/Overview/OverviewView';

type Props = Pick<ViewProps, 'className' | 'mobile' | 'withoutTabs'>;

enum Tab {
  PRICE,
  STREAMS,
  DETAILS
}

export const OverviewContainer: FC<Props> = ({ className, mobile, withoutTabs }) => {
  const [tabIdx, setTabIdx] = useState(Tab.PRICE);

  const handleTabChange = useCallback((idx: number) => {
    setTabIdx(idx);
  }, []);

  return (
    <OverviewView
      className={className}
      tabIdx={tabIdx}
      withoutTabs={withoutTabs}
      mobile={mobile}
      handleTabChange={handleTabChange}
    />
  );
};
