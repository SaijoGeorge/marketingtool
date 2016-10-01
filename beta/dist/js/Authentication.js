'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Authentication = (function () {
  function Authentication() {
    _classCallCheck(this, Authentication);

    this.auth0Lock = new Auth0Lock('FNcRpa5QMxEVKQoYr4LqosWpwYywHaNj', 'marketingtoolio.auth0.com');
    this.loginBtn = document.querySelector('.c-login-btn');
    this.logoutBtn = document.querySelector('.c-logout-btn');
    this.upgradeBtn = document.querySelector('.c-upgrade-btn');

    this._onLoginBtnClick = this._onLoginBtnClick.bind(this);
    this._onLogoutBtnClick = this._onLogoutBtnClick.bind(this);
    this._onLockAuthenticated = this._onLockAuthenticated.bind(this);
    this._isAuthenticated = this._isAuthenticated.bind(this);
    this._isAuthenticatedGetProfile = this._isAuthenticatedGetProfile.bind(this);
    this._toggleLogin = this._toggleLogin.bind(this);
    this._addEvents();
  }

  _createClass(Authentication, [{
    key: '_addEvents',
    value: function _addEvents() {
      this.loginBtn.addEventListener('click', this._onLoginBtnClick);
      this.logoutBtn.addEventListener('click', this._onLogoutBtnClick);
      this.upgradeBtn.addEventListener('click', this._onLoginBtnClick);

      this.auth0Lock.on("authenticated", this._onLockAuthenticated);
    }
  }, {
    key: '_toggleLogin',
    value: function _toggleLogin(logged) {

      if (logged) {
        this.loginBtn.setAttribute("hidden", logged);
        this.logoutBtn.removeAttribute("hidden");
      } else {
        this.logoutBtn.setAttribute("hidden", !logged);
        this.loginBtn.removeAttribute("hidden");
      }
    }
  }, {
    key: '_onLoginBtnClick',
    value: function _onLoginBtnClick() {
      this.auth0Lock.show();
    }
  }, {
    key: '_onLogoutBtnClick',
    value: function _onLogoutBtnClick() {
      var location = window.location.href;
      localStorage.removeItem('id_token');
      window.location.reload();
      //window.location.href = location;
    }
  }, {
    key: '_onLockAuthenticated',
    value: function _onLockAuthenticated(authResult) {

      this.auth0Lock.getProfile(authResult.idToken, function (error, profile) {
        if (error) {
          return;
        }
        localStorage.setItem('id_token', authResult.idToken);
        window.location.reload();
      });
    }
  }, {
    key: '_isAuthenticated',
    value: function _isAuthenticated() {
      var id_token = localStorage.getItem('id_token');
      if (id_token) {
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: '_isAuthenticatedProfile',
    value: function _isAuthenticatedProfile() {

      var id_token = localStorage.getItem('id_token');
      if (id_token) {
        try {
          var decoded = jwt_decode(id_token);
          return true;
        } catch (e) {
          return false;
        }
      } else {
        return false;
      }
    }
  }, {
    key: '_isAuthenticatedGetProfile',
    value: function _isAuthenticatedGetProfile() {
      var context = this;
      var id_token = localStorage.getItem('id_token');
      return new Promise(function (resolve, reject) {
        if (id_token) {
          context.auth0Lock.getProfile(id_token, function (err, profile) {
            if (err) {
              return resolve(false);
            }
            resolve(true);
          });
        } else {
          return resolve(false);
        }
      });
    }
  }]);

  return Authentication;
})();