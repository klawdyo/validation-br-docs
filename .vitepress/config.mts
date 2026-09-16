import { defineConfig } from 'vitepress';
import Shared from '../.vitepress/shared';
import path from 'path';

import { sideBar as v1SideBar } from '../src/v1/.vitepress/v1.config.ts';
import { sideBar as v2SideBar } from '../src/v2/.vitepress/v2.config.ts';
import Unocss from 'unocss/vite'
import { Versions } from './theme/versions.enum.ts';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: "src",

  title: Shared.name,
  description: Shared.description,
  cleanUrls: true,

  sitemap: {
    hostname: Shared.url,
  },

  transformHead({ page, pageData, title, description }) {
    let clean = page.replace(/\.md$/, '');
    if (clean.endsWith('/index') || clean === 'index') {
      clean = clean.replace(/(^|\/)index$/, '');
    }

    // Se for uma página sem v1 e sem v2 (ex: 'cpf', 'install', etc.), a rota canônica é na v2
    if (!clean.startsWith('v1') && !clean.startsWith('v2') && clean !== '') {
      clean = `v2/${clean}`;
    }

    const canonicalPath = clean ? `/${clean}` : '/';
    const canonicalUrl = `${Shared.url.replace(/\/$/, '')}${canonicalPath}`;

    const pageTitle = pageData.frontmatter.title || title || Shared.name;
    const pageDescription = pageData.frontmatter.description || description || Shared.description;
    const ogImage = `${Shared.url.replace(/\/$/, '')}/logo-light.jpg`;

    return [
      ['link', { rel: 'canonical', href: canonicalUrl }],

      // Open Graph
      ['meta', { property: 'og:type', content: 'website' }],
      ['meta', { property: 'og:site_name', content: Shared.name }],
      ['meta', { property: 'og:title', content: pageTitle }],
      ['meta', { property: 'og:description', content: pageDescription }],
      ['meta', { property: 'og:url', content: canonicalUrl }],
      ['meta', { property: 'og:image', content: ogImage }],
      ['meta', { property: 'og:locale', content: 'pt_BR' }],

      // Twitter Card
      ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
      ['meta', { name: 'twitter:title', content: pageTitle }],
      ['meta', { name: 'twitter:description', content: pageDescription }],
      ['meta', { name: 'twitter:image', content: ogImage }],
    ];
  },

  head: [
    ['link', { rel: 'icon', type: 'image/jpeg', href: '/logo-light.jpg' }],
    ['meta', { name: 'keywords', content: Shared.keywords }],
    ['meta', { name: 'author', content: 'validation-br' }],
    ['meta', { name: 'robots', content: 'index, follow' }],
    ['meta', { name: 'theme-color', content: '#0d18eb' }],
    ['link', { rel: 'sitemap', type: 'application/xml', href: '/sitemap.xml' }],

    // <meta name="google-adsense-account" content="ca-pub-9643986318610515">
    ['meta', { name: 'google-adsense-account', content: 'ca-pub-9643986318610515' }],
    [
      'script',
      { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-9TQH37109T' }
    ],
    [
      'script',
      {},
      `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-9TQH37109T');`
    ]
  ],

  vite: {
    plugins: [
      Unocss(),
    ],

    resolve: {
      alias: {
        '@': path.resolve(__dirname, '..')
      }
    }
  },

  themeConfig: {

    siteTitle: `${Shared.name}`,

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      // { text: 'Examples', link: String(useData().page)},
      { text: 'Home', link: '/' },
      {
        text: 'Versão',
        items: [
          { text: Versions.current, link: '/v2/', },
          { text: Versions.legacy, link: '/v1/', },
        ]
      },
    ],

    logo: {
      light: '/logo-light.jpg',
      dark: '/logo-dark.jpg',
    },


    sidebar: {
      '/v1/': v1SideBar,
      '/v2/': v2SideBar,
      '/': v2SideBar,
    },

    editLink: {
      text: 'Edite esta página no GitHub',
      pattern: 'https://github.com/klawdyo/validation-br-docs/tree/main/src/:path',
    },

    lastUpdated: {
      text: 'Atualização',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'short',
        timeZone: 'America/Sao_Paulo'
      }
    },


    returnToTopLabel: 'Topo',

    socialLinks: [
      { icon: 'github', link: Shared.github },
      { icon: 'npm', link: Shared.npm },
    ]
  }
});
