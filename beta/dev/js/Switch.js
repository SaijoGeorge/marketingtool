'use strict'

class Switch {
    constructor(
        selector,
        {
            highlightClass = 'c-switch__highlight',
            activeClass = 'is-active'
        } = {}
    ) {
        this.activeClass = activeClass
        this.element = document.querySelector(selector)
        this.buttons = this.element.querySelectorAll('button')
        this.highlight = this.element.querySelector(`.${ highlightClass }`)
        this.activeBtn = this.element.querySelector(`button.${ this.activeClass }`)

        if (!this.activeBtn) {
            this.activeBtn = this.buttons[0]
            this.activeBtn.classList.add(this.activeClass)
        }

        this._highlight()
        this._addEvents()
    }

    setByValue(value) {
        const btn = [].filter.call(this.buttons, btn => {
            return btn.dataset.value === value
        })[0]

        if (btn) this._setActiveBtn(btn)
    }

    _highlight() {
        const w = this.activeBtn.offsetWidth
        const x = this.activeBtn.offsetLeft

        this.highlight.style.width = `${ w }px`
        this.highlight.style.transform = `translateX(${ x }px)`
    }

    _dispatchEvent() {
        this.element.dispatchEvent(
            new CustomEvent(
                'change',
                { detail: this.activeBtn.dataset.value }
            )
        )
    }

    _setActiveBtn(btn) {
        this.activeBtn.classList.remove(this.activeClass)
        this.activeBtn = btn
        this.activeBtn.classList.add(this.activeClass)

        this._highlight()
    }

    _addEvents() {
        ;[].forEach.call(this.buttons, btn => btn.addEventListener('click', e => {
            if (this.activeBtn === e.target) return

            this._setActiveBtn(e.target)
            this._dispatchEvent()
        }))
    }
}
