import { DefaultTheme } from 'vitepress';


export const sideBar: DefaultTheme.SidebarItem[] = [
      { text: 'Home', link: '/v2' },
      { text: 'Instalação', link: '/v2/install' },

      {
        text: 'Documentos',
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
        ]
      },

      {
        text: 'Integração',
        items: [
          { text: 'Yup', link: '/v2/integrations/yup' },
          { text: 'Zod', link: '/v2/integrations/zod' },
          { text: 'Class Validator', link: '/v2/integrations/class-validator' },
          { text: 'Veelidate', link: '/v2/integrations/veelidate' },
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
