import React, { ReactNode, useCallback } from 'react';
import { AutoSizer, List, ListRowProps, WindowScroller } from 'react-virtualized';

import clsx from 'clsx';

import style from './style.module.scss';

type Props<T> = {
  className?: string;
  data: T[];
  renderRow: (item: T, idx: number) => ReactNode;
  virtualizedHeightOffset?: number;
};

export const TableBodyComponent = <T,>({ className, data, renderRow, virtualizedHeightOffset }: Props<T>) => {
  const rowRenderer = useCallback(
    ({ index, key, style: rowStyle }: ListRowProps) => {
      return (
        <div key={key} style={rowStyle}>
          {renderRow(data[index], index)}
        </div>
      );
    },
    [data]
  );

  return typeof virtualizedHeightOffset === 'number' ? (
    <div className={clsx(style.tableBody, className)}>
      <WindowScroller>
        {({ height, registerChild }) => (
          <AutoSizer>
            {({ width }) => (
              <div ref={registerChild}>
                <List
                  className={style.tableBodyList}
                  width={width}
                  height={height - virtualizedHeightOffset}
                  rowHeight={26}
                  rowRenderer={rowRenderer}
                  rowCount={data.length}
                  overscanRowCount={5}
                />
              </div>
            )}
          </AutoSizer>
        )}
      </WindowScroller>
    </div>
  ) : (
    <div className={clsx(style.tableBody, style.tableBodyNotVirtualized, className)}>
      {data.map((row, idx) => renderRow(row, idx))}
    </div>
  );
};
