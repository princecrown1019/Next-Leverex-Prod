import React, { FC, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useRouter } from 'next/router';

import { accountRegExp, exchangeRegExp, faqRegExp } from '~/constants/pathsConstants';
import { selectLoggedInUI } from '~/store/Session/selectors';
import { useLogoutCommand } from '~/modules/MainHeader/commands/Logout/useLogoutCommand';
import { MainHeaderView, Props as ViewProps } from '~/modules/MainHeader/views/Header/HeaderMainView';

type Props = Pick<ViewProps, 'withoutBottomBorder'>;

export const HeaderMainContainer: FC<Props> = ({ withoutBottomBorder }) => {
  const { pathname } = useRouter();

  const [open, setOpen] = useState(false);

  const loggedInUI = useSelector(selectLoggedInUI);

  const logout = useLogoutCommand(() => setOpen(false));

  useEffect(() => {
    if (!open || !loggedInUI) return;

    setOpen(false);
  }, [loggedInUI]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const handleBurgerClick = useCallback(() => {
    setOpen((prevOpen) => !prevOpen);
  }, []);

  const exchangeActive = useCallback((path: string) => exchangeRegExp.test(path), []);
  const faqActive = useCallback((path: string) => faqRegExp.test(path), []);
  const accountActive = useCallback((path: string) => accountRegExp.test(path), []);

  return (
    <MainHeaderView
      open={open}
      loggedInUI={loggedInUI}
      handleBurgerClick={handleBurgerClick}
      handleLogoutClick={logout}
      exchangeActive={exchangeActive}
      faqActive={faqActive}
      accountActive={accountActive}
      withoutBottomBorder={withoutBottomBorder}
    />
  );
};
