<script lang="ts" setup>

import { useTheme } from '@/hooks/useTheme';

const router = useRouter()
const toSecret = () => {
    router.push('/blog/secret');
}

const { activeThemeName } = useTheme()


</script>
<template>
    <footer class="footer">
        <v-card :theme="activeThemeName">
            <v-chip variant="text">
                <span @click="toSecret">
                    <span font-size-2>2023 </span> - ∞
                </span>
            </v-chip>
            <v-btn variant="plain" size="small" href="https://beian.miit.gov.cn/" target="_blank">@Senong</v-btn>
            <v-btn variant="plain" size="small" href="https://beian.miit.gov.cn/" target="_blank">粤ICP备2023134767号-1</v-btn>
        </v-card>
    </footer>
</template>
<style lang="scss" scoped>
.footer {
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;

    .code-overlay {
        z-index: 999;
    }

    .v-card {
        background-color: transparent;
        border: 0;
        box-shadow: none;
    }

    .v-chip {
        padding: 0;
        margin: 0 .5rem;
    }

    .v-btn {
        background-color: transparent !important;
        padding: 0;
        margin: 0 0.5rem;
    }
}
</style>
