import React, { FC, useCallback, useMemo } from 'react';

import clsx from 'clsx';

import { Address } from '~/types/addressTypes';
import { truncateText } from '~/services/TextFormat/textFormatService';
import { DropdownComponent, Props as DropdownProps } from '~/components/Dropdown/DropdownComponent';
import { LinkComponent } from '~/components/Link/LinkComponent';
import { AccountPath } from '~/constants/pathsConstants';

import style from './style.module.scss';

type Props = Omit<DropdownProps<Address>, 'renderSelected' | 'renderOption' | 'optionKey' | 'label'>;

export const AddressDropdownComponent: FC<Props> = (props) => {
  const footer = useMemo(
    () => (
      <LinkComponent
        className={clsx(style.addressDropdownOption, style.addressDropdownFooterButton)}
        href={AccountPath.ADDRESS_MANAGEMENT_NEW}
      >
        Add new withdrawal address
      </LinkComponent>
    ),
    []
  );

  const renderOption = useCallback(
    (selected?: boolean) => (value: null | Address) => {
      if (!value) return null;

      return (
        <div className={selected ? style.addressDropdownSelected : style.addressDropdownOption}>
          <span className={style.addressDropdownOptionName}>
            [{truncateText(value.description!, 21, 0)} • {truncateText(value.address, 5, 6)}]
          </span>
        </div>
      );
    },
    []
  );

  const optionKey = useCallback((option: Address) => option.address, []);

  return (
    <DropdownComponent
      {...props}
      label="Select where to withdraw"
      optionKey={optionKey}
      renderSelected={renderOption(true)}
      renderOption={renderOption()}
      footer={footer}
    />
  );
};
