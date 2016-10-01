'use strict'

class ActionButtons {
    constructor() {
        this.actions = document.querySelector('.c-actions')
    }

    activate(mode) {
        const druation = 310
        const activate = () => {
            this.currentSection && this.currentSection.classList.remove('is-visible')
            this.currentSection = this.actions.querySelector(`[data-mode=${ mode }]`)
            this.currentSection.classList.add('is-visible')
        }

        mode === 'single'
            ? activate()
            : setTimeout(activate, druation)
    }
}
