import React, { FC, MouseEvent, ReactNode } from 'react';

import clsx from 'clsx';

import { Product } from '~/types/productTypes';
import { Order } from '~/types/orderTypes';
import { AccordionComponent } from '~/components/Accordion/AccordionComponent';
import { PositionsSessionAccordionBodyRowComponent } from '~/modules/Positions/components/SessionAccordionBodyRow/SessionAccordionBodyRowComponent';

import style from './style.module.scss';

type Props = {
  visible: boolean;
  orders: Order<number>[];
  product: Product;
  handleAccordionToggle: (event: MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
};

export const PositionsSessionAccordionComponent: FC<Props> = ({
  visible,
  orders,
  product,
  children,
  handleAccordionToggle
}) => {
  return (
    <AccordionComponent
      className={style.positionsAccordion}
      headerClassName={clsx(visible && style.positionsAccordionHeaderVisible)}
      bodyClassName={style.positionsAccordionBodyParent}
      visible={visible}
      sticky
      handleToggle={handleAccordionToggle}
    >
      {children}
      <div className={style.positionsAccordionBody}>
        {orders.map(({ timestamp, price, id, quantity, tradePnl, clientIsDefault, clientIsLiquidation }) => (
          <PositionsSessionAccordionBodyRowComponent
            key={id}
            timestamp={timestamp}
            price={price}
            product={product}
            liquidation={clientIsLiquidation}
            defaulted={clientIsDefault}
            quantity={quantity}
            profitLoss={tradePnl}
          />
        ))}
      </div>
    </AccordionComponent>
  );
};
