cordova.define("com.mysoft.mhuaweiobs.MHuaWeiOBS", function(require, exports, module) {
var exec = require('cordova/exec');

function MHuaWeiOBS() {

}
var paramsError = function (errMsg) {

    return { 'errCode': 1001, 'errMsg': errMsg };
}
var getDataType = function (data) {
    var type = Object.prototype.toString.call(data).slice(8, -1);
    return type;
}
var isArray = function (value) {

    return getDataType(value) === "Array";
}
var isString = function (value) {

    return getDataType(value) === "String";
}
var isObject = function (value) {

    return getDataType(value) === "Object";
}
var isEmptyValue = function (value) {
    var type;
    if (value == null) { // 等同于 value === undefined || value === null
        return true;
    }
    type = getDataType(value);
    switch (type) {
        case 'String':
            return !value.trim().length;
        case 'Array':
            return !value.length;
        case 'Object':
            return !Object.keys(value).length; // 普通对象使用 for...in 判断，有 key 即为 false
        default:
            return false; // 其他对象均视作非空
    }
};
/*
检验必填参数:
调用示例：
示例1：
var object = {
      endPoint:"f",
      bucket: "appcloud-prod",
      objectKey: 'test/1.jpg',
};
var errorMsg = objectPropertyIsCorrect(object,['endPoint','bucket','objectKey','objectLocalPath'])
console.log(errorMsg);

示例2：
var object = {
      endPoint:"f",
      data:{
           bucket: "appcloud-prod",
           objectKey: 'test/1.jpg'
      }
};
var errorMsg = objectPropertyIsCorrect(object,['endPoint',{data:['bucket','objectKey','objectLocalPath']}])
console.log(errorMsg);

示例3：
var object = {
      endPoint:"f",
      data: [
      {
         bucket: "appcloud-prod",
         objectKey: 'test/1.jpg'
      },
      {
         bucket: "appcloud-prod",
         objectKey: 'test/1.jpg',
         objectLocalPath: 'ffffff'
      }
   ]
};
var errorMsg = objectPropertyIsCorrect(object,['endPoint',{data:['bucket','objectKey','objectLocalPath']}])
console.log(errorMsg);
*/
var objectPropertyIsCorrect = function (object, propertys) {

    if (!isObject(object) || isEmptyValue(object)) {
        return paramsError("参数错误：请传入正确的非空类型");
    }
    for (var index = 0; index < propertys.length; index++) {

        let property = propertys[index];
        //遍历子属性
        if (isObject(property)) {

            var childObject;
            var childPropertys;
            var childKey;
            for (let key in property) {

                childKey = key;
                childObject = object[key];
                childPropertys = property[key];
            }
            if (!childObject || isEmptyValue(childObject)) {
                return paramsError(`${childKey} 为必填非空参数`);
            }
            if (isArray(childObject)) {

                for (var i = 0; i < childObject.length; i++) {

                    var value = childObject[i];
                    var errorMsg = objectPropertyIsCorrect(value, childPropertys);
                    if (errorMsg) {

                        return paramsError(`${childKey}[${i}]->${errorMsg}`);
                    }
                }
            } else {
                var errorMsg = objectPropertyIsCorrect(childObject, childPropertys);
                if (errorMsg) {

                    return paramsError(`${childKey}->${errorMsg}`);
                }
            }
        } else if (
            !object.hasOwnProperty(property) ||
            !isString(object[property]) ||
            isEmptyValue(object[property])) {
            return paramsError(`${property} 为必填非空参数`);
        }
    }
    return null;
}

MHuaWeiOBS.prototype.success = function (callback) {
    return function (result) {
        // start 1
        // progress 2
        // finish 3;
        // error 4
        var code = result[0];
        switch (code) {
            case 1: {
                if (callback != null && callback.start != undefined && callback.start != null) {
                    callback.start();
                }
            }
                break;
            case 2: {
                if (callback != null && callback.progress != undefined && callback.progress != null) {
                    var obj = result[1];
                    var current = result[2];
                    var total = result[3];
                    callback.progress(obj, current, total);
                }
            }
                break;
            case 3: {
                if (callback != null && callback.finish != undefined && callback.finish != null) {
                    callback.finish();
                }
            }
                break;
            case 4: {
                if (callback != null && callback.error != undefined && callback.error != null) {
                    var objectInfo = result[1];
                    var errorMsg = result[2];
                    callback.error(objectInfo, errorMsg);
                }
            }
                break;
            case 5: {
                if (callback != null && callback.fileProgress != undefined && callback.fileProgress != null) {
                    var obj = result[1];
                    var current = result[2];
                    var total = result[3];
                    callback.fileProgress(obj, current, total);
                }
            }
                break;
            default:
                if (callback && callback.error) {

                    var objectInfo = result[1];
                    var errorMsg = result[2];
                    callback.error(objectInfo, errorMsg);
                }
                break;
        }
    };
};

// 上传一个或多个文件
MHuaWeiOBS.prototype.putObjects = function (objects, callback, options) {

    var errorMessage = objectPropertyIsCorrect(objects, ['endPoint', { 'data': [] }])
    if (errorMessage) {

        this.success(callback.error(objects, errorMessage));
        return;
    }
    exec(this.success(callback), this.success(callback), "MHuaWeiOBS", "putObjects", [objects, options]);
};

// 下载一个或多个文件
MHuaWeiOBS.prototype.getObjects = function (objects, callback, options) {

    var errorMessage = objectPropertyIsCorrect(objects, ['endPoint', { 'data': [] }])
    if (errorMessage) {

        this.success(callback.error(objects, errorMessage));
        return;
    }
    exec(this.success(callback), this.success(callback), "MHuaWeiOBS", "getObjects", [objects, options]);
};

// 下载一个文件
MHuaWeiOBS.prototype.getObject = function (object, callback, options) {

    var errorMessage = objectPropertyIsCorrect(object, ['endPoint', 'bucket', 'objectKey', 'objectLocalPath']);
    if (errorMessage) {

        this.success(callback.error(object, errorMessage));
        return;
    }
    exec(this.success(callback), this.success(callback), "MHuaWeiOBS", "getObject", [object, options]);
};

// 上传一个文件
MHuaWeiOBS.prototype.putObject = function (object, callback, options) {
    var errorMessage = objectPropertyIsCorrect(object, ['endPoint', 'bucket', 'objectKey', 'objectLocalPath']);
    if (errorMessage) {

        this.success(callback.error(object, errorMessage));
        return;
    }
    exec(this.success(callback), this.success(callback), "MHuaWeiOBS", "putObject", [object, options]);
};

// 头请求
MHuaWeiOBS.prototype.headObject = function (object, success, error, options) {
    var errorMessage = objectPropertyIsCorrect(object, ['endPoint', 'bucket', 'objectKey']);
    if (errorMessage) {

        error(errorMessage);
        return;
    }
    exec(success, error, "MHuaWeiOBS", "headObject", [object, options]);
};

var me = new MHuaWeiOBS();
module.exports = me;
});
