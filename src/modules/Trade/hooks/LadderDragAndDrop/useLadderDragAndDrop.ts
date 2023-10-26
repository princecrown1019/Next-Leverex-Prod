import { DragEvent, useCallback, useState } from 'react';

import { ProductSide } from '~/types/productTypes';
import { useUpdateWorkingOrderCommand } from '~/modules/Trade/commands/UpdateWorkingOrder/useUpdateWorkingOrderCommand';

type ActiveMeta = {
  price: number;
  id: string;
  side: ProductSide;
  quantity: number;
};

export const useLadderDragAndDrop = () => {
  const [active, setActive] = useState<null | ActiveMeta>(null);

  const updateOrder = useUpdateWorkingOrderCommand();

  const handleDragStart = useCallback((event: DragEvent<HTMLButtonElement>) => {
    const { dataset } = event.currentTarget;

    const id = dataset.id;
    if (!id) {
      event.preventDefault();
      return;
    }

    const price = Number(dataset.price);
    const side = Number(dataset.side);
    const quantity = Number(dataset.qty);

    setActive({ quantity, price, side, id });
  }, []);

  const handleDragOver = useCallback((event: DragEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (event: DragEvent<HTMLButtonElement>) => {
      if (!active) {
        event.preventDefault();
        return;
      }

      const price = Number(event.currentTarget.dataset.price);

      updateOrder(active.id, active.side, active.quantity, price);
    },
    [active]
  );

  return { handleDragOver, handleDragStart, handleDrop };
};
