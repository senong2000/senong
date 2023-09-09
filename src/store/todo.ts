import { TodoList, TodoSpace } from '@/types/todolist'
import { defineStore } from 'pinia'

export const useTodoStore = defineStore({
    id: 'todo', // id必填，且需要唯一
    state: () => {
        const todoSpaces: TodoSpace[] = []
        return {
            todoSpaces
        }
    },
    actions: {
        // 添加一个 TodoSpace
        addTodoSpace(name: string): void {
            const newTodoSpace: TodoSpace = {
                index: this.todoSpaces.length,
                name,
                todolist: [],
            }
            this.todoSpaces.push(newTodoSpace)
        },
        // 添加一个 TodoList
        addTodoList(todoSpaceIndex: number, todo: string): void {
            const newTodoList: TodoList = {
                index: this.todoSpaces[todoSpaceIndex].todolist.length,
                todo,
                createdate: new Date(),
            }
            this.todoSpaces[todoSpaceIndex].todolist.push(newTodoList)
        },
        // 标记一个 TodoList 为已完成
        markTodoListAsComplete(todoSpaceIndex: number, todoListIndex: number): void {
            const todoList = this.todoSpaces[todoSpaceIndex].todolist[todoListIndex]
            todoList.complete = true
            todoList.completedate = new Date()
        },
    },
})