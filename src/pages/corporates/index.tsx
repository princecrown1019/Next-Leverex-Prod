import React, { MouseEvent, useCallback, useEffect, useRef } from 'react';

import { NextPage } from 'next';
import Head from 'next/head';
import clsx from 'clsx';

import { CorporatesHeaderContainer } from '~/modules/Corporates/containers/Header/HeaderContainer';
import { CorporatesIntroContainer } from '~/modules/Corporates/containers/Intro/IntroContainer';
import { CorporatesStepsContainer } from '~/modules/Corporates/containers/Steps/StepsContainer';
import { CorporatesAccessContainer } from '~/modules/Corporates/containers/Access/AccessContainer';
// import { CorporatesExploreContainer } from '~/modules/Corporates/containers/Explore/ExploreContainer';
// import { CorporatesSolutionsContainer } from '~/modules/Corporates/containers/Solutions/BenefitsContainer';
import { LandingFooterContainer } from '~/modules/Corporates/containers/Footer/FooterContainer';
import { CorporatesParallaxContainer } from '~/modules/Corporates/containers/Parallax/ParallaxContainer';
import { OpenGraphComponent } from '~/components/OpenGraph/OpenGraphComponent';
import { useDefaultStyles } from '~/hooks/StaticLayout/useDefaultStyles';

import style from './style.module.scss';

const checkActiveLink = (section: null | HTMLDivElement, link: null | HTMLAnchorElement, activeClass: string) => {
  if (!section || !link) return;

  const headerHeight = 88;
  const { offsetTop, clientHeight } = section;

  if (window.scrollY > offsetTop - 2 && window.scrollY < clientHeight - headerHeight + offsetTop) {
    link.classList.add(activeClass);
  } else {
    link.classList.remove(activeClass);
  }
};

const scrollInto = (section: null | HTMLDivElement) => {
  section?.scrollIntoView({ behavior: 'smooth' });
};

export const getServerSideProps = () => ({ props: {} });

const Corporates: NextPage = () => {
  const scrollingRef = useRef<string>();

  const featuresRef = useRef<HTMLDivElement>(null);
  const featuresLinkRef = useRef<HTMLAnchorElement>(null);

  const toolsRef = useRef<HTMLDivElement>(null);
  const toolsLinkRef = useRef<HTMLAnchorElement>(null);

  const exploreRef = useRef<HTMLDivElement>(null);
  const exploreLinkRef = useRef<HTMLAnchorElement>(null);

  useDefaultStyles();

  const handleScroll = useCallback(() => {
    checkActiveLink(featuresRef.current, featuresLinkRef.current, style.headerLinkActive);
    checkActiveLink(toolsRef.current, toolsLinkRef.current, style.headerLinkActive);
    checkActiveLink(exploreRef.current, exploreLinkRef.current, style.headerLinkActive);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScrollInto = useCallback((id?: string) => {
    scrollingRef.current = id;

    setTimeout(() => {
      scrollingRef.current = '';
    }, 500);
  }, []);

  const handleFeaturesClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      if (scrollingRef.current || !featuresRef.current) return;

      scrollInto(featuresRef.current);
      handleScrollInto(featuresRef.current.id);
    },
    [scrollingRef.current]
  );

  const handleToolsClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      if (scrollingRef.current || !toolsRef.current) return;

      scrollInto(toolsRef.current);
      handleScrollInto(toolsRef.current.id);
    },
    [scrollingRef.current]
  );

  const handleExploreClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      if (scrollingRef.current || !exploreRef.current) return;

      scrollInto(exploreRef.current);
      handleScrollInto(exploreRef.current.id);
    },
    [scrollingRef.current]
  );

  return (
    <>
      <Head>
        <title>Corporates</title>
        <OpenGraphComponent title="Corporates" description="Corporates" img="/static/media/og-picture.jpeg" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={style.institutionsContainer}>
        <CorporatesHeaderContainer
          featuresLinkRef={featuresLinkRef}
          toolsLinkRef={toolsLinkRef}
          exploreLinkRef={exploreLinkRef}
          handleFeaturesClick={handleFeaturesClick}
          handleToolsClick={handleToolsClick}
          handleExploreClick={handleExploreClick}
        />

        <CorporatesParallaxContainer className={style.institutionsParallax} />

        <div className={style.institutionsContainerInner}>
          <CorporatesIntroContainer className={clsx(style.institutionsWrapper, style.institutionsIntro)} />
          <CorporatesStepsContainer
            className={clsx(style.institutionsWrapper, style.institutionsSteps)}
            containerRef={featuresRef}
          />
          <CorporatesAccessContainer className={style.institutionsAccess} containerRef={toolsRef} />
          {/*<CorporatesExploreContainer className={style.institutionsExplore} containerRef={exploreRef} />*/}
          {/*<CorporatesSolutionsContainer className={style.institutionsSolutions} />*/}
        </div>

        <LandingFooterContainer className={style.institutionsFooter} />
      </main>
    </>
  );
};

export default Corporates;
