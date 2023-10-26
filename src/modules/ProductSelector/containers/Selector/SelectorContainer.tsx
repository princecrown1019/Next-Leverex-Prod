import React, { memo, useCallback, MouseEvent, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { supportedProducts } from '~/constants/productConstants';
import { ProductType } from '~/types/productTypes';
import { selectProduct } from '~/store/Market/selectors';
import { useChangeProductCommand } from '~/modules/ProductSelector/commands/ChangeProduct/useChangeProductCommand';
import { ProductSelectorView } from '~/modules/ProductSelector/views/Selector/SelectorView';

export const ProductSelectorContainer = memo(() => {
  const [open, setOpen] = useState(false);

  const selectedProduct = useSelector(selectProduct);

  const changeProduct = useChangeProductCommand();

  const filteredProducts = useMemo(() => {
    return supportedProducts.filter(({ type }) => type !== selectedProduct.type);
  }, [selectedProduct.type]);

  const disabled = useMemo(() => !filteredProducts.length, [filteredProducts.length]);

  const handleSelectorClick = useCallback(() => {
    if (disabled) return;

    setOpen((prevOpen) => !prevOpen);
  }, [disabled]);

  const handleOutsideClick = useCallback(() => {
    setOpen((prevOpen) => !prevOpen);
  }, []);

  const handleProductClick = useCallback(({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
    changeProduct(currentTarget.name as ProductType);
    setOpen(false);
  }, []);

  return (
    <ProductSelectorView
      selectedProduct={selectedProduct}
      open={open}
      disabled={disabled}
      products={filteredProducts}
      handleProductClick={handleProductClick}
      handleClick={handleSelectorClick}
      handleOutsideClick={handleOutsideClick}
    />
  );
});
