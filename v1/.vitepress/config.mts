import { defineConfig } from 'vitepress'

export default defineConfig({
  srcDir: 'src',
  
  title: 'validation-br v1.0',
  description: 'Validação de documentos - Versão 1.0 (Legada)',
  
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'v2.0 (atual)', link: '/../' }
    ],

    sidebar: [
      {
        text: 'Documentos',
        items: [
          { text: 'CPF', link: '/documents/cpf' },
          { text: 'CNPJ', link: '/documents/cnpj' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/klawdyo/validation-br' }
    ]
  }
})
