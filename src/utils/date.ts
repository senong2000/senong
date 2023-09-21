import dayjs from "dayjs"

type mode = 'default' | 'dynamic' | 'diy'

export const formatDate = (d: string | Date, mode: mode = 'default', display: string = '') => {
    const date = dayjs(d)
    let temp: string;

    if (mode === 'default') {
        return date.format('MMM D, YYYY HH:mm:ss')
    }
    else if (mode === 'dynamic') {
        if (date.day() === dayjs().day()) {
            return date.format('HH:mm:ss')
        } else if (date.month() === dayjs().month()) {
            return date.format('MMM D HH:mm:ss')
        }
        else if (date.year() === dayjs().year()) {
            return date.format('MMM D HH:mm:ss')
        }
        return date.format('MMM D, YY HH:mm:ss')
    }
    else if (mode === 'diy') {
        return date.format(display)
    }
}

export const diffDate = (end: string | Date, start: string | Date) => {
    const diff = new Date(end).getTime() - new Date(start).getTime()

    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
    const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    let formattedTime = '';
    if (years > 0) {
        formattedTime += `${years}年`;
    }
    if (months > 0) {
        formattedTime += `${months}月`;
    }
    if (days > 0) {
        formattedTime += `${days}天`;
    }
    if (hours > 0) {
        formattedTime += `${hours}小时`;
    }
    if (minutes > 0) {
        formattedTime += `${minutes}分钟`;
    }

    if (formattedTime === '') {
        formattedTime = '0分钟';
    }

    return formattedTime
}


export const getDaysInMonth = (year: number, month: number) => {
    // 闰年 2 月有 29 天，平年 2 月有 28 天
    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    const daysInMonth = [31, isLeapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return daysInMonth[month - 1];
}