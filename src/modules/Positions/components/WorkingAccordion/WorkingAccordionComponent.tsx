import React, { FC, MouseEvent, ReactNode } from 'react';

import clsx from 'clsx';

import { Product } from '~/types/productTypes';
import { Order } from '~/types/orderTypes';
import { AccordionComponent } from '~/components/Accordion/AccordionComponent';
import { PositionsWorkingAccordionBodyRowComponent } from '~/modules/Positions/components/WorkingAccordionBodyRow/WorkingAccordionBodyRowComponent';

import style from './style.module.scss';

type Props = {
  visible: boolean;
  orders: Order<number>[];
  product: Product;
  handleAccordionToggle: (event: MouseEvent<HTMLButtonElement>) => void;
  handleCancelClick: (event: MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
};

export const PositionsWorkingAccordionComponent: FC<Props> = ({
  visible,
  orders,
  product,
  children,
  handleAccordionToggle,
  handleCancelClick
}) => {
  return (
    <AccordionComponent
      className={style.positionsWorkingAccordion}
      headerClassName={clsx(visible && style.positionsWorkingAccordionHeaderVisible)}
      bodyClassName={style.positionsWorkingAccordionBodyParent}
      visible={visible}
      sticky
      handleToggle={handleAccordionToggle}
    >
      {children}
      <div className={style.positionsWorkingAccordionBody}>
        {orders.map(({ timestamp, price, id, quantity }) => (
          <PositionsWorkingAccordionBodyRowComponent
            key={id}
            timestamp={timestamp}
            price={price}
            product={product}
            id={id}
            quantity={quantity}
            handleCancelClick={handleCancelClick}
          />
        ))}
      </div>
    </AccordionComponent>
  );
};
