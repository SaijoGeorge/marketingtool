'use strict'

class MenuBtn {
    constructor(btn, list) {
        this.btn  = document.querySelector(btn)
        this.list = document.querySelector(list)
        this.openedClass = 'is-opened'

        this._addEventListeners()
    }

    _addEventListeners() {
        const btn = this.btn
        const list = this.list
        const openedClass = this.openedClass

        var documentListener = {
            _added: false,

            _listener(e) {
                if (btn.contains(e.target)) return

                btn.classList.remove(openedClass)

                document.removeEventListener(e.type, documentListener._listener)
                documentListener._added = false
            },

            toggle(opened) {
                if (opened) {
                    if (this._added) return

                    document.addEventListener('click', this._listener)
                    this._added = true
                } else {
                    document.removeEventListener('click', this._listener)
                    this._added = false
                }
            }
        }

        this.btn.addEventListener('click', () => {
            const opened = this.btn.classList.toggle(this.openedClass)
            documentListener.toggle(opened)
        })
    }
}
