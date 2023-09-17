<script lang="ts" setup>
import { useRoute } from "vue-router"

const route = useRoute()

const key = computed(() => {
    return route.path
})

</script>
<template>
    <div class="canvas-main">
        <RouterView v-slot="{ Component }">
            <Transition name="fade" mode="out-in">
                <KeepAlive>
                    <component :is="Component" :key="key" />
                </KeepAlive>
            </Transition>
        </RouterView>
    </div>
</template>
<style lang="scss" scoped>
.canvas-main {
    display: flex;
    width: 100%;
}
</style>