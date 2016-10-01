'use strict'

class Authentication {
    constructor() {
        this.auth0Lock = new Auth0Lock('FNcRpa5QMxEVKQoYr4LqosWpwYywHaNj', 'marketingtoolio.auth0.com');
        this.loginBtn = document.querySelector('.c-login-btn')
        this.logoutBtn = document.querySelector('.c-logout-btn')
        this.upgradeBtn = document.querySelector('.c-upgrade-btn')

        this._onLoginBtnClick = this._onLoginBtnClick.bind(this)
        this._onLogoutBtnClick = this._onLogoutBtnClick.bind(this)
        this._onLockAuthenticated = this._onLockAuthenticated.bind(this)
        this._isAuthenticated = this._isAuthenticated.bind(this)
        this._isAuthenticatedGetProfile = this._isAuthenticatedGetProfile.bind(this)
        this._toggleLogin = this._toggleLogin.bind(this)
        this._addEvents()
    }

    _addEvents() {
        this.loginBtn.addEventListener('click', this._onLoginBtnClick)
        this.logoutBtn.addEventListener('click', this._onLogoutBtnClick)
        this.upgradeBtn.addEventListener('click', this._onLoginBtnClick)

        this.auth0Lock.on("authenticated", this._onLockAuthenticated)
    }

    _toggleLogin(logged){

      if(logged){
        this.loginBtn.setAttribute("hidden", logged)
        this.logoutBtn.removeAttribute("hidden")
      } else {
        this.logoutBtn.setAttribute("hidden", !logged)
        this.loginBtn.removeAttribute("hidden")
      }
    }

    _onLoginBtnClick(){
      this.auth0Lock.show();
    }

    _onLogoutBtnClick(){
      var location = window.location.href;
      localStorage.removeItem('id_token');
      window.location.reload();
      //window.location.href = location;
    }

    _onLockAuthenticated(authResult){

        this.auth0Lock.getProfile(authResult.idToken, function(error, profile) {
          if (error) {
            return;
          }
          localStorage.setItem('id_token', authResult.idToken);
          window.location.reload();
        });

    }

    _isAuthenticated() {
        var id_token = localStorage.getItem('id_token');
        if (id_token) {
          return true;
        } else {
          return false;
        }
    }

    _isAuthenticatedProfile() {

      var id_token = localStorage.getItem('id_token');
      if (id_token) {
        try{
          var decoded = jwt_decode(id_token);
          return true;
        }catch(e){
          return false;
        }
      } else {
        return false;
      }

    }

  _isAuthenticatedGetProfile(){
    var context = this
    var id_token = localStorage.getItem('id_token');
    return new Promise(function(resolve, reject){
      if(id_token){
        context.auth0Lock.getProfile(id_token, function (err, profile) {
          if(err) {
            return resolve(false)
          }
          resolve(true)
        });
      } else {
        return resolve(false)
      }
    })
  }


}
