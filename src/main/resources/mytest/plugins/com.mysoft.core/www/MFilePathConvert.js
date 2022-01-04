cordova.define("com.mysoft.core.MFilePathConvert", function(require, exports, module) {
// ios cordova@6.0.6以上的跨域路劲转换，安卓会将原路径返回
window.convertFilePath = function (path) {
  if (cordova.platformId === "undefined" || cordova.platformId !== "ios") {
    // 安卓平台直接返回
    return path;
  }
  if (
    window.WkWebView !== undefined &&
    window.WkWebView.convertFilePath !== undefined
  ) {
    return window.WkWebView.convertFilePath(path);
  }
  return path;
};

});
