'use strict'

class State {
    init() {
        this.mode = 'single'
        this._updateState = this._updateState.bind(this)

        window.addEventListener('popstate', this._updateState)
        this._updateState()
    }

    destroy() {
        window.removeEventListener('popstate', this._updateState)
    }

    _updateState() {
        this.mode = QueryParams.get('mode') || 'single'
        this.onStateUpdate && this.onStateUpdate(this.mode)
    }

    pushState(mode) {
        const allParams = QueryParams.getAll()
        allParams.mode = mode
        const queryString = QueryParams.stringify(allParams)

        history.pushState({ mode }, null, queryString)
    }
}
