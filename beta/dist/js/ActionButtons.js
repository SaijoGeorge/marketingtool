'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var ActionButtons = (function () {
    function ActionButtons() {
        _classCallCheck(this, ActionButtons);

        this.actions = document.querySelector('.c-actions');
    }

    _createClass(ActionButtons, [{
        key: 'activate',
        value: function activate(mode) {
            var _this = this;

            var druation = 310;
            var activate = function activate() {
                _this.currentSection && _this.currentSection.classList.remove('is-visible');
                _this.currentSection = _this.actions.querySelector('[data-mode=' + mode + ']');
                _this.currentSection.classList.add('is-visible');
            };

            mode === 'single' ? activate() : setTimeout(activate, druation);
        }
    }]);

    return ActionButtons;
})();