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

export type DateAccount = {
    index?: number
    date: Date
    accounts?: Account[]
}

export type MODE = 'day' | 'week' | 'month' | 'year';

export type Account = {
    index?: number
    thing: string
    money: number
    type?: string
    mode?: MODE
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

type ScheduleMode = 'once' | 'daliy' | 'weekly' | 'monthly' | 'yearly'

export type Schedule = {
    index?: number
    schedule: string
    completeData?: Date[]
    createdDate: Date
    startTime: string
    endTime: string
    mode?: ScheduleMode
}
