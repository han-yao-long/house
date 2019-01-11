//    随机数
function randomString(len) {
  　　len = len || 32;
  　　var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';   
/****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  　　var maxPos = $chars.length;
  　　var pwd = '';
  　　for (i = 0; i < len; i++) {
  　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  　　}
  　　return pwd;
                       }
/*
* A JavaScript implementation of the Secure Hash Algorithm, SHA-1, as defined
* in FIPS PUB 180-1
* Version 2.1-BETA Copyright Paul Johnston 2000 - 2002.
* Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
* Distributed under the BSD License
* See http://pajhome.org.uk/crypt/md5 for details.
*/
/*
* Configurable variables. You may need to tweak these to be compatible with
* the server-side, but the defaults work in most cases.
*/
var hexcase = 0; /* hex output format. 0 - lowercase; 1 - uppercase     */
var b64pad = ""; /* base-64 pad character. "=" for strict RFC compliance  */
var chrsz = 8; /* bits per input character. 8 - ASCII; 16 - Unicode    */
/*
* These are the functions you'll usually want to call
* They take string arguments and return either hex or base-64 encoded strings
*/
function hex_sha1(s) {
return binb2hex(core_sha1(str2binb(s), s.length * chrsz));
}
function b64_sha1(s) {
return binb2b64(core_sha1(str2binb(s), s.length * chrsz));
}
function str_sha1(s) {
return binb2str(core_sha1(str2binb(s), s.length * chrsz));
}
function hex_hmac_sha1(key, data) {
return binb2hex(core_hmac_sha1(key, data));
}
function b64_hmac_sha1(key, data) {
return binb2b64(core_hmac_sha1(key, data));
}
function str_hmac_sha1(key, data) {
return binb2str(core_hmac_sha1(key, data));
}
/*
* Perform a simple self-test to see if the VM is working
*/
function sha1_vm_test() {
return hex_sha1("abc") == "a9993e364706816aba3e25717850c26c9cd0d89d";
}
/*
* Calculate the SHA-1 of an array of big-endian words, and a bit length
*/
function core_sha1(x, len) {
/* append padding */
x[len >> 5] |= 0x80 << (24 - len % 32);
x[((len + 64 >> 9) << 4) + 15] = len;
var w = Array(80);
var a = 1732584193;
var b = -271733879;
var c = -1732584194;
var d = 271733878;
var e = -1009589776;
for (var i = 0; i < x.length; i += 16) {
var olda = a;
var oldb = b;
var oldc = c;
var oldd = d;
var olde = e;
for (var j = 0; j < 80; j++) {
if (j < 16) w[j] = x[i + j];
else w[j] = rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
var t = safe_add(safe_add(rol(a, 5), sha1_ft(j, b, c, d)), safe_add(safe_add(e, w[j]), sha1_kt(j)));
e = d;
d = c;
c = rol(b, 30);
b = a;
a = t;
}
a = safe_add(a, olda);
b = safe_add(b, oldb);
c = safe_add(c, oldc);
d = safe_add(d, oldd);
e = safe_add(e, olde);
}
return Array(a, b, c, d, e);
}
/*
* Perform the appropriate triplet combination function for the current
* iteration
*/
function sha1_ft(t, b, c, d) {
if (t < 20) return (b & c) | ((~b) & d);
if (t < 40) return b ^ c ^ d;
if (t < 60) return (b & c) | (b & d) | (c & d);
return b ^ c ^ d;
}
/*
* Determine the appropriate additive constant for the current iteration
*/
function sha1_kt(t) {
return (t < 20) ? 1518500249 : (t < 40) ? 1859775393 : (t < 60) ? -1894007588 : -899497514;
}
/*
* Calculate the HMAC-SHA1 of a key and some data
*/
function core_hmac_sha1(key, data) {
var bkey = str2binb(key);
if (bkey.length > 16) bkey = core_sha1(bkey, key.length * chrsz);
var ipad = Array(16),
opad = Array(16);
for (var i = 0; i < 16; i++) {
ipad[i] = bkey[i] ^ 0x36363636;
opad[i] = bkey[i] ^ 0x5C5C5C5C;
}
var hash = core_sha1(ipad.concat(str2binb(data)), 512 + data.length * chrsz);
return core_sha1(opad.concat(hash), 512 + 160);
}
/*
* Add integers, wrapping at 2^32. This uses 16-bit operations internally
* to work around bugs in some JS interpreters.
*/
function safe_add(x, y) {
var lsw = (x & 0xFFFF) + (y & 0xFFFF);
var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
return (msw << 16) | (lsw & 0xFFFF);
}
/*
* Bitwise rotate a 32-bit number to the left.
*/
function rol(num, cnt) {
return (num << cnt) | (num >>> (32 - cnt));
}
/*
* Convert an 8-bit or 16-bit string to an array of big-endian words
* In 8-bit function, characters >255 have their hi-byte silently ignored.
*/
function str2binb(str) {
var bin = Array();
var mask = (1 << chrsz) - 1;
for (var i = 0; i < str.length * chrsz; i += chrsz)
bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i % 32);
return bin;
}
/*
* Convert an array of big-endian words to a string
*/
function binb2str(bin) {
var str = "";
var mask = (1 << chrsz) - 1;
for (var i = 0; i < bin.length * 32; i += chrsz)
str += String.fromCharCode((bin[i >> 5] >>> (24 - i % 32)) & mask);
return str;
}
/*
* Convert an array of big-endian words to a hex string.
*/
function binb2hex(binarray) {
var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
var str = "";
for (var i = 0; i < binarray.length * 4; i++) {
str += hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8 + 4)) & 0xF) + hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8)) & 0xF);
}
return str;
}
/*
* Convert an array of big-endian words to a base-64 string
*/
function binb2b64(binarray) {
var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var str = "";
for (var i = 0; i < binarray.length * 4; i += 3) {
var triplet = (((binarray[i >> 2] >> 8 * (3 - i % 4)) & 0xFF) << 16) | (((binarray[i + 1 >> 2] >> 8 * (3 - (i + 1) % 4)) & 0xFF) << 8) | ((binarray[i + 2 >> 2] >> 8 * (3 - (i + 2) % 4)) & 0xFF);
for (var j = 0; j < 4; j++) {
if (i * 8 + j * 6 > binarray.length * 32) str += b64pad;
else str += tab.charAt((triplet >> 6 * (3 - j)) & 0x3F);
}
}
return str;
} 
var imgUrl = encodeURI('http://www.wehaicao.com/images/wxicon.jpg'); // 分享后展示的一张图片         
// var imgUrl =  'http://cdn-app-qn.colorv.cn/img/test/f511d8de5f770e35b1e6ba681115e0476b0a9e807d7c3-Xle0kk_fw658_36cfdf43fbe1c09187046ba228acb0c9.jpg'
var lineLink = location.href; // 点击分享后跳转的页面地址 可以写 var lineLin = location.href;
var descContent = "海草公社-大众推荐的消费攻略"; // 分享后的描述信息
var shareTitle = '海草公社app官方网站（wehaicao.com），一个既能赚钱，又会省钱的阅读APP。“海草公社”是一款新形式的资讯阅读软件，整合了平台、媒体、用户之间的各个资源，使其达成合作共赢。平台以移动应用APP+微信小程序为载体，鼓励用户阅读、分享、发现、创作，努力使阅读变得更有价值。'; // 分享后的标题
// 生成签名时间戳
var timestamp = (new Date()).valueOf();
// 生成签名随机串
var nonceStr = randomString(16);
// 签名
 // 签名
var signature
var url = window.location.href
console.log(url)
$.ajax({
url: '/rapi/wechats/jsapi_ticket',
type: 'get',
dataType: 'json',
success: function(resp) {
var string1 = "jsapi_ticket=" + resp.ticket +  "&noncestr=" + nonceStr + "&timestamp=" + timestamp + "&url=" + url
 signature = hex_sha1(string1)
wx.config({
debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
appId: 'wx8ec0673d2b219cc3', // 必填，公众号的唯一标识
timestamp: timestamp, // 必填，生成签名的时间戳
nonceStr: nonceStr, // 必填，生成签名的随机串
signature: signature, // 必填，签名，见附录1
jsApiList:[
          'onMenuShareTimeline',
          'onMenuShareAppMessage',
          'onMenuShareQQ',
          'onMenuShareWeibo',
          'hideMenuItems',
          'showMenuItems',
          'hideAllNonBaseMenuItem',
          'showAllNonBaseMenuItem',
          'translateVoice',
          'startRecord',
          'stopRecord',
          'onRecordEnd',
          'playVoice',
          'pauseVoice',
          'stopVoice',
          'uploadVoice',
          'downloadVoice',
          'chooseImage',
          'previewImage',
          'uploadImage',
          'downloadImage',
          'getNetworkType',
          'openLocation',
          'getLocation',
          'hideOptionMenu',
          'showOptionMenu',
          'closeWindow',
          'scanQRCode',
          'chooseWXPay',
          'openProductSpecificView',
          'addCard',
          'chooseCard',
          'openCard'
    ] // 必填，需要使用的JS接口列表,，所有JS接口列表见附录2 // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
});
}
});
wx.ready(function(){
wx.updateAppMessageShareData({
desc: descContent, // 分享描述
// 分享图标
type: '', // 分享类型,music、video或link，不填默认为link
dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
title: shareTitle, // 分享标题
link: lineLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
imgUrl: imgUrl, // 分享图标
success: function() {
// 用户确认分享后执行的回调函数
},
cancel: function () {
    // 用户取消分享后执行的回调函数
}   
});
updateTimelineShareData({
 desc: descContent, // 分享描述
// 分享图标
type: '', // 分享类型,music、video或link，不填默认为link
dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
title: shareTitle, // 分享标题
link: lineLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
imgUrl: imgUrl, // 分享图标
success: function() {
// 用户确认分享后执行的回调函数
},
cancel: function () {
    // 用户取消分享后执行的回调函数
}   
});
// 分享给朋友
wx.onMenuShareAppMessage({
desc: descContent, // 分享描述
// 分享图标
type: '', // 分享类型,music、video或link，不填默认为link
dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
title: shareTitle, // 分享标题
link: lineLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
imgUrl: imgUrl, // 分享图标
success: function() {
// 用户确认分享后执行的回调函数
},

cancel: function () {

    // 用户取消分享后执行的回调函数

}

});

// 分享到朋友圈
wx.onMenuShareTimeline({
desc: descContent, // 分享描述
title: shareTitle, // 分享标题
link: lineLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
imgUrl: imgUrl, // 分享图标
success: function() {
// 用户确认分享后执行的回调函数
},

});
//  分享到QQ

wx.onMenuShareQQ({

title: shareTitle, // 分享标题

desc: descContent, // 分享描述

link: lineLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致

imgUrl: imgUrl, // 分享图标

success: function() {

// 用户确认分享后执行的回调函数

},

});


// 分享到微博
wx.onMenuShareWeibo({

title: shareTitle, // 分享标题

desc: descContent, // 分享描述

link: lineLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致

imgUrl: imgUrl, // 分享图标

success: function() {

// 用户确认分享后执行的回调函数
},

});
//  qq空间
wx.onMenuShareQZone({
title: shareTitle, // 分享标题

desc: descContent, // 分享描述

link: lineLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致

imgUrl: imgUrl, // 分享图标

success: function() {
// 用户确认分享后执行的回调函数
},

});

});
