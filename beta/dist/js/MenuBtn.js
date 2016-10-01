'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var MenuBtn = (function () {
    function MenuBtn(btn, list) {
        _classCallCheck(this, MenuBtn);

        this.btn = document.querySelector(btn);
        this.list = document.querySelector(list);
        this.openedClass = 'is-opened';

        this._addEventListeners();
    }

    _createClass(MenuBtn, [{
        key: '_addEventListeners',
        value: function _addEventListeners() {
            var _this = this;

            var btn = this.btn;
            var list = this.list;
            var openedClass = this.openedClass;

            var documentListener = {
                _added: false,

                _listener: function _listener(e) {
                    if (btn.contains(e.target)) return;

                    btn.classList.remove(openedClass);

                    document.removeEventListener(e.type, documentListener._listener);
                    documentListener._added = false;
                },

                toggle: function toggle(opened) {
                    if (opened) {
                        if (this._added) return;

                        document.addEventListener('click', this._listener);
                        this._added = true;
                    } else {
                        document.removeEventListener('click', this._listener);
                        this._added = false;
                    }
                }
            };

            this.btn.addEventListener('click', function () {
                var opened = _this.btn.classList.toggle(_this.openedClass);
                documentListener.toggle(opened);
            });
        }
    }]);

    return MenuBtn;
})();