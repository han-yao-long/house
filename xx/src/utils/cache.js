// 缓存插件

// 设置cookie缓存
export let cookie = {
  set: function (key, val) {
    var date = new Date();
    var expiresHours = 24 * 7;
    date.setHours(date.getHours() + (24 * 7));
    console.log(date.toGMTString());
    document.cookie = key + "=" + val + ";expires=" + date.toGMTString() + ";path=/";
  },
  get: function (key) {
    var getCookie = document.cookie.replace(/[ ]/g, "");
    var arrCookie = getCookie.split(";")
    var tips;
    for (var i = 0; i < arrCookie.length; i++) {
      var arr = arrCookie[i].split("=");
      if (key == arr[0]) {
        tips = arr[1];
        break;
      }
    }
    return tips;
  }
}

// 设置localStorage缓存
export let local_storage = {
  set:function (key,val) {
    return localStorage.setItem(key,JSON.stringify(val))
  },
  get:function (key) {
    return JSON.parse(localStorage.getItem(key))
  },
  remove:function (key) {
    return localStorage.remove(key)
  },
  clear:function () {
    return localStorage.clear()
  }
}

// 设置sessionStorage缓存
export let session_storage = {
  set:function (key,val) {
    return sessionStorage.setItem(key,JSON.stringify(val))
  },
  get:function (key) {
    return JSON.parse(sessionStorage.getItem(key))
  },
  remove:function (key) {
    return sessionStorage.removeItem(key)
  },
  clear:function () {
    return sessionStorage.clear()
  }
}
