'use strict'

class BulkInput {
    constructor() {
        this.urlBar = document.querySelector('.c-urlbar')
    }

    changeMode(mode, authorized = false) {
        const cond = !authorized && mode === 'bulk'
        this.urlBar.classList[cond ? 'add' : 'remove']('is-inactive')
    }
}
