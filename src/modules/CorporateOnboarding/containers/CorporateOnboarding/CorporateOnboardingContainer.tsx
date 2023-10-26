import React, { ChangeEvent, FormEvent, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import {
  selectLoggedIn,
  selectRegisterCorporateError,
  selectRegisterCorporateLoading,
  selectRegisterCorporateUrl,
  selectUploadCorporateFilesLoading
} from '~/store/Session/selectors';
import { createMerkleRoot } from '~/services/Crypto/cryptoService';
import { toJsonFile } from '~/services/File/fileService';
import { useModalsContext } from '~/contexts/Modals/ModalsContext';
import { useRegisterCorporateCommand } from '~/modules/CorporateOnboarding/commands/RegisterCorporate/useRegisterCorporateCommand';
import { useUploadCorporateFilesCommand } from '~/modules/CorporateOnboarding/commands/UploadCorporateFiles/useUploadCorporateFilesCommand';
import {
  CorporateOnboardingView,
  Props as ViewProps
} from '~/modules/CorporateOnboarding/views/CorporateOnboarding/CorporateOnboardingView';

type Props = Pick<ViewProps, 'className'>;

const initialState = {
  companyName: '',
  registrationNumber: '',
  postcode: '',
  address: '',
  city: '',
  country: '',
  postalAddress: '',
  message: ''
};

export const CorporateOnboardingContainer = memo<Props>(({ className }) => {
  const { corporateOnboardingControls } = useModalsContext();

  const [state, setState] = useState(initialState);
  const [certificate, setCertificate] = useState<null | File>(null);
  const [additionalFile, setAdditionalFile] = useState<null | File>(null);
  const [agreed, setAgreed] = useState(false);
  const [agreedPolicy, setAgreedPolicy] = useState(false);

  const loggedIn = useSelector(selectLoggedIn);
  const registerUrl = useSelector(selectRegisterCorporateUrl);
  const loading = useSelector(selectRegisterCorporateLoading);
  const loadingFiles = useSelector(selectUploadCorporateFilesLoading);
  const error = useSelector(selectRegisterCorporateError);

  const registerCorporate = useRegisterCorporateCommand();
  const uploadCorporateFiles = useUploadCorporateFilesCommand();

  const disabled = useMemo(
    () =>
      !agreed ||
      !agreedPolicy ||
      !state.companyName ||
      !state.registrationNumber ||
      !state.postcode ||
      !state.address ||
      !state.city ||
      !state.country ||
      !state.postalAddress ||
      !state.message ||
      !certificate,
    [state, agreed, agreedPolicy, certificate]
  );

  useEffect(() => {
    if (!loggedIn || loading || error || !certificate) return;

    uploadCorporateFiles(state, certificate, additionalFile);
  }, [loading, loggedIn]);

  const handleInputChange = useCallback(({ currentTarget }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = currentTarget;

    setState((prevState) => ({ ...prevState, [name]: value }));
  }, []);

  const handleTextareaChange = useCallback(({ currentTarget }: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = currentTarget;

    setState((prevState) => ({ ...prevState, [name]: value }));
  }, []);

  const handleCertificateDrop = useCallback((files: File[]) => {
    setCertificate(files[0] || null);
  }, []);

  const handleAdditionalDrop = useCallback((files: File[]) => {
    setAdditionalFile(files[0]);
  }, []);

  const handleAgreementClick = useCallback(() => {
    setAgreed((prevAgreed) => !prevAgreed);
  }, []);

  const handleAgreementPolicyClick = useCallback(() => {
    setAgreedPolicy((prevAgreedPolicy) => !prevAgreedPolicy);
  }, []);

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!agreed || !certificate || disabled) return;

      const formFile = toJsonFile(state, 'form-data');
      const files = [formFile, certificate, ...(additionalFile ? [additionalFile] : [])];

      createMerkleRoot(files, (merkleRoot) => {
        registerCorporate(merkleRoot, state.companyName);
        corporateOnboardingControls.open();
      });
    },
    [agreed, disabled, certificate]
  );

  return (
    <CorporateOnboardingView
      {...state}
      disabled={disabled}
      className={className}
      loading={loading || loadingFiles}
      authEidUrl={registerUrl}
      agreed={agreed}
      agreedPolicy={agreedPolicy}
      handleInputChange={handleInputChange}
      handleTextareaChange={handleTextareaChange}
      handleAgreementClick={handleAgreementClick}
      handleAgreementPolicyClick={handleAgreementPolicyClick}
      handleCertificateDrop={handleCertificateDrop}
      handleAdditionalDrop={handleAdditionalDrop}
      handleSubmit={handleSubmit}
    />
  );
});
