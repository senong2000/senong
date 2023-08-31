<script lang="ts" setup>
import { computed } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()

const key = computed(() => {
    return route.path
})

</script>
<template>
    <section class="appmain">
        <RouterView v-slot="{ Component }">
            <Transition name="slide-fade" mode="out-in">
                <KeepAlive>
                    <component :is="Component" :key="key" />
                </KeepAlive>
            </Transition>
        </RouterView>
    </section>
</template>
<style lang="scss" scoped></style>