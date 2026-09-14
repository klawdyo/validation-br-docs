---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "validation-br"
  text: "Valide documentos brasileiros sem reinventar a roda."
  tagline: CPF, CNPJ, CNH, PIS/PASEP, Título de Eleitor, RENAVAM, processos judiciais, protocolos do governo e rastreio dos Correios — tudo com uma API orientada a classes e zero dependências.
  actions:
    - theme: brand
      text: v2.0.0 (current)
      link: /v2/install
    - theme: alt
      text: Ver validadores
      link: '#o-que-valida'
    - theme: alt
      text: v1.6.4 (legacy)
      link: /v1

features:
  - icon: 🥇
    title: CNPJ alfanumérico
    details: A primeira biblioteca de validação a implementar o CNPJ alfanumérico
  - icon: 🧩
    title: Uma classe por documento
    details: "new CPF(valor) já valida, normaliza e formata"
  - icon: 🛠️
    title: API Simples
    details: Funções booleanas (isCPF, isCNPJ etc.) ou classes, você escolhe
  - icon: 📦
    title: Funções auxiliares
    details: normalização, máscara e dados fake
---

<HomeSection eyebrow="Em ação" title="Simples assim">

<HeroCode :code="heroCode" />

</HomeSection>

<HomeSection>

<AlphaHighlight
  eyebrow="Primeira no Brasil"
  title="A primeira biblioteca com suporte ao CNPJ alfanumérico"
  :code="alphaCode"
  link-text="Ver documentação do CNPJ"
  link-href="/v2/cnpj"
>
  A partir da <a href="https://www.gov.br/receitafederal/pt-br/assuntos/noticias/2024/maio/receita-federal-preve-a-utilizacao-de-letras-no-numero-do-cnpj-a-partir-de-2026" target="_blank" rel="noopener">Nota Técnica conjunta COCAD/SUARA/RFB nº 49</a>, de 14 de maio de 2024, os números de CNPJ poderão conter letras. A mudança entra em uso em 2026 — e o <code>validation-br</code> já valida os dois formatos.
</AlphaHighlight>

</HomeSection>

<HomeSection eyebrow="O que valida" title="Vinte tipos de documento, uma API só" id="o-que-valida">

<DocGrid initial="cpf" :docs="docsV2" />

</HomeSection>

<script setup lang="ts">
const heroCode = `import { isCPF } from 'validation-br';
import { CPF } from 'validation-br/cpf';

// Modo rápido
isCPF('098.765.432-10'); // true

// Modo Value-Object
const cpf = new CPF('098.765.432-10');
cpf.mask(); // '098.765.432-10'`

const alphaCode = `import { CNPJ } from 'validation-br/cnpj';

// Gera um CNPJ alfanumérico de exemplo
CNPJ.fake({ alphanumeric: true }).mask();
// -> 'WX.BC2.1FX/0001-00'

new CNPJ('WX.BC2.1FX/0001-00').value;
// -> 'WXBC21FX000100'`

const docsV2 = [
  {
    id: 'cpf',
    tag: 'CPF',
    title: 'CPF',
    details: 'Cálculo de dígito verificador, máscara e dados fake para testes.',
    href: '/v2/cpf',
    code: `import { isCPF } from 'validation-br';
import { CPF } from 'validation-br/cpf';

// Modo rápido
isCPF('280.012.389-38'); // -> true

// Modo Value-Object
const cpf = new CPF('280.012.389-38');
cpf.value;      // -> '28001238938'
cpf.toString(); // -> '28001238938'
cpf.mask();     // -> '280.012.389-38'`,
  },
  {
    id: 'cnpj',
    tag: 'CNPJ',
    title: 'CNPJ',
    details: 'Numérico e alfanumérico — suporte ao formato que entra em vigor em 2026.',
    href: '/v2/cnpj',
    code: `import { isCNPJ } from 'validation-br';
import { CNPJ } from 'validation-br/cnpj';

// Modo rápido
isCNPJ('55.585.709/0001-98'); // -> true

// Modo Value-Object
const cnpj = new CNPJ('55.585.709/0001-98');
cnpj.value;      // -> '55585709000198'
cnpj.toString(); // -> '55585709000198'
cnpj.mask();     // -> '55.585.709/0001-98'`,
  },
  {
    id: 'cnh',
    tag: 'CNH',
    title: 'CNH',
    details: 'Validação da Carteira Nacional de Habilitação.',
    href: '/v2/cnh',
    code: `import { isCNH } from 'validation-br';
import { CNH } from 'validation-br/cnh';

// Modo rápido
isCNH('62472927637'); // -> true

// Modo Value-Object
const cnh = new CNH('624729276-37');
cnh.value;      // -> '62472927637'
cnh.toString(); // -> '62472927637'
cnh.mask();     // -> '624729276-37'`,
  },
  {
    id: 'pis',
    tag: 'PIS',
    title: 'PIS / PASEP / NIS / NIT',
    details: 'Um único algoritmo para os quatro tipos de cadastro.',
    href: '/v2/pis-pasep',
    code: `import { isPIS } from 'validation-br';
import { PIS } from 'validation-br/pis-pasep';

// Modo rápido
isPIS('712.82677.38-0'); // -> true

// Modo Value-Object
const pis = new PIS('712.82677.38-0');
pis.value;      // -> '71282677380'
pis.toString(); // -> '71282677380'
pis.mask();     // -> '712.82677.38-0'`,
  },
  {
    id: 'titulo',
    tag: 'TituloEleitor',
    title: 'Título de Eleitor',
    details: 'Validação do título eleitoral e seu dígito verificador.',
    href: '/v2/tituloEleitor',
    code: `import { isTituloEleitor } from 'validation-br';
import { TituloEleitor } from 'validation-br/tituloEleitor';

// Modo rápido
isTituloEleitor('5250.2888.1694'); // -> true

// Modo Value-Object
const t = new TituloEleitor('5250.2888.1694');
t.value;      // -> '525028881694'
t.toString(); // -> '525028881694'
t.mask();     // -> '5250.2888.1694'`,
  },
  {
    id: 'nup17',
    tag: 'NUP17',
    title: 'NUP-17',
    details: 'Protocolo Unificado do Governo Federal, usado por todos os órgãos do executivo.',
    href: '/v2/nup17',
    code: `import { isNUP17 } from 'validation-br';
import { NUP17 } from 'validation-br/nup17';

// Modo rápido
isNUP17('23037.001462/2021-65'); // -> true

// Modo Value-Object
const nup = new NUP17('23037.001462/2021-65');
nup.value;      // -> '23037001462202165'
nup.toString(); // -> '23037001462202165'
nup.mask();     // -> '23037.001462/2021-65'`,
  },
  {
    id: 'judicial',
    tag: 'JudicialProcess',
    title: 'Processo Judicial',
    details: 'Padrão nacional adotado em 2010: cível, eleitoral, militar e mais.',
    href: '/v2/judicial-process',
    code: `import { isJudicialProcess } from 'validation-br';
import { JudicialProcess } from 'validation-br/judicial-process';

// Modo rápido
isJudicialProcess('0002080-25.2012.5.15.0049'); // -> true

// Modo Value-Object
const p = new JudicialProcess('0002080-25.2012.5.15.0049');
p.value;      // -> '00020802520125150049'
p.toString(); // -> '00020802520125150049'
p.mask();     // -> '0002080-25.2012.5.15.0049'
p.year;       // -> '2012'
p.court;      // -> '5'
p.subCourt;   // -> '15'
p.origin;     // -> '0049'`,
  },
  {
    id: 'postal',
    tag: 'PostalTrackCode',
    title: 'Rastreio dos Correios',
    details: 'Códigos de rastreamento de objetos postais registrados.',
    href: '/v2/postal-track-code',
    code: `import { isPostalTrackCode } from 'validation-br';
import { PostalTrackCode } from 'validation-br/postal-track-code';

// Modo rápido
isPostalTrackCode('JT718252423BR'); // -> true

// Modo Value-Object
const p = new PostalTrackCode('JT718252423BR');
p.value;      // -> 'JT718252423BR'
p.toString(); // -> 'JT718252423BR'
p.mask();     // -> 'JT718252423BR'`,
  },
  {
    id: 'renavam',
    tag: 'Renavam',
    title: 'RENAVAM',
    details: 'Registro Nacional de Veículos Automotores.',
    href: '/v2/renavam',
    code: `import { isRenavam } from 'validation-br';
import { Renavam } from 'validation-br/renavam';

// Modo rápido
isRenavam('9505984597-6'); // -> true

// Modo Value-Object
const r = new Renavam('9505984597-6');
r.value;      // -> '95059845976'
r.toString(); // -> '95059845976'
r.mask();     // -> '9505984597-6'`,
  },
  {
    id: 'phone',
    tag: 'Phone',
    title: 'Telefone',
    details: 'Fixos e celulares, com ou sem DDD.',
    href: '/v2/phone',
    code: `import { isPhone } from 'validation-br';
import { Phone } from 'validation-br/phone';

// Modo rápido
isPhone('(11) 91234-5678'); // -> true

// Modo Value-Object
const p = new Phone('(11) 91234-5678');
p.value;      // -> '+5511912345678'
p.toString(); // -> '+5511912345678'
p.mask();     // -> '11 912345678'`,
  },
  {
    id: 'cep',
    tag: 'CEP',
    title: 'CEP',
    details: 'Código postal — sabe a qual UF cada faixa de CEP pertence.',
    href: '/v2/cep',
    code: `import { isCEP } from 'validation-br';
import { CEP } from 'validation-br/cep';

// Modo rápido
isCEP('01310-100'); // -> true

// Modo Value-Object
const cep = new CEP('01310-100');
cep.value;      // -> '01310100'
cep.toString(); // -> '01310100'
cep.mask();     // -> '01310-100'`,
  },
  {
    id: 'uf',
    tag: 'UF',
    title: 'UF',
    details: 'Sigla de estado (SP, RJ, MG...) usada em endereços e documentos.',
    href: '/v2/uf',
    code: `import { isUF } from 'validation-br';
import { UF } from 'validation-br/uf';

// Modo rápido
isUF('SP'); // -> true

const uf = new UF('SP');
uf.value;         // -> 'SP'
uf.toString();    // -> 'SP'
uf.mask();        // -> 'SP'
uf.short;         // -> 'SP'
uf.name;          // -> 'São Paulo'

// static helpers
UF.getList().length; // -> 27
UF.getRandom().short;`,
  },
  {
    id: 'pixkey',
    tag: 'PixKey',
    title: 'Chave Pix',
    details: 'Reconhece automaticamente CPF, CNPJ, e-mail, telefone ou chave aleatória (EVP).',
    href: '/v2/pix-key',
    code: `import { isPixKey } from 'validation-br';
import { PixKey } from 'validation-br/pix-key';

// Modo rápido
isPixKey('user@example.com'); // -> true

// Modo Value-Object
const pk = new PixKey('user@example.com');
pk.value;      // -> 'user@example.com'
pk.toString(); // -> 'user@example.com'
pk.mask();     // -> 'user@example.com'
pk.type;       // -> 'email'`,
  },
  {
    id: 'boleto',
    tag: 'Boleto',
    title: 'Boleto',
    details: 'Linha digitável (47 dígitos) e código de barras (44 dígitos), com conversão entre os dois.',
    href: '/v2/boleto',
    code: `import { isBoleto } from 'validation-br';
import { Boleto } from 'validation-br/boleto';

const linha = '34198.53241 94297.019419 40804.574073 7 16770000123456';

// Modo rápido
isBoleto(linha); // -> true

// Modo Value-Object
const boleto = new Boleto(linha);
boleto.value;      // -> '34198532419429701941940804574073716770000123456'
boleto.toString(); // -> '34198532419429701941940804574073716770000123456'
boleto.mask();     // -> '34198.53241 94297.019419 40804.574073 7 16770000123456'`,
  },
  {
    id: 'caepf',
    tag: 'CAEPF',
    title: 'CAEPF',
    details: 'Cadastro de atividade econômica de pessoa física sem CNPJ (produtor rural etc.).',
    href: '/v2/caepf',
    code: `import { isCAEPF } from 'validation-br';
import { CAEPF } from 'validation-br/caepf';

// Modo rápido
isCAEPF('411.422.600/001-01'); // -> true

// Modo Value-Object
const caepf = new CAEPF('411.422.600/001-01');
caepf.value;      // -> '41142260000101'
caepf.toString(); // -> '41142260000101'
caepf.mask();     // -> '411.422.600/001-01'`,
  },
  {
    id: 'carplate',
    tag: 'CarPlate',
    title: 'Placa de veículo',
    details: 'Formato antigo (AAA-0000) e padrão Mercosul (AAA0A00).',
    href: '/v2/carplate',
    code: `import { isCarPlate } from 'validation-br';
import { CarPlate } from 'validation-br/carplate';

// Modo rápido
isCarPlate('ABC-1D23'); // -> true

// Modo Value-Object
const plate = new CarPlate('ABC-1D23');
plate.value;      // -> 'ABC1D23'
plate.toString(); // -> 'ABC1D23'
plate.mask();     // -> 'ABC-1D23'`,
  },
  {
    id: 'cbisinter',
    tag: 'CBISinter',
    title: 'CBI / SINTER',
    details: 'Código Imobiliário Brasileiro — identificador único nacional de um imóvel.',
    href: '/v2/cbi_sinter',
    code: `import { isCBISinter } from 'validation-br';
import { CBISinter } from 'validation-br/cbi_sinter';

// Modo rápido
isCBISinter('41DNR433'); // -> true

// Modo Value-Object
const cib = new CBISinter('41DNR433');
cib.value;      // -> '41DNR433'
cib.toString(); // -> '41DNR433'
cib.mask();     // -> '41DNR43-3'`,
  },
  {
    id: 'certidao',
    tag: 'Certidao',
    title: 'Certidão',
    details: 'Matrícula de certidão de cartório (nascimento, casamento, óbito) no padrão CNJ.',
    href: '/v2/certidao',
    code: `import { isCertidao } from 'validation-br';
import { Certidao } from 'validation-br/certidao';

const numero = '104539015520131000120210000123-21';

// Modo rápido
isCertidao(numero); // -> true

// Modo Value-Object
const certidao = new Certidao(numero);
certidao.value;      // -> '10453901552013100012021000012321'
certidao.toString(); // -> '10453901552013100012021000012321'
certidao.mask();     // -> '104539 01 55 2013 1 00012 021 0000123 21'`,
  },
  {
    id: 'email',
    tag: 'Email',
    title: 'E-mail',
    details: 'Validação de formato de e-mail — também usada internamente pelo PixKey.',
    href: '/v2/email',
    code: `import { isEmail } from 'validation-br';
import { Email } from 'validation-br/email';

// Modo rápido
isEmail('user@example.com'); // -> true

// Modo Value-Object
const email = new Email('user@example.com');
email.value;      // -> 'user@example.com'
email.toString(); // -> 'user@example.com'
// email.mask() lança: Email não tem máscara`,
  },
  {
    id: 'uuid',
    tag: 'UUID',
    title: 'UUID',
    details: 'Identificadores UUID — também usados pelo PixKey nas chaves aleatórias (EVP).',
    href: '/v2/uuid',
    code: `import { isUUID } from 'validation-br';
import { UUID } from 'validation-br/uuid';

const id = '550e8400-e29b-41d4-a716-446655440000';

// Modo rápido
isUUID(id); // -> true

// Modo Value-Object
const uuid = new UUID(id);
uuid.value;      // -> '550e8400e29b41d4a716446655440000'
uuid.toString(); // -> '550e8400e29b41d4a716446655440000'
uuid.mask();     // -> '550e8400-e29b-41d4-a716-446655440000'`,
  },
]
</script>
