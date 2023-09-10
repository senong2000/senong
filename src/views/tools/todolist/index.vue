<script lang="ts" setup>

import { useTheme } from '@/hooks/useTheme';
import { TodoList, TodoSpace } from '@/types/todolist'
import { getTodoSpaces, setTodoSpaces } from "@/utils/cache/localStorage"
import { formatDate, diffDate } from '@/utils/date';

import { VDatePicker } from 'vuetify/labs/components';

const space = ref('Default')
const spaces = ['Default']
const todoSpaceList = ref<TodoSpace[]>([]);

const todo = ref('');

const type = ref('Todo')
const types = ['All', 'Todo', 'Complete']

const rules: any = [];

const datepickers = ref(false)


const { activeThemeName } = useTheme()

onMounted(() => {

    getTodoSpaces() && getTodoSpaces().length > 0 ? todoSpaceList.value = getTodoSpaces() : initTodoSpace()

})

watch(
    datepickers, (val) => {
        if (val) {
            // setTimeout(() => {
            //     datepickers.value = false;
            // }, 2000);
        }
    });

const initTodoSpace = () => {
    const tempTodoSpace: TodoSpace = {
        index: todoSpaceList.value.length,
        name: space.value,
        todolist: []
    }

    todoSpaceList.value.push(tempTodoSpace)

    setTodoSpaces(todoSpaceList.value)
}

const addSpace = () => {

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

const addTodo = () => {

    if (!todo.value) return

    const tempTodoList: TodoList = {
        index: todoList.value.length,
        todo: todo.value,
        createdate: new Date(),
        complete: false
    }

    todoSpace.value.todolist.unshift(tempTodoList)
    setTodoSpaces(todoSpaceList.value)

    todo.value = '';
}

const updateTodo = (item: TodoList) => {
    const index = todoSpace.value.todolist.indexOf(item);

    if (item.complete) {
        todoSpace.value.todolist[index].completedate = new Date()
    }


    setTodoSpaces(todoSpaceList.value)

}

const deleteTodo = (item: TodoList) => {
    console.log(todoSpace.value.todolist, item)

    const index = todoSpace.value.todolist.indexOf(item);
    if (index > -1) {
        todoSpace.value.todolist.splice(index, 1);
    }
    setTodoSpaces(todoSpaceList.value)
}

const inputTodo = () => {
    console.log('1')
    disabled.value = !disabled.value
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
    <div class="todo slide-enter">
        <v-tabs class="todo-spaces-tabs" v-model="space" align-tabs="start" selected-class="active-type" hide-slider>
            <v-tab v-for="item in spaces" :key="item" :value="item" variant="plain">
                {{ item }}
            </v-tab>
        </v-tabs>

        <div class="todo-list-input flex flex-items-center">
            <v-text-field label="添加任务" hide-details="auto" v-model="todo" :rules="rules" @keydown.enter="addTodo"
                clearable></v-text-field>
            <v-btn @click="addTodo" h-full :theme="activeThemeName">
                提交
            </v-btn>
        </div>

        <v-tabs class="todo-list-tabs" v-model="type" align-tabs="start" selected-class="active-type" hide-slider>
            <v-tab v-for="item in types" :key="item" :value="item" variant="plain">
                {{ item }}
            </v-tab>
        </v-tabs>

        <div class="todo-list-tips flex my-8">
            <div mx-8>任务总数: {{ todoList.length + completeList.length }}</div>
            <div>完成数量: {{ completeList.length }}</div>
        </div>

        <div class="todo-list-content">

            <v-card v-for="item in list" :key="item.index" my-1 :theme="activeThemeName">
                <div class="todo-list-content-body flex flex-items-center">
                    <v-checkbox-btn v-model="item.complete" @input="updateTodo(item)"></v-checkbox-btn>
                    <v-text-field v-model="item.todo" @input="updateTodo(item)" variant="solo" hide-details="auto" clearable
                        @focus="inputTodo"></v-text-field>
                </div>
                <v-card-actions>
                    <span> {{ formatDate(item.createdate, 'dynamic') }} </span>

                    <span v-if="item.complete"> <span> &nbsp; - &nbsp;</span> {{ item.completedate ?
                        formatDate(item.completedate, 'dynamic') : null
                    }}</span>
                    <v-spacer></v-spacer>
                    <span v-if="item.complete"> C:{{ item.completedate ? diffDate(item.completedate, item.createdate) : null
                    }}</span>
                    <v-menu>
                        <template v-slot:activator="{ props }">
                            <v-btn variant="plain" v-bind="props">
                                <v-icon size="x-large">fas fa-ellipsis</v-icon>
                            </v-btn>
                        </template>
                        <v-list>
                            <v-list-item value="clock" @click="datepickers = !datepickers">
                                <v-list-item-title>
                                    <v-btn variant="plain">
                                        <v-icon>fas fa-clock</v-icon>
                                    </v-btn>
                                </v-list-item-title>
                            </v-list-item>
                            <v-list-item value="delete" @click="deleteTodo(item)">
                                <v-list-item-title>
                                    <v-btn variant="plain">
                                        <v-icon>fas fa-trash</v-icon>
                                    </v-btn>
                                </v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-card-actions>
            </v-card>
        </div>

        <v-overlay v-model="datepickers" flex flex-items-center flex-justify-center>
            <v-date-picker class="data-pickers" show-adjacent-months></v-date-picker>
        </v-overlay>
    </div>
</template>
<style lang="scss">
.todo {
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

        &-content {
            &-body {
                transition: all .5s;

                .v-checkbox-btn {
                    flex: none;


                }

                .v-field--variant-solo {
                    box-shadow: none;
                    transition: all .3s;

                }


            }
        }
    }

    .data-pickers {
        z-index: 1000;
    }


}
</style>