/** 统一处理 localStorage */

import CacheKey from "@/constants/cacheKey"
import { type ThemeName } from "@/hooks/useTheme"
import { type Rain } from '@/hooks/useRainFx'
import { TodoSpace } from "@/types/todolist"
import { Favorite } from "@/types/favorites"

class Cache {
  public name: string

  constructor() {
    this.name = 'localCache'
  }

  public set(key: string, value: any) {
    // console.log('set get', key, value)
    if (value) {
      try {
        window.localStorage.setItem(key, typeof value == 'object' ? JSON.stringify(value) : value)
      } catch (e) {
        window.localStorage.setItem(key, value)
      }
      return true
    } else {
      return false
    }
  }

  public get(key: string) {
    let result = window.localStorage.getItem(key)
    if (result) {
      try {
        return JSON.parse(result)
      } catch (e) {
        return result
      }
    }
    return undefined
  }

  public remove(key: string) {
    if (key) {
      window.localStorage.removeItem(key)
      return true
    } else {
      return false
    }
  }

  public clear() {
    window.localStorage.clear()
  }
}


export const cache = new Cache()

export const getActiveThemeName = () => {
  return cache.get(CacheKey.ACTIVE_THEME_NAME) as ThemeName
}
export const setActiveThemeName = (themeName: ThemeName) => {
  cache.set(CacheKey.ACTIVE_THEME_NAME, themeName)
}

export const getActiveRain = () => {
  return cache.get(CacheKey.ACTIVE_RAIN) as Rain
}
export const setActiveRain = (rain: boolean) => {
  cache.set(CacheKey.ACTIVE_RAIN, rain)
}

export const getTodoSpaces = () => {
  return cache.get(CacheKey.TODOSPACES) as TodoSpace[]
}
export const setTodoSpaces = (todoSpaces: TodoSpace[]) => {
  cache.set(CacheKey.TODOSPACES, todoSpaces)
}

export const getFavorites = () => {
  return cache.get(CacheKey.FAVORITES) as Favorite[]
}
export const setgetFavorites = (favorites: Favorite[]) => {
  cache.set(CacheKey.FAVORITES, favorites)
}
