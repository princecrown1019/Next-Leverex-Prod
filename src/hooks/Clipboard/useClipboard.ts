import { useDispatch } from 'react-redux';
import { useCallback } from 'react';

import { toastsActions } from '~/store/Toasts/slice';
import { ToastType } from '~/types/toastTypes';

export const useClipboard = () => {
  const dispatch = useDispatch();

  const copyToClipboard = useCallback((target?: string | null) => {
    if (!target) return;

    navigator.clipboard
      .writeText(target)
      .then(() => {
        dispatch(
          toastsActions.create({
            type: ToastType.INFO,
            message: 'Saved to clipboard'
          })
        );
      })
      .catch((error) => {
        console.warn('Clipboard error', error);

        toastsActions.create({
          type: ToastType.ERROR,
          message: 'Clipboard error'
        });
      });
  }, []);

  const readFromClipboard = useCallback((callback: (value: string) => void) => {
    navigator.clipboard
      .readText()
      .then(callback)
      .catch((error) => {
        console.warn('Clipboard error', error);
      });
  }, []);

  return { copyToClipboard, readFromClipboard };
};
