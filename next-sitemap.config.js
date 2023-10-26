const ENV = process.env.ENV || 'prod';

const subdomains = {
  prod: '',
  dev: 'dev.',
  uat: 'testnet.',
  live: 'live.',
  devprem: 'devprem.'
}

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: `https://${subdomains[ENV]}leverex.io`,
  generateRobotsTxt: true,
  sourceDir: 'build',
  exclude: ['/account/*'],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', disallow: '/account/*' },
      { userAgent: '*', allow: '/' }
    ]
  }
}
