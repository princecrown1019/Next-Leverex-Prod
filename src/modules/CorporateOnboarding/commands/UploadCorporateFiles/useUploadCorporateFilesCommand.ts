import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { sessionActions } from '~/store/Session/slice';

export const useUploadCorporateFilesCommand = <F extends Record<string, string>>() => {
  const dispatch = useDispatch();

  return useCallback((formData: F, certificate: File, additionalFile?: null | File) => {
    const formBlob = new Blob([JSON.stringify(formData)], { type: 'application/json' });
    const form = new File([formBlob], 'form-data-file');

    dispatch(sessionActions.uploadCorporateFiles({ form, certificate, additionalFile }));
  }, []);
};
