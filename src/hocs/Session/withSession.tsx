import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useRouter } from 'next/router';

import { MainPath } from '~/constants/pathsConstants';
import { selectAuthorizeSessionLoading, selectLoggedIn, selectLoggedInUI } from '~/store/Session/selectors';

export const withSession =
  <P,>(Component: FC<P>) =>
  (props: P) => {
    const { push } = useRouter();

    const loggedIn = useSelector(selectLoggedIn);
    const loggedInUI = useSelector(selectLoggedInUI);
    const authorizeLoading = useSelector(selectAuthorizeSessionLoading);

    const skip = (loggedInUI && authorizeLoading) || loggedIn;

    useEffect(() => {
      if (skip) return;

      push(MainPath.EXCHANGE);
    }, [skip]);

    return skip ? <Component {...props} /> : null;
  };
