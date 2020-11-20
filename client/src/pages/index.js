import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import Hero from '../components/landing/Hero';
import Wrapper from '../components/shared/Wrapper';

const Home = () => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <Helmet>
        <title>{t('shared.appName')}</title>
        <link rel='canonical' href='#' />
      </Helmet>

      <div className='container px-8 xl:px-0 text-center md:text-left mt-24'>
        <Hero />

        <p className='leading-loose text-lg mt-16'>
          EzCVは簡単な履歴書ビルダーのアプリです。楽しみに使っています。
        </p>
      </div>
    </Wrapper>
  );
};

export default memo(Home);
