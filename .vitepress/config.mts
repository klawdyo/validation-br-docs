import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: "src",
  
  title: "validation-br v2.0",
  description: "Validação de documentos do Brasil",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' },
      { 
        text: 'Versão',
        items: [
          { text: 'v2.0 (atual)', link: '/' },
          { text: 'v1.0 (legada)', link: '/v1/' }
        ]
      }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      },
      {
        text: 'Documentos',
        items: [
          { text: 'CPF', link: '/documents/cpf' },
          { text: 'CNPJ', link: '/documents/cnpj' },
          { text: 'CNH', link: '/documents/cnh' },
          { text: 'Placa (CarPlate)', link: '/documents/carplate' },
          { text: 'PIS / PASEP', link: '/documents/pis-pasep' },
          { text: 'NUP17', link: '/documents/nup17' },
          { text: 'Processo Judicial', link: '/documents/judicial-process' },
          { text: 'RENAVAM', link: '/documents/renavam' },
          { text: 'Título de Eleitor', link: '/documents/tituloEleitor' },
          { text: 'Cód. Rastreamento Postal', link: '/documents/postal-track-code' },
          { text: 'PIX Key', link: '/documents/pix-key' },
          { text: 'PIX Copy/Paste (BETA)', link: '/documents/pix-copy-paste' }
        ]
      },
      {
        text: 'Utils',
        items: [
          { text: 'Utils (funções)', link: '/documents/utils' },
          { text: 'UF', link: '/documents/uf' },
          { text: 'CEP', link: '/documents/cep' },
          { text: 'UUID (suporte PIX)', link: '/documents/uuid' },
          { text: 'Email (suporte PIX)', link: '/documents/email' },
          { text: 'Telefone (suporte PIX)', link: '/documents/phone' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
