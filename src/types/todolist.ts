export type TodoList = {
    index: number
    todo: string
    createdate: Date
    complete?: boolean
    completedate?: Date

}

export type TodoSpace = {
    index: number
    name: string
    todolist: TodoList[]
}