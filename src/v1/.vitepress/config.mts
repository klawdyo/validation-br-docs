import { defineConfig } from 'vitepress';
import Shared from '../../../.vitepress/shared';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  // srcDir: '.',
  outDir: '../../../.vitepress/dist/v1',


  title: Shared.name,
  description: Shared.description,

  themeConfig: {
    nav: [
      { text: Shared.versions.current, link: '/v1/' },
      { text: Shared.versions.next, link: '/v2/' }
    ],

    sidebar: [
      {
        text: 'Documentos',
        items: [
          { text: 'CPF', link: '/v1/cpf' },
          { text: 'CNPJ', link: '/v1/cnpj' },
          { text: 'CNH', link: '/v1/cnh' },
          { text: 'CEP', link: '/v1/cep' }
        ]
      }
    ],
  }
});
