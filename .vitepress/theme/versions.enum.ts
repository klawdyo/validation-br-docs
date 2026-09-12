export enum Versions {
  current = '2.0.0 (current)',
  legacy = '1.6.4 (legacy)',
}

// Fonte única da verdade: pra onde uma URL sem prefixo de versão (ex.: /cpf)
// deve redirecionar. Ver src/404.md.
export const CURRENT_VERSION_PATH = '/v2';
