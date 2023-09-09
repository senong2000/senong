const SYSTEM_NAME = "Vite"

/** 缓存数据时用到的 Key */
class CacheKey {
    static TOKEN = `${SYSTEM_NAME}-token-key`
    static ACTIVE_THEME_NAME = `${SYSTEM_NAME}-active-theme-name-key`
    static ACTIVE_RAIN = `${SYSTEM_NAME}-active-rain`
    static TODOSPACES = `${SYSTEM_NAME}-todospaces`
}

export default CacheKey
