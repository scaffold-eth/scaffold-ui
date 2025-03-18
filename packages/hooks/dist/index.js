'use strict';

var react = require('react');

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var defaultAddress = {
    street: "",
    city: "",
    state: "zaragoza",
    zip: "",
    country: "Spain",
};
function useAddress(initialAddress) {
    var _a = react.useState(__assign(__assign({}, defaultAddress), initialAddress)), address = _a[0], setAddressState = _a[1];
    var setAddress = react.useCallback(function (newAddress) {
        setAddressState(function (prev) { return (__assign(__assign({}, prev), newAddress)); });
    }, []);
    var resetAddress = react.useCallback(function () {
        setAddressState(defaultAddress);
    }, []);
    return {
        address: address,
        setAddress: setAddress,
        resetAddress: resetAddress,
    };
}

exports.useAddress = useAddress;
//# sourceMappingURL=index.js.map
