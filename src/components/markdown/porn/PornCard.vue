<script lang="ts" setup>
const router = useRouter()
const props = defineProps({
    cover: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    route: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: false,
    }
})

</script>
<template>
    <div class="porn-card">
        <v-card class="mx-auto" :key="props.title" @click="router.push(props.route)">
            <v-img :src="props.cover" aspect-ratio="16/9" cover >
            </v-img>
            <v-card-actions>
                <v-card-title class="text-black" v-text="props.title"></v-card-title>
                <v-spacer></v-spacer>
                <v-btn size="large" color="surface-variant" variant="plain" icon="fas fa-forward"></v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>
<style lang="scss" scoped></style>