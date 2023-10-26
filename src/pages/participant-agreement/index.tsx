import React from 'react';

import { NextPage } from 'next';
import Head from 'next/head';
import clsx from 'clsx';

import { MainPath } from '~/constants/pathsConstants';
import { SUPPORT_EMAIL } from '~/constants/configConstants';
import { StaticLayout } from '~/layouts/Static/StaticLayout';
import { StaticPitchComponent } from '~/components/StaticPitch/StaticPitchComponent';
import { StaticHeadlineComponent } from '~/components/StaticHeadline/StaticHeadlineComponent';
import { LinkEmailComponent } from '~/components/LinkEmail/LinkEmailComponent';
import { LinkComponent } from '~/components/Link/LinkComponent';
import { OpenGraphComponent } from '~/components/OpenGraph/OpenGraphComponent';

import style from './style.module.scss';

const ParticipantAgreement: NextPage = () => {
  return (
    <>
      <Head>
        <title>Participant Agreement</title>

        <OpenGraphComponent
          title="Participant Agreement"
          description="Participant Agreement"
          img="/static/media/og-picture.jpeg"
        />
      </Head>

      <StaticLayout headline="Participant Agreement">
        <section className={style.staticSection}>
          <StaticPitchComponent className={style.staticPitchMarginTop}>IT IS AGREED as follows:</StaticPitchComponent>

          <ol className={clsx(style.staticList, style.staticListMain, style.staticListDecimal)}>
            <li className={clsx(style.staticListItem, style.staticListItemHeadline)}>
              <StaticHeadlineComponent>DEFINITIONS</StaticHeadlineComponent>
              <ol className={clsx(style.staticList, style.staticListDecimal)}>
                <li className={style.staticListItem}>
                  In this Agreement, save as defined in other parts of the Agreement, the following definitions are
                  used:
                  <table className={style.staticTable} aria-label="Fees table">
                    <tbody className={style.staticTableBody}>
                      <tr className={style.staticTableRow}>
                        <td className={style.staticTableCellBodyHeadline}>Account</td>
                        <td className={style.staticTableCellBody}>
                          means a Participant’s account with Leverex, containing Stablecoin Position Account(s). Account
                          balances are controlled by Leverex;
                        </td>
                      </tr>

                      <tr className={style.staticTableRow}>
                        <td className={style.staticTableCellBodyHeadline}>Agreement</td>
                        <td className={style.staticTableCellBody}>
                          means this agreement between you and Leverex, as updated and/or amended from time to time, in
                          accordance with this Agreement;
                        </td>
                      </tr>

                      <tr className={style.staticTableRow}>
                        <td className={style.staticTableCellBodyHeadline}>Applicant Participant</td>
                        <td className={style.staticTableCellBody}>
                          means a natural or legal person who wishes to become a Participant and who applies to open an
                          Account;
                        </td>
                      </tr>

                      <tr className={style.staticTableRow}>
                        <td className={style.staticTableCellBodyHeadline}>Bank</td>
                        <td className={style.staticTableCellBody}>
                          means each a depository institution with whom Leverex have entered into agreement(s) to hold
                          Omnibus Account(s);
                        </td>
                      </tr>

                      <tr className={style.staticTableRow}>
                        <td className={style.staticTableCellBodyHeadline}>Leverex Materials</td>
                        <td className={style.staticTableCellBody}>
                          means all copyright and other intellectual property rights in all content and other materials
                          contained on Leverex’s website or provided in connection with the Services, including, without
                          limitation, the Leverex logo and all designs, text, graphics, pictures, information, data,
                          software, sound files, other files and the selection and arrangement thereof;
                        </td>
                      </tr>

                      <tr className={style.staticTableRow}>
                        <td className={style.staticTableCellBodyHeadline}>BSAB System</td>
                        <td className={style.staticTableCellBody}>
                          means Leverex’s matching engine and clearing system, which matches orders, monitors
                          settlement, and maintains accounts on behalf of Participants;
                        </td>
                      </tr>

                      <tr className={style.staticTableRow}>
                        <td className={style.staticTableCellBodyHeadline}>Business Days</td>
                        <td className={style.staticTableCellBody}>
                          means a day when banks are open for general banking business in Sweden;
                        </td>
                      </tr>

                      <tr className={style.staticTableRow}>
                        <td className={style.staticTableCellBodyHeadline}>Stablecoin Position Accounts</td>
                        <td className={style.staticTableCellBody}>
                          means accounts in which Leverex hold Deliverable Currency on behalf of Participants in the
                          BSAB System. Stablecoin Position Accounts are updated based on Stablecoin funding, Stablecoin
                          withdrawals, margin updates, settlements, and fees;
                        </td>
                      </tr>

                      <tr className={style.staticTableRow}>
                        <td className={style.staticTableCellBodyHeadline}>Client App</td>
                        <td className={style.staticTableCellBody}>
                          means a mobile application provided by Leverex for Participants, where Participants may
                          register and conduct deposits of Deliverable Currency into an Omnibus Account through bank
                          wire transfer, request withdrawals for Deliverable Currency and update their account details,
                          and more;
                        </td>
                      </tr>

                      <tr className={style.staticTableRow}>
                        <td className={style.staticTableCellBodyHeadline}>Client Portal</td>
                        <td className={style.staticTableCellBody}>
                          means a web based portal provided by Leverex for Participants, where Participants may register
                          and conduct deposits of Deliverable Currency into an Omnibus Account through bank wire
                          transfer, request withdrawals for Deliverable Currency and update their account details, and
                          more;
                        </td>
                      </tr>

                      <tr className={style.staticTableRow}>
                        <td className={style.staticTableCellBodyHeadline}>Closing Price</td>
                        <td className={style.staticTableCellBody}>
                          for USDT products, means the average mid-point price between the BTC/USDT markets of Kraken,
                          Bitfinex, and Binance;
                        </td>
                      </tr>

                      <tr className={style.staticTableRow}>
                        <td className={style.staticTableCellBodyHeadline}>Compliance Program</td>
                        <td className={style.staticTableCellBody}>
                          means measures, processes and tools designed to prevent the use of Leverex in money laundering
                          and/or terrorist financing activities;
                        </td>
                      </tr>

                      <tr className={style.staticTableRow}>
                        <td className={style.staticTableCellBodyHeadline}>Deliverable Currency</td>
                        <td className={style.staticTableCellBody}>
                          means a Stablecoin currency balance in a Stablecoin Position Account, held in an Omnibus
                          Account, available on demand;
                        </td>
                      </tr>

                      <tr className={style.staticTableRow}>
                        <td className={style.staticTableCellBodyHeadline}>Designated Bank Account</td>
                        <td className={style.staticTableCellBody}>
                          means an external bank account registered by a Participant with Leverex. The Participant
                          warrants that the Designated Bank Account is fully owned, held in the name of, and controlled
                          by the Participant itself and not maintained or controlled by any third party;
                        </td>
                      </tr>

                      <tr className={style.staticTableRow}>
                        <td className={style.staticTableCellBodyHeadline}>Institute</td>
                        <td className={style.staticTableCellBody}>
                          means the Arbitration Institute of the Malmo Chamber of Commerce;
                        </td>
                      </tr>

                      <tr className={style.staticTableRow}>
                        <td className={style.staticTableCellBodyHeadline}>KYC</td>
                        <td className={style.staticTableCellBody}>
                          means the know your customer procedure as set out in the AML-legislation, AML-regulation,
                          Leverex’s internal rules and regulations as well as other and other applicable rules and
                          regulations in force from time to time;
                        </td>
                      </tr>

                      <tr className={style.staticTableRow}>
                        <td className={style.staticTableCellBodyHeadline}>Leverage Ratio</td>
                        <td className={style.staticTableCellBody}>
                          means the ration of free Stablecoin (buying power) to margined Stablecoin. Should the free
                          Stablecoin level be zero and the margined Stablecoin balance contain the users entire
                          Stablecoin balance, the user will have maximized their leverage ratio;
                        </td>
                      </tr>

                      <tr className={style.staticTableRow}>
                        <td className={style.staticTableCellBodyHeadline}>Maker</td>
                        <td className={style.staticTableCellBody}>
                          means a Participant who streams continuous and executable prices to the BSAB System;
                        </td>
                      </tr>

                      <tr className={style.staticTableRow}>
                        <td className={style.staticTableCellBodyHeadline}>Matched Order</td>
                        <td className={style.staticTableCellBody}>
                          means a bilateral match between two Participants who have agreed to basic terms of a trade,
                          including, where relevant, all the information needed for Settlement;
                        </td>
                      </tr>

                      <tr className={style.staticTableRow}>
                        <td className={style.staticTableCellBodyHeadline}>Non-deliverable</td>
                        <td className={style.staticTableCellBody}>
                          means a Rolling Futures contract in which Settlement is conducted in Deliverable Currency and
                          not the underlying instrument;
                        </td>
                      </tr>

                      <tr className={style.staticTableRow}>
                        <td className={style.staticTableCellBodyHeadline}>Omnibus Account</td>
                        <td className={style.staticTableCellBody}>
                          means a bank account held by Leverex to maintain custody of Participants’ Stablecoin balances
                          for the purpose of satisfying the custody obligations towards our Participants without any
                          further segregation;
                        </td>
                      </tr>

                      <tr className={style.staticTableRow}>
                        <td className={style.staticTableCellBodyHeadline}>Participant</td>
                        <td className={style.staticTableCellBody}>
                          means a user of the Service who (i) complies with the Leverex’s KYC requirements as well as
                          relevant AMLlegislation and AML-Regulation, (ii) has entered into this Agreement with Leverex
                          (incl. general terms and conditions and Privacy Policy), and (iii) adheres to and complies
                          with any other terms, conditions or requirements as otherwise decided by Leverex (if any and
                          relevant), prior to the commencement of using the Service, and have been accepted as a
                          Participant at Leverex’s sole discretion;
                        </td>
                      </tr>

                      <tr className={style.staticTableRow}>
                        <td className={style.staticTableCellBodyHeadline}>Participant Support</td>
                        <td className={style.staticTableCellBody}>
                          means the support service function provided by Leverex to its Participants and which can be
                          accessed on email at <LinkEmailComponent>{SUPPORT_EMAIL}</LinkEmailComponent> or through the
                          Client Portal;
                        </td>
                      </tr>

                      <tr className={style.staticTableRow}>
                        <td className={style.staticTableCellBodyHeadline}>Payment</td>
                        <td className={style.staticTableCellBody}>
                          means the transfer of a Deliverable Currency balance in the BSAB System as Settlement for
                          price changes between the trade price and the closing price of a Rolling futures contract;
                        </td>
                      </tr>

                      <tr className={style.staticTableRow}>
                        <td className={style.staticTableCellBodyHeadline}>PEP</td>
                        <td className={style.staticTableCellBody}>
                          means a politically exposed person, is a natural person who performs or has performed
                          prominent public functions in a state or in a lead of an international organization, their
                          family members and close associates. A person who, by the date of applying to become a
                          participant with Leverex, has not performed any prominent public functions for at least
                          eighteen months, and the family members or close associates of such person, are not considered
                          politically exposed persons;
                        </td>
                      </tr>

                      <tr className={style.staticTableRow}>
                        <td className={style.staticTableCellBodyHeadline}>Privacy Policy</td>
                        <td className={style.staticTableCellBody}>
                          means Leverex’s Privacy Policy which can be found on Leverex’s webpage&nbsp;
                          <LinkComponent href={MainPath.HOME}>leverex.io</LinkComponent>, updated and amended from time
                          to time;
                        </td>
                      </tr>

                      <tr className={style.staticTableRow}>
                        <td className={style.staticTableCellBodyHeadline}>Released</td>
                        <td className={style.staticTableCellBody}>
                          means a Payment for which the corresponding delivery has occurred and the Reserved Balance is
                          credited in the Account of the counterparty to the Matched Order;
                        </td>
                      </tr>

                      <tr className={style.staticTableRow}>
                        <td className={style.staticTableCellBodyHeadline}>Reservation Balance</td>
                        <td className={style.staticTableCellBody}>
                          means the Deliverable Currency amount offered as Payment for a specific Matched Order in the
                          BSAB System;
                        </td>
                      </tr>

                      <tr className={style.staticTableRow}>
                        <td className={style.staticTableCellBodyHeadline}>Restricted Locations</td>
                        <td className={style.staticTableCellBody}>
                          means countries from which Leverex from time to time is unable to onboard Participants,
                          currently these countries are U.S. and the countries identified as high-risk according to
                          Commission Delegated Regulation (EU) 2016/1675;
                        </td>
                      </tr>

                      <tr className={style.staticTableRow}>
                        <td className={style.staticTableCellBodyHeadline}>Rolling Futures</td>
                        <td className={style.staticTableCellBody}>
                          means a product group where (i) each trade is margined with a certain percentage (normally
                          10%) of the previous contracts closing price, multiplied with the volume (ii) the maximum
                          profit or loss of any single trade is defined by the trades margin (iii) the difference in the
                          contracts traded price and session closing price defines the profit and loss of each position
                          (iv) a trade cannot be closed, it must be held to maturity (v) the margin associated with a
                          users account may be netted down for offsetting trades (vi) the net exposure in a futures
                          contract is automatically rolled over from one contract period to the next. Rolling futures
                          are Non-deliverable;
                        </td>
                      </tr>

                      <tr className={style.staticTableRow}>
                        <td className={style.staticTableCellBodyHeadline}>Sites</td>
                        <td className={style.staticTableCellBody}>
                          means websites operated by Leverex in providing the Service to Participants, including&nbsp;
                          <LinkComponent href={MainPath.HOME}>leverex.io</LinkComponent>;
                        </td>
                      </tr>

                      <tr className={style.staticTableRow}>
                        <td className={style.staticTableCellBodyHeadline}>Services</td>
                        <td className={style.staticTableCellBody}>
                          means the account operations and matching activities for Deliverable Currency on behalf of
                          Participants. Leverex has the right to modify, replace, refuse access to, suspend, or
                          discontinue part or all of our Services;
                        </td>
                      </tr>

                      <tr className={style.staticTableRow}>
                        <td className={style.staticTableCellBodyHeadline}>Settlement</td>
                        <td className={style.staticTableCellBody}>
                          means the process whereby the payment of obligations which arise as a result of the difference
                          in price between a Matched Order and Closing Price are discharged;
                        </td>
                      </tr>

                      <tr className={style.staticTableRow}>
                        <td className={style.staticTableCellBodyHeadline}>Settlement Defaults</td>
                        <td className={style.staticTableCellBody}>
                          means the process whereby the Participants net exposure is reduces as a result of insufficient
                          Reservation Balance resulting in an inability to maintain net exposure between contract rolls;
                        </td>
                      </tr>

                      <tr className={style.staticTableRow}>
                        <td className={style.staticTableCellBodyHeadline}>Settlement Liquidation</td>
                        <td className={style.staticTableCellBody}>
                          means reducing the net exposure of a user over a Rolling Futures contract roll even if the
                          user has sufficient margin on account to maintain their next exposure between contract
                          sessions;
                        </td>
                      </tr>

                      <tr className={style.staticTableRow}>
                        <td className={style.staticTableCellBodyHeadline}>Taker</td>
                        <td className={style.staticTableCellBody}>
                          means a Participant who submits an order to the BSAB System;
                        </td>
                      </tr>

                      <tr className={style.staticTableRow}>
                        <td className={style.staticTableCellBodyHeadline}>Term</td>
                        <td className={style.staticTableCellBody}>
                          means the period of time during which you/yourselves, on the basis of the sole discretion of
                          Leverex, have been accepted as a Participant and is bound by this Agreement;
                        </td>
                      </tr>

                      <tr className={style.staticTableRow}>
                        <td className={style.staticTableCellBodyHeadline}>VAT</td>
                        <td className={style.staticTableCellBody}>means value added tax;</td>
                      </tr>

                      <tr className={style.staticTableRow}>
                        <td className={style.staticTableCellBodyHeadline}>BTC</td>
                        <td className={style.staticTableCellBody}>means the Bitcoin ticker symbol;</td>
                      </tr>
                    </tbody>
                  </table>
                </li>

                <li className={style.staticListItem}>
                  In this Agreement, save where otherwise stipulated, reference to the singular includes the plural and
                  vice versa.
                </li>
              </ol>
            </li>

            <li className={clsx(style.staticListItem, style.staticListItemHeadline)}>
              <StaticHeadlineComponent>GENERAL TERMS OF SERVICE</StaticHeadlineComponent>
              <ol className={clsx(style.staticList, style.staticListDecimal)}>
                <li className={style.staticListItem}>
                  This Agreement is between you as a natural person, or yourselves as a legal entity, and Leverex. By
                  using Leverex websites (“Sites”), or using any of our other Services, you (”you or yourselves”) are
                  agreeing that you have read, understood and accept and comply with the terms and conditions of use
                  stated below, as well as our Privacy Policy.
                </li>

                <li className={style.staticListItem}>
                  By visiting, accessing or using the Sites or our Services, you have indicated that you are at least
                  eighteen (18) years old, have the legal capacity to accept this Agreement and Privacy Policy and to
                  agree to be bound by it in its entirety.
                </li>

                <li className={style.staticListItem}>
                  In order to gain access and use the Services, you must first become a “Tier one Participant” where you
                  register an account with the system which has limited use and functionality. Tier One Participants are
                  limited to depositing and withdrawing no more than USDT 1’000 over a 30 day period. To fully
                  experience the system, Participants must successfully undergo our KYC checks which includes anti-money
                  laundering procedures (“AML”). We also screen against international sanctions lists. We therefore
                  collect and process your information for these purposes, and are obliged to provide your information
                  with the state authorities in countries we operate. Note that this Agreement may change from time to
                  time, in which case Leverex will ask you to agree to an updated Agreement. Your continued use of the
                  Sites and Services is considered your acceptance of this Agreement, including updates. Should you not
                  wish, or able to, be bound to any or all parts of this Agreement, kindly refrain from visiting any
                  Sites, accessing or using the Services. Leverex may, in its sole discretion and with immediate effect
                  suspend this Agreement if any update to this Agreement has not been complied with by you/yourselves.
                </li>

                <li className={style.staticListItem}>
                  Our Services are not targeted nor directed to any person in any jurisdiction where the publication or
                  availability of the platform, Services or Sites is or may be prohibited. Due to legal restrictions,
                  our Services are not accessible, or for use, for any person (including legal entities) who is
                  considered a U.S person under applicable legislation. Further, our Services are not targeted nor
                  directed to any person in any jurisdiction who are considered Politically Exposed Persons (PEP). If
                  during the lifetime of this Agreement, you become a PEP or a U.S person, you must immediately inform
                  Leverex of this.
                </li>

                <li className={style.staticListItem}>
                  You agree that information you submit to us about yourself is true, accurate, current and complete.
                  You agree to update your registration and profile information to keep it current and accurate
                </li>

                <li className={style.staticListItem}>
                  You may not transfer your Account to another party or enable access to any other party without our
                  consent. You must keep your Account details confidential and not share them with any third party.
                </li>

                <li className={style.staticListItem}>
                  If you are registering to use the Services on behalf of a legal entity, you represent and warrant that
                  (i) such legal entity is duly organized and validly existing under the applicable laws of the
                  jurisdiction of its organization; and (ii) you are duly authorized by such legal entity to act on its
                  behalf.
                </li>

                <li className={style.staticListItem}>
                  In case of a corporate Account or if an Account is held in joint names, then each Account holder is
                  jointly and severally liable for all liabilities and obligations in respect of the Account. You
                  warrant and guarantee that all instructions related to the Account are given on behalf of and with the
                  knowledge of all holders, directors and eligible persons of the Account holder. Any action we may take
                  regarding such instructions will be binding on all Account holders.
                </li>
              </ol>
            </li>

            <li className={clsx(style.staticListItem, style.staticListItemHeadline)}>
              <StaticHeadlineComponent>ELIGIBILITY</StaticHeadlineComponent>
              <ol className={clsx(style.staticList, style.staticListDecimal)}>
                <li className={style.staticListItem}>
                  Leverex will not make the Services available in all markets and jurisdictions. You warrant that you
                  are not a resident nor tax subject in any Restricted Location, and will not use the Services from
                  Restricted Locations. Leverex reserves the right, in its sole discretion, to terminate your Account
                  and this Agreement with immediate effect if we duly suspect that you are using our Services from a
                  Restricted Location.
                </li>

                <li className={style.staticListItem}>
                  You represent and warrant during the Term of this Agreement that you: (a) are of legal age to form a
                  binding contract (at least 18 years old); (b) are not a PEP, (c) confirm that you have not been
                  solicited by Leverex to open an account with our Service, (d) have not previously been suspended or
                  removed from using our Services; (c) have full power and authority to enter into this Agreement and in
                  doing so will not violate any other agreement to which you are a party; (e) are not located in, under
                  the control of, or a national or resident of (i) any Restricted Locations; (ii) are not a PEP and
                  (iii) will not use our Services if any applicable laws in your country prohibit you from doing so in
                  accordance with this Agreement.
                </li>

                <li className={style.staticListItem}>
                  You further authorize Leverex to, directly or through third parties make any inquiries we consider
                  necessary to verify your identity and/or protect against fraud, including to query identity
                  information contained in public domains or reports, to query account information associated with your
                  linked bank account (e.g., name or account balance), and to take any action we reasonably deem
                  necessary based on the results of such inquiries or reports, including suspending your Account with
                  immediate effect if we duly suspect any violation against any of the points in this section 3.3. You
                  further authorize all third parties to whom such inquiries or requests may be directed to fully
                  respond to such inquiries or requests.
                </li>
              </ol>
            </li>

            <li className={clsx(style.staticListItem, style.staticListItemHeadline)}>
              <StaticHeadlineComponent>COMPLIANCE</StaticHeadlineComponent>
              <ol className={clsx(style.staticList, style.staticListDecimal)}>
                <li className={style.staticListItem}>
                  Our Compliance Program is designed to prevent the use of Leverex to facilitate money laundering and/or
                  terrorist financing activities. It is our policy to take all necessary steps to prohibit fraudulent
                  transactions, report suspicious activities, and actively engage in the prevention of money laundering
                  and related acts that facilitate money laundering, terrorist financing or any other financial crimes.
                </li>

                <li className={style.staticListItem}>
                  If your Account(s) is suspected of being in breach of any anti-money laundering or financing of
                  terrorism regulations, you agree that we have the right to suspend your Account(s) and access to
                  Leverex, until a sufficient investigation has taken place. Should your Account or any other account
                  registered to or associated with the same Participant be proven to be in breach of any such provision,
                  you agree to forfeit any and all funds in the Account(s) to the appropriate authorities. Should the
                  appropriate authorities deem that no breach has occurred, all claims with regards to returning the
                  forfeited funds shall only be directed towards such authorities.
                </li>

                <li className={style.staticListItem}>
                  When each natural or legal person applies to open an Account we will ask for details and documentation
                  that allows us to identify them. For natural persons, we will ask among other things each person for
                  their name, physical address, mailing address, date of birth, and other information that will allow us
                  to identify them. For legal entities we will ask among other things each legal person for the name,
                  passport and proof of address of the authorized representative, the shareholder register, register of
                  directors, certificate of incorporation, registered office proof of address.
                </li>

                <li className={style.staticListItem}>
                  In furtherance of our compliance, we reserve the right to require each Applicant Participant to
                  provide additional information to us, our officers, employees or designees or undergo a background
                  check prior to being authorized as a Participant or at any point thereafter in accordance with
                  applicable laws.
                </li>
              </ol>
            </li>

            <li className={clsx(style.staticListItem, style.staticListItemHeadline)}>
              <StaticHeadlineComponent>SERVICES</StaticHeadlineComponent>
              <ol className={clsx(style.staticList, style.staticListDecimal)}>
                <li className={style.staticListItem}>
                  As a Participant, Leverex grants you access to our Services, which include the account operations and
                  matching activities for Deliverable Currency, as it may exist and be available. Leverex has the right
                  to modify, replace, refuse access to, suspend, or discontinue part or all our Services.
                </li>

                <li className={style.staticListItem}>
                  Upon the opening of an Account by a Participant, you have been granted a limited, revocable,
                  non-exclusive, non-assignable, and non-sublicensable license and right to access the Services. The
                  Term of the Account, this Agreement and its associated license shall be valid until either the
                  Participant closes the Account and this Agreement, or Leverex closes the Account and this Agreement
                  for any and no reason.
                </li>

                <li className={style.staticListItem}>
                  Leverex reserves the right to withhold, remove or discard any functionality as part of your Account or
                  the Services, with or without notice.
                </li>

                <li className={style.staticListItem}>
                  Leverex does not have any other obligations to Participants, except as expressly stated in this
                  Agreement.
                </li>

                <li className={style.staticListItem}>
                  Access to the Services is limited solely to the Participant. As a Participant, you agree that you will
                  not share your Account with anyone.
                </li>

                <li className={style.staticListItem}>
                  Leverex may at its sole discretion provide maintenance to the Services during the Term of this
                  Agreement.
                </li>

                <li className={style.staticListItem}>
                  Leverex shall where practicable give Participants at least one (1) Business Days’ prior notice, by
                  email, on www.Leverex.com or in writing, of scheduled maintenance that are likely to affect the
                  availability of the Services or are likely to have a material negative impact upon the Services.
                </li>

                <li className={style.staticListItem}>
                  Interruptions under this Section 5 shall not be deemed to be a breach of the Agreement or errors in
                  the Services, thus Participants are not entitled to receive any compensation for such interruptions.
                </li>
              </ol>
            </li>

            <li className={clsx(style.staticListItem, style.staticListItemHeadline)}>
              <StaticHeadlineComponent>PARTICIPANT TYPES</StaticHeadlineComponent>
              <ol className={clsx(style.staticList, style.staticListDecimal)}>
                <li className={style.staticListItem}>
                  Tier One Participant
                  <ol className={clsx(style.staticList, style.staticListLowerAlpha)} type="a">
                    <li className={style.staticListItem}>
                      Tier One Participants are Participants who are exempt from Customer due diligence as referred to
                      in Article 3(9) of Regulation 2015/847 where the transacted amounts do not exceed USDT 1’000 on a
                      30 day basis.
                    </li>

                    <li className={style.staticListItem}>
                      Tier One Participants may either be natural persons (private individuals) or legal entities
                      (however natural persons or legal entities may neither be from Restricted Locations and/or with
                      PEPs in ownership or control function);
                    </li>

                    <li className={style.staticListItem}>
                      Tier One Participants may not have access to streaming prices to the system;
                    </li>

                    <li className={style.staticListItem}>Have entered into this Agreement;</li>

                    <li className={style.staticListItem}>
                      Limited to Stablecoin deposits and withdrawals of USDT 1’000 equivalent per 30 days.
                    </li>
                  </ol>
                </li>

                <li className={style.staticListItem}>
                  Tier Two Participant
                  <ol className={clsx(style.staticList, style.staticListLowerAlpha)} type="a">
                    <li className={style.staticListItem}>
                      Tier Two Participants have full access to the BSAB System and may stream prices to the system and
                      deposit and withdraw without limit;
                    </li>

                    <li className={style.staticListItem}>
                      Tier Two Participants are required to undergo Know-Your-Customer procedures.
                    </li>
                  </ol>
                </li>

                <li className={style.staticListItem}>
                  Designated Bank Account
                  <ol className={clsx(style.staticList, style.staticListLowerAlpha)} type="a">
                    <li className={style.staticListItem}>
                      Each Participant will need to assign one or more external bank account(s) belonging to the
                      Participant, a Designated Bank Account, to which Participant initiated withdrawal requests of
                      Deliverable Currency held on Stablecoin Position Account(s) are conducted by Leverex;
                    </li>

                    <li className={style.staticListItem}>
                      Participants are required to verify their SEPA bank account through a third-party service called
                      Nordigen so that Leverex can register the account as belonging to the Participant in question;
                    </li>

                    <li className={style.staticListItem}>
                      Upon registering one or several Designated Bank Account(s), you warrant and represent that you are
                      both the owner and the person in control of the Designated Bank Account(s), and that no third
                      party has access to it.
                    </li>
                  </ol>
                </li>
              </ol>
            </li>

            <li className={clsx(style.staticListItem, style.staticListItemHeadline)}>
              <StaticHeadlineComponent>YOUR ACCOUNT</StaticHeadlineComponent>
              <ol className={clsx(style.staticList, style.staticListDecimal)}>
                <li className={style.staticListItem}>
                  When you create an Account, you agree to: (a) provide accurate and truthful information; (b) maintain
                  and promptly update your Account information; (c) maintain the security of your Account by restricting
                  access to your Account; (e) promptly notify us if you discover or otherwise suspect any security
                  breaches related to your Account; and (f) take responsibility for all activities that occur under your
                  Account and accept all risks of any authorized or unauthorized access to your Account, to the maximum
                  extent permitted by law.
                </li>
                <li className={style.staticListItem}>
                  Your Account will consist of Stablecoin Position Account(s) which can be controlled using the Leverex
                  App and/or the Leverex Client Portal.
                </li>
                <li className={style.staticListItem}>
                  Stablecoin Position Account(s)
                  <ol className={clsx(style.staticList, style.staticListLowerAlpha)} type="a">
                    <li className={style.staticListItem}>
                      Your Account may hold one Stablecoin Position Account for every currency in which Leverex offers
                      matching and settlement;
                    </li>

                    <li className={style.staticListItem}>
                      Leverex may, in its sole discretion, limit the number of Stablecoin Position Accounts that you may
                      hold.
                    </li>
                  </ol>
                </li>
              </ol>
            </li>

            <li className={clsx(style.staticListItem, style.staticListItemHeadline)}>
              <StaticHeadlineComponent>PRODUCTS</StaticHeadlineComponent>
              <ol className={clsx(style.staticList, style.staticListDecimal)}>
                <li className={style.staticListItem}>All matching is bilateral between Participants.</li>

                <li className={style.staticListItem}>
                  Leverex will offer matching in the Rolling Futures. Rolling Futures work in the following manner:
                  <ol className={clsx(style.staticList, style.staticListLowerAlpha)} type="a">
                    <li className={style.staticListItem}>
                      Each trade is margined individually. Offsetting trades may be netted down for margin efficiencies;
                    </li>

                    <li className={style.staticListItem}>
                      The margin for each trade is the maximum profit or loss for the trade during the contract session;
                    </li>

                    <li className={style.staticListItem}>
                      The margin is determined by multiplying the previous sessions Closing Price with a leverage ratio
                      of ten percent (10%) and then multiplying this with the traded volume;
                    </li>

                    <li className={style.staticListItem}>
                      All trades move to Settlement and the profit of loss of each trade is determined by price
                      difference between the trade price and the Closing Price. The profit and loss is capped at the
                      amount of margin each trade has posted;
                    </li>

                    <li className={style.staticListItem}>
                      For the settlement of a Participants Payment which arise as a result of a Matched Order, it is
                      necessary that both Participants possess the required margin capacity in the BSAB System. Should
                      the required payment capacity not exist, the Matched Order will fail and no updates take place on
                      the respective Stablecoin Position Accounts of the Participants;
                    </li>
                  </ol>
                </li>

                <li className={style.staticListItem}>
                  Order Matching
                  <ol className={clsx(style.staticList, style.staticListLowerAlpha)} type="a">
                    <li className={style.staticListItem}>
                      Makers stream continuous bids and offers with executable prices;
                    </li>

                    <li className={style.staticListItem}>
                      Streamed prices are valid for up to 15 seconds unless replaced with a new price and a matched
                      streamed price does not require the Maker to update his stream with a new price;
                    </li>
                  </ol>
                </li>
              </ol>
            </li>

            <li className={clsx(style.staticListItem, style.staticListItemHeadline)}>
              <StaticHeadlineComponent>SETTLEMENT</StaticHeadlineComponent>
              <ol className={clsx(style.staticList, style.staticListDecimal)}>
                <li className={style.staticListItem}>
                  The BSAB System aims to guarantee Participants a final and irrevocable settlement through a defined
                  risk model where Leverex is the counterparty to all trades by means of novation. This means, amongst
                  other things, that no capital risk will arise for Participants during Settlement. Settlements are made
                  at the end of each contract period.
                </li>

                <li className={style.staticListItem}>
                  Rolling Futures
                  <ol className={clsx(style.staticList, style.staticListLowerAlpha)} type="a">
                    <li className={style.staticListItem}>
                      Matched Orders in the Rolling Futures product group are novated and settled in the BSAB System;
                    </li>

                    <li className={style.staticListItem}>All Matched Orders have Leverex as its counterpart;</li>

                    <li className={style.staticListItem}>
                      At the point of Settlement, the Closing Price is determined;
                    </li>

                    <li className={style.staticListItem}>
                      For each trade Leverex calculates the difference between the trade price and the Closing Price,
                      and multiplies this with the volume of the trade to determine the profit and loss for each Matched
                      Order. The profit or loss of the trade is capped with the trades margin;
                    </li>

                    <li className={style.staticListItem}>
                      Leverex calculates the total profit and loss for each user and returns what, if anything, remains
                      of the users margin together with any profits in one account transfer;
                    </li>

                    <li className={style.staticListItem}>
                      Immediately after releasing all balances held on the Leverex novation account to users, Leverex
                      makes a best effort to roll the net exposure of each user into the next contract session;
                    </li>

                    <li className={style.staticListItem}>
                      The new session net exposure per user is margined at the previous sessions closing price, times
                      the margin ratio and users volume as if it was an opening trade on behalf of each user;
                    </li>

                    <li className={style.staticListItem}>
                      Should a user fail to have enough available balance to roll their full position into the next
                      session, Leverex will calculate the maximum permitted net exposure based on the available
                      Stablecoin balance and open the next session with this new net exposure;
                    </li>

                    <li className={style.staticListItem}>
                      Once all the net long and net short defaults have been calculated and netted down, there may still
                      exist an imbalance between the two, requiring Leverex to forcibly liquidate positions from the
                      side whose net exposure exceeds the other side. Settlement Liquidations are done until the two are
                      in balance, at which point the new session can open;
                    </li>

                    <li className={style.staticListItem}>
                      Leverex determines Settlement Liquidations to occur on the accounts of the users with the highest
                      Leverage Ratios until an average leverage ratio is reached whereby net longs equal net shorts, at
                      which point the new contract session may open;
                    </li>
                  </ol>
                </li>

                <li className={style.staticListItem}>Settlements are final and irrevocable.</li>
              </ol>
            </li>

            <li className={clsx(style.staticListItem, style.staticListItemHeadline)}>
              <StaticHeadlineComponent>RISKS</StaticHeadlineComponent>
              <ol className={clsx(style.staticList, style.staticListDecimal)}>
                <li className={style.staticListItem}>
                  Trading in Rolling Futures on Leverex is high risk. Your account balance may go to zero in one
                  contract session if your entire Stablecoin Position Account is allocated as margin.
                </li>

                <li className={style.staticListItem}>
                  Regardless of market movements, an opened position may never be liquidated. All trades move to
                  settlement. This means that in the event of serious market disruption, two offsetting trades which are
                  individually margined, with a defined profit and loss schedule, where the difference between the two
                  trades should result in a profit to the user, may in fact result in no profit at all if the Closing
                  Price moves significantly away from the traded prices.
                </li>

                <li className={style.staticListItem}>
                  Leverex may, at its sole discretion, perform measures to ensure system integrity which includes
                  forcibly reducing the net exposure which gets rolled between contract sessions even if your account
                  has sufficient margin to collateralize your net exposure for the next session.
                </li>

                <li className={style.staticListItem}>
                  Leverex will roll your net exposure until either your Stablecoin Position Account is flat, or an
                  offsetting trade is placed whereby the net exposure is zero and no exposure will be rolled into the
                  next session;
                </li>

                <li className={style.staticListItem}>
                  Leverex’s Closing Price may differ from what is considered fair market value.
                </li>
              </ol>
            </li>

            <li className={clsx(style.staticListItem, style.staticListItemHeadline)}>
              <StaticHeadlineComponent>FEES</StaticHeadlineComponent>
              <ol className={clsx(style.staticList, style.staticListDecimal)}>
                <li className={style.staticListItem}>
                  The Participant acknowledges that Leverex will charge fees for providing the Services (“Fees”) and
                  that such Fees may change from time to time;
                </li>

                <li className={style.staticListItem}>
                  Current Fees can be found in the schedule (“Fee Schedule”) provided on Leverex’s website;
                </li>

                <li className={style.staticListItem}>Other fees are available on a request basis.</li>
              </ol>
            </li>

            <li className={clsx(style.staticListItem, style.staticListItemHeadline)}>
              <StaticHeadlineComponent>FIDUCIARY FOR PARTICIPANTS DELIVERABLE CURRENCY</StaticHeadlineComponent>
              <ol className={clsx(style.staticList, style.staticListDecimal)}>
                <li className={style.staticListItem}>
                  Leverex is a fiduciary and will hold stablecoin currency in one or more omnibus bank accounts (Omnibus
                  Accounts) at depository institutions with which we have agreements (each, a Bank).
                </li>

                <li className={style.staticListItem}>
                  Each Omnibus Account is (i) legally distinct from our transaction and business accounts and (ii)
                  established specifically for your benefit and recorded specifically in the name of our Participants.
                  Deliverable Currency will not be treated as general assets of Leverex. Each Omnibus Account will be
                  maintained by Leverex with the intention that the deposits in such accounts are eligible for
                  “pass-through” deposit insurance, subject to applicable limitations.
                </li>

                <li className={style.staticListItem}>
                  Each Participant should note the following information about each of our Omnibus Accounts:
                  <ol className={clsx(style.staticList, style.staticListLowerRoman)} type="i">
                    <li className={style.staticListItem}>
                      In accepting a Participant’s Deliverable Currency, we will be performing as a fiduciary;
                    </li>

                    <li className={style.staticListItem}>
                      We will not have a reversionary interest in the Omnibus Account;
                    </li>

                    <li className={style.staticListItem}>
                      The Omnibus Account will not be an interest-bearing account;
                    </li>

                    <li className={style.staticListItem}>
                      Participants’ interests in the Omnibus Account will be readily ascertainable and limited to the
                      specific amount of Deliverable Currency in their Stablecoin Position Account;
                    </li>

                    <li className={style.staticListItem}>
                      We will impose no limitations or controls on the stablecoin currency in the Omnibus Account; each
                      Participant will direct the movement of stablecoin currency into the Omnibus Account by generating
                      a deposit reference and conducting bank transfer, and out of the Omnibus Account by providing
                      withdrawal requests through the Client Portal which Leverex will perform; and;
                    </li>

                    <li className={style.staticListItem}>
                      The Omnibus Account will comprise of Deliverable Currency belonging to you and other Participants.
                    </li>
                  </ol>
                </li>

                <li className={style.staticListItem}>
                  In connection with our standard business practices, we will keep appropriate books and records to
                  ensure that (i) all stablecoin currency held by our Participants in the Omnibus Account is accurately
                  reflected and that (ii) movements of stablecoin currency initiated and by each Participant will be
                  appropriately ledgered and documented on a “real time” basis in our records during normal Leverex
                  operations.
                </li>

                <li className={style.staticListItem}>
                  Certain circumstances may require us to transfer stablecoin currency between two (2) or more of our
                  Omnibus Accounts or to terminate a relationship with one of our Banks. Moving stablecoin currency
                  between Omnibus Accounts will be recorded in detail and should not affect the available amounts in
                  each Participant’s Stablecoin Position Account or jeopardize the availability of deposit insurance,
                  subject to applicable limitations.
                </li>
              </ol>
            </li>

            <li className={clsx(style.staticListItem, style.staticListItemHeadline)}>
              <StaticHeadlineComponent>SOURCE OF FUNDS</StaticHeadlineComponent>
              <ol className={clsx(style.staticList, style.staticListDecimal)}>
                <li className={style.staticListItem}>
                  You agree, represent and warrant that no funds presently in a Stablecoin Position Account that you own
                  and/or are a designated representative of, or funds exchanged or to be exchanged by you in the future
                  on Leverex are the direct or indirect proceeds of any illicit, criminal or fraudulent activity.
                </li>
              </ol>
            </li>

            <li className={clsx(style.staticListItem, style.staticListItemHeadline)}>
              <StaticHeadlineComponent>FUNDING AND WITHDRAWALS</StaticHeadlineComponent>
              <ol className={clsx(style.staticList, style.staticListDecimal)}>
                <li className={style.staticListItem}>
                  Stablecoin currency deposits are only accepted from the Participant (not from a third-party depositing
                  Stablecoin currency on behalf of a Participant).
                </li>

                <li className={style.staticListItem}>
                  Stablecoin currency deposits are accepted via bank wire transfer (or future deposit methods as they
                  become available and announced).
                </li>

                <li className={style.staticListItem}>
                  All stablecoin currency withdrawals via bank wire transfer from a Participant’s Stablecoin Position
                  Account can only be transferred to the Participant’s pre-registered bank account, the Designated Bank
                  Account. The initiation of a withdrawal request from a Stablecoin Position Account is conducted
                  through the Client Portal and with the option of multi-factor authentication as activated by the
                  Participant, will be deemed to be an authorization for Leverex to complete any such withdrawal to a
                  Participant’s Designated Bank Account.
                </li>

                <li className={style.staticListItem}>
                  You will be able to view the balances in your Stablecoin Position Account always during normal Leverex
                  operations in the Client Portal, however Leverex cannot guarantee Participants viewing access always
                  because maintenance or other. Certain deposit or withdrawal requests for Stablecoin Position
                  Account(s) may not be processed outside of normal banking hours.
                </li>

                <li className={style.staticListItem}>
                  We will provide each Participant with email confirmations of all deposits into or withdrawals from a
                  Participant’s Stablecoin Position Accounts.
                </li>

                <li className={style.staticListItem}>
                  In certain situations, stablecoin currency deposits/withdrawals may be delayed by up to three (3) to
                  five (5) business days in connection with planned or unplanned maintenance or downtime.
                </li>

                <li className={style.staticListItem}>
                  You agree that Leverex may charge for both deposits and withdrawals and that such fee may change from
                  time to time.
                </li>

                <li className={style.staticListItem}>
                  You agree that any negative balances which occur as a result of fees will be honoured in full.
                </li>
              </ol>
            </li>

            <li className={clsx(style.staticListItem, style.staticListItemHeadline)}>
              <StaticHeadlineComponent>TERM OF AGREEMENT AND ACCOUNT CLOSURE</StaticHeadlineComponent>
              <ol className={clsx(style.staticList, style.staticListDecimal)}>
                <li className={style.staticListItem}>
                  You may close your Account and terminate this Agreement at any time by providing written notice to us
                  at <LinkEmailComponent>{SUPPORT_EMAIL}</LinkEmailComponent>. Closing your Account will not affect any
                  rights and obligations incurred prior to the date of your Account being closed. You will be required
                  to either cancel or complete all open positions.
                </li>

                <li className={style.staticListItem}>
                  You undertake to close all open positions in your Account upon the closing of your Account, whether
                  your Account and this Agreement is terminated by yourself or Leverex. Leverex will thereafter wire any
                  Deliverable Currency available in your Stablecoin Position Account(s) to your Designated Bank
                  Account(s). You undertake and warrant that Leverex may withhold the balance in order to deduct any
                  outstanding fees prior to the wire of any Deliverable Currency available in your Stablecoin Position
                  Account(s).
                </li>

                <li className={style.staticListItem}>
                  You are responsible for any Fees, costs, expenses, charges or obligations (including, but not limited
                  to, attorney and court fees or transfer costs of stablecoin currency) associated with closing your
                  Account. In the event that your account closing costs exceed the value in your Account, you will be
                  responsible for reimbursing us. You may not cancel your Account to avoid paying any fees otherwise due
                  or any examination as part of compliance program.
                </li>
              </ol>
            </li>

            <li className={clsx(style.staticListItem, style.staticListItemHeadline)}>
              <StaticHeadlineComponent>ACCOUNT SUSPENSION, TERMINATION, AND CANCELLATION</StaticHeadlineComponent>
              <ol className={clsx(style.staticList, style.staticListDecimal)}>
                <li className={style.staticListItem}>
                  We may discontinue, terminate, suspend, or change any aspect of Leverex or its availability to you, at
                  any time with five (5) days notice. In addition, we reserve the right to suspend, modify, deactivate
                  or terminate your Account and this Agreement as well as your access to all or any portion of Leverex
                  immediately and without notice if (i) you violate any provision of this Agreement; (ii) we in good
                  faith suspect that your account is in breach of our Compliance Program; (iii) we are required to do so
                  by a regulatory authority, court order, facially valid subpoena or binding order of a government
                  authority; (iv) you or your accounts are subject to any pending litigation, investigation or
                  governmental proceeding; (v) you have used the Services in a predatory manner which violates and
                  orderly marketplace (for example wash trading or spoofing) or (vi) for any other reason that we may
                  reasonably conclude. Your right to use Leverex is subject to any limits established by us in our sole
                  discretion. If your Account is closed, a notice of closure shall be sent to the email address on
                  record associated with your Account, as applicable.
                </li>

                <li className={style.staticListItem}>
                  In addition, if you do not log into your Account for two (2) years then, Leverex may close your
                  Account.
                </li>

                <li className={style.staticListItem}>
                  Subject to the provisions of this Agreement, you agree, as the owner and/or designated representative
                  of your Account, that if your Account is closed for any reason and unless otherwise required by law,
                  court order or subpoena, Leverex is authorized to send the total amount of Deliverable Currency in
                  your Stablecoin Position Account(s), less any applicable fees, to your Designated Bank Account(s) via
                  bank wire transfer.
                </li>
              </ol>
            </li>

            <li className={clsx(style.staticListItem, style.staticListItemHeadline)}>
              <StaticHeadlineComponent>EXCHANGE OPERATIONS</StaticHeadlineComponent>
              <ol className={clsx(style.staticList, style.staticListDecimal)}>
                <li className={style.staticListItem}>
                  Orders placed on Leverex during planned or unplanned downtime will be processed on a commercially
                  reasonable efforts basis once we resume operations. Leverex reserves the right to reject or cancel
                  Orders made and/or pending during downtime.
                </li>

                <li className={style.staticListItem}>
                  Orders may be subject to delays, difficulties, and/or conditions affecting transmission or execution
                  of Orders over which Leverex has no control, including, but not limited to, mechanical or electronic
                  failure or market congestion.
                </li>

                <li className={style.staticListItem}>
                  We are not liable for any delays, difficulties or conditions adversely affecting transmission or
                  execution of Orders.
                </li>
              </ol>
            </li>

            <li className={clsx(style.staticListItem, style.staticListItemHeadline)}>
              <StaticHeadlineComponent>COPYRIGHTS AND OTHER INTELLECTUAL PROPERTY RIGHTS</StaticHeadlineComponent>
              <ol className={clsx(style.staticList, style.staticListDecimal)}>
                <li className={style.staticListItem}>
                  Unless otherwise indicated by Leverex, all copyright and other intellectual property rights in all
                  content and other materials contained on our website or provided in connection with the Services,
                  including, without limitation, the Leverex logo and all designs, text, graphics, pictures,
                  information, data, software, sound files, other files and the selection and arrangement thereof
                  (collectively, the Leverex Materials) are the proprietary property of Leverex or our licensors or
                  suppliers and are protected by European and international copyright laws and other intellectual
                  property rights laws.
                </li>

                <li className={style.staticListItem}>
                  Leverex hereby grants you a limited, nonexclusive and non-sublicensable license to access and use the
                  Leverex Materials for your personal or internal business use. Such license is subject to this
                  Agreement and does not permit (a) any resale of the Leverex Materials; (b) the distribution, public
                  performance or public display of any Leverex Materials; (c) modifying or otherwise making any
                  derivative uses of the Leverex Materials, or any portion thereof; or (d) any use of the Leverex
                  Materials other than for their intended purposes. The license granted under this Section will
                  automatically terminate if we suspend or terminate your access to the Services and Leverex has the
                  right in its sole discretion to immediately terminate this license. You undertake not to use the
                  license in any way which may cause harm to Leverex and will indemnify Leverex for all liabilities such
                  harm causes.
                </li>
              </ol>
            </li>

            <li className={clsx(style.staticListItem, style.staticListItemHeadline)}>
              <StaticHeadlineComponent>TAX AND VAT</StaticHeadlineComponent>
              <ol className={clsx(style.staticList, style.staticListDecimal)}>
                <li className={style.staticListItem}>
                  You must comply with any and all applicable tax laws, including the reporting and payment of any taxes
                  arising in connection with your use of the Services, or returns from investments made using the
                  Services. The reporting and payment of any such applicable taxes are your responsibility.
                </li>

                <li className={style.staticListItem}>
                  You acknowledge and agree that Leverex does not provide legal, tax or investment advice, and to the
                  extent you deem necessary, you will consult with qualified professionals in your own jurisdiction
                  prior to using Leverex.
                </li>

                <li className={style.staticListItem}>
                  In this Clause, “VAT” means value added tax chargeable under Swedish law, and any similar or
                  equivalent tax imposed any other jurisdiction.
                </li>
              </ol>
            </li>

            <li className={clsx(style.staticListItem, style.staticListItemHeadline)}>
              <StaticHeadlineComponent>REPRESENTATION AND WARRANTIES</StaticHeadlineComponent>
              <ol className={clsx(style.staticList, style.staticListDecimal)}>
                <li className={style.staticListItem}>Leverex does not provide any investment, tax or legal advice.</li>

                <li className={style.staticListItem}>
                  Leverex does not recommend any Participant to purchase any asset, including those registered on a
                  Blockchain.
                </li>

                <li className={style.staticListItem}>
                  Before engaging in any trading or investment activity, you should consult a qualified professional.
                </li>

                <li className={style.staticListItem}>
                  It is your responsibility to seek independent advice regarding the Services (including your applicable
                  tax obligations). The operations and act of Leverex (including, without limitation, its permission to
                  publish any information regarding any startup company or syndicate, its activities in opening
                  positions and/or contracts or the facilitation of opening positions and/or contracts etc.) may not be
                  considered as an advice or recommendation to conduct any transactions or investments. You are required
                  to personally assess any and all risks associated with any transaction you plan to enter into. You are
                  recommended to seek professional advice to determine such risks.
                </li>

                <li className={style.staticListItem}>
                  In no event shall Leverex and its owners, affiliates, the officers, directors, employees, agents or
                  suppliers be liable for lost profits, money, goodwill, reputation, any intangible loss or any damage
                  whether in contract or tort, for any direct, special, indirect, or any other damages of any kind even
                  if Leverex and its affiliates have been advised of the possibility thereof (including incidental or
                  consequential) arising out of or in connection with any of the following liabilities, but is not
                  limited to: (i) use of or inability to use our Services, Sites or this Agreement; (ii) delays or
                  disruptions of our Services or Sites; (iii) viruses or any malicious software obtained by accessing
                  our Services or Sites; (iv) the accuracy or reliability of the content of the Sites or Services; (v)
                  suspension of your Account; (vi) you being dissatisfied with our Sites or Services; (vii) your need to
                  modify your practice or content of information; (viii) failure of mechanical or electronic equipment
                  or communication lines, telephone or other interconnect problems (e.g., you cannot access your
                  internet service provider), ; (ix) unauthorized access, theft, hacks, information leaks, operator
                  errors, strikes; (x) labor problems; (xi) any force majeure. We cannot and do not guarantee
                  continuous, uninterrupted or secure access to Leverex. Nevertheless, this limitation of liability does
                  not apply if Leverex intentionally breaches any of its obligations set out in this Agreement.
                </li>

                <li className={style.staticListItem}>
                  Leverex’s aggregated liability under the Agreement shall in no event exceed twenty-five (25) percent
                  of the Participant’s actually paid fees under the Agreement during the twelve (12) months prior to
                  when the liability arose hereunder, and in any event, shall be capped at USDT 2’000;
                </li>

                <li className={style.staticListItem}>
                  The Participant shall indemnify and hold Leverex harmless to the extent that Leverex incurs liability
                  towards any Participant or other third party in respect of Leverex’s processing of personal data on
                  behalf of the Participant;
                </li>

                <li className={style.staticListItem}>
                  Although acting in good faith and considering it to be true and correct, Leverex takes no
                  responsibility for the accuracy, reliability or correctness of information included in the Services or
                  Leverex Materials it provides.
                </li>

                <li className={style.staticListItem}>
                  Leverex and all information is provided “as is” and “as available” and without representation of
                  warranty. Leverex does not represent of warrant to the accuracy, completeness, currentness,
                  non-infringement, merchantability, or fitness for a particular purpose of Leverex or the information
                  contained therein.
                </li>

                <li className={style.staticListItem}>
                  We do not have control over information provided or published by third parties and we cannot ensure
                  that our analytics, statements, services, or products are correct. Leverex is not responsible for the
                  content of any referenced or linked off-site page and is not liable for that content. The risk of
                  injury rests entirely with the user. Links from Leverex’s webpage, Terminal or other platform, to
                  other sites do not constitute an endorsement from Leverex. These links are provided as an information
                  service only. It is the responsibility of the user to evaluate the content and usefulness of
                  information obtained from other sites. You should direct any concerns regarding any external link to
                  its site administrator or webmaster. If you choose to follow one of these links, the policies of that
                  outside site take effect until you return to this site.
                </li>

                <li className={style.staticListItem}>
                  In no event will Leverex and its affiliates be liable to you or anyone else for any decision made or
                  action taken by you in reliance on, or in connection with your use of Leverex, the Services or the
                  information therein.
                </li>

                <li className={style.staticListItem}>
                  If you have a dispute with other users, you release Leverex from claims, demands, and damages of every
                  kind and nature, known and unknown, arising out of or in any way connected with such disputes.
                </li>
              </ol>
            </li>

            <li className={clsx(style.staticListItem, style.staticListItemHeadline)}>
              <StaticHeadlineComponent>INDEMNITIES</StaticHeadlineComponent>
              <StaticPitchComponent className={clsx(style.staticPitchMarginTop, style.staticListItem)}>
                You agree to defend, indemnify and hold harmless Leverex (and each of our officers, directors, members,
                employees, agents and affiliates) from any claim, demand, action, damage, loss, charges and
                investigations, cost or expense, for example but not limited to loss of profit, direct and indirect
                losses, reasonable attorneys’ fees, arising out or relating to (a) your use of, or conduct in connection
                with, our Services; (b) any Feedback you provide; (c) your violation of this Agreement; or (d) your
                violation of any rights of any other person or entity.
              </StaticPitchComponent>
            </li>

            <li className={clsx(style.staticListItem, style.staticListItemHeadline)}>
              <StaticHeadlineComponent>GOVERNING LAW AND JURISDICTION</StaticHeadlineComponent>
              <ol className={clsx(style.staticList, style.staticListDecimal)}>
                <li className={style.staticListItem}>
                  This Agreement shall be governed by and construed in accordance with the laws of Sweden.
                </li>

                <li className={style.staticListItem}>
                  Any dispute, controversy or claim arising out of or in connection with this Agreement, or the breach,
                  termination or invalidity thereof, shall be finally settled by arbitration in accordance with the
                  Rules for Expedited Arbitrations of the Arbitration Institute of the Stockholm Chamber of Commerce.
                  The seat of arbitration shall be Malmö, Sweden. The language to be used in the arbitral proceedings
                  shall be English. Notwithstanding the foregoing, Leverex may immediately bring a proceeding seeking
                  preliminary injunctive relief in a court having jurisdiction thereof which shall remain in effect
                  until a final award is made in the arbitration.
                </li>

                <li className={style.staticListItem}>
                  The Parties undertake and agree that all arbitral proceedings conducted with reference to this
                  Agreement will be kept strictly confidential. This confidentiality undertaking shall cover all
                  information disclosed in the course of such arbitral proceedings, as well as any decision or award
                  that is made or declared during the proceedings. Information covered by this confidentiality
                  undertaking may not, in any form, be disclosed to a third party without the written consent of the
                  other party. This notwithstanding, a party shall not be prevented from disclosing such information in
                  order to safeguard in the best possible way his rights vis-à-vis the other party in connection with
                  the dispute, or if the party is obliged to so disclose pursuant to statute, regulation, a decision by
                  an authority, a stock exchange contract or similar.
                </li>

                <li className={style.staticListItem}>
                  If this Agreement, or any part thereof, is assigned to a third party by Leverex further to section 22
                  below, such third party shall be automatically bound by the provisions of this arbitration clause.
                </li>
              </ol>
            </li>

            <li className={clsx(style.staticListItem, style.staticListItemHeadline)}>
              <StaticHeadlineComponent>ASSIGNMENT AND DELEGATION</StaticHeadlineComponent>
              <ol className={clsx(style.staticList, style.staticListDecimal)}>
                <li className={style.staticListItem}>
                  You may not assign or delegate any rights or obligations under this Agreement. Any purported
                  assignment and delegation shall be ineffective.
                </li>

                <li className={style.staticListItem}>
                  Leverex may freely assign or delegate all rights and obligations under this Agreement, fully or
                  partially without notice to you. We may also substitute, by way of unilateral novation, effective upon
                  notice to you, for any third party that assumes our rights and obligations under this Agreement. Such
                  notice will be given through our website or email or by any other type of notice.
                </li>
              </ol>
            </li>

            <li className={clsx(style.staticListItem, style.staticListItemHeadline)}>
              <StaticHeadlineComponent>CHANGING THIS AGREEMENT</StaticHeadlineComponent>
              <ol className={clsx(style.staticList, style.staticListDecimal)}>
                <li className={style.staticListItem}>
                  Note that this Agreement may change from time to time, in which case Leverex will ask you to agree to
                  an updated Agreement through the Leverex Terminal or the Client Portal or by email. Your continued use
                  of the Services is considered your acceptance to this Agreement including updates. Should you not wish
                  or be able to be bound to any or all parts of this Agreement, kindly refrain from visiting, accessing
                  or using the Services. Leverex may, in its sole discretion and with immediate effect suspend this
                  Agreement if any update to this Agreement has not been complied with by yourselves.
                </li>
              </ol>
            </li>

            <li className={clsx(style.staticListItem, style.staticListItemHeadline)}>
              <StaticHeadlineComponent>QUESTIONS, FEEDBACK, AND COMPLAINTS</StaticHeadlineComponent>
              <StaticPitchComponent className={clsx(style.staticPitchMarginTop, style.staticListItem)}>
                If you have any questions or would like more information about Leverex, please feel free to contact
                us&nbsp;
                <LinkEmailComponent>{SUPPORT_EMAIL}</LinkEmailComponent>.
              </StaticPitchComponent>
            </li>
          </ol>
        </section>
      </StaticLayout>
    </>
  );
};

export default ParticipantAgreement;
