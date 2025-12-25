---
layout: home
hero:
  name: "Validation BR"
  text: "Validação de documentos do Brasil"
  tagline: "v1.6.0"
  actions:
    - theme: brand
      text: Instalação
      link: /v1/install
    # - theme: alt
    #   text: Iniciar
    #   link: /v1/install

features:
  - icon: ✓
    title: CPF
    link: /v1/cpf
    
  - icon: 🛠️
    title: API Simples
    details: Funções booleanas (isCPF, isCNPJ, etc.)
  - icon: 📦
    title: Leve
    details: Sem dependências externas

---



<script setup lang="ts">
  import Shared from '../../../.vitepres/shared.ts'

  
  const meupa = 'asd';
  const apiURL = import.meta.env.VITE_API_URL


</script>