import React, { FC, useCallback } from 'react';

import clsx from 'clsx';

import { WITHDRAWAL_STATUSES } from '~/constants/withdrawalsConstants';
import { TableHeadCell } from '~/types/tableTypes';
import { Network } from '~/types/networkTypes';
import { TransactionType } from '~/types/transactionTypes';
import { LiquidTransaction } from '~/types/liquidTransactionTypes';
import { WithdrawalStatus } from '~/types/withdrawalsTypes';
import { truncateText } from '~/services/TextFormat/textFormatService';
import { useClipboard } from '~/hooks/Clipboard/useClipboard';
import { TableComponent } from '~/components/Table/TableComponent';
import { ValueDateFullUtcComponent } from '~/components/ValueDateFullUtc/ValueDateFullUtcComponent';
import { LinkComponent } from '~/components/Link/LinkComponent';
import { ValueComponent } from '~/components/Value/ValueComponent';
import { TableCellComponent } from '~/components/TableCell/TableCellComponent';
import { ButtonComponent } from '~/components/Button/ButtonComponent';
import { TransactionAddressTooltipComponent } from '~/components/TransactionAddressTooltip/TableTransactionsComponent';
import { LoadingComponent } from '~/components/Loading/LoadingComponent';
import { CloseIcon, LiquidNetworkIcon } from '~/assets/Icons';
import { generateListKey } from '~/services/Random/randomService';

import style from './style.module.scss';

type Props = {
  className?: string;
  transactions: LiquidTransaction<number>[];
  emptyMessage: string;
  withConfs?: boolean;
  loading?: boolean;
  cancellingIds?: string[];
  virtualizedHeightOffset?: number;
  handleCancelClick?: (id: string, requestId?: string) => void;
};

const cells: TableHeadCell<LiquidTransaction<number>>[] = [
  {
    label: 'Date (UTC)',
    sortable: true,
    accessor: 'timestamp',
    value: true
  },
  {
    label: 'Network',
    sortable: false
  },
  {
    label: 'Address',
    sortable: true,
    accessor: 'recvAddress'
  },
  {
    label: 'Asset',
    sortable: true,
    accessor: 'currency'
  },
  {
    label: 'Amount',
    sortable: true,
    accessor: 'amount'
  },
  {
    label: 'Link',
    sortable: false
  },
  {
    label: 'Status',
    sortable: true,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    accessor: 'status'
  }
];

const getStatus = (item: LiquidTransaction<number>, withConfs?: boolean) => {
  if (item.type === TransactionType.WITHDRAWAL && item.status !== WithdrawalStatus.BROADCASTED) {
    return WITHDRAWAL_STATUSES[item.status];
  }

  const confirmingStatus = withConfs ? `${item.nbConf || 0}/2` : 'Confirming';
  const status = item.nbConf < 2 ? confirmingStatus : 'Completed';

  return status;
};

const getStatusClassName = (item: LiquidTransaction<number>) => {
  const status = item.type === TransactionType.WITHDRAWAL ? item.status : null;
  if (status === WithdrawalStatus.PENDING || status === WithdrawalStatus.ACCEPTED) return null;

  if (status === WithdrawalStatus.CANCELLED || status === WithdrawalStatus.FAILED) {
    return style.transactionsTableCellStatusFailed;
  }

  if (status === WithdrawalStatus.COMPLETED || item.nbConf >= 2) return style.transactionsTableCellStatusCompleted;
  if (status === WithdrawalStatus.BROADCASTED || item.nbConf < 2) return style.transactionsTableCellStatusConfirming;

  return null;
};

export const TableTransactionsComponent: FC<Props> = ({
  className,
  transactions,
  loading,
  withConfs,
  cancellingIds,
  virtualizedHeightOffset,
  emptyMessage = 'You have no transfers history yet',
  handleCancelClick
}) => {
  const { copyToClipboard } = useClipboard();

  const handleAddressClick = useCallback(
    (address: string) => () => {
      copyToClipboard(address);
    },
    []
  );

  const renderRow = useCallback(
    (item: LiquidTransaction<number>, idx: number) => {
      const cancellable =
        item.type === TransactionType.WITHDRAWAL &&
        (item.status === WithdrawalStatus.ACCEPTED || item.status === WithdrawalStatus.PENDING);
      const cancelling =
        item.type === TransactionType.WITHDRAWAL && (item.id ? cancellingIds?.includes(item.id) : false);

      const status = getStatus(item, withConfs);
      const statusClassName = getStatusClassName(item);

      const handleCancel = () => {
        if (item.type !== TransactionType.WITHDRAWAL || !item.id) return;

        handleCancelClick?.(item.id, item.requestId);
      };

      return (
        <div className={style.transactionsTableCellRow} key={generateListKey(idx, item.timestamp)}>
          <TableCellComponent className={style.transactionsTableCell}>
            <ValueDateFullUtcComponent>{item.timestamp}</ValueDateFullUtcComponent>
          </TableCellComponent>

          <TableCellComponent className={style.transactionsTableCell}>
            <LiquidNetworkIcon className={style.transactionsTableNetworkIcon} />
            {Network.LIQUID}
          </TableCellComponent>

          <TableCellComponent className={style.transactionsTableCell}>
            <TransactionAddressTooltipComponent address={item.recvAddress}>
              <ButtonComponent onClick={handleAddressClick(item.recvAddress)} withoutRipple>
                {truncateText(item.recvAddress, 8, 8)}
              </ButtonComponent>
            </TransactionAddressTooltipComponent>
          </TableCellComponent>

          <TableCellComponent className={style.transactionsTableCell}>{item.currency}</TableCellComponent>

          <TableCellComponent className={style.transactionsTableCell}>
            <ValueComponent withPositiveChar>{item.amount}</ValueComponent>
          </TableCellComponent>

          <TableCellComponent className={style.transactionsTableCell} withoutWrapper={!!item.unblindedLink}>
            {item.unblindedLink ? (
              <LinkComponent className={style.transactionsTableLink} href={item.unblindedLink} target="_blank">
                Explorer
              </LinkComponent>
            ) : (
              '-'
            )}
          </TableCellComponent>

          <TableCellComponent
            className={style.transactionsTableCell}
            valueClassName={clsx(statusClassName, style.transactionsTableCellStatusValue)}
          >
            {status}
            {cancellable && (
              <ButtonComponent
                className={style.transactionsTableCellCancelButton}
                onClick={handleCancel}
                disabled={cancelling}
              >
                {cancelling ? (
                  <LoadingComponent className={style.transactionsTableCellLoadingIndicator} />
                ) : (
                  <CloseIcon className={style.transactionsTableCellCancelIcon} />
                )}
              </ButtonComponent>
            )}
          </TableCellComponent>
        </div>
      );
    },
    [withConfs, handleCancelClick]
  );

  return (
    <TableComponent
      className={clsx(style.transactionsTable, className)}
      headCellClassName={style.transactionsTableCell}
      bodyClassName={style.transactionsTableBody}
      cells={cells}
      data={transactions}
      loading={loading}
      virtualizedHeightOffset={virtualizedHeightOffset}
      emptyMessage={emptyMessage}
      renderRow={renderRow}
    />
  );
};
