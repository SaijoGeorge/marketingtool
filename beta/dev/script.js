'use strict'

new MenuBtn('.c-navbar__hamburger', '.c-navbar__links')
new MenuBtn('.c-navbar__dd', '.c-navbar__dd ul')
new AnimateNumbers('.js-number')

const state = new State()
const input = new URLInput()
const bulkInput = new BulkInput()
const activeButtons = new ActionButtons()
const auth0Lock = new Authentication()
const isAuthenticated = auth0Lock._isAuthenticatedProfile()

const updateUpgradeBar = (mode, isAuthenticated) => {
    const cond = mode === 'bulk' && !isAuthenticated
    document.querySelector('.c-upgrade-bar')
            .classList[cond ? 'add' : 'remove']('is-active')
}

const urlSwitch = new Switch('.c-switch')
window.addEventListener('load', () => urlSwitch._highlight())

urlSwitch.element.addEventListener('change', ({ detail: mode }) => {
    state.pushState(mode)
    input.changeMode(mode)
    activeButtons.activate(mode)

    auth0Lock._isAuthenticatedGetProfile()
      .then(logged => {
        bulkInput.changeMode(mode, logged)
        updateUpgradeBar(mode, logged)
        auth0Lock._toggleLogin(logged)
      })
      .catch(err => {
        bulkInput.changeMode(mode, false)
        updateUpgradeBar(mode, false)
        auth0Lock._toggleLogin(false)
      })
})

state.onStateUpdate = mode => {
    urlSwitch.setByValue(mode)
    input.changeMode(mode)
    activeButtons.activate(mode)

    auth0Lock._isAuthenticatedGetProfile()
      .then(logged => {
        bulkInput.changeMode(mode, logged)
        updateUpgradeBar(mode, logged)
        auth0Lock._toggleLogin(logged)
      })
      .catch(err => {
        bulkInput.changeMode(mode, false)
        updateUpgradeBar(mode, false)
        auth0Lock._toggleLogin(false)
      })

}

state.init()
