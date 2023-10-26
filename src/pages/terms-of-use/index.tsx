import React from 'react';

import { NextPage } from 'next';
import Head from 'next/head';
import clsx from 'clsx';

import { MainPath } from '~/constants/pathsConstants';
import { StaticLayout } from '~/layouts/Static/StaticLayout';
import { StaticPitchComponent } from '~/components/StaticPitch/StaticPitchComponent';
import { StaticHeadlineComponent } from '~/components/StaticHeadline/StaticHeadlineComponent';
import { LinkComponent } from '~/components/Link/LinkComponent';
import { OpenGraphComponent } from '~/components/OpenGraph/OpenGraphComponent';

import style from './style.module.scss';

const TermsOfUse: NextPage = () => {
  return (
    <>
      <Head>
        <title>Terms of Use</title>

        <OpenGraphComponent
          title="Terms of Use"
          description="Please read this Terms of Use carefully before using this website."
          img="/static/media/og-picture.jpeg"
        />
      </Head>

      <StaticLayout headline="Terms of Use">
        <section className={style.staticSection}>
          <StaticHeadlineComponent>
            Please read this Terms of Use carefully before using this website.
          </StaticHeadlineComponent>

          <StaticPitchComponent className={style.staticPitchMarginTop}>
            This website, <LinkComponent href={MainPath.HOME}>leverex.io</LinkComponent> the (&quot;Website&quot;), is
            owned and operated by Leverex, a private limited corporation in Sweden. This Terms of Use and our Privacy
            Policy, jointly (the &quot;Agreement&quot;) applies to any and all websites operated by Leverex and/or its
            subsidiaries. This Agreement is a legal contract between you and Leverex and applies to your use of the
            Website, including any information and materials therein and any software that Leverex makes available that
            allows you to access the website.
          </StaticPitchComponent>

          <StaticPitchComponent>
            By accessing all or any part of this Website, you fully accept and agree to comply with all of the terms and
            conditions set out in this Agreement. You are not permitted to use this Website except as provided in this
            Agreement. If you do not agree to be bound by this Agreement, you are not authorized to access and use this
            Website and should therefore exit the website. PLEASE READ THIS AGREEMENT IN ENTIRETY.
          </StaticPitchComponent>
        </section>

        <section className={style.staticSection}>
          <StaticHeadlineComponent>Additional Terms</StaticHeadlineComponent>

          <StaticPitchComponent className={style.staticPitchMarginTop}>
            This Agreement does not govern your use of the Leverex Terminal and/or Leverex Client Portal, your use of
            which is governed by their respective (i) agreements you have entered to access and use these services and
            (ii) terms of those services.
          </StaticPitchComponent>
        </section>

        <section className={style.staticSection}>
          <StaticHeadlineComponent>No Warranty</StaticHeadlineComponent>

          <StaticPitchComponent className={style.staticPitchMarginTop}>
            Leverex, its subsidiaries and third party providers as defined below does not warrant the accuracy or
            timeliness of any data, information and materials contained on the Website. Leverex has no liability for any
            loss of, or errors or omissions, whether provided by Leverex, our licensors or suppliers or other users.
          </StaticPitchComponent>

          <StaticPitchComponent>
            The information and materials have not been verified or authenticated in whole or in part by Leverex, or any
            other party, and they may include inaccuracies or typographical or other errors. Your use of the Website is
            at your own risk.
          </StaticPitchComponent>

          <StaticPitchComponent>
            Leverex, its subsidiaries and third party providers as defined below disclaims liability for errors,
            omissions or other defects, delays or interruptions in this information and materials.
          </StaticPitchComponent>

          <StaticPitchComponent>
            Leverex, its subsidiaries and third party providers as defined below makes no warranty or guarantee that the
            Website is free from viruses, security threats and that the Website will always be secure.
          </StaticPitchComponent>

          <StaticPitchComponent>
            Any downloads from the Website, or retrieved information or materials on the Website, is done at your own
            risk and you will be solely responsible for any loss to you that results from the download or use of such
            information and materials.
          </StaticPitchComponent>
        </section>

        <section className={style.staticSection}>
          <StaticHeadlineComponent>Limited Liability</StaticHeadlineComponent>

          <StaticPitchComponent className={style.staticPitchMarginTop}>
            Leverex, its subsidiaries and third party providers as defined below will in no event be liable for any
            damages or expenses arising out of or relating to your use of the website.
          </StaticPitchComponent>
        </section>

        <section className={style.staticSection}>
          <StaticHeadlineComponent>Links to other Internet Resources</StaticHeadlineComponent>

          <StaticPitchComponent className={style.staticPitchMarginTop}>
            Links to other internet resources are used by you at your own risk; Leverex, its subsidiaries and third
            party providers as defined below does not monitor or verify the content or accuracy provided by these
            resources in any way and is not liable for any aspect of such resources or any consequence arising from your
            use of those resources. By providing access to the linked websites, neither Leverex nor its Third Party
            Providers are recommending, endorsing or sponsoring any aspect of those websites, including the transmission
            of software, downloading or uploading of content, or any goods, services or securities available thereon.
            You forever hold Leverex and its Third Party Providers harmless from any and all claims, obligations and/or
            liability arising in connection with the use of any such links.
          </StaticPitchComponent>
        </section>

        <section className={style.staticSection}>
          <StaticHeadlineComponent>Indemnity</StaticHeadlineComponent>

          <StaticPitchComponent className={style.staticPitchMarginTop}>
            With this Agreement you agree to indemnify and hold harmless Leverex and its officers, agents, and employees
            from and against any and all claims, demands, expenses, damages and or penalties arising out of any failure
            by you or any agent acting on your behalf to fully observe this Agreement or by reason of any use by you or
            such agent of any information, materials and downloads provided on this Website.
          </StaticPitchComponent>
        </section>

        <section className={style.staticSection}>
          <StaticHeadlineComponent>No Recommendation or Advice Given</StaticHeadlineComponent>

          <StaticPitchComponent className={style.staticPitchMarginTop}>
            This Website and all content have been prepared for informational and/or educational purposes only and is
            not to be construed as a recommendation or offer to buy or sell or the solicitation of an offer to buy or
            sell any security, financial product or instrument, or to participate in any particular trading strategy.
            Neither Leverex, the Third Party Providers, nor any of their respective affiliates, officers, directors,
            employees, agents or licensors are soliciting any action based on information, materials or downloads made
            available on this Website.
          </StaticPitchComponent>

          <StaticPitchComponent>
            Leverex does not make any recommendations regarding the merit of any company, security or other financial
            product or investment identified on this Website, nor does it make any recommendation regarding the purchase
            or sale of any such company, security, financial product or investment that may be described or referred to
            on this Website, nor endorse or sponsor any company identified on this Website.
          </StaticPitchComponent>

          <StaticPitchComponent>
            Neither Leverex nor Third Party Providers (defined below) shall be liable for any investment decisions based
            upon or results obtained from the content provided on this Website. Nothing contained on this Website is
            intended to be, nor shall it be construed to be, legal, tax, accounting or investment advice.
          </StaticPitchComponent>

          <StaticPitchComponent>
            This Website is not directed at or intended for publication or distribution to any person in any
            jurisdiction where doing so would result in contravention of any applicable laws or regulations. It is your
            sole responsibility to comply with all to you applicable laws or regulations.
          </StaticPitchComponent>
        </section>

        <section className={style.staticSection}>
          <StaticHeadlineComponent>Proprietary Rights, Trademark and Copyright</StaticHeadlineComponent>

          <StaticPitchComponent className={style.staticPitchMarginTop}>
            Unless otherwise indicated by Leverex, all copyright and other intellectual property rights in all content
            and other materials contained on the Website or, including, without limitation, the Leverex logo and all
            designs, text, graphics, pictures, information, data, software, sound files, other files and the selection
            and arrangement thereof (collectively, &quot;Leverex Materials&quot;) are the proprietary property of
            Leverex or our licensors or suppliers and are protected by European and international copyright laws and
            other intellectual property rights laws.
          </StaticPitchComponent>

          <StaticPitchComponent>
            Aspects of the content of this Website are also protected by intellectual property laws, including but not
            limited to copyright, trademark, trade dress, domain name, patent, trade secret, international treaties and
            other proprietary rights and laws of the European Union countries and other countries (&quot;Intellectual
            Property laws&quot;).
          </StaticPitchComponent>

          <StaticPitchComponent>
            You acknowledge and agree that Leverex, its applicable affiliates, and/or the Third Party Provider, as
            relevant, shall own all right, title and interest in the content of this Website and all intellectual
            property relating thereto or otherwise referenced in this Website. Nothing contained on this Website should
            be construed as granting, by implication, any license or right to use any of the content, trademarks,
            copyrights, or other proprietary material without the express written permission of Leverex or such other
            party as may own the proprietary rights therein and any rights not expressly granted herein are reserved to
            Leverex or its Third Party Providers, as applicable.
          </StaticPitchComponent>

          <StaticPitchComponent>
            You may not not sell, license, rent, modify, print, collect, copy, reproduce, download, upload, transmit,
            disclose, distribute, disseminate, edit, adapt, electronically extract or scrub, compile or create
            derivative works from any content or materials or otherwise transfer any of the content to any third person.
          </StaticPitchComponent>

          <StaticPitchComponent>
            You agree not to challenge (or assist any third party to challenge) the validity or enforceability of any
            intellectual property owned by Leverex or its applicable affiliates relating to this Website, its content or
            otherwise referenced therein, including but not limited to the patents and trademarks listed at the end of
            this Agreement.
          </StaticPitchComponent>
        </section>

        <section className={style.staticSection}>
          <StaticHeadlineComponent>Prohibited Use</StaticHeadlineComponent>

          <StaticPitchComponent className={style.staticPitchMarginTop}>You agree not to:</StaticPitchComponent>
          <ul className={clsx(style.staticList, style.staticListDisc)}>
            <li className={style.staticListItem}>
              Use this Website in any manner that could damage, disable, overburden or impair any Leverex server, or the
              network(s) connected to any Leverex server, or interfere with any other party’s use and enjoyment of this
              Website.
            </li>
            <li className={style.staticListItem}>
              Attempt to gain unauthorized access to this Website or any services, other accounts, computer systems or
              networks connected to any Leverex server or to any of the services, through hacking, password mining or
              any other means.
            </li>
            <li className={style.staticListItem}>
              Obtain or attempt to obtain any materials or information through any means not intentionally made
              available through this Website.
            </li>
          </ul>
          <StaticPitchComponent>
            This list of prohibitions provides examples and is not complete or exclusive. Unauthorized use of the
            Website may violate certain laws and regulations.
          </StaticPitchComponent>

          <StaticPitchComponent>
            Leverex is not required to, but reserves the right, in its sole discretion, to monitor any and all use of
            this Website.
          </StaticPitchComponent>
        </section>

        <section className={style.staticSection}>
          <StaticHeadlineComponent>Feedback</StaticHeadlineComponent>

          <StaticPitchComponent className={style.staticPitchMarginTop}>
            If you send or transmit any communications, comments, questions, suggestions, or related materials to
            Leverex (collectively, &quot;Feedback&quot;), suggesting or recommending changes to the Website, all such
            Feedback is, and will be treated as, non-confidential and non-proprietary. You hereby assign all right,
            title, and interest in, and Leverex is free to use, without any attribution or compensation to you, any
            ideas, know-how, concepts, techniques, or other intellectual property and proprietary rights contained in
            the Feedback, whether or not patentable, for any purpose whatsoever, including but not limited to,
            developing, manufacturing, having manufactured, licensing, marketing, and selling, directly or indirectly,
            products and services using such Feedback.
          </StaticPitchComponent>
        </section>

        <section className={style.staticSection}>
          <StaticHeadlineComponent>Governing Law</StaticHeadlineComponent>

          <StaticPitchComponent className={style.staticPitchMarginTop}>
            By accessing the services on our Website, you agree to be governed by the laws of Sweden. The laws of such
            jurisdiction will govern all matters relating to this Agreement, and the use, or inability to use, the
            services, and that such laws will apply without regard to principles of conflict of laws. This choice of
            jurisdiction does not prevent Leverex from seeking injunctive relief with respect to a violation of
            intellectual property rights or confidentiality obligations in any appropriate jurisdiction. Leverex
            reserves the right to seek all remedies available at law and in equity for violations of this Agreement,
            including the right to block access from a particular Internet address to this Website.
          </StaticPitchComponent>
        </section>

        <section className={style.staticSection}>
          <StaticHeadlineComponent>Privacy</StaticHeadlineComponent>

          <StaticPitchComponent className={style.staticPitchMarginTop}>
            Our Privacy Policy is incorporated in this Agreement and subject to these Terms and Conditions. The Privacy
            Policy is available on the Website.
          </StaticPitchComponent>
        </section>

        <section className={style.staticSection}>
          <StaticHeadlineComponent>Revision/Termination of Services</StaticHeadlineComponent>

          <StaticPitchComponent className={style.staticPitchMarginTop}>
            Leverex has the right, at any time, to modify or discontinue, temporarily or permanently, the services,
            information, materials and other content we offer through the Website, and/or to refuse or restrict anyone
            from access to any such services, information, materials and other content, with or without notice and in
            its sole discretion. Leverex has the right at any time to revise and to otherwise modify this Agreement, and
            to impose new or additional Terms or Conditions (collectively, &quot;Additional Terms&quot;) on your use of
            the services available on or through our Website.
          </StaticPitchComponent>

          <StaticPitchComponent>
            Such Additional Terms are effective immediately and are incorporated into this Agreement when posted by
            Leverex to the Website. Use of the Website following such notice indicates your acceptance of all such
            Additional Terms. Leverex shall not be liable for any modification, suspension or discontinuance of any
            services.
          </StaticPitchComponent>
        </section>
      </StaticLayout>
    </>
  );
};

export default TermsOfUse;
