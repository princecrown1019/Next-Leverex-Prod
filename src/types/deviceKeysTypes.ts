export type DeviceKeyPermission = {
  allowed: boolean;
  confirmed: boolean;
  denied: boolean;
};

export type DeviceKey<T> = {
  key: string;
  status: boolean;
  label: string;
  created: T;
  updated: T;
};
