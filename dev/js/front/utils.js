let utils = new Object;

utils.__cache__ = new Object;
utils.__cache__.qs = [];
utils.__cache__.qsAll = [];

utils.qs = (selector, config)=>{

    let getCachedElement = (selector)=>{
        let cachedEl = utils.__cache__.qs[selector];
        return typeof cachedEl !== 'undefined' && cachedEl !== null ? cachedEl : null;
    };

    if(typeof selector === 'string'){
        if(typeof config === 'object'){
            let parent = typeof config.parent === 'object' ? config.parent : document;
            if(typeof config.clear !== 'undefined' && config.clear){
                utils.__cache__.qs[selector] = null;
            }

            let res = getCachedElement(selector);

            if(typeof config.cache !== 'undefined' && !config.cache){
                return res !== null ? res : document.querySelector(selector);
            } else {
                if(res !== null){
                    return res;
                } else{
                    let el = parent.querySelector(selector);
                    if(el !== null){
                        utils.__cache__.qs[selector] = el;
                    }
                    return el;
                }
            }
        } else{
            let res = getCachedElement(selector);
            if(res !== null){
                return res;
            } else{
                let el = document.querySelector(selector);
                if(el !== null){
                    utils.__cache__.qs[selector] = el;
                }
                return el;
            }
        }
    }
};

utils.qsAll = (selectors, config)=>{
    
    let getCachedElements = (selectors)=>{
        let cachedEl = utils.__cache__.qsAll[selectors];
        return typeof cachedEl !== 'undefined' && cachedEl !== null ? cachedEl : null;
    };

    if(typeof selectors === 'string'){
        if(typeof config === 'object'){
            let parent = typeof config.parent === 'object' ? config.parent : document;
            if(typeof config.clear !== 'undefined' && config.clear){
                utils.__cache__.qsAll[selectors] = null;
            }

            let res = getCachedElements(selectors);

            if(typeof config.cache !== 'undefined' && !config.cache){
                return res !== null ? res : document.querySelectorAll(selectors);
            } else {
                if(res !== null){
                    return res;
                } else{
                    let els = parent.querySelectorAll(selectors);
                    if(els !== null){
                        utils.__cache__.qsAll[selectors] = els;
                    }
                    return els;
                }
            }
        } else{
            let res = getCachedElements(selectors);
            if(res !== null){
                return res;
            } else{
                let els = document.querySelectorAll(selectors);
                if(els !== null){
                    utils.__cache__.qsAll[selectors] = els;
                }
                return els;
            }
        }
    }
};

utils.createElement = (type, config)=>{
    let element = document.createElement(type);
    if(typeof config === 'object'){
        Object.keys(config).forEach((key)=>{
            element.setAttribute(key,config[key]);
        });
    }
    return element;
};

export default {
    ...utils
}