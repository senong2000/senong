<script lang="ts" setup>

import { useTheme } from '@/hooks/useTheme';
import { VOtpInput } from 'vuetify/labs/components';

const route = useRoute()
const router = useRouter()

const code = ref('')
const loading = ref(false)
const codeOverlay = ref<boolean>(false)

const onFinish = () => {
    loading.value = true

    setTimeout(() => {
        loading.value = false
        codeOverlay.value = false
        if (code.value === '000221') {
            code.value = ''
            router.push('/blog/secret');
        }

    }, 2000)
}

const overlay = () => {
    if (route.name === 'blog') codeOverlay.value = !codeOverlay.value
}

const { activeThemeName } = useTheme()



</script>
<template>
    <footer class="footer proseflex">
        <span class="text-sm op50 ">2023 - PRESENT © <span @click="overlay" pointer-events-auto
                cursor-default>Senong</span></span>
        <div class="flex-auto" />

        <v-overlay flex flex-items-center flex-justify-center class="code-overlay" v-model="codeOverlay"
            :theme="activeThemeName">
            <v-otp-input v-model="code" :loading="loading" @finish="onFinish" variant="solo" class="code-overlay-input"
                autofocus ></v-otp-input>
        </v-overlay>
    </footer>
</template>
<style lang="scss" scoped>
.footer {
    position: fixed;
    bottom: 0;
    right: 0;
    pointer-events: none;

    .code-overlay {
        z-index: 999;

        &-input {}
    }
}
</style>