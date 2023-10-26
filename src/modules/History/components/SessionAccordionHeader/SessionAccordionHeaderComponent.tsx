import React, { FC, useMemo } from 'react';

import clsx from 'clsx';

import { VisibleActionIconComponent } from '~/components/VisibleActionIcon/VisibleActionIconComponent';
import { ValueComponent } from '~/components/Value/ValueComponent';
import { ChangeArrowComponent } from '~/components/ChangeArrow/ChangeArrowComponent';
import { TextColouredComponent } from '~/components/TextColoured/TextColouredComponent';
import { ValueBlankComponent } from '~/components/ValueBlank/ValueBlankComponent';
import { TradesAccordionColumnComponent } from '~/modules/History/components/TradesAccordionColumn/TradesAccordionColumnComponent';
import { ValueTimeUtcComponent } from '~/components/ValueTimeUtc/ValueDateFullUtcComponent';

import style from './style.module.scss';

type Props = {
  visible: boolean;
  start: number;
  end: number;
  id: string | number;
  separate?: boolean;
  rollover?: boolean;
  volume: number;
  profitLoss: number;
  close: number;
  open: number;
  fee: number;
};

export const SessionAccordionHeaderComponent: FC<Props> = ({
  visible,
  start,
  end,
  separate,
  id,
  rollover,
  volume,
  open,
  close,
  fee,
  profitLoss
}) => {
  const rolloverClassName = rollover && !!close && style.sessionAccordionHeaderRollover;
  const separateClassName = separate && style.sessionAccordionHeaderSeparate;

  const label = useMemo(() => {
    // if (!close) return 'Open positions';

    // return rollover ? 'Rollover position' : `#${id}`;
    return `#${id}`;
  }, [rollover, close]);

  return (
    <div className={clsx(style.sessionAccordionHeader, rolloverClassName, separateClassName)}>
      <TradesAccordionColumnComponent>
        {!separate && <VisibleActionIconComponent className={style.sessionAccordionHeaderIcon} visible={visible} />}
        <span className={clsx(style.sessionAccordionHeaderValue, style.sessionAccordionHeaderValueMarginRight)}>
          {separate ? (
            'Open positions'
          ) : (
            <>
              <ValueTimeUtcComponent>{start}</ValueTimeUtcComponent>
              &nbsp;-&nbsp;
              <ValueTimeUtcComponent>{end}</ValueTimeUtcComponent>
            </>
          )}
        </span>
        <span className={style.sessionAccordionHeaderId}>{label}</span>
      </TradesAccordionColumnComponent>

      <TradesAccordionColumnComponent />

      <TradesAccordionColumnComponent>
        <span className={style.sessionAccordionHeaderValue}>
          <ValueComponent fix={8} abs>
            {volume}
          </ValueComponent>
        </span>
      </TradesAccordionColumnComponent>

      <TradesAccordionColumnComponent>
        <span className={style.sessionAccordionHeaderValue}>
          <ValueBlankComponent>{open}</ValueBlankComponent>
        </span>
      </TradesAccordionColumnComponent>

      <TradesAccordionColumnComponent>
        <span className={style.sessionAccordionHeaderValue}>
          <ValueBlankComponent>{close}</ValueBlankComponent>
        </span>
      </TradesAccordionColumnComponent>

      <TradesAccordionColumnComponent>
        <span className={style.sessionAccordionHeaderValue}>
          <ValueBlankComponent>{fee}</ValueBlankComponent>
        </span>
      </TradesAccordionColumnComponent>

      <TradesAccordionColumnComponent>
        <ChangeArrowComponent
          className={style.sessionAccordionHeaderChangeIcon}
          positive={profitLoss > 0}
          visible={!!profitLoss}
        />
        <TextColouredComponent
          className={style.sessionAccordionHeaderValue}
          positive={profitLoss > 0}
          visible={!!profitLoss}
        >
          <ValueComponent withPositiveChar>{profitLoss}</ValueComponent>
        </TextColouredComponent>
      </TradesAccordionColumnComponent>
    </div>
  );
};
