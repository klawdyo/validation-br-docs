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

  transformHead({ page }) {
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

    return [
      ['link', { rel: 'canonical', href: canonicalUrl }],
    ];
  },

  head: [
    // <meta name="google-adsense-account" content="ca-pub-9643986318610515">
    ['meta', { name: 'google-adsense-account', content: 'ca-pub-9643986318610515' }],
    [
      'script',
      { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=GTM-W528C3M7' }
    ],
    [
      'script',
      {},
      `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'GTM-W528C3M7');`
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

    logo: '/logo.svg',


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
