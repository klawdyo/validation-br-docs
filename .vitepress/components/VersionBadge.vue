<template>
    <Badge v-if="version" :text="version" type="tip" />

</template>

<script setup lang="ts">
import { useRoute } from 'vitepress';
import { computed } from 'vue';
import { Versions } from '../theme/versions.enum';


const versions = structuredClone(Versions);

const route = useRoute()
const version = computed(() => {
    if (route.path.match(/^\/v1(\/|$)/)) return Versions.legacy;
    if (route.path !== '/' && route.path !== '/index.html') return Versions.current;
});

</script>

<style scoped></style>