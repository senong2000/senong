<script lang="ts" setup>

import { useTheme } from '@/hooks/useTheme';
import { TodoList, TodoSpace } from '@/types/projects'
import { getTodoSpaces, setTodoSpaces } from "@/utils/cache/localStorage"
import { formatDate, diffDate } from '@/utils/date';

import { VDatePicker } from 'vuetify/labs/components';

const space = ref('Default')
const spaceIndex = ref(0)
const todoSpaceList = ref<TodoSpace[]>([]);

const spacename = ref('');
const spaceNameInput = ref(false);

const changeSpaceName = ref(false);

const todo = ref('');

const type = ref('Todo')
const types = ['All', 'Todo', 'Complete']

const rules: any = [];

const datepickersoverlay = ref(false)
const selectedItem = ref<TodoList>();

const delSpaceNamedialog = ref(false)
const delTododialog = ref(false)

const showTooltip = ref(false)

const { activeThemeName } = useTheme()

onMounted(() => {

    getTodoSpaces() && getTodoSpaces().length > 0 ? todoSpaceList.value = getTodoSpaces() : initTodoSpace()

    spaceIndex.value = todoSpaceList.value[0]?.index !== undefined ? todoSpaceList.value[0].index : -1;
    space.value = todoSpaceList.value[0].name
})

watch(
    datepickersoverlay, (val) => {
        if (val) {
            // setTimeout(() => {
            //     datepickers.value = false;
            // }, 2000);
        }
    });

watch(space, () => {
    // console.log(oldVal, newVal)

});
const initTodoSpace = () => {
    const tempTodoSpace: TodoSpace = {
        name: space.value,
        todolist: []
    }

    todoSpaceList.value.push(tempTodoSpace)

    todoSpaceList.value = todoSpaceList.value.map((i, idx) => ({
        index: idx,
        name: i.name,
        todolist: i.todolist
    }))

    setTodoSpaces(todoSpaceList.value)
}

const showAddSpaceInput = () => {
    spaceNameInput.value = !spaceNameInput.value;
    changeSpaceName.value = false;
    spacename.value = ''
}

const addSpace = (event: KeyboardEvent) => {

    event.preventDefault()
    if (spacename.value === '') return

    if (changeSpaceName.value) {
        todoSpace.value.name = spacename.value
        space.value = todoSpace.value.name

    } else {

        const tempTodoSpace: TodoSpace = {
            name: spacename.value,
            todolist: []
        }

        if (todoSpaceList.value.findIndex(i => i.index === tempTodoSpace.index) > -1) return

        if (todoSpaceList.value.findIndex(i => i.name.toLowerCase() === tempTodoSpace.name.toLowerCase()) > -1) {
            showTooltip.value = true
            setTimeout(() => {
                showTooltip.value = false
            }, 3000)
            return
        }

        // 添加到数组中 
        todoSpaceList.value.push(tempTodoSpace)

        todoSpaceList.value = todoSpaceList.value.map((i, idx) => ({
            index: idx,
            name: i.name,
            todolist: i.todolist
        }))

        space.value = spacename.value
    }

    setTodoSpaces(todoSpaceList.value)
    spaceIndex.value = todoSpaceList.value.findIndex(i => i.name === space.value)
    spaceNameInput.value = false
    spacename.value = ''

}

const clickSpaceName = (item: TodoSpace) => {
    if (item.name !== space.value) {
        triggerRef(todoSpace)
        space.value = todoSpace.value.name
        changeSpaceName.value = false
        spaceNameInput.value = false

    } else {
        spacename.value = todoSpace.value.name
        changeSpaceName.value = true
        spaceNameInput.value = true
    }
}

const deleteSpace = (name: string) => {
    if (todoSpaceList.value.length === 1) return

    const index = todoSpaceList.value.findIndex(i => i.name === name)
    if (index > -1) {
        todoSpaceList.value.splice(index, 1);
    }
    setTodoSpaces(todoSpaceList.value)

    spaceIndex.value = todoSpaceList.value[0]?.index !== undefined ? todoSpaceList.value[0].index : -1;
    delSpaceNamedialog.value = false
}

const addTodo = (event: KeyboardEvent) => {
    if (event.ctrlKey && event.key === 'Enter') {
        // 处理 ctrl + enter 事件
        // console.log('Ctrl + Enter key pressed');
        todo.value += '\n'
        return false
    } else if (event.shiftKey && event.key === 'Enter') {
        // 处理 shift + enter 事件
        // console.log('Shift + Enter key pressed');
        return false
    } else {
        event.preventDefault()

        if (todo.value === '') return

        // 创建一个临时对象
        const tempTodoList: TodoList = {
            todo: todo.value,
            createdate: new Date(),
            complete: false
        }

        if (!todoSpace.value.todolist.findIndex(i => i.index === tempTodoList.index)) return

        // 添加到数组中 
        todoSpace.value.todolist.unshift(tempTodoList)

        todoSpace.value.todolist = todoSpace.value.todolist.map((i, idx) => ({
            index: idx,
            todo: i.todo,
            createdate: i.createdate,
            complete: i.complete
        }))

        setTodoSpaces(todoSpaceList.value)

        todo.value = '';
    }
}

const updateTodo = (item: TodoList) => {
    const index = todoSpace.value.todolist.indexOf(item);

    if (item.complete) {
        todoSpace.value.todolist[index].completedate = new Date()
    }

    setTodoSpaces(todoSpaceList.value)

}

const deleteTodo = (item: TodoList) => {
    // console.log(todoSpace.value.todolist, item)

    const index = todoSpace.value.todolist.indexOf(item);
    if (index > -1) {
        todoSpace.value.todolist.splice(index, 1);
    }
    setTodoSpaces(todoSpaceList.value)
    delTododialog.value = false
}

const addTodoETC = (date: any) => {
    if (!date) return
    if (selectedItem.value) {
        const index = todoSpace.value.todolist.indexOf(selectedItem.value);
        if (index > -1) {
            todoSpace.value.todolist[index].etc = new Date(date)
        }
    }
    datepickersoverlay.value = false
    setTodoSpaces(todoSpaceList.value)
}

const displayDatePickersOverlay = (item: TodoList) => {
    datepickersoverlay.value = !datepickersoverlay.value
    selectedItem.value = item
}

const todoSpace = computed(() => {
    return todoSpaceList.value.filter(i => i.index === spaceIndex.value)[0]
})

const list = computed(() => {
    // const returnList = todoSpaceList.value[0] && todoSpaceList.value[0].todolist ? todoSpaceList.value[0].todolist : [];
    const returnList = todoSpace.value && todoSpace.value.todolist ? todoSpace.value.todolist : [];
    if (type.value === 'All') return returnList
    else if (type.value === 'Todo') return returnList.filter(j => !j.complete)
    else if (type.value === 'Complete') return returnList.filter(j => j.complete)
    else return returnList
})

const todoList = computed(() => {
    return todoSpace.value && todoSpace.value.todolist ? todoSpace.value.todolist.filter(j => !j.complete) : []
})

const completeList = computed(() => {
    return todoSpace.value && todoSpace.value.todolist ? todoSpace.value.todolist.filter(j => j.complete) : []
});


</script>
<template>
    <div class="todo slide-enter" mb-16>
        <div class="todo-spaces-tabs" h-16 my-8 flex flex-items-center>
            <v-tabs v-show="!spaceNameInput" v-model="spaceIndex" align-tabs="start" selected-class="active-type"
                hide-slider show-arrows center-active>
                <v-menu open-on-hover v-for="item in todoSpaceList" :key="item.index">
                    <template v-slot:activator="{ props }">
                        <v-tab :value="item.index" variant="plain" v-bind="props" @click="clickSpaceName(item)">
                            {{ item.name }}
                        </v-tab>
                    </template>
                    <v-list :theme="activeThemeName" v-show="!spaceNameInput">
                        <v-list-item value="delete">
                            <v-list-item-title>
                                <v-btn variant="plain" w-full>
                                    <v-icon>fas fa-trash</v-icon>
                                    <v-dialog v-model="delSpaceNamedialog" activator="parent" width="auto">
                                        <v-card flex flex-items-center flex-justify-center>
                                            <v-card-text m-4>
                                                确定删除?
                                            </v-card-text>
                                            <v-card-actions m-4>
                                                <v-btn color="primary" variant="tonal"
                                                    @click="delSpaceNamedialog = false">No</v-btn>
                                                <v-btn color="primary" variant="tonal" @click="deleteSpace(item.name)">
                                                    Yes</v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </v-dialog>
                                </v-btn>
                            </v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-tabs>

            <v-tooltip v-model="showTooltip" location="bottom" disabled>
                <template v-slot:activator="{ props }">
                    <v-text-field v-if="spaceNameInput" v-bind="props" class="todo-spaces-tabs-input"
                        :theme="activeThemeName" :autofocus="spaceNameInput" placeholder="添加空间名" hide-details="auto"
                        v-model="spacename" @keydown.enter="addSpace" variant="solo"></v-text-field>
                </template>
                <span>TodoSpace already exists</span>
            </v-tooltip>
            <v-btn v-show="!spaceNameInput" variant="plain" @click="showAddSpaceInput">
                <v-icon>fas fa-plus</v-icon>
            </v-btn>
            <v-btn class="back" v-show="spaceNameInput" variant="plain" @click="showAddSpaceInput">
                <v-icon>fas fa-angle-left</v-icon>
            </v-btn>

        </div>
        <div class="todo-list-input flex flex-items-center" py-2>
            <v-textarea placeholder="添加任务" variant="solo" hide-details="auto" v-model="todo" :rules="rules"
                @keydown.enter="addTodo" clearable persistent-clear persistent-hint :theme="activeThemeName"
                hint="Press Enter key to add" auto-grow rows="1"></v-textarea>
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

            <v-card rounded="0" v-for="item in list" :key="item.index" :theme="activeThemeName">
                <div class="todo-list-content-body px-4 py-2 flex flex-items-center">
                    <v-checkbox-btn v-model="item.complete" @input="updateTodo(item)"></v-checkbox-btn>
                    <v-textarea v-model="item.todo" @input="updateTodo(item)" variant="solo" hide-details="auto" clearable
                        auto-grow rows="1"></v-textarea>
                </div>
                <v-card-actions>
                    <span flex flex-justify-center flex-items-center>
                        <v-icon size="x-small" px-4>fa-solid fa-hourglass-start</v-icon>
                        {{ formatDate(item.createdate, 'dynamic') }}
                    </span>

                    <span v-if="item.complete" flex flex-justify-center flex-items-center>
                        <v-icon size="x-small" px-4>fa-solid fa-hourglass-end</v-icon>
                        {{ item.completedate ? formatDate(item.completedate, 'dynamic') : null }}
                    </span>

                    <span v-if="item.complete" flex flex-justify-center flex-items-center>
                        <v-icon size="x-small" px-4>fa-solid fa-check</v-icon>
                        {{ item.completedate ? diffDate(item.completedate, item.createdate) : null }}
                    </span>

                    <v-spacer></v-spacer>

                    <span v-if="item.etc" flex flex-justify-center flex-items-center>
                        <v-icon size="x-small" px-4>fa-solid fa-clock</v-icon>
                        {{ item.etc ? formatDate(item.etc, 'diy', 'MMM D') : null }} -
                        {{ item.etc ? diffDate(item.etc, item.createdate) : null }}
                    </span>
                    <v-menu location="bottom" transition="slide-y-transition">
                        <template v-slot:activator="{ props }">
                            <v-btn variant="plain" v-bind="props">
                                <v-icon size="x-large">fas fa-ellipsis</v-icon>
                            </v-btn>
                        </template>
                        <v-list>
                            <v-list-item value="clock" @click="displayDatePickersOverlay(item)">
                                <v-list-item-title>
                                    <v-btn variant="plain">
                                        <v-icon>fas fa-clock</v-icon>
                                    </v-btn>
                                </v-list-item-title>
                            </v-list-item>
                            <v-list-item value="delete">
                                <v-list-item-title>
                                    <v-btn variant="plain">
                                        <v-icon>fas fa-trash</v-icon>
                                        <v-dialog v-model="delTododialog" activator="parent" width="auto">
                                            <v-card flex flex-items-center flex-justify-center>
                                                <v-card-text m-4>
                                                    确定删除?
                                                </v-card-text>
                                                <v-card-actions m-4>
                                                    <v-btn color="primary" variant="tonal"
                                                        @click="delTododialog = false">No</v-btn>
                                                    <v-btn color="primary" variant="tonal" @click="deleteTodo(item)">
                                                        Yes</v-btn>
                                                </v-card-actions>
                                            </v-card>
                                        </v-dialog>
                                    </v-btn>
                                </v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-card-actions>
                <v-divider></v-divider>
            </v-card>
        </div>

        <v-overlay :theme="activeThemeName" v-model="datepickersoverlay" flex flex-items-center flex-justify-center>
            <v-date-picker class="data-pickers" show-adjacent-months @click:cancel="datepickersoverlay = false"
                @update:modelValue="addTodoETC"></v-date-picker>
        </v-overlay>
    </div>
</template>
<style lang="scss">
.todo {
    width: 50vw;
    z-index: 999;
    box-sizing: border-box;

    &-spaces {
        &-tabs {

            button {
                display: flex;
                transition: all .2s;
            }

            .active-type {
                font-size: 1.5rem;
                opacity: 1;

            }



            &-input {
                background: none;
                width: auto;

                .v-field--variant-solo {
                    background: none;
                    box-shadow: none;
                    transition: all .3s;

                }
            }
        }
    }

    &-list {
        &-input {
            .v-field--variant-solo {
                transition: all .3s;

            }

        }

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