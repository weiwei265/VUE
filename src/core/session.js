
let storage = window.sessionStorage;
console.log(storage);
let _uid = 'ss_api_key';

if (!storage) {
    console.error('This browser does NOT support sessionStorage!');
    // return;
}

if (!storage[_uid]) {
    var obj = {};
    storage[_uid] = JSON.stringify(obj);
}

export default {
    set: function (key, value) { // 设置某个已保存的键值
        var obj = JSON.parse(storage.getItem(_uid));
        obj[key] = value;
        storage[_uid] = JSON.stringify(obj);
    },
    get: function (key) { // 获取某个已保存的键值
        if (!this.has()) return;
        var obj = JSON.parse(storage.getItem(_uid));
        if (obj.hasOwnProperty(key)) {
            return obj[key];
        }
        return null;
    },
    has: function () {
        var v = storage.getItem(_uid);
        var obj = JSON.parse(v);
        if (typeof obj !== 'object' || obj == null) {
            return false;
        }
        return true;
    },
    remove: function (key) {
        storage.removeItem(key);
    },
    clear: function () {
        storage.clear();
    }
};
