import { toTimestamp } from '~/services/DateFormat/dateFormatService';
import { DeviceKey } from '~/types/deviceKeysTypes';

export const serializeDeviceKey = (key: DeviceKey<string>, idx: number): DeviceKey<number> => ({
  ...key,
  label: key.label || `Key #${idx + 1}`,
  created: toTimestamp(key.created),
  updated: toTimestamp(key.updated)
});

export const serializeDeviceKeys = (keys: DeviceKey<string>[]): DeviceKey<number>[] => {
  return keys.map((key, idx) => serializeDeviceKey(key, idx));
};
