import React, { MouseEvent, useMemo } from 'react';

import clsx from 'clsx';

import { TableHeadCell } from '~/types/tableTypes';
import { TableCellComponent } from '~/components/TableCell/TableCellComponent';
import { DownArrowIcon } from '~/assets/Icons';

import style from './style.module.scss';

type Props<T> = {
  className?: string;
  cellClassName?: string;
  cells: TableHeadCell<T>[];
  handleCellClick: (event: MouseEvent<HTMLButtonElement>) => void;
};

type PropsCell<T> = TableHeadCell<T> & {
  className?: string;
  handleClick: (event: MouseEvent<HTMLButtonElement>) => void;
};

const TableHeadCellComponent = <T,>({ className, label, sortable, value, accessor, handleClick }: PropsCell<T>) => {
  const arrow = useMemo(() => {
    if (!value && typeof value !== 'boolean') return null;

    return <DownArrowIcon className={clsx(style.tableHeadCellIcon, value && style.tableHeadCellIconUp)} />;
  }, [sortable, value]);

  return (
    <TableCellComponent
      className={className}
      valueClassName={style.tableHeadValue}
      name={accessor as string}
      disabled={!sortable}
      handleClick={handleClick}
    >
      <span className={style.tableHeadCellLabel}>{label}</span>
      {arrow}
    </TableCellComponent>
  );
};

export const TableHeadComponent = <T,>({ className, cellClassName, cells, handleCellClick }: Props<T>) => (
  <div className={clsx(style.tableHead, className)}>
    {cells.map((cell) => (
      <TableHeadCellComponent className={cellClassName} key={cell.label} {...cell} handleClick={handleCellClick} />
    ))}
  </div>
);
