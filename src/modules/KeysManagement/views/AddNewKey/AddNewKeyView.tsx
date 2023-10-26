import React, { ChangeEvent, FC, FormEvent, KeyboardEvent } from 'react';

import clsx from 'clsx';

import { SDK_ISSUES_URL, SDK_URL } from '~/constants/configConstants';
import { InputComponent } from '~/components/Input/InputComponent';
import { TextareaComponent } from '~/components/Textarea/TextareaComponent';
import { ActionButtonComponent } from '~/components/ActionButton/ActionButtonComponent';
import { LinkComponent } from '~/components/Link/LinkComponent';

import style from './style.module.scss';

export type Props = {
  className?: string;
  label: string;
  value: string;
  loading: boolean;
  disabled: boolean;
  handleLabelChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleValueChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  handleValuePaste: (value: string) => void;
  handleValueKeyDown: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export const AddNewKeyView: FC<Props> = ({
  className,
  label,
  value,
  loading,
  disabled,
  handleLabelChange,
  handleValueChange,
  handleValuePaste,
  handleValueKeyDown,
  handleSubmit
}) => {
  return (
    <form className={clsx(style.addDeviceKey, className)} onSubmit={handleSubmit}>
      <div className={style.addDeviceKeyColumn}>
        <InputComponent className={style.addDeviceKeyInput} label="Label" value={label} onChange={handleLabelChange} />
        <TextareaComponent
          className={style.addDeviceKeyInput}
          label="SSH"
          rows={5}
          autoFocus
          staticLabel
          placeholder="Begins with '-----BEGIN EC PRIVATE KEY-----', ends with '-----END EC PRIVATE KEY-----'"
          value={value}
          onKeyDown={handleValueKeyDown}
          onChange={handleValueChange}
          onPasteClick={handleValuePaste}
        />
        <div className={style.addDeviceKeyFooter}>
          <ActionButtonComponent
            className={style.addDeviceKeyButton}
            loading={loading}
            disabled={disabled}
            type="submit"
          >
            Add
          </ActionButtonComponent>
          <p className={style.addDeviceKeyPitch}>
            Check out our guide to&nbsp;
            <LinkComponent href={SDK_URL} target="_blank">
              generating device keys
            </LinkComponent>
            &nbsp; or&nbsp;
            <LinkComponent href={SDK_ISSUES_URL} target="_blank">
              troubleshoot common problems
            </LinkComponent>
            .
          </p>
        </div>
      </div>
    </form>
  );
};
