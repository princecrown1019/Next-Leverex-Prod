import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { selectAddressesLoading, selectWhitelistedAddresses } from '~/store/Addresses/selectors';
import {
  AddNewAddressButtonView,
  Props as ViewProps
} from '~/modules/AddressManagement/views/AddNewAddressButton/AddNewAddressButtonView';

type Props = Pick<ViewProps, 'className'>;

export const AddNewAddressButtonContainer: FC<Props> = ({ className }) => {
  const addresses = useSelector(selectWhitelistedAddresses);
  const loading = useSelector(selectAddressesLoading);

  const visible = useMemo(() => {
    return !loading && addresses.length < 3;
  }, [loading, addresses.length]);

  return visible ? <AddNewAddressButtonView className={className} /> : null;
};
