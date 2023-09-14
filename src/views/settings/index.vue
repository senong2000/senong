<script lang="ts" setup>
import { useTheme } from '@/hooks/useTheme';
import { getTodoSpaces } from "@/utils/cache/localStorage"

const { activeThemeName } = useTheme()


const backups = () => {
    console.log(getTodoSpaces())
}

</script>
<template>
    <div class="settings">
        <v-row no-gutters :theme="activeThemeName">
            <v-col>
                <v-btn @click="backups">
                    备份数据信息
                </v-btn>
            </v-col>
        </v-row>
    </div>
</template>
<style lang="scss" scoped>
.settings {
    width: 60vw;

}
</style>