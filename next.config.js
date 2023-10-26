const { readFile, readFileSync } = require('fs');
const path = require('path');

const ENV = process.env.ENV || 'prod';
let FE = process.env.FE || '';

const result = require('dotenv').config({
  path: `.env.${ENV}.local`
});

if (result.error) {
  throw result.error;
}

console.log('\nenvironment -', ENV, '\n');

if(FE === '') {
  const data = readFileSync('./.git/HEAD', 'utf8');
  FE = data.substring(0, 8);
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: 'build',
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  },

  publicRuntimeConfig: { ...result.parsed, ENV, FE },
  env: { ENV },

  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },

  async redirects() {
    return [{
      source: '/account',
      destination: '/account/dashboard',
      permanent: true,
    }]
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    config.module.rules.find(rule => Object.keys(rule).includes('oneOf')).oneOf.forEach((moduleLoader) => {
      if (!Array.isArray(moduleLoader.use)) return;

      moduleLoader.use.forEach((l) => {
        if(!l.loader || !l.loader.match('css-loader') || l.loader.match('postcss-loader')) return;

        const getLocalIdent = l.options.modules?.getLocalIdent;
        if (!getLocalIdent) return;

        l.options.modules.getLocalIdent = (context, localIdentName, localName, options) => {
          if (localName.match(/^tw-(group|peer)$/) || localName.match(/^react-datepicker/)) return localName;

          return getLocalIdent(context, localIdentName, localName, options);
        }
      })
    });

    return config;
  }
}

module.exports = nextConfig;
