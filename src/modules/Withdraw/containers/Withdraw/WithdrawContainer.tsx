import React, { ChangeEvent, FC, FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { Network } from '~/types/networkTypes';
import { ProductType } from '~/types/productTypes';
import { Address } from '~/types/addressTypes';
import { selectWhitelistedAddresses } from '~/store/Addresses/selectors';
import { selectBuyingPower } from '~/store/Balances/selectors';
import { selectProduct } from '~/store/Market/selectors';
import { selectWithdrawalLoading } from '~/store/Withdrawals/selectors';
import { replacePrice } from '~/services/InputFormat/inputFormatService';
import { toNumber } from '~/services/NumberFormat/numberFormatService';
import { useLoadWhitelistedAddresses } from '~/modules/Withdraw/commands/LoadWhitelistedAddresses/useLoadWhitelistedAddresses';
import { useWithdrawalCommand } from '~/modules/Withdraw/commands/Withdrawal/useWithdrawalCommand';
import { useInputFocus } from '~/hooks/InputFocus/useDebounce';
import { Props as ViewProps, WithdrawView } from '~/modules/Withdraw/views/Withdraw/WithdrawView';

type Props = Pick<ViewProps, 'className'>;

const amountRegExp = new RegExp(/^\d{0,9}(|(\.(\d{0,2})))$/);

const initialAmount = {
  amount: 0,
  value: '',
  error: false
};

export const WithdrawContainer: FC<Props> = ({ className }) => {
  const { currency } = useSelector(selectProduct);
  const buyingPower = useSelector(selectBuyingPower);
  const addresses = useSelector(selectWhitelistedAddresses);
  const loading = useSelector(selectWithdrawalLoading);

  const [product, setProduct] = useState(ProductType.BTC_USDT);
  const [address, setAddress] = useState<null | Address>(null);
  const [amount, setAmount] = useState(initialAmount);

  const amountInput = useInputFocus();

  useLoadWhitelistedAddresses(!!addresses.length);
  const withdraw = useWithdrawalCommand();

  const disabled = useMemo(() => {
    return !address || !amount.amount || !amount.value || amount.error;
  }, [address, amount.amount, amount.value, amount.error]);

  useEffect(() => {
    if (!addresses.length) return;

    setAddress(addresses[0]);
  }, [addresses.length]);

  useEffect(() => {
    if (!loading) return;

    amountInput.focus();
  }, [loading]);

  const handleProductChange = useCallback((productType: ProductType) => {
    setProduct(productType);
  }, []);

  const handleAmountChange = useCallback(
    ({ currentTarget }: ChangeEvent<HTMLInputElement>) => {
      if (!amountRegExp.test(currentTarget.value.replace(/ /g, ''))) return;

      const newValue = replacePrice(currentTarget.value);
      const numericNewValue = toNumber(newValue);
      const error = numericNewValue > buyingPower;

      setAmount({ value: newValue, amount: numericNewValue, error });
    },
    [buyingPower]
  );

  const handleAddressChange = useCallback((value: Address) => {
    setAddress(value);
    amountInput.focus();
  }, []);

  const handleSubmit = useCallback(
    (event?: FormEvent<HTMLFormElement>) => {
      event?.preventDefault();

      if (loading || disabled) return;

      withdraw(address!.address, amount.amount, currency);
    },
    [loading, disabled, address, amount, currency]
  );

  return (
    <WithdrawView
      className={className}
      disabled={disabled}
      loading={loading}
      amount={amount.value}
      numericAmount={amount.amount}
      amountError={amount.error}
      amountInputRef={amountInput.ref}
      buyingPower={buyingPower}
      ccy={currency}
      address={address}
      addressOptions={addresses}
      product={product}
      network={Network.LIQUID}
      handleSubmit={handleSubmit}
      handleAmountChange={handleAmountChange}
      handleAddressChange={handleAddressChange}
      handleProductChange={handleProductChange}
    />
  );
};
