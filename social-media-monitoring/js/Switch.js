'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Switch = (function () {
    function Switch(selector) {
        var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        var _ref$highlightClass = _ref.highlightClass;
        var highlightClass = _ref$highlightClass === undefined ? 'c-switch__highlight' : _ref$highlightClass;
        var _ref$activeClass = _ref.activeClass;
        var activeClass = _ref$activeClass === undefined ? 'is-active' : _ref$activeClass;

        _classCallCheck(this, Switch);

        this.activeClass = activeClass;
        this.element = document.querySelector(selector);
        this.buttons = this.element.querySelectorAll('button');
        this.highlight = this.element.querySelector('.' + highlightClass);
        this.activeBtn = this.element.querySelector('button.' + this.activeClass);

        if (!this.activeBtn) {
            this.activeBtn = this.buttons[0];
            this.activeBtn.classList.add(this.activeClass);
        }

        this._highlight();
        this._addEvents();
    }

    _createClass(Switch, [{
        key: 'setByValue',
        value: function setByValue(value) {
            var btn = [].filter.call(this.buttons, function (btn) {
                return btn.dataset.value === value;
            })[0];

            if (btn) this._setActiveBtn(btn);
        }
    }, {
        key: '_highlight',
        value: function _highlight() {
            var w = this.activeBtn.offsetWidth;
            var x = this.activeBtn.offsetLeft;

            this.highlight.style.width = w + 'px';
            this.highlight.style.transform = 'translateX(' + x + 'px)';
        }
    }, {
        key: '_dispatchEvent',
        value: function _dispatchEvent() {
            this.element.dispatchEvent(new CustomEvent('change', { detail: this.activeBtn.dataset.value }));
        }
    }, {
        key: '_setActiveBtn',
        value: function _setActiveBtn(btn) {
            this.activeBtn.classList.remove(this.activeClass);
            this.activeBtn = btn;
            this.activeBtn.classList.add(this.activeClass);

            this._highlight();
        }
    }, {
        key: '_addEvents',
        value: function _addEvents() {
            var _this = this;

            ;[].forEach.call(this.buttons, function (btn) {
                return btn.addEventListener('click', function (e) {
                    if (_this.activeBtn === e.target) return;

                    _this._setActiveBtn(e.target);
                    _this._dispatchEvent();
                });
            });
        }
    }]);

    return Switch;
})();