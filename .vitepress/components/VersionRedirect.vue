<template>
  <div class="vp-doc" style="max-width:640px;margin:80px auto;text-align:center;">
    <template v-if="redirecting">
      <h2>Redirecionando…</h2>
      <p>Levando você para a versão atual da documentação.</p>
    </template>
    <template v-else>
      <h2>Página não encontrada</h2>
      <p>O endereço acessado não existe. <a href="/">Voltar para a página inicial</a></p>
    </template>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { CURRENT_VERSION_PATH } from '../theme/versions.enum'

const redirecting = ref(false)

onMounted(() => {
  const { pathname, search, hash } = window.location
  const alreadyVersioned = /^\/(v1|v2)(\/|$)/.test(pathname)

  if (!alreadyVersioned) {
    redirecting.value = true
    window.location.replace(`${CURRENT_VERSION_PATH}${pathname}${search}${hash}`)
  }
})
</script>
