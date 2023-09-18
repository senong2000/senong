<script lang="ts" setup>
import { useTheme } from '@/hooks/useTheme';

const route = useRoute()
const router = useRouter()

const { activeThemeName } = useTheme()

type Tool = {
    route: string
    icon: string
    title: string
    desc: string
}

const tools: Tool[] = [
    {
        route: 'todolist',
        icon: 'fas fa-rectangle-list',
        title: 'todolist',
        desc: 'TodoList是一种简单实用的工具，用于记录和管理个人或团队的任务清单。TodoList通常以列表的形式呈现，可以添加、编辑、删除任务，标记任务的状态和优先级，设置任务的截止日期等。',
    },
    {
        route: 'favorites',
        icon: 'fas fa-box',
        title: 'favorites',
        desc: '收藏夹是一个用于保存和组织网页、链接、图片或其他在线内容的工具。它可以让用户轻松地保存有用或感兴趣的内容，并在需要时方便地访问和查看。'
    },
    {
        route: 'mcskineditor',
        icon: 'fas fa-shirt',
        title: 'minecraft\'s skin editor',
        desc: 'Minecraft 皮肤编辑器是一款允许玩家自定义和编辑Minecraft游戏中的角色皮肤的在线工具，玩家可以通过浏览器访问。它提供了一系列的编辑功能，使玩家能够创建自己独特的皮肤。'
    },
    {
        route: 'account',
        icon: 'fas fa-calculator',
        title: 'account',
        desc: '记账工具，它可以帮助用户跟踪和管理收入、支出、债务和资产等财务数据，以便更好地控制和规划财务状况。'
    },
    {
        route: 'luckyday',
        icon: 'fas fa-star',
        title: 'lucky day',
        desc: '用于测试和预测用户在今天的狗屎运。'
    },
    {
        route: 'schedule',
        icon: 'fas fa-calendar',
        title: 'schedule',
        desc: '日程表是一种用于管理和安排个人或团队的日常活动和任务的工具，亦可以用来作个人作息表等等。'
    },

]

</script>
<template>
    <div class="tools" flex m-4>
        <v-row no-gutters>
            <v-col cols="6" v-for="item, idx in tools" :key="idx">
                <div flex h-full>
                    <v-card :ripple="true" :theme="activeThemeName" variant="outlined"
                        @click="router.push(`${route.path}/${item.route}`)" class="flex! w-full p-4! m-2!">
                        <v-icon size="x-large" class="h-full! ml-4 mr-8">{{ item.icon }}</v-icon>
                        <div flex flex-col>
                            <span uppercase>{{ item.title }}</span>
                            <span mt-2 h-full>{{ item.desc }}</span>
                        </div>
                    </v-card>
                </div>
            </v-col>
        </v-row>
    </div>
</template>
<style lang="scss" scoped>
.tools {
    width: 60vw;

}
</style>