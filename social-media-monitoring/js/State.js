'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var State = (function () {
    function State() {
        _classCallCheck(this, State);
    }

    _createClass(State, [{
        key: 'init',
        value: function init() {
            this.mode = 'single';
            this._updateState = this._updateState.bind(this);

            window.addEventListener('popstate', this._updateState);
            this._updateState();
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            window.removeEventListener('popstate', this._updateState);
        }
    }, {
        key: '_updateState',
        value: function _updateState() {
            this.mode = QueryParams.get('mode') || 'single';
            this.onStateUpdate && this.onStateUpdate(this.mode);
        }
    }, {
        key: 'pushState',
        value: function pushState(mode) {
            var allParams = QueryParams.getAll();
            allParams.mode = mode;
            var queryString = QueryParams.stringify(allParams);

            history.pushState({ mode: mode }, null, queryString);
        }
    }]);

    return State;
})();