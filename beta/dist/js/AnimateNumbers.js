'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var AnimateNumbers = (function () {
    function AnimateNumbers(selector) {
        _classCallCheck(this, AnimateNumbers);

        this.elements = document.querySelectorAll(selector);[].forEach.call(this.elements, this._animate.bind(this));
    }

    _createClass(AnimateNumbers, [{
        key: '_mask',
        value: function _mask(number) {
            number = String(number).split('');
            for (var ii = 3; ii < number.length; ii += 4) {
                number.splice(number.length - ii, 0, ',');
            }
            return number.join('');
        }
    }, {
        key: '_animate',
        value: function _animate(el) {
            var _this = this;

            var randomNumber = Math.min(Math.random() * 100, 40);
            var endVal = parseInt(el.innerText, 10);
            var val = Math.max(Math.round(endVal - randomNumber), 0);

            var interval = setInterval(function () {
                if (val === endVal) clearInterval(interval);
                el.innerText = _this._mask(val++);
            }, 25);
        }
    }]);

    return AnimateNumbers;
})();