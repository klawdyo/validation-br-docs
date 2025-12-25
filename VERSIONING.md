# Versioning da Documentação

A documentação do `validation-br` agora suporta múltiplas versões:

## Estrutura de Diretórios

```
docs/
├── .vitepress/          # Configuração v2.0
│   ├── config.mts       # Configuração principal
│   ├── components/
│   │   └── VersionSelector.vue
│   └── theme/
│       ├── index.ts
│       └── custom.css
├── src/                 # Documentação v2.0
│   ├── index.md
│   ├── documents/
│   └── ...
└── v1/                  # Documentação v1.0
    ├── .vitepress/
    │   └── config.mts
    └── src/
        ├── index.md
        └── documents/
```

## Versões

### v2.0 (Atual)

- **Localização:** `/docs/src/`
- **URL:** `/` (raiz)
- **Características:** 
  - Classes com métodos completos
  - Máscaras para documentos
  - Utilitários avançados
  - Exemplos detalhados com labels

### v1.0 (Legada)

- **Localização:** `/docs/v1/src/`
- **URL:** `/v1/` (subdiretório)
- **Características:**
  - Apenas validação booleana (isCPF, isCNPJ, etc.)
  - API simplificada
  - Documentação básica

## Como executar

### Desenvolvimento v2.0
```bash
cd docs
npm run docs:dev
```

### Desenvolvimento v1.0
```bash
cd docs/v1
npm run docs:dev
```

### Build

Ambas as versões são construídas juntas no CI/CD. O seletor de versão permite navegar entre elas.

## Adicionando novas versões

1. Crie um novo diretório `docs/vX/` (ex: `v3/`)
2. Copie a estrutura de `.vitepress` e `src/`
3. Atualize o `nav` em `docs/.vitepress/config.mts` para incluir a nova versão
4. Configure o roteamento conforme necessário

## Seletor de Versão

O seletor aparece no navbar e permite:
- Alternar entre v1.0 e v2.0
- Navegação preserva o caminho (se possível)
- Componente: `VersionSelector.vue`
