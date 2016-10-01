'use strict'

class AnimateNumbers {
    constructor(selector) {
        this.elements = document.querySelectorAll(selector)

        ;[].forEach.call(this.elements, this._animate.bind(this))
    }

    _mask(number) {
        number = String(number).split('')
        for (let ii = 3; ii < number.length; ii += 4) {
            number.splice(number.length - ii, 0, ',')
        }
        return number.join('')
    }

    _animate(el) {
        const randomNumber = Math.min(Math.random() * 100, 40)
        const endVal = parseInt(el.innerText, 10)
        let val = Math.max(Math.round(endVal - randomNumber), 0)

        const interval = setInterval(() => {
            if (val === endVal) clearInterval(interval)
            el.innerText = this._mask(val++)
        }, 25)
    }
}
