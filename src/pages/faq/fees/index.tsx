import React from 'react';

import { NextPage } from 'next';
import Head from 'next/head';

import { faqPagePaths } from '~/constants/pathsConstants';
import { FaqAccordionComponent } from '~/components/FaqAccordion/FaqAccordionComponent';
import { Currency, Ticker } from '~/types/currencyTypes';
import { OpenGraphComponent } from '~/components/OpenGraph/OpenGraphComponent';
import { FaqLayout } from '~/layouts/Faq/FaqLayout';

import style from './style.module.scss';

const Fees: NextPage = () => {
  return (
    <>
      <Head>
        <title>FAQ - Fees</title>

        <OpenGraphComponent title="FAQ" description="Fees" />
      </Head>

      <FaqLayout headline="Fees" links={faqPagePaths}>
        <FaqAccordionComponent headline="Rolling Futures" defaultValue>
          <p className={style.faqText}>
            Leverex uses a Maker – Taker fee model. Makers receive a portion of the Taker fee to encourage liquidity
            provisioning.
          </p>
          <p className={style.faqText}>The credit is on a per BTC basis.</p>

          <table className={style.faqTable} aria-label="Fees table">
            <thead className={style.faqTableHead}>
              <tr className={style.faqTableRow}>
                <th className={style.faqTableCellHead} scope="col">
                  Product
                </th>
                <th className={style.faqTableCellHead} scope="col">
                  Maker credit
                </th>
                <th className={style.faqTableCellHead} scope="col">
                  Taker fee
                </th>
                <th className={style.faqTableCellHead} scope="col">
                  Roll fee
                </th>
              </tr>
            </thead>
            <tbody className={style.faqTableBody}>
              <tr className={style.faqTableRow}>
                <td className={style.faqTableCellBody}>
                  {Ticker.BTC}/{Currency.USDT}
                </td>
                <td className={style.faqTableCellBody}>{Currency.USDT} 3</td>
                <td className={style.faqTableCellBody}>{Currency.USDT} 15</td>
                <td className={style.faqTableCellBody}>N/A</td>
              </tr>
            </tbody>
          </table>
        </FaqAccordionComponent>
      </FaqLayout>
    </>
  );
};

export default Fees;
