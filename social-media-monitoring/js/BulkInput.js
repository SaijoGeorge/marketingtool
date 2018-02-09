'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var BulkInput = (function () {
    function BulkInput() {
        _classCallCheck(this, BulkInput);

        this.urlBar = document.querySelector('.c-urlbar');
    }

    _createClass(BulkInput, [{
        key: 'changeMode',
        value: function changeMode(mode) {
            var authorized = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

            var cond = !authorized && mode === 'bulk';
            this.urlBar.classList[cond ? 'add' : 'remove']('is-inactive');
        }
    }]);

    return BulkInput;
})();