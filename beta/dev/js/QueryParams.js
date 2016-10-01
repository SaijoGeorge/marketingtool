'use strict'

const QueryParams = {

    getAll() {
        let query  = location.search.substring(1)
        let params = query.split("&")
        let object = {}

        query && params.forEach(param => {
            let pair = param.split("=")
            object[pair[0]] = pair[1] || true
        })

        return object
    },

    get(param) {
        param = this.getAll()[param]
        return param || null
    },

    has(param) {
        param = this.get(param)
        return !!param && param !== "false" && param !== "0"
    },

    stringify(obj) {
        return Object.keys(obj).map((key, i) => {
            return `${ !i ? '?' : '&' }${ key }=${ obj[key] }`
        }).join('')
    }

}
