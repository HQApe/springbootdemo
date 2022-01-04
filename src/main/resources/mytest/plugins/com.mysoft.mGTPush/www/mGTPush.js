cordova.define("com.mysoft.mGTPush.mGTPush", function(require, exports, module) {
	var exec = require('cordova/exec');

	function PushNotification() {
		// onReceived 1
		// onTouched 2
		// onSilenced 3
		// onError 4
		this.callback = null;
		var self = this;
		this.success = function (result) {
			var code = result[0];
			switch (code) {
				case 1:
					{
						if (self.callback != null && self.callback.onReceived != undefined &&
							self.callback.onReceived != null) {
							var customData = result[1];
							self.callback.onReceived(customData);
						}
					}
					break;
				case 2:
					{
						if (self.callback != null &&
							self.callback.onTouched != undefined &&
							self.callback.onTouched != null) {
							var customData = result[1];

							self.callback.onTouched(customData);
						}
					}
					break;
				case 3:
					{
						if (self.callback != null && self.callback.onSilenced != undefined &&
							self.callback.onSilenced != null) {
							var customData = result[1];
							self.callback.onSilenced(customData);
						}
					}
					break;
				case 4:
					{
						if (self.callback != null &&
							self.callback.onError != undefined &&
							self.callback.onError != null) {
							var error = result[1];
							self.callback.onError(error);
						}
					}
					break;

				default:
					break;
			}
		};
	}

	// 注册通知监听
	PushNotification.prototype.addEventListener = function (callback) {
		this.callback = callback;

		exec(this.success, null, "PushNotification", "addEventListener",
			[]);
	};

	// 获取绑定信息 
	PushNotification.prototype.getBindInfo = function (success, error) {
		exec(success, error, "PushNotification", "getBindInfo", []);
	};

	//清除通知中心推送消息
	PushNotification.prototype.clearPushBadgeNumber = function () {
		exec(null, null, "PushNotification", "clearPushBadgeNumber", []);
	};

	//设置远程推送消息角标
	PushNotification.prototype.setPushBadgeNumber = function (count) {

		if (count == null || count == undefined) {

			count = -1;
		};
		exec(null, null, "PushNotification", "setPushBadgeNumber", [count]);
	};
	PushNotification.prototype.getPushBadgeNumber = function (success) {

		exec(success, null, "PushNotification", "getPushBadgeNumber", []);
	};

	PushNotification.prototype.autoStartManager = function () {
		exec(null, null, "PushNotification", "autoStartManager", []);
	};

	var me = new PushNotification();
	module.exports = me;
});
