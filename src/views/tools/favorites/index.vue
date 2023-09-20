<script lang="ts" setup>

import { useTheme } from '@/hooks/useTheme';
import { Favorite, Favorites } from "@/types/projects";
import { getFavorites, setFavorites } from '@/utils/cache/localStorage'

const { activeThemeName } = useTheme();

const favoriteDialog = ref(false);

const favoritesRef = ref<Favorites[]>([]);

const title = ref<string>();
const desc = ref<string>();
const url = ref<string>();
const type = ref<string>()

const types = computed(() => {
    return favoritesRef.value.map(i => ({
        type: i.title
    }))
})

const favorites = computed(() => {
    return favoritesRef.value.map((i, idx) => ({
        index: idx,
        title: i.title,
        favoriteList: i.favoriteList
    }))
})

const favoriteList = computed(() => {
    return favorites.value.map(i => i.favoriteList.map((i, idx) => ({
        index: idx,
        title: i.title,
        desc: i.desc,
        url: i.url,
        cover: i.cover
    })))
})


onMounted(() => {
    initFavorites();
})

const initFavorites = () => {
    if (getFavorites() && getFavorites().length > 0) favoritesRef.value = getFavorites();
}

const addFavorite = async () => {

    console.log(title.value, desc.value, url.value, type.value)

    if (url.value === undefined) return;

    const tempFavorite = {
        title: '',
        desc: '',
        url: url.value,
        cover: ''
    }

    if (favorites.value.find(i => i.title === type.value) === undefined) {
        const Favorites = {
            title: type.value as string,
            favoriteList: [],
        }
        favoritesRef.value.unshift(Favorites)
    }

    favoritesRef.value.find(i => i.title === type.value)!.favoriteList.unshift(tempFavorite);

    await setFavorites(favorites.value);

    favoriteDialog.value = false;

}
const importFavorites = () => {

}

</script>
<template>
    <div class="favorites">
        <v-list flex :theme="activeThemeName" class="b-rd-4!2">
            <v-list-item>
                <v-dialog v-model="favoriteDialog" persistent class="w-128">
                    <template v-slot:activator="{ props }">
                        <v-btn v-bind="props">
                            新建收藏
                        </v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="text-h5">Favorite</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field v-model="title" variant="solo" label="title" required></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field v-model="desc" variant="solo" label="desc"></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field v-model="url" variant="solo" label="url" required></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-combobox v-model="type" :items="types" variant="solo" label="Types"></v-combobox>
                                    </v-col>

                                </v-row>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn variant="text" @click="favoriteDialog = false">
                                Close
                            </v-btn>
                            <v-btn variant="text" @click="addFavorite">
                                SAVE
                            </v-btn>
                        </v-card-actions>

                    </v-card>
                </v-dialog>
            </v-list-item>
            <v-list-item>
                <v-btn @click="importFavorites">
                    导入收藏夹
                </v-btn>
            </v-list-item>

        </v-list>

        <v-row no-gutters :theme="activeThemeName">
            <v-col v-for="item, idx in favoriteList" :key="idx">
                <v-card :theme="activeThemeName">
                    {{ item }}
                </v-card>
            </v-col>
        </v-row>

    </div>
</template>
<style lang="scss" scoped>
.favorites {
    width: 60vw
}
</style>