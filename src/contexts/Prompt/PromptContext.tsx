import React, {
  createContext,
  FC,
  PropsWithChildren,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState
} from 'react';

type Controls = {
  open: (cb?: () => void) => void;
  confirm: () => void;
  close: () => void;
};

type Context = {
  visible: boolean;
  controls: Controls;
};

const PromptContext = createContext<null | Context>(null);

export const PromptProvider: FC<PropsWithChildren<ReactNode | ReactNode[]>> = ({ children }) => {
  const closeCallbackRef = useRef<() => void>();

  const [visible, setVisible] = useState(false);

  const open = useCallback((cb?: () => void) => {
    setVisible(true);
    closeCallbackRef.current = cb;
  }, []);

  const close = useCallback(() => {
    setVisible(false);
  }, []);

  const confirm = useCallback(() => {
    close();
    closeCallbackRef.current?.();
  }, [close]);

  const controls = useMemo(() => ({ open, close, confirm }), [open, close, confirm]);

  const value: Context = {
    visible,
    controls
  };

  return <PromptContext.Provider value={value}>{children}</PromptContext.Provider>;
};

export const usePromptsContext = () => {
  const context = useContext(PromptContext);

  if (!context) throw new Error('PromptContext not found');

  return context;
};
