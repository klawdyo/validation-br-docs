import { DefaultTheme, defineConfig } from 'vitepress';
import Shared from '../.vitepress/shared';
import path from 'path';



import { sideBar as v1SideBar } from '../src/v1/.vitepress/v1.config.ts';
import { sideBar as v2SideBar } from '../src/v2/.vitepress/v2.config.ts';


// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: "src",

  title: Shared.name,
  description: Shared.description,
  cleanUrls: true,

  vite: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '..')
      }
    }
  },

  themeConfig: {

    

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      // { text: 'Examples', link: '/markdown-examples' },
      {
        text: 'Versão',
        items: [
          { text: Shared.versions.current, link: '/v1', },
          { text: Shared.versions.next, link: '/v2' },
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
