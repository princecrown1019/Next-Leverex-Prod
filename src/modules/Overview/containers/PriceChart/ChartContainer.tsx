import React, { FC, useEffect, useRef, useState } from 'react';
import { useSelector, useStore } from 'react-redux';

import { selectProduct } from '~/store/Market/selectors';
import { selectSocketMainConnected } from '~/store/SocketMain/selectors';
import { useLoadChartCandlesCommand } from '~/modules/Overview/commands/LoadChartCandles/useLoadChartCandlesCommand';
import { useLoadChartLastTwoCandlesCommand } from '~/modules/Overview/commands/LoadChartLastTwoCandles/useLoadChartLastTwoCandlesCommand';
import { TradingViewLib } from '~/modules/Overview/libs/TradingView/TradingViewLib';
import { OverviewChartView } from '~/modules/Overview/views/PriceChart/PriceChartView';
import { selectPriceChartInterval } from '~/store/PriceChart/selectors';

type Props = {
  mobile?: boolean;
};

export const OverviewPriceChartContainer: FC<Props> = ({ mobile }) => {
  const ref = useRef<HTMLDivElement>(null);
  const libRef = useRef<TradingViewLib>();

  const store = useStore();

  const [loading, setLoading] = useState(true);

  const socketConnected = useSelector(selectSocketMainConnected);
  const { currency, ticker } = useSelector(selectProduct);
  const chartInterval = useSelector(selectPriceChartInterval);

  const loadCandles = useLoadChartCandlesCommand();
  const loadLastTwoCandles = useLoadChartLastTwoCandlesCommand();

  useEffect(() => {
    setLoading(true);
  }, [mobile]);

  useEffect(() => {
    if (!ref.current || !window || !socketConnected) return;

    libRef.current = new TradingViewLib({
      container: ref.current,
      initialInterval: '60',
      mobile,
      ticker,
      currency,
      store,
      loadCandles,
      loadLastTwoCandles
    });

    libRef.current?.onChartReady(() => {
      libRef.current?.setInitialInterval(() => {
        setLoading(false);
      });
    });
  }, [socketConnected, mobile]);

  useEffect(() => {
    libRef.current?.onChartReady(() => {
      libRef.current?.setProduct(ticker, currency, loading ? 4 : chartInterval);
    });
  }, [ticker, currency]);

  useEffect(() => {
    return () => {
      libRef.current?.remove();
    };
  }, []);

  return <OverviewChartView ref={ref} loading={loading} />;
};
