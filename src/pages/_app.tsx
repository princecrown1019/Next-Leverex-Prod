import React, { FC } from 'react';
import { Provider } from 'react-redux';

import '~/styles/globals.scss';

import { store, persistor } from '~/store/configureStore';
import { PersistGateSSR } from '~/store/PersistGate';
import { PromptProvider } from '~/contexts/Prompt/PromptContext';
import { ModalsProvider } from '~/contexts/Modals/ModalsContext';
import { usePreserveScroll } from '~/hooks/PreserveScroll/usePreserveScroll';
import { LoginContainer } from '~/modules/Auth/containers/Login/LoginContainer';
import { RegisterContainer } from '~/modules/Auth/containers/Register/RegisterContainer';
import { GetStartedContainer } from '~/modules/Auth/containers/GetStarted/GetStartedContainer';
import { AuthEidDownloadContainer } from '~/modules/Auth/containers/AuthEidDownload/AuthEidDownloadContainer';
import { AuthEidVerifyContainer } from '~/modules/Auth/containers/AuthEidVerify/AuthEidVerifyContainer';
import { WelcomeContainer } from '~/modules/Auth/containers/Welcome/WelcomeContainer';
import { CorporateOnboardingContainer } from '~/modules/Auth/containers/CorporateOnboarding/CorporateOnboardingContainer';
import { ToastsContainer } from '~/modules/Toasts/containers/Toasts/ToastsContainer';
import { ContactContainer } from '~/modules/Auth/containers/Contact/ContactContainer';
import { LadderListenerContainer } from '~/modules/Trade/containers/LadderListener/LadderContainer';

import type { AppProps } from 'next/app';

const App: FC<AppProps> = ({ Component, pageProps }) => {
  usePreserveScroll();

  return (
    <Provider store={store}>
      <PersistGateSSR persistor={persistor}>
        <PromptProvider>
          <ModalsProvider>
            <Component {...pageProps} />
            <ToastsContainer />
            <LoginContainer />
            <RegisterContainer />
            <GetStartedContainer />
            <AuthEidDownloadContainer />
            <AuthEidVerifyContainer />
            <WelcomeContainer />
            <CorporateOnboardingContainer />
            <ContactContainer />

            <LadderListenerContainer />
          </ModalsProvider>
        </PromptProvider>
      </PersistGateSSR>
    </Provider>
  );
};

export default App;
