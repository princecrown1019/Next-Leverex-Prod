import React, {
  createContext,
  FC,
  PropsWithChildren,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react';

import { usePrevious } from '~/hooks/Previous/usePrevious';

type Controls = {
  open: () => void;
  close: () => void;
  back?: () => void;
};

type Modal =
  | 'loginVisible'
  | 'registerVisible'
  | 'getStartedVisible'
  | 'authEidDownloadVisible'
  | 'authEidVerifyVisible'
  | 'welcomeVisible'
  | 'corporateOnboardingVisible'
  | 'contactVisible';

type Context = {
  loginVisible: boolean;
  loginControls: Controls;

  registerVisible: boolean;
  registerControls: Controls;

  getStartedVisible: boolean;
  getStartedControls: Controls;

  authEidDownloadVisible: boolean;
  authEidDownloadControls: Controls;

  authEidVerifyVisible: boolean;
  authEidVerifyControls: Controls;

  welcomeVisible: boolean;
  welcomeControls: Controls;

  corporateOnboardingVisible: boolean;
  corporateOnboardingControls: Controls;

  contactVisible: boolean;
  contactControls: Controls;

  modalVisible?: null | Modal;

  prevModalVisible?: null | Modal;
  prevModalControls?: null | Controls;
};

const ModalsContext = createContext<null | Context>(null);

const initialState = {
  loginVisible: false,
  registerVisible: false,
  getStartedVisible: false,
  authEidDownloadVisible: false,
  authEidVerifyVisible: false,
  welcomeVisible: false,
  corporateOnboardingVisible: false,
  contactVisible: false
};

export const ModalsProvider: FC<PropsWithChildren<ReactNode | ReactNode[]>> = ({ children }) => {
  const [state, setState] = useState(initialState);

  const modalVisible = useMemo(() => {
    const modal = Object.entries(state).find(([_, visible]) => visible);
    if (!modal) return null;

    return modal[0] as Context['prevModalVisible'];
  }, [state]);

  const prevModalVisible = usePrevious(modalVisible);

  const open = useCallback((target: keyof typeof initialState) => {
    setState({ ...initialState, [target]: true });
  }, []);

  const close = useCallback((target: keyof typeof initialState) => {
    setState({ ...initialState, [target]: false });
  }, []);

  const getControls = useCallback(
    (target: keyof typeof initialState) => ({
      open: () => open(target),
      back: () => open(prevModalVisible!),
      close: () => close(target)
    }),
    [state.loginVisible, state.getStartedVisible]
  );

  const prevModalControls = useMemo(() => {
    if (!prevModalVisible) return null;

    return getControls(prevModalVisible);
  }, [prevModalVisible]);

  const value: Context = {
    ...state,
    loginControls: getControls('loginVisible'),
    registerControls: getControls('registerVisible'),
    getStartedControls: getControls('getStartedVisible'),
    authEidDownloadControls: getControls('authEidDownloadVisible'),
    authEidVerifyControls: getControls('authEidVerifyVisible'),
    welcomeControls: getControls('welcomeVisible'),
    corporateOnboardingControls: getControls('corporateOnboardingVisible'),
    contactControls: getControls('contactVisible'),
    prevModalVisible,
    prevModalControls,
    modalVisible
  };

  return <ModalsContext.Provider value={value}>{children}</ModalsContext.Provider>;
};

export const useModalsContext = () => {
  const context = useContext(ModalsContext);

  if (!context) throw new Error('ModalsContext not found');

  return context;
};
