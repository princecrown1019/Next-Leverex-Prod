import React, { FC } from 'react';

import clsx from 'clsx';

import { Product } from '~/types/productTypes';
import { ValueComponent } from '~/components/Value/ValueComponent';
import { NetExposureLabelComponent } from '~/components/NetExposureLabel/NetExposureLabelComponent';
import { ChangeArrowComponent } from '~/components/ChangeArrow/ChangeArrowComponent';
import { ValueDateFullUtcComponent } from '~/components/ValueDateFullUtc/ValueDateFullUtcComponent';
import { ProductPairComponent } from '~/components/ProductPair/ProductPairComponent';
import { PositionsAccordionColumnComponent } from '~/modules/Positions/components/AccordionColumn/AccordionColumnComponent';

import style from './style.module.scss';

type Props = {
  timestamp: number;
  price: number;
  quantity: number;
  profitLoss: number;
  liquidation: boolean;
  defaulted: boolean;
  product: Product;
};

export const PositionsSessionAccordionBodyRowComponent: FC<Props> = ({
  timestamp,
  price,
  quantity,
  profitLoss,
  liquidation,
  defaulted,
  product
}) => {
  const classNameDefault = defaulted && style.positionsAccordionBodyRowDefault;
  const classNameLiquidation = liquidation && style.positionsAccordionBodyRowLiquidation;

  return (
    <div className={clsx(style.positionsAccordionBodyRow, classNameDefault, classNameLiquidation)}>
      <PositionsAccordionColumnComponent>
        <span className={clsx(style.positionsAccordionBodyRowValue, style.positionsAccordionBodyRowValueProduct)}>
          <ProductPairComponent ticker={product.ticker} currency={product.currency} />
        </span>
        <time className={clsx(style.positionsAccordionBodyRowValue, style.positionsAccordionBodyRowValueTime)}>
          <ValueDateFullUtcComponent>{timestamp}</ValueDateFullUtcComponent>
        </time>
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

      <PositionsAccordionColumnComponent>
        <ChangeArrowComponent
          className={style.positionsAccordionBodyRowChangeIcon}
          positive={profitLoss > 0}
          visible={!!profitLoss}
        />
        <span className={style.positionsAccordionBodyRowValue}>
          <ValueComponent withPositiveChar>{profitLoss}</ValueComponent>
        </span>
      </PositionsAccordionColumnComponent>
    </div>
  );
};
