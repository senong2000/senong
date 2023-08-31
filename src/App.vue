<script setup lang="ts">
import { useTheme } from "@/hooks/useTheme"
const { initTheme } = useTheme()
initTheme()
</script>

<template>
  <RouterView></RouterView>
</template>

<style scoped></style>
