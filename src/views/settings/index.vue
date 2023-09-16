<script lang="ts" setup>
import { useTheme } from '@/hooks/useTheme';
import { TodoSpace } from '@/types/todolist';
import { getTodoSpaces } from "@/utils/cache/localStorage"

const { activeThemeName } = useTheme()

type Json = {
    name: string
    date: Date
    todoSpaceList: Array<TodoSpace>

}

const importData = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.json';

    fileInput.addEventListener('change', async () => {
        const file = fileInput.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsText(file);
            reader.addEventListener('load', () => {
                const content = reader.result as string;
                const data = JSON.parse(content);
                console.log('文件已读取：', data);
            });
        }
    });
    fileInput.click();
}

const backups = () => {

    const json: Json = {
        name: 'backups',
        date: new Date(),
        todoSpaceList: getTodoSpaces(),
    }

    const jsonStr = JSON.stringify(json);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.download = "senong-backups.json";
    link.href = url;
    link.click();
}

</script>
<template>
    <div class="settings">
        <v-row no-gutters>
            <v-col>
                <v-btn @click="importData" :theme="activeThemeName">
                    导入数据
                </v-btn>
                <v-btn @click="backups" :theme="activeThemeName">
                    备份数据
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