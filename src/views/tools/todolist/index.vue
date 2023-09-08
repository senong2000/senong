<script lang="ts" setup>

const type = ref(null)
const types = ['All', 'todo', 'finish']

type todoList = {
    title: string,
    complete: boolean,
}

const todo = ref('');
const todoList = ref<todoList[]>([]);


const addTodo = () => {
    todoList.value.unshift({
        title: todo.value,
        complete: false,
    });
    todo.value = '';
}

const completeTodo = (index: number) => {
    todoList.value[index].complete = true;;
}

const resetTodo = () => {
    todo.value = '';
    todoList.value = [];
}

const completeTotal = computed(() => {
    return todoList.value.filter(todo => todo.complete).length;
});


</script>
<template>
    <div class="todolist">
        <div class="todolist-input">
            <v-input >
            </v-input>
            <v-btn @click="addTodo">
                提交
            </v-btn>
        </div>
        <v-btn @click="resetTodo">
            提交
        </v-btn>
        <v-tabs class="todolist-tabs" v-model="type" align-tabs="start" selected-class="active-type" hide-slider>
            <v-tab v-for="item in types" :key="item" :value="item" variant="plain">
                {{ item }}
            </v-tab>
        </v-tabs>
        <div>任务总数: {{ todoList.length }}</div>
        <div>完成数量: {{ completeTotal }}</div>
        <div class="todolist-content">

            <v-btn @click="completeTodo">
                提交
            </v-btn>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.todolist {
    &-content {
        .active-type {}
    }
}
</style>