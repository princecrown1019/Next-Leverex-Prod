import React, { FC, MouseEvent } from 'react';

import clsx from 'clsx';

import { Product } from '~/types/productTypes';
import { ValueComponent } from '~/components/Value/ValueComponent';
import { NetExposureLabelComponent } from '~/components/NetExposureLabel/NetExposureLabelComponent';
import { ValueDateFullUtcComponent } from '~/components/ValueDateFullUtc/ValueDateFullUtcComponent';
import { ProductPairComponent } from '~/components/ProductPair/ProductPairComponent';
import { PositionsAccordionColumnComponent } from '~/modules/Positions/components/AccordionColumn/AccordionColumnComponent';
import { ButtonComponent } from '~/components/Button/ButtonComponent';
import { CloseIcon } from '~/assets/Icons';

import style from './style.module.scss';

type Props = {
  timestamp: number;
  price: number;
  quantity: number;
  product: Product;
  id: string;
  handleCancelClick: (event: MouseEvent<HTMLButtonElement>) => void;
};

export const PositionsWorkingAccordionBodyRowComponent: FC<Props> = ({
  timestamp,
  price,
  quantity,
  id,
  product,
  handleCancelClick
}) => (
  <div className={style.positionsAccordionBodyRow}>
    <PositionsAccordionColumnComponent>
      <time className={clsx(style.positionsAccordionBodyRowValue, style.positionsAccordionBodyRowValueTime)}>
        <ValueDateFullUtcComponent>{timestamp}</ValueDateFullUtcComponent>
      </time>
      <span className={clsx(style.positionsAccordionBodyRowValue, style.positionsAccordionBodyRowValueProduct)}>
        <ProductPairComponent ticker={product.ticker} currency={product.currency} />
      </span>
    </PositionsAccordionColumnComponent>

    <PositionsAccordionColumnComponent>
      <span className={style.positionsAccordionBodyRowValue}>
        <ValueComponent>{price}</ValueComponent>
      </span>
    </PositionsAccordionColumnComponent>

    <PositionsAccordionColumnComponent>
      <NetExposureLabelComponent className={style.positionsAccordionBodyRowNetLabel} value={quantity} />
      <span className={style.positionsAccordionBodyRowValue}>
        <ValueComponent fix={8} abs>
          {quantity}
        </ValueComponent>
      </span>
    </PositionsAccordionColumnComponent>

    <PositionsAccordionColumnComponent cancel>
      <ButtonComponent className={style.positionsAccordionBodyRowCancelButton} name={id} onClick={handleCancelClick}>
        <CloseIcon className={style.positionsAccordionBodyRowCancelIcon} />
      </ButtonComponent>
    </PositionsAccordionColumnComponent>
  </div>
);
