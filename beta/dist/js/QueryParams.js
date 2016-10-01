'use strict';

var QueryParams = {

    getAll: function getAll() {
        var query = location.search.substring(1);
        var params = query.split("&");
        var object = {};

        query && params.forEach(function (param) {
            var pair = param.split("=");
            object[pair[0]] = pair[1] || true;
        });

        return object;
    },

    get: function get(param) {
        param = this.getAll()[param];
        return param || null;
    },

    has: function has(param) {
        param = this.get(param);
        return !!param && param !== "false" && param !== "0";
    },

    stringify: function stringify(obj) {
        return Object.keys(obj).map(function (key, i) {
            return "" + (!i ? '?' : '&') + key + "=" + obj[key];
        }).join('');
    }

};