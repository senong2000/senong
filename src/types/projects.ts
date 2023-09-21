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



export type Favorites = {
    index?: number
    title: string
    favoriteList: Favorite[]
}

export type Favorite = {
    index?: number
    title?: string
    desc?: string
    url: string
    cover?: string
}

/**
 * @description account
 */

export type YearAccount = {
    index?: number,
    year: number,
    month: MonthAccount,

}

export type MonthAccount = {
    index?: number,
    month: number,
    day: Account
}

export type Account = {
    index?: number
    thing: string
    day: Date
    money: number
    type?: string
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
