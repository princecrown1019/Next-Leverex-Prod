import React, { ChangeEvent, FormEvent, memo } from 'react';

import { ModalComponent, Props as ModalProps } from '~/components/Modal/ModalComponent';
import { ModalHeadlineComponent } from '~/components/ModalHeadline/ModalHeadlineComponent';
import { ModalPitchComponent } from '~/components/ModalPitch/ModalPitchComponent';
import { ActionButtonComponent } from '~/components/ActionButton/ActionButtonComponent';
import { InputComponent } from '~/components/Input/InputComponent';
import { TextareaComponent } from '~/components/Textarea/TextareaComponent';

import style from './style.module.scss';

type Props = Omit<ModalProps, 'children'> & {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  disabled: boolean;
  loading: boolean;
  message: string;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleTextareaChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export const ContactView = memo<Props>(
  ({
    visible,
    firstName,
    lastName,
    email,
    phone,
    message,
    loading,
    disabled,
    handleClose,
    handleClosed,
    handleSubmit,
    handleInputChange,
    handleTextareaChange
  }) => (
    <ModalComponent visible={visible} handleClose={handleClose} handleClosed={handleClosed}>
      <ModalHeadlineComponent>How can we help?</ModalHeadlineComponent>
      <ModalPitchComponent>
        We are here to help and answer any question you might heve. We look foard to hearing from you.
      </ModalPitchComponent>

      <form className={style.contactModalForm} onSubmit={handleSubmit}>
        <InputComponent
          className={style.contactModalFormInput}
          label="First Name *"
          value={firstName}
          name="firstName"
          onChange={handleInputChange}
        />
        <InputComponent
          className={style.contactModalFormInput}
          label="Last Name *"
          value={lastName}
          name="lastName"
          onChange={handleInputChange}
        />
        <InputComponent
          className={style.contactModalFormInput}
          label="Email *"
          value={email}
          name="email"
          onChange={handleInputChange}
        />
        <InputComponent
          className={style.contactModalFormInput}
          label="Phone"
          value={phone}
          name="phone"
          onChange={handleInputChange}
        />
        <TextareaComponent
          className={style.contactModalFormInput}
          label="Message"
          rows={4}
          value={message}
          name="message"
          onChange={handleTextareaChange}
        />

        <ActionButtonComponent className={style.contactModalButton} disabled={disabled} loading={loading} type="submit">
          Submit
        </ActionButtonComponent>
      </form>
    </ModalComponent>
  )
);
