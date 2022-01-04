cordova.define("com.mysoft.mappavailability.MAppAvailability", function(require, exports, module) {
var exec = require('cordova/exec');

function MAppAvailability(){
}


//检测微博是否安装
MAppAvailability.prototype.check = function(param,success,fail){
	exec(success, fail, "MAppAvailability", "check", [param]);
}

MAppAvailability.prototype.openApp = function(param,success,fail){
	exec(success, fail, "MAppAvailability", "openApp", [param]);
}

MAppAvailability.prototype.registerCallback = function (success) {
	exec(success, null, "MAppAvailability", "registerCallback", []);
}

var me = new MAppAvailability();
module.exports = me;
});
