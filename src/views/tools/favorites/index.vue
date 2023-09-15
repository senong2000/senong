<script lang="ts" setup>

import { useTheme } from '@/hooks/useTheme';
import { Favorite } from "@/types/favorites"
import { getFavorites, setFavorites } from '@/utils/cache/localStorage'

const { activeThemeName } = useTheme()

const favorites = ref<Favorite[]>([])

onMounted(() => {
    initFavorites()
})

const initFavorites = () => {
    favorites.value = getFavorites()
}

</script>
<template>
    <div class="favorites">
        <v-row no-gutters :theme="activeThemeName">
            <v-col v-for="item, idx in favorites" :key="idx">

            </v-col>
        </v-row>
    </div>
</template>
<style lang="scss" scoped>
.favorites {
    width: 60vw
}
</style>