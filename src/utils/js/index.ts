/**
 * @description 切换class
 * @param ele 
 * @param cls 
 */
export const toggleClass = (ele: any, cls: any) => {

    if ((' ' + ele.className + ' ').indexOf(' ' + cls + ' ') > -1) {
        ele.classList.remove(cls)
    } else {
        ele.classList.add(cls)
    }

    // if(!hasClass(ele, cls,'className')){
    //     removeClass(ele, cls);
    // } else {
    //     console.log('1')
    //     addClass(ele, cls);
    // }
}

/**
 * @description 判断是否存在class
 * @param ele 
 * @param cls 
 * @param key  键
 */
export const hasKey = (ele: any, cls: any, key: any) => {
    return ele[key].match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}


/**
 * @description 添加class
 * @param ele 
 * @param cls 
 */
export const addClass = (ele: any, cls: any) => {

    ele.classList.add(cls);
    // console.log(ele,cls)
}

/**
 * @description 移除class
 * @param ele 
 * @param cls 
 */
export const removeClass = (ele: any, cls: any) => {
    ele.classList.remove(cls)
}


/**
 * @description 寻找 名为class 的兄弟节点
 * @param ele 当前class名
 * @param key 属性名
 * @param value 值
 * @returns 返回一个存有兄弟结点的数组
 */
export const siblings = (ele: any, key: any, value: any) => {
    let arr = []; //保存兄弟节点
    let prev = ele.previousSibling; //o的前一个同胞节点
    //先往上查询兄弟节点
    while (prev) {
        if (prev.nodeType == 1 && prev[key] == value) {
            arr.unshift(prev);//数组首部插入数组，保证节点顺序
        }
        prev = prev.previousSibling;//把上一节点赋值给prev
    }
    //往下查询兄弟节点
    let next = ele.nextSibling;//o的后一个同胞节点
    while (next) {
        if (next.nodeType == 1 && next[key] == value) {
            arr.push(next);//数组尾部插入，保证节点顺序
        }
        next = next.nextSibling;//下一节点赋值给next，用于循环
    }
    return arr;
}

/**
 * @description 元素标签 display 切换
 * @param ele 元素
 */
export const toggle = (ele: any) => {
    if (ele.style.display === 'none')
        ele.style.display = 'block';
    else
        ele.style.display = 'none';
}

/**
 * @description 计算元素的offset
 * @param ele 
 * @returns top和left
 */
export const offset = (ele: any) => {
    let result = {
        left: 0,
        top: 0
    }

    // 节点display为none时，直接返回
    if (window.getComputedStyle(ele).display === 'none') return;

    function getOffset(node: any, init?: any) {
        // 节点类型
        if (node.nodeType !== 1) return;

        // 定位属性值
        const position = window.getComputedStyle(node).position;

        // 目标节点跳过该判断
        if (init !== true && position === 'static') {
            getOffset(node.parentNode);
            return;
        }

        result.top += node.offsetTop - node.scrollTop;
        result.left += node.offsetLeft - node.scrollLeft;

        // 目标节点为绝对定位，无需递归操作，直接返回
        if (position === 'fixed') return;

        getOffset(node.parentNode);
    }

    getOffset(ele, true);

    return result;
}

/**
 * @description 防抖函数
 * @param func 
 * @param delay 
 * @returns 
 */

export const debounce = (func: Function, delay: number) => {
    let timer: ReturnType<typeof setTimeout>;
    return (...args: any[]) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func(...args);
        }, delay);
    };
};

/**
 * @description 节流函数
 * @param func 
 * @param delay 
 * @returns 
 */
export const throttle = (func: Function, delay: number) => {
    let timer: ReturnType<typeof setTimeout>;
    let lastTime = 0;
    return (...args: any[]) => {
        const currentTime = Date.now();
        if (currentTime - lastTime > delay) {
            func(...args);
            lastTime = currentTime;
        } else {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func(...args);
            }, delay);
        }
    };
};