import { Address } from '~/types/addressTypes';
import { toMilliseconds } from '~/services/DateFormat/dateFormatService';

import { WhitelistRes, LoadAddressesRes } from './types';

export const serializeAddress = (address: WhitelistRes): Address => ({
  ...address,
  timestamp: toMilliseconds(address.addedTimestamp)
});

export const serializeAddresses = (addresses: LoadAddressesRes['addresses']) => {
  return addresses.map((address) => serializeAddress(address));
};
