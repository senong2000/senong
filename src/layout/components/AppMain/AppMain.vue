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
            <transition name="fade-transform" mode="out-in">
                <div>
                    <component :is="Component" :key="key" />
                </div>
            </transition>
        </RouterView>
    </section>
</template>
<style lang="scss" scoped>
.appmain {
        
}

</style>