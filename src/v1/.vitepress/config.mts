import { defineConfig } from 'vitepress'

export default defineConfig({
  srcDir: '.',
  outDir: '../../../.vitepress/dist/v1',
  
  title: 'validation-br v1.0',
  description: 'Validação de documentos - Versão 1.0 (Legada)',
  
  themeConfig: {
    nav: [
      { text: 'Home', link: '/v1/' },
      { text: 'v2.0 (atual)', link: '/' }
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

    socialLinks: [
      { icon: 'github', link: 'https://github.com/klawdyo/validation-br' }
    ]
  }
})
