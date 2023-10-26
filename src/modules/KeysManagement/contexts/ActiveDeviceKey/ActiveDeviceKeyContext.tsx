import React, { createContext, FC, PropsWithChildren, ReactNode, useCallback, useContext, useState } from 'react';

type Context = {
  activeKey: null | string;
  controls: {
    set: (key: null | string) => void;
  };
};

const ActiveDeviceKeyContext = createContext<null | Context>(null);

export const ActiveDeviceKeyProvider: FC<PropsWithChildren<ReactNode | ReactNode[]>> = ({ children }) => {
  const [activeKey, setActiveKey] = useState<null | string>(null);

  const set = useCallback((key: null | string) => {
    setActiveKey((prevKey) => (prevKey === key ? null : key));
  }, []);

  const value: Context = {
    activeKey: activeKey,
    controls: { set }
  };

  return <ActiveDeviceKeyContext.Provider value={value}>{children}</ActiveDeviceKeyContext.Provider>;
};

export const useActiveDeviceKeyContext = () => {
  const context = useContext(ActiveDeviceKeyContext);

  if (!context) throw new Error('ActiveDeviceKeyContext not found');

  return context;
};
