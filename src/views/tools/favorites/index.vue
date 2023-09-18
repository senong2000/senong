<script lang="ts" setup>

import { useTheme } from '@/hooks/useTheme';
import { Favorite } from "@/types/projects";
import { getFavorites, setFavorites } from '@/utils/cache/localStorage'

const { activeThemeName } = useTheme()

const favoritesRef = ref<Favorite[]>([])

onMounted(() => {
    initFavorites()
})

const initFavorites = () => {
    favoritesRef.value = getFavorites()
}



const favorites = computed(() => {
    return favoritesRef.value
})

const addFavorites = () => {

}

</script>
<template>
    <div class="favorites">
        <v-btn @click="addFavorites">

        </v-btn>
        <v-row no-gutters :theme="activeThemeName">
            <v-col v-for="item, idx in favorites" :key="idx">
                {{ item }}
            </v-col>
        </v-row>
    </div>
</template>
<style lang="scss" scoped>
.favorites {
    width: 60vw
}
</style>