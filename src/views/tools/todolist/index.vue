<script lang="ts" setup>

import { TodoList, TodoSpace } from '@/types/todolist'
import { getTodoSpaces, setTodoSpaces } from "@/utils/cache/localStorage"

const space = ref('Default')
const spaces = ['Default']
const todoSpaceList = ref<TodoSpace[]>([]);

const todo = ref('');

const type = ref('All')
const types = ['All', 'Todo', 'Complete']

const rules: any = [];

onMounted(() => {

    getTodoSpaces() && getTodoSpaces().length > 0 ? todoSpaceList.value = getTodoSpaces() : initTodoSpace()

})



const initTodoSpace = () => {
    const tempTodoSpace: TodoSpace = {
        index: todoSpaceList.value.length,
        name: space.value,
        todolist: []
    }

    todoSpaceList.value.push(tempTodoSpace)

    setTodoSpaces(todoSpaceList.value)
}

const addTodo = () => {

    if (!todo.value) return

    const tempTodoList: TodoList = {
        index: todoList.value.length,
        todo: todo.value,
        createdate: new Date(),
        complete: false
    }

    todoSpace.value.todolist.unshift(tempTodoList)

    todo.value = '';

    setTodoSpaces(todoSpaceList.value)

}

const completeTodo = (index: number) => {
    todoSpace.value.todolist = todoSpace.value.todolist.map(item => {
        if (item.index === index) {
            // 更新 complete 值
            return { ...item, complete: !item.complete }
        } else {
            return item
        }
    })
    setTodoSpaces(todoSpaceList.value)

}

const deleteTodo = () => {

    setTodoSpaces(todoSpaceList.value)
}

const todoSpace = computed(() => {
    return todoSpaceList.value.filter(i => i.name === space.value)[0]
})

const list = computed(() => {
    const returnList = todoSpaceList.value[0] && todoSpaceList.value[0].todolist ? todoSpaceList.value[0].todolist : [];
    if (type.value === 'All') return returnList
    else if (type.value === 'Todo') return returnList.filter(j => !j.complete)
    else if (type.value === 'Complete') return returnList.filter(j => j.complete)
    else return returnList
})

const todoList = computed(() => {
    return todoSpaceList.value[0] && todoSpaceList.value[0].todolist ? todoSpaceList.value[0].todolist.filter(j => !j.complete) : []
})

const completeList = computed(() => {
    return todoSpaceList.value[0] && todoSpaceList.value[0].todolist ? todoSpaceList.value[0].todolist.filter(j => j.complete) : []
});


</script>
<template>
    <div class="todo">
        <v-tabs class="todo-spaces-tabs" v-model="space" align-tabs="start" selected-class="active-type" hide-slider>
            <v-tab v-for="item in spaces" :key="item" :value="item" variant="plain">
                {{ item }}
            </v-tab>
        </v-tabs>

        <div class="todo-list-input">
            <v-text-field label="添加任务" hide-details="auto" v-model="todo" :rules="rules" clearable></v-text-field>
            <v-btn @click="addTodo">
                提交
            </v-btn>
        </div>
        <v-tabs class="todo-list-tabs" v-model="type" align-tabs="start" selected-class="active-type" hide-slider>
            <v-tab v-for="item in types" :key="item" :value="item" variant="plain">
                {{ item }}
            </v-tab>
        </v-tabs>
        <div>任务总数: {{ todoList.length + completeList.length }}</div>
        <div>完成数量: {{ completeList.length }}</div>
        <div class="todo-list-content">
            <div v-for="item in list" :key="item.index">
                <v-checkbox @input="completeTodo" v-model="item.complete" :label="item.todo"></v-checkbox>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.todo {
    background: rgba($color: #f3f3f3, $alpha: 0.6);
    width: 50vw;
    height: 100vh;
    z-index: 999;
    margin: -2rem;
    box-sizing: border-box;

    &-spaces {
        &-tabs {
            button {
                display: flex;
                align-items: end;
                transition: all .2s;
            }

            .active-type {
                font-size: 1.5rem;
                opacity: 1;

            }
        }
    }

    &-list {
        &-tabs {
            button {
                display: flex;
                align-items: end;
                transition: all .2s;
            }

            .active-type {
                font-size: 1.5rem;
                opacity: 1;

            }
        }

        &-content {}
    }



}
</style>