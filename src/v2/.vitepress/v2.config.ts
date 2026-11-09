import { DefaultTheme } from 'vitepress';


export const sideBar: DefaultTheme.SidebarItem[] = [
      { text: 'Home', link: '/v2' },
      { text: 'Instalação', link: '/v2/install' },
      { text: 'Migrando da 1.x', link: '/v2/migration' },

      {
        text: 'Documentos principais',
        items: [
          { text: 'CPF', link: '/v2/cpf' },
          { text: 'CNPJ', link: '/v2/cnpj' },
          { text: 'CNH', link: '/v2/cnh' },
          { text: 'Placa (CarPlate)', link: '/v2/carplate' },
          { text: 'PIS / PASEP', link: '/v2/pis-pasep' },
          { text: 'NUP17', link: '/v2/nup17' },
          { text: 'Processo Judicial', link: '/v2/judicial-process' },
          { text: 'RENAVAM', link: '/v2/renavam' },
          { text: 'Título de Eleitor', link: '/v2/tituloEleitor' },
          { text: 'Cód. Rastreamento Postal', link: '/v2/postal-track-code' },
          { text: 'Boleto', link: '/v2/boleto' },
          { text: 'CAEPF', link: '/v2/caepf' },
          { text: 'CEP', link: '/v2/cep' },
          { text: 'Certidão', link: '/v2/certidao' },
          { text: 'CBI Sinter', link: '/v2/cbi_sinter' },
          { text: 'Chave Pix', link: '/v2/pix-key' },
          { text: 'Pix Copia e Cola', link: '/v2/pix-copy-paste' },
        ]
      },

      {
        text: 'Validações auxiliares',
        items: [
          { text: 'E-mail', link: '/v2/email' },
          { text: 'Telefone', link: '/v2/phone' },
          { text: 'UUID', link: '/v2/uuid' },
          { text: 'UF', link: '/v2/uf' },
        ]
      },

      {
        text: 'Integração',
        items: [
          { text: 'Yup', link: '/v2/integrations/yup' },
          { text: 'Zod', link: '/v2/integrations/zod' },
          { text: 'Class Validator', link: '/v2/integrations/class-validator' },
          { text: 'Vuelidate', link: '/v2/integrations/vuelidate' },
          { text: 'Joi', link: '/v2/integrations/joi' }
        ]
      },
    ]

// export default defineConfig({
//   // srcDir: '.',
//   outDir: '../../../.vitepress/dist/v2',

//   themeConfig: {
   

//     sidebar: ,
//   }
// });
