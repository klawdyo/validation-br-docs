import path from 'path';
import { DefaultTheme } from 'vitepress';


export const sideBar: DefaultTheme.SidebarItem[] = [
      // { text: 'Home', link: '/v1' },
      { text: 'Instalação', link: '/v1/' },
      // { text: path.resolve(__dirname, '../../../../', '.vitepress'), link: '/v1/install' },

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
    ]



// import { defineConfig } from 'vitepress';
// import Shared from '../../../.vitepress/shared';

// export default defineConfig({
//   // srcDir: '.',
//   outDir: '../../../.vitepress/dist/v1',
  
 



//   title: Shared.name + '23',
//   description: Shared.description,
//   base: '/v1/',

//   themeConfig: {
//     nav: [
//       { text: Shared.versions.current, link: '/v1/' },
//       { text: Shared.versions.next, link: '/v1/' }
//     ],

//     sidebar: [
//       { text: 'Home', link: '/v1' },
//       { text: 'Instalação', link: '/v1/install' },

//       {
//         text: 'Documentos',
//         items: [
//           { text: 'CPF', link: '/v1/cpf' },
//           { text: 'CNPJ', link: '/v1/cnpj' },
//           { text: 'CNH', link: '/v1/cnh' },
//           { text: 'Placa (CarPlate)', link: '/v1/carplate' },
//           { text: 'PIS / PASEP', link: '/v1/pis-pasep' },
//           { text: 'NUP17', link: '/v1/nup17' },
//           { text: 'Processo Judicial', link: '/v1/judicial-process' },
//           { text: 'RENAVAM', link: '/v1/renavam' },
//           { text: 'Título de Eleitor', link: '/v1/tituloEleitor' },
//           { text: 'Cód. Rastreamento Postal', link: '/v1/postal-track-code' },
//         ]
//       },

//       {
//         text: 'Integração',
//         items: [
//           { text: 'Yup', link: '/v1/integrations/yup' },
//           { text: 'Zod', link: '/v1/integrations/zod' },
//           { text: 'Class Validator', link: '/v1/integrations/class-validator' },
//           { text: 'Veelidate', link: '/v1/integrations/veelidate' },
//           { text: 'Joi', link: '/v1/integrations/joi' }
//         ]
//       },
//     ],
//   }
// });
