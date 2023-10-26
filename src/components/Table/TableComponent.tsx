import React, { ReactNode, MouseEvent, useCallback, useState, useMemo } from 'react';

import clsx from 'clsx';

import { TableHeadCell } from '~/types/tableTypes';
import { TableHeadComponent } from '~/components/TableHead/TableHeadComponent';
import { TableBodyComponent } from '~/components/TableBody/TableComponent';
import { EmptyWrapperComponent } from '~/components/EmptyWrapper/EmptyWrapperComponent';
import { LoadingWrapperComponent } from '~/components/LoadingWrapper/LoadingWrapperComponent';

import style from './style.module.scss';

type Props<T> = {
  className?: string;
  headClassName?: string;
  headCellClassName?: string;
  bodyClassName?: string;
  cells: TableHeadCell<T>[];
  data: T[];
  emptyMessage?: string;
  loading?: boolean;
  virtualizedHeightOffset?: number;
  renderRow: (item: T, idx: number) => ReactNode;
};

const getNewCell = <T,>(cell: TableHeadCell<T>, accessor: string) => {
  if (!cell.sortable || cell.accessor !== accessor) return { ...cell, value: null };

  return { ...cell, value: cell.value === false ? null : !cell.value };
};

const compare = <T extends Record<string, unknown>>(first: T, secod: T, accessor: keyof T) => {
  return (first[accessor] as string | number)
    ?.toString()
    .localeCompare((secod[accessor] as string | number)?.toString());
};

const sortData = <T extends Record<string, unknown>>(
  data: T[],
  value: Required<TableHeadCell<T>>['value'],
  accessor: Required<TableHeadCell<T>>['accessor']
) => {
  return [...data].sort((prev, curr) => {
    return value ? compare(curr, prev, accessor) : compare(prev, curr, accessor);
  });
};

export const TableComponent = <T extends Record<string, unknown>>({
  className,
  headClassName,
  headCellClassName,
  bodyClassName,
  cells,
  data,
  loading,
  virtualizedHeightOffset,
  emptyMessage = 'No data',
  renderRow
}: Props<T>) => {
  const [sortedCells, setSortedCells] = useState(cells);

  const handleCellClick = useCallback(({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
    if (!currentTarget.name) return;

    setSortedCells((prevCells) => prevCells.map((cell) => getNewCell(cell, currentTarget.name)));
  }, []);

  const sortedData = useMemo(() => {
    if (!data.length) return [];

    const sortedCell = sortedCells.find((cell) => cell.sortable && typeof cell.value === 'boolean' && !!cell.accessor);
    if (!sortedCell) return data;

    return sortData(data, sortedCell.value!, sortedCell.accessor!);
  }, [data, sortedCells]);

  return (
    <div className={clsx(style.tableContainer, className)}>
      <LoadingWrapperComponent visible={loading}>
        <EmptyWrapperComponent visible={!data.length} message={emptyMessage}>
          <TableHeadComponent
            className={headClassName}
            cellClassName={headCellClassName}
            cells={sortedCells}
            handleCellClick={handleCellClick}
          />
          <TableBodyComponent
            className={bodyClassName}
            data={sortedData}
            renderRow={renderRow}
            virtualizedHeightOffset={virtualizedHeightOffset}
          />
        </EmptyWrapperComponent>
      </LoadingWrapperComponent>
    </div>
  );
};
