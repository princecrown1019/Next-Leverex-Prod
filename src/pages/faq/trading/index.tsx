import React from 'react';

import { NextPage } from 'next';
import Head from 'next/head';
import clsx from 'clsx';

import { faqPagePaths } from '~/constants/pathsConstants';
import { FaqAccordionComponent } from '~/components/FaqAccordion/FaqAccordionComponent';
import { OpenGraphComponent } from '~/components/OpenGraph/OpenGraphComponent';
import { FaqLayout } from '~/layouts/Faq/FaqLayout';
import { LinkComponent } from '~/components/Link/LinkComponent';
import { PRODUCT_SPECIFICATION_USDT_URL } from '~/constants/configConstants';

import style from './style.module.scss';

const Trading: NextPage = () => {
  return (
    <>
      <Head>
        <title>FAQ - Trading</title>

        <OpenGraphComponent title="FAQ" description="Trading" />
      </Head>

      <FaqLayout headline="Trading" links={faqPagePaths}>
        <FaqAccordionComponent headline="Product specifications" defaultValue>
          <ul className={clsx(style.faqList, style.faqListDisc)}>
            <li className={style.faqListItem}>
              <LinkComponent href={PRODUCT_SPECIFICATION_USDT_URL} target="_blank">
                Rolling Futures Product Specification (PDF)
              </LinkComponent>
            </li>
          </ul>
        </FaqAccordionComponent>

        <FaqAccordionComponent headline="Platform overview">
          <ul className={clsx(style.faqList, style.faqListDisc)}>
            <li className={style.faqListItem}>
              Leverex offers rolling mini futures on bitcoin with a fixed leverage ratio of 10x
            </li>

            <li className={style.faqListItem}>You can start trading with as little as 10 USDT</li>

            <li className={style.faqListItem}>
              Our innovative margin and settlement model removes funding costs and forced liquidations
            </li>

            <li className={style.faqListItem}>
              Profit and loss is automatically settled every hour, on the hour, 24/7/365
            </li>

            <li className={style.faqListItem}>
              Products trade and settle in USDT, at no point is the underlying asset handled
            </li>
          </ul>
        </FaqAccordionComponent>

        <FaqAccordionComponent headline="Trading">
          <ul className={clsx(style.faqList, style.faqListDisc)}>
            <li className={style.faqListItem}>
              USDT is deposited to enter long or short positions with a fixed leverage ratio of 10x
            </li>

            <li className={style.faqListItem}>
              The margin requirement of 10% is calculated by the last settlement price
            </li>

            <li className={style.faqListItem}>
              The settlement price is an externally sourced and independent price, calculated as the average mid-point
              of four competitive exchanges
            </li>

            <li className={style.faqListItem}>Trading is continuous 24/7/365</li>

            <li className={style.faqListItem}>
              Each hour, on the hour, settlement is automatically carried out by Leverex in USDT
            </li>

            <li className={style.faqListItem}>Traders cannot go into a negative account balance</li>

            <li className={style.faqListItem}>
              Positions that have not been closed are automatically rolled over to the next session to the extent that
              sufficient margin is on account
            </li>

            <li className={style.faqListItem}>
              If a trader has insufficient margin to reopen the full position, the position size will be automatically
              scaled down during settlement (no forced liquidations occur on Leverex)
            </li>
          </ul>
        </FaqAccordionComponent>

        <FaqAccordionComponent headline="Trader A and Trader B scenario">
          <div className={style.faqSection}>
            <h3 className={style.faqHeadline}>Trader A and Trader B</h3>

            <ol className={clsx(style.faqList, style.faqListDecimal)}>
              <li className={style.faqListItem}>Trader A has USDT 5’000 of buying power and no open positions.</li>
              <li className={style.faqListItem}>Trader B has USDT 6’000 of buying power and no open positions.</li>
            </ol>
          </div>

          <div className={style.faqSection}>
            <h3 className={style.faqHeadline}>Session 1 – opening trade</h3>

            <time className={style.faqTimestamp} dateTime="13:15:06 UTC">
              Time-stamp 13:15:06 UTC
            </time>

            <ol className={clsx(style.faqList, style.faqListDecimal)}>
              <li className={style.faqListItem}>
                The session opening price (the last hourly settlement price) is BTC/USDT 30’000.
              </li>
              <li className={style.faqListItem}>
                Trader A goes long 1 BTC @ 30’000 and posts margin of USDT 3’000 and keeps USDT 2’000 of buying power.
              </li>
              <li className={style.faqListItem}>
                Trader B posts USDT 3’000 USDT of margin to open a short position of 1 BTC. USDT 3’000 of buying power
                remains.
              </li>
              <li className={style.faqListItem}>
                Trader B goes short 1 BTC @ 30’000 and posts margin of USDT 3’000 and keeps USDT 3’000 of buying power.
              </li>
            </ol>
          </div>

          <div className={style.faqSection}>
            <h3 className={style.faqHeadline}>Session 1 - settlement</h3>

            <time className={style.faqTimestamp} dateTime="14:00:00 UTC">
              Time-stamp 14:00:00 UTC
            </time>

            <ol className={clsx(style.faqList, style.faqListDecimal)}>
              <li className={style.faqListItem}>
                The contract settles @ 30’300 USDT. At session close, margins are repaid, profit/loss settlement occurs,
                and the net exposure is rolled.
              </li>
              <li className={style.faqListItem}>
                USDT 3’300 is returned to Trader A. Trader A’s buying power is now USDT 5’300. The net exposure of long
                1 BTC is rolled, for which USDT 3’030 is margined and USDT 2’270 of buying power remains.
              </li>
              <li className={style.faqListItem}>
                USDT 2’700 is returned to Trader B. Trader B’s buying power is now USDT 5’700. The net exposure of short
                1 BTC is rolled, for which USDT 3’030 is margined and USDT 2’670 of buying power remains.
              </li>
            </ol>
          </div>

          <div className={style.faqSection}>
            <h3 className={style.faqHeadline}>Session 2 – second trade</h3>

            <time className={style.faqTimestamp} dateTime="14:46:46 UTC">
              Time-stamp 14:46:46 UTC
            </time>

            <ol className={clsx(style.faqList, style.faqListDecimal)}>
              <li className={style.faqListItem}>
                Trader A goes short 1 BTC @ 29’400. Trader A now has two positions. Long 1 BTC @ 30’300 and Short 1 BTC
                @ 29’400. Net exposure is zero. Margin is reduced to USDT 900, the maximum loss of the offsetting
                positions, and buying power is USDT 4’400.
              </li>
              <li className={style.faqListItem}>
                Trader B goes long 1 BTC @ 29’400. Trader B now has two positions. Short 1 BTC @ 30’300 and Long 1 BTC @
                29’400. Net exposure is zero. Margin is USDT 0, as no loss can occur from the offsetting positions
                regardless of session closing price. Buying power is USDT 5’700.
              </li>
            </ol>
          </div>

          <div className={style.faqSection}>
            <h3 className={style.faqHeadline}>Session 2 - settlement</h3>

            <time className={style.faqTimestamp} dateTime="15:00:00 UTC">
              Time-stamp 15:00:00 UTC
            </time>

            <ol className={clsx(style.faqList, style.faqListDecimal)}>
              <li className={style.faqListItem}>
                The contract settles @ 29’600. At session close, margins are repaid, profit/loss settlement occurs, and
                the net exposure is rolled.
              </li>
              <li className={style.faqListItem}>
                USDT 200 is returned to Trader A. Trader A’s buying power is now USDT 4’600. As there is no net
                exposure, no positions are rolled, and Trader A is flat.
              </li>
              <li className={style.faqListItem}>
                USDT 700 is delivered to Trader B. Trader B’s buying power is now USDT 6’400. As there is no net
                exposure, no positions are rolled, and Trader B is flat.
              </li>
            </ol>
          </div>
        </FaqAccordionComponent>

        <FaqAccordionComponent headline="Leverage made simple">
          <p className={style.faqText}>
            Leverex offers a margin trading platform with a set leverage of 10x. Simply put, users can go long or short
            by posting a 10% margin of the current cut-off price. That allows users of Leverex to aim for higher
            profits. E.g., if the last cut-off for BTC/L-USDT was @ $30,000, then a 3,000 L-USDT balance is required to
            go Long or Short 1 Bitcoin.
          </p>

          <p className={style.faqText}>
            Risks are minimized by defined profit and loss schedule for each session. Moreover, positions are liquidated
            at the session cut-off price without slippage or cascading defaults due to local order book illiquidity
          </p>
        </FaqAccordionComponent>

        <FaqAccordionComponent headline="Settlement default management">
          <p className={style.faqText}>Settlement defaults are not possible with the implemented risk model.</p>

          <p className={style.faqText}>
            If a user&apos;s net exposure cannot be carried over to the next session due to a margin shortage, the
            user&apos;s position will be reduced until the margin requirement is equal to the available cash balance.
            This selection process ensures the highest degree of integrity in future Settlements.
          </p>

          <p className={style.faqText}>
            Leverex risk model is designed to prevent negative account balances and legal clawback scenarios. It is
            purpose-built from the ground up to provide a defined risk and pay-out structure with maximum capital
            efficiencies.
          </p>
        </FaqAccordionComponent>
      </FaqLayout>
    </>
  );
};

export default Trading;
