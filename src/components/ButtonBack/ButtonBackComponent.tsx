import React, { FC, useCallback } from 'react';

import { useRouter } from 'next/router';

import { MainPath } from '~/constants/pathsConstants';
import { ButtonComponent, Props } from '~/components/Button/ButtonComponent';

export const ButtonBackComponent: FC<Props> = (props) => {
  const { back, push } = useRouter();

  const handleClick = useCallback(() => {
    if (window.history.length > 2) {
      back();
    } else {
      push(MainPath.HOME);
    }
  }, []);

  return <ButtonComponent {...props} onClick={handleClick} />;
};
