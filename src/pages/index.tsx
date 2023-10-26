import React, { MouseEvent, useCallback, useEffect, useRef } from 'react';

import { NextPage } from 'next';
import Head from 'next/head';
import clsx from 'clsx';

import { LandingIntroContainer } from '~/modules/Landing/containers/Intro/IntroContainer';
import { LandingProductsContainer } from '~/modules/Landing/containers/Products/ProductsContainer';
import { LandingFeaturesContainer } from '~/modules/Landing/containers/Features/FeaturesContainer';
import { LandingFooterContainer } from '~/modules/Landing/containers/Footer/FooterContainer';
import { LandingBenefitsContainer } from '~/modules/Landing/containers/Benefits/BenefitsContainer';
import { LandingExploreContainer } from '~/modules/Landing/containers/Explore/ExploreContainer';
import { LandingToolsContainer } from '~/modules/Landing/containers/Tools/ToolsContainer';
import { LandingHeaderContainer } from '~/modules/Landing/containers/Header/HeaderContainer';
import { LandingParallaxContainer } from '~/modules/Landing/containers/Parallax/ParallaxContainer';
import { OpenGraphComponent } from '~/components/OpenGraph/OpenGraphComponent';

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

const Home: NextPage = () => {
  const scrollingRef = useRef<string>();

  const featuresRef = useRef<HTMLDivElement>(null);
  const featuresLinkRef = useRef<HTMLAnchorElement>(null);

  const toolsRef = useRef<HTMLDivElement>(null);
  const toolsLinkRef = useRef<HTMLAnchorElement>(null);

  const exploreRef = useRef<HTMLDivElement>(null);
  const exploreLinkRef = useRef<HTMLAnchorElement>(null);

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

  const handleLogoClick = useCallback((event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (scrollingRef.current) return;

    window.scrollTo({ top: 0, behavior: 'smooth' });
    handleScrollInto('logo');
  }, []);

  return (
    <>
      <Head>
        <title>Leverex</title>
        <OpenGraphComponent
          title="Leverage made simple"
          description="Cash settled rolling futures with 10x leverage"
          img="/static/media/og-picture.jpeg"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={style.homeContainer}>
        <LandingHeaderContainer
          featuresLinkRef={featuresLinkRef}
          toolsLinkRef={toolsLinkRef}
          exploreLinkRef={exploreLinkRef}
          handleLogoClick={handleLogoClick}
          handleFeaturesClick={handleFeaturesClick}
          handleToolsClick={handleToolsClick}
          handleExploreClick={handleExploreClick}
        />

        <LandingParallaxContainer />

        <div className={style.homeContainerInner}>
          <LandingIntroContainer className={style.homeIntro} />
          <LandingProductsContainer className={clsx(style.homeWrapper, style.homeProducts)} />
          <LandingFeaturesContainer
            className={clsx(style.homeWrapper, style.homeFeatures)}
            containerRef={featuresRef}
          />
          <LandingToolsContainer className={style.homeTools} containerRef={toolsRef} />
          <LandingExploreContainer className={style.homeExplore} containerRef={exploreRef} />
          <LandingBenefitsContainer className={style.homeBenefits} />
        </div>

        <LandingFooterContainer className={style.homeFooter} />
      </main>
    </>
  );
};

export default Home;
