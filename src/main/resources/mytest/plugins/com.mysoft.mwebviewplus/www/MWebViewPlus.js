cordova.define("com.mysoft.mwebviewplus.MWebViewPlus", function(require, exports, module) {
var exec = require('cordova/exec');

exports.open = function (url, callback, options) {
    exec(function (result) {
        var code = result[0];
        switch (code) {
            case 1:
                if (callback.onSuccess) {
                    callback.onSuccess();
                }
                break;
            case 2:
                if (callback.onClose) {
                    callback.onClose(result[1]);
                }
                break;
        };
    }, 
    function (error) {
        callback.onError(error);
    }, "MWebViewPlus", "open", [url, options]);
};
});
