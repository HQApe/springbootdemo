cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-plugin-sqlite.SQLitePlugin",
      "file": "plugins/cordova-plugin-sqlite/www/SQLitePlugin.js",
      "pluginId": "cordova-plugin-sqlite",
      "clobbers": [
        "window.sqlitePlugin",
        "cordova.plugins.sqlitePlugin"
      ]
    },
    {
      "id": "com.mysoft.maccelerometer.MAccelerometer",
      "file": "plugins/com.mysoft.maccelerometer/www/MAccelerometer.js",
      "pluginId": "com.mysoft.maccelerometer",
      "clobbers": [
        "MAccelerometer"
      ]
    },
    {
      "id": "com.mysoft.core.MicCore",
      "file": "plugins/com.mysoft.core/www/MicCore.js",
      "pluginId": "com.mysoft.core",
      "clobbers": [
        "MicCore"
      ]
    },
    {
      "id": "com.mysoft.core.MHotUpdate",
      "file": "plugins/com.mysoft.core/www/MHotUpdate.js",
      "pluginId": "com.mysoft.core",
      "clobbers": [
        "MHotUpdate"
      ]
    },
    {
      "id": "com.mysoft.core.MFilePathConvert",
      "file": "plugins/com.mysoft.core/www/MFilePathConvert.js",
      "pluginId": "com.mysoft.core",
      "runs": true
    },
    {
      "id": "com.mysoft.mwebviewplus.MWebViewPlus",
      "file": "plugins/com.mysoft.mwebviewplus/www/MWebViewPlus.js",
      "pluginId": "com.mysoft.mwebviewplus",
      "clobbers": [
        "MWebViewPlus"
      ]
    },
    {
      "id": "com.mysoft.mappavailability.MAppAvailability",
      "file": "plugins/com.mysoft.mappavailability/www/MAppAvailability.js",
      "pluginId": "com.mysoft.mappavailability",
      "clobbers": [
        "MAppAvailability"
      ]
    },
    {
      "id": "com.mysoft.mhuaweiobs.MHuaWeiOBS",
      "file": "plugins/com.mysoft.mhuaweiobs/www/HuaWeiOBS.js",
      "pluginId": "com.mysoft.mhuaweiobs",
      "clobbers": [
        "MHuaWeiOBS"
      ]
    },
    {
      "id": "com.mysoft.mGTPush.mGTPush",
      "file": "plugins/com.mysoft.mGTPush/www/mGTPush.js",
      "pluginId": "com.mysoft.mGTPush",
      "clobbers": [
        "PushNotification"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-whitelist": "1.3.5",
    "cordova-plugin-sqlite": "1.0.3",
    "com.mysoft.maccelerometer": "1.0.2",
    "cordova-plugin-custom-config": "1.0.0",
    "com.mysoft.core": "3.4.3",
    "com.mysoft.mwebviewplus": "1.0.2",
    "com.mysoft.mappavailability": "1.0.7",
    "com.mysoft.mhuaweiobs": "1.0.2",
    "com.mysoft.mGTPush": "1.5.2"
  };
});