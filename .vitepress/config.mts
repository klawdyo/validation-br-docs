import { defineConfig } from 'vitepress';
import Shared from '../.vitepress/shared';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: "src",

  title: "Validation BR",
  description: "Validação de documentos do Brasil",




  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      // { text: 'Examples', link: '/markdown-examples' },
      {
        text: 'Versão',
        items: [
          { text: 'v1.6.0 (current)', link: '/v1', },
          { text: 'v2.0 (next)', link: '/v2' },
        ]
      },
    ],

    sidebar: [
      // {
      //   text: 'Examples',
      //   items: [
      //     { text: 'Markdown Examples', link: '/markdown-examples' },
      //     { text: 'Runtime API Examples', link: '/api-examples' }
      //   ]
      // },
      { text: 'Home', link: '/v1' },
      { text: 'Instalação', link: '/v1/install' },

      {
        text: 'Documentos',
        items: [
          { text: 'CPF', link: '/v1/cpf' },
          { text: 'CNPJ', link: '/v1/cnpj' },
          { text: 'CNH', link: '/v1/cnh' },
          { text: 'Placa (CarPlate)', link: '/v1/carplate' },
          { text: 'PIS / PASEP', link: '/v1/pis-pasep' },
          { text: 'NUP17', link: '/v1/nup17' },
          { text: 'Processo Judicial', link: '/v1/judicial-process' },
          { text: 'RENAVAM', link: '/v1/renavam' },
          { text: 'Título de Eleitor', link: '/v1/tituloEleitor' },
          { text: 'Cód. Rastreamento Postal', link: '/v1/postal-track-code' },
        ]
      },

      {
        text: 'Integração',
        items: [
          { text: 'Yup', link: '/v1/integrations/yup' },
          { text: 'Zod', link: '/v1/integrations/zod' },
          { text: 'Class Validator', link: '/v1/integrations/class-validator' },
          { text: 'Veelidate', link: '/v1/integrations/veelidate' },
          { text: 'Joi', link: '/v1/integrations/joi' }
        ]
      },
      // {
      //   text: 'Utils',
      //   items: [
      //     { text: 'clearText', link: '/utils/clearText' },
      //   ]
      // }
    ],

    editLink: {
      text: 'Edit',
      pattern: 'https://github.com/klawdyo/validation-br-docs/tree/main/src/:path',
    },

    lastUpdated: {
      text: 'Última atualização',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'short'
      }
    },


    returnToTopLabel: 'Topo',

    socialLinks: [
      { icon: 'github', link: Shared.github },
      { icon: 'npm', link: Shared.npm },
    ]
  }
});
