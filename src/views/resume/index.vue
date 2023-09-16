<script lang="ts" setup>
import { useTheme } from '@/hooks/useTheme';
const { activeThemeName } = useTheme()

</script>
<template>
    <div class="resume" :theme="activeThemeName">
        
    </div>
</template>
<style lang="scss" scoped></style>