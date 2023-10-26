import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import { selectDeviceKeysLoading } from '~/store/DeviceKeys/selectors';
import {
  AddNewKeyButtonView,
  Props as ViewProps
} from '~/modules/KeysManagement/views/AddNewKeyButton/AddNewKeyButtonView';

type Props = Pick<ViewProps, 'className'>;

export const AddNewKeyButtonContainer: FC<Props> = ({ className }) => {
  const loading = useSelector(selectDeviceKeysLoading);

  return loading ? null : <AddNewKeyButtonView className={className} />;
};
