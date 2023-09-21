<script lang="ts" setup>

import { useTheme } from '@/hooks/useTheme';
import { Favorites } from "@/types/projects";
import { getFavorites, setFavorites } from '@/utils/cache/localStorage'

const { activeThemeName } = useTheme();

const favoriteDialog = ref(false);

const favoritesRef = ref<Favorites[]>([]);

const title = ref<string>();
const desc = ref<string>();
const url = ref<string>();
const type = ref<string>()


const rules = {
    required: (value: any) => !!value || 'Required.',
}

const typeTab = ref('ALL');

const typeTabs = computed(() => {
    return ['ALL', ...types.value]
})

const types = computed(() => {
    return favoritesRef.value.map(i => i.title)
})

const favorites = computed(() => {
    if (typeTab.value === 'ALL') {
        return favoritesRef.value.map((i, idx) => ({
            index: idx,
            title: i.title,
            favoriteList: i.favoriteList
        }))
    } else {
        return favoritesRef.value.filter(i => i.title === typeTab.value).map((i, idx) => ({
            index: idx,
            title: i.title,
            favoriteList: i.favoriteList
        }))
    }



})

const favoriteList = computed(() => {
    return favorites.value.map(i => i.favoriteList.map((i, idx) => ({
        index: idx,
        title: i.title,
        desc: i.desc,
        url: i.url,
        cover: i.cover
    }))).flat()
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
        title: title.value,
        desc: desc.value,
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

    title.value = '';
    desc.value = '';
    url.value = '';
    type.value = '';
    favoriteDialog.value = false;

}

const toUrl = (url: string) => {
    console.log(url)
}
const importFavorites = () => {

}

</script>
<template>
    <div class="favorites">
        <v-row no-gutters>
            <v-col cols="2">
                <v-card :theme="activeThemeName" class="mr-2">
                    <v-layout>
                        <v-navigation-drawer absolute permanent>
                            <div class="d-flex flex-row">
                                <v-tabs v-model="typeTab" direction="vertical" align-tabs="start" w-full>
                                    <v-tab v-for="item, idx in typeTabs" :key="idx" :value="item">
                                        <span>{{ item }}</span>
                                    </v-tab>
                                </v-tabs>
                            </div>
                        </v-navigation-drawer>
                        <v-main h-80vh></v-main>
                    </v-layout>
                </v-card>
            </v-col>
            <v-col cols="10">
                <v-list flex :theme="activeThemeName">
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
                                                <v-text-field v-model="title" variant="solo" label="TITLE"></v-text-field>
                                            </v-col>
                                            <v-col cols="12">
                                                <v-text-field v-model="desc" variant="solo" label="DESC"></v-text-field>
                                            </v-col>
                                            <v-col cols="12">
                                                <v-text-field v-model="url" variant="solo" label="URL"
                                                    :rules="[rules.required]"></v-text-field>
                                            </v-col>
                                            <v-col cols="12">
                                                <v-combobox v-model="type" :items="types" variant="solo"
                                                    label="TYPE"></v-combobox>
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
                <div mt-2>

                </div>
                <v-row no-gutters :theme="activeThemeName" >
                    <v-col v-for="item, idx in favoriteList" :key="idx" cols="4">
                        <v-card :theme="activeThemeName" @click="toUrl(item.url)" class="flex! p-2! h-full" rounded="0">
                            <v-row flex-items-center w-full>
                                <v-col cols="3">
                                    <v-avatar color="surface-variant" class="mr-4"></v-avatar>
                                </v-col>
                                <v-col cols="9" flex flex-col>
                                    <span uppercase>{{ item.title }}</span>
                                    <span mt-1 text-1>{{ item.desc }}</span>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </div>
</template>
<style lang="scss" scoped>
.favorites {
    width: 60vw;

    .tab-active {}
}
</style>