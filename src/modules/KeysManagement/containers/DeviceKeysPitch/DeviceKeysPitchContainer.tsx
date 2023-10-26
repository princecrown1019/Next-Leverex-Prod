import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import { selectDeviceKeys, selectDeviceKeysLoading } from '~/store/DeviceKeys/selectors';
import {
  DeviceKeysPitchView,
  Props as ViewProps
} from '~/modules/KeysManagement/views/DeviceKeysPitch/DeviceKeysPitchView';

type Props = Pick<ViewProps, 'className'>;

export const DeviceKeysPitchContainer: FC<Props> = ({ className }) => {
  const deviceKeys = useSelector(selectDeviceKeys);
  const loading = useSelector(selectDeviceKeysLoading);

  return <DeviceKeysPitchView className={className} loading={loading} empty={!deviceKeys.length} />;
};
