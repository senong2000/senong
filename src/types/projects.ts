/**
 * @description todolist
 */
export type TodoList = {
    index?: number
    todo: string
    createdate: Date
    complete?: boolean
    completedate?: Date
    etc?: Date
}

export type TodoSpace = {
    index?: number
    name: string
    todolist: TodoList[]
}


/**
 * @description favorite
 */
export type Favorite = {
    index?: number
    title: string
    desc: string
    type: string
    url: string
    cover: string
}

/**
 * @description account
 */

enum ExpenseType { life, game, girl, me, other }

export type Account = {
    index?: number
    thing: string
    date: Date
    money: number
    type: ExpenseType
}

/**
 * @description dog shit
 */

export type DogShit = {
    index?: number
    score: number
    comment: string
}

/**
 * @description schedule
 */

enum ScheduleMode { once, daliy, weekly, monthly, yearly }

export type Schedule = {
    index?: number
    schedule: string
    date: Date
    time: Date
    complete: Boolean
    mode: ScheduleMode
}
