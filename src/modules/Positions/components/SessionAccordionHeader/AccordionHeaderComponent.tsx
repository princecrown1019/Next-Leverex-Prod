import React, { FC } from 'react';

import clsx from 'clsx';

import { Product } from '~/types/productTypes';
import { VisibleActionIconComponent } from '~/components/VisibleActionIcon/VisibleActionIconComponent';
import { ValueComponent } from '~/components/Value/ValueComponent';
import { NetExposureLabelComponent } from '~/components/NetExposureLabel/NetExposureLabelComponent';
import { TextGradientComponent } from '~/components/TextGradient/TextGradientComponent';
import { ChangeArrowComponent } from '~/components/ChangeArrow/ChangeArrowComponent';
import { PositionsAccordionColumnComponent } from '~/modules/Positions/components/AccordionColumn/AccordionColumnComponent';
import { ProductPairComponent } from '~/components/ProductPair/ProductPairComponent';

import style from './style.module.scss';

type Props = {
  visible: boolean;
  profitLoss: number;
  netExposure: number;
  product: Product;
};

export const PositionsSessionAccordionHeaderComponent: FC<Props> = ({ visible, product, netExposure, profitLoss }) => (
  <div className={style.positionsAccordionHeader}>
    <PositionsAccordionColumnComponent>
      <span className={clsx(style.positionsAccordionHeaderValue, style.positionsAccordionHeaderValueMargin)}>
        <ProductPairComponent ticker={product.ticker} currency={product.currency} />
      </span>
      <VisibleActionIconComponent visible={visible} />
    </PositionsAccordionColumnComponent>

    <PositionsAccordionColumnComponent />

    <PositionsAccordionColumnComponent>
      <NetExposureLabelComponent className={style.positionsAccordionHeaderNetLabel} value={netExposure} />
      <TextGradientComponent
        className={style.positionsAccordionHeaderValue}
        positive={netExposure > 0}
        visible={!!netExposure}
      >
        <ValueComponent fix={8} abs>
          {netExposure}
        </ValueComponent>
      </TextGradientComponent>
    </PositionsAccordionColumnComponent>

    <PositionsAccordionColumnComponent>
      <ChangeArrowComponent
        className={style.positionsAccordionHeaderChangeIcon}
        positive={profitLoss > 0}
        visible={!!profitLoss}
        gradient
      />
      <TextGradientComponent
        className={style.positionsAccordionHeaderValue}
        positive={profitLoss > 0}
        visible={!!profitLoss}
      >
        <ValueComponent withPositiveChar>{profitLoss}</ValueComponent>
      </TextGradientComponent>
    </PositionsAccordionColumnComponent>
  </div>
);
