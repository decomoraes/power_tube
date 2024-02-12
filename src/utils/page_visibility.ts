export function getBrowserVisibilityProp() {
    if (typeof document.hidden !== "undefined") {
        // Opera 12.10 and Firefox 18 and later support
        return "visibilitychange"
    }
    else {
        // @ts-ignore
        if (typeof document.msHidden !== "undefined") {
                return "msvisibilitychange"
        }
        else { // @ts-ignore
            if (typeof document.webkitHidden !== "undefined") {
                        return "webkitvisibilitychange"
                    }
        }
    }
}

export function getBrowserDocumentHiddenProp() {
    if (typeof document.hidden !== "undefined") {
        return "hidden"
    } else { // @ts-ignore
        if (typeof document.msHidden !== "undefined") {
                return "msHidden"
            } else { // @ts-ignore
            if (typeof document.webkitHidden !== "undefined") {
                            return "webkitHidden"
                        }
        }
    }
}

export function getIsDocumentHidden() {
    // @ts-ignore
    return !document[getBrowserDocumentHiddenProp()]
}