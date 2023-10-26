import React, { FC, MouseEvent, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import { Network } from '~/types/networkTypes';
import { ProductType } from '~/types/productTypes';
import { selectDepositAddress } from '~/store/Deposits/selectors';
import { useLoadDepositAddressCommand } from '~/modules/Deposit/commands/LoadDepositAddress/useLoadDepositAddressCommand';
import { useClipboard } from '~/hooks/Clipboard/useClipboard';
import { DepositView, Props as ViewProps } from '~/modules/Deposit/views/Deposit/DepositView';

type Props = Pick<ViewProps, 'className'>;

export const DepositContainer: FC<Props> = ({ className }) => {
  const depositAddress = useSelector(selectDepositAddress);

  const [product, setProduct] = useState(ProductType.BTC_USDT);

  const { copyToClipboard } = useClipboard();

  useLoadDepositAddressCommand(!!depositAddress);

  const handleProductChange = useCallback((productType: ProductType) => {
    setProduct(productType);
  }, []);

  const handleCopyClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();

      copyToClipboard(depositAddress);
    },
    [depositAddress]
  );

  return (
    <>
      <DepositView
        className={className}
        depositAddress={depositAddress}
        product={product}
        network={Network.LIQUID}
        handleCopyClick={handleCopyClick}
        handleProductChange={handleProductChange}
      />
    </>
  );
};
