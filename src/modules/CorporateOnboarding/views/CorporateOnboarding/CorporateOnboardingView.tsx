import React, { ChangeEvent, FormEvent, memo } from 'react';
import { isMobile } from 'react-device-detect';

import clsx from 'clsx';

import { ModalPitchComponent } from '~/components/ModalPitch/ModalPitchComponent';
import { LinkComponent } from '~/components/Link/LinkComponent';
import { LinkButtonComponent } from '~/components/LinkButton/LinkButtonComponent';
import { ButtonComponent } from '~/components/Button/ButtonComponent';
import { StaticPath } from '~/constants/pathsConstants';
import { CheckboxComponent } from '~/components/Checkbox/CheckboxComponent';
import { ActionButtonComponent } from '~/components/ActionButton/ActionButtonComponent';
import { InputComponent } from '~/components/Input/InputComponent';
import { TextareaComponent } from '~/components/Textarea/TextareaComponent';
import { DragAndDropComponent } from '~/components/DragAndDrop/DragAndDropComponent';

import style from './style.module.scss';

export type Props = {
  className?: string;
  companyName: string;
  registrationNumber: string;
  postcode: string;
  address: string;
  city: string;
  country: string;
  postalAddress: string;
  message: string;
  authEidUrl: null | string;
  agreed: boolean;
  agreedPolicy: boolean;
  disabled: boolean;
  loading: boolean;
  handleAgreementClick: () => void;
  handleAgreementPolicyClick: () => void;
  handleCertificateDrop: (files: File[]) => void;
  handleAdditionalDrop: (files: File[]) => void;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleTextareaChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export const CorporateOnboardingView = memo<Props>(
  ({
    className,
    companyName,
    registrationNumber,
    postcode,
    address,
    city,
    country,
    postalAddress,
    message,
    authEidUrl,
    agreed,
    agreedPolicy,
    disabled,
    loading,
    handleInputChange,
    handleAdditionalDrop,
    handleCertificateDrop,
    handleTextareaChange,
    handleAgreementClick,
    handleAgreementPolicyClick,
    handleSubmit
  }) => (
    <form className={clsx(style.corporateOnboardingModalForm, className)} onSubmit={handleSubmit}>
      <InputComponent
        label="Company name"
        value={companyName}
        disabled={loading}
        name="companyName"
        onChange={handleInputChange}
      />

      <div className={style.corporateOnboardingModalInputs}>
        <InputComponent
          className={style.corporateOnboardingModalFormInput}
          label="Registration number"
          value={registrationNumber}
          disabled={loading}
          name="registrationNumber"
          onChange={handleInputChange}
        />
        <InputComponent
          className={style.corporateOnboardingModalFormInput}
          label="Postcode"
          value={postcode}
          disabled={loading}
          name="postcode"
          onChange={handleInputChange}
        />
      </div>

      <div className={style.corporateOnboardingModalInputs}>
        <InputComponent
          className={style.corporateOnboardingModalFormInput}
          label="Address"
          value={address}
          disabled={loading}
          name="address"
          onChange={handleInputChange}
        />
        <InputComponent
          className={style.corporateOnboardingModalFormInput}
          label="City"
          value={city}
          disabled={loading}
          name="city"
          onChange={handleInputChange}
        />
      </div>

      <div className={style.corporateOnboardingModalInputs}>
        <InputComponent
          className={style.corporateOnboardingModalFormInput}
          label="Country"
          value={country}
          disabled={loading}
          name="country"
          onChange={handleInputChange}
        />
        <InputComponent
          className={style.corporateOnboardingModalFormInput}
          label="Postal address"
          value={postalAddress}
          disabled={loading}
          name="postalAddress"
          onChange={handleInputChange}
        />
      </div>

      <div className={style.corporateOnboardingModalInputs}>
        <DragAndDropComponent
          className={style.corporateOnboardingModalFormDragAndDrop}
          label="Certificate of incorporation"
          placeholder="Certificate of incorporation in PDF format"
          accept={{ 'application/pdf': ['.pdf'] }}
          maxFiles={1}
          disabled={loading}
          handleDrop={handleCertificateDrop}
        />
        <DragAndDropComponent
          className={style.corporateOnboardingModalFormDragAndDrop}
          label="Additional document"
          placeholder="Other support file you might want to share"
          accept={{ 'application/pdf': ['.pdf'] }}
          maxFiles={1}
          disabled={loading}
          handleDrop={handleAdditionalDrop}
        />
      </div>

      <TextareaComponent
        className={style.corporateOnboardingModalFormTextarea}
        label="Message"
        rows={5}
        value={message}
        name="message"
        disabled={loading}
        onChange={handleTextareaChange}
      />

      <ButtonComponent
        className={clsx(style.corporateOnboardingModalAgreement)}
        onClick={handleAgreementClick}
        withoutRipple
      >
        <CheckboxComponent className={style.corporateOnboardingModalAgreementCheckbox} value={agreed} disabled />

        <ModalPitchComponent
          className={clsx(style.corporateOnboardingModalPitch, style.corporateOnboardingModalAgreementPitch)}
        >
          I confirm that I have the legal capacity to act on behalf of the legal entity applying for a corporate account
          with Leverex.
        </ModalPitchComponent>
      </ButtonComponent>

      <ButtonComponent
        className={clsx(style.corporateOnboardingModalAgreement)}
        onClick={handleAgreementPolicyClick}
        withoutRipple
      >
        <CheckboxComponent className={style.corporateOnboardingModalAgreementCheckbox} value={agreedPolicy} disabled />

        <ModalPitchComponent
          className={clsx(style.corporateOnboardingModalPitch, style.corporateOnboardingModalAgreementPitch)}
        >
          By submitting this form I confirm that I have read, understood and agreed to Leverex’s &nbsp;
          <LinkComponent
            className={style.corporateOnboardingModalAgreementLink}
            href={StaticPath.PRIVACY_POLICY}
            target="_blank"
          >
            Privacy policy
          </LinkComponent>
          &nbsp;and&nbsp;
          <LinkComponent
            className={style.corporateOnboardingModalAgreementLink}
            href={StaticPath.PARTICIPANT_AGREEMENT}
            target="_blank"
          >
            Paritcipant agreement
          </LinkComponent>
          &nbsp;and I agree that Leverex can store and process my personal as well as coorporate data.
        </ModalPitchComponent>
      </ButtonComponent>

      {isMobile ? (
        <LinkButtonComponent
          className={style.corporateOnboardingModalButton}
          disabled={disabled || loading}
          href={authEidUrl}
          target="_blank"
        >
          Submit
        </LinkButtonComponent>
      ) : (
        <ActionButtonComponent
          className={style.corporateOnboardingModalButton}
          loading={loading}
          disabled={disabled}
          type="submit"
        >
          Submit
        </ActionButtonComponent>
      )}
    </form>
  )
);
