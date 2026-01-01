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
          { text: Versions.current, link: '/v1/', },
          { text: Versions.next, link: '/v2/' },
        ]
      },
    ],

    logo: '/logo.svg',


    sidebar: {
      '/v1': v1SideBar,
      // '/v2
      // '/v1': [
      //   // { text: path.resolve(__dirname, '..', '.vitepress'), link: '/v2/install' },
      //   ...v1SideBar
      // ],
      '/v2': v2SideBar,
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
