webpackJsonp([6],{"2U82":function(e,n,t){"use strict";n.a=function(){i?(d("wehaicao://"),setTimeout(function(){window.location.href=s},2e3)):(d("wehaicao://"),setTimeout(function(){window.location.href=u},2e3))};var o=navigator.userAgent.toLowerCase(),i=null!=o.match(/(iPhone|iPod)/i),a=(o.match(/Android/i),i&&-1==o.indexOf("os 8")&&-1==o.indexOf("os 7")&&-1==o.indexOf("os 6")&&-1==o.indexOf("os 5")),r=-1!=o.indexOf("micromessenger"),c=-1!=o.indexOf("mailapp"),s=(o.indexOf("QQ"),"https://itunes.apple.com/app/id1444731347"),u="https://a.app.qq.com/o/simple.jsp?pkgname=com.billionstech.grassbook";function d(e){try{if(void 0==e||""==e||0!=e.indexOf("wehaicao://"))return void console.log("路径有问题");r||c?window.location.href=i?e:u:o.indexOf(" qq")>-1&&o.indexOf("mqqbrowser")<0?(o.indexOf("iphone")>-1||o.indexOf("mac"),window.location.href=e):function(e){i&&a?location.href=e:p(e)}(e)}catch(e){alert(e)}}function p(e){var n=document.createElement("iframe");n.src=e,n.style.display="none",document.body.appendChild(n),setTimeout(function(){document.body.removeChild(n)},2e3)}},"5OHe":function(e,n){},"8OKJ":function(e,n){},CJFh:function(e,n){},Hu3T:function(e,n){},IcnI:function(e,n,t){"use strict";var o=t("/xf8"),i=t("9rMa"),a=t("TuU3");function r(){return a.a.get("authToken")}t("X2Oc");var c=t("myXI"),s=t.n(c),u=navigator.userAgent,d=window.navigator.userAgent.toLowerCase(),p="";p="test-card.zuanliantech.com"==window.location.hostname?s.a.devIp:(window.location.hostname,s.a.prodIp);var f={state:{isAndroid:u.indexOf("Android")>-1||u.indexOf("Linux")>-1,isIOS:!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),isWeChat:"micromessenger"==d.match(/MicroMessenger/i),imgIp:p,publicKey:"MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA+erZj3EmG+FHdOcCGt1JJqpoz7ZPzDGB1ZvmMAMtbGF8RRRwNfglA6no/kF3ZYGmsP+ykT4LzbKdFX0xOUptuKaFm7eHRhYwSQbF7s+QrsD5g+hSmh/Ylpk4jJJvCd1vGGSxlr6tn50zHRZTX0QJt2zp0AymvjpMemwd70VWwpAOtX2tZ7rrLuwV+vgq+xuhMFe9KURedVKGflka8p7dDmhzHqa62EAr6McrGFtOhhYBIIMCafo53Mzp0Dv4DINSfDd6bfu9OJyu5U4ZswNgXyciro2fgK3/PnF7HRcMSGkl85B3kh1TPQI8TevY4f6jb+ovA+hCG/9MrE+T/CABbQIDAQAB"},mutations:{SET_CODE:function(e,n){e.code=n,function(e){a.a.set("code",e)}(n)}},actions:{setCode:function(e,n){(0,e.commit)("SET_CODE",n)}}},l=t("rVsN"),h=t.n(l),m=t("aozt"),g=t.n(m),w=t("wSez"),v={200:"服务器成功返回请求的数据。",400:"请求出现语法错误,一般是请求参数不对。",401:"未授权，请重新登录",403:"资源不可用",404:"无法找到指定位置的资源",405:"请求方法未允许",408:"请求超时",500:"服务器内部错误,请联系Java后台开发人员!!!",501:"网络未实现。",502:"网络错误",503:"服务不可用",504:"网络超时",505:"http版本不支持该请求"},b=g.a.create({baseURL:"/api",timeout:2e4});b.interceptors.request.use(function(e){return e.headers={"Content-Type":"application/json;charset=UTF-8",token:r()},e},function(e){console.log(e),h.a.reject(e)}),b.interceptors.response.use(function(e){if(200===e.status){if(200==e.data.code)return e.headers.verifycodekey&&(e.data.verifyCodeKey=e.headers.verifycodekey),e.data;if("9017035"==e.data.code||"9017033"==e.data.code);else{switch(e.data.code){case 700:setTimeout(function(){console.log("获取微信code")},3e3)}Object(w.Toast)(e.data.message)}return e.data}Object(w.Toast)(v[e.status]||"连接错误"+e.status)},function(e){return e.message=v[e.response.status]||"连接错误"+e.response.status,console.log("err"+e),h.a.reject(e)});var I=b;var A={state:{token:r(),userInfo:{},sharerUserId:a.a.get("sharerUserId")||"",bindingPhone:a.a.get("bindingPhone")||"",bindingPublic:a.a.get("bindingPublic")||""},mutations:{SET_TOKEN:function(e,n){var t;e.token=n.token,t=n.token,a.a.set("authToken",t)},SET_INFO:function(e,n){e.sharerUserId=n.id,a.a.set("sharerUserId",n.id),e.bindingPhone=n.bindingPhone,a.a.set("bindingPhone",n.bindingPhone),e.bindingPublic=n.bindingPublic,a.a.set("bindingPublic",n.bindingPublic)}},actions:{Login:function(e,n){var t=e.commit;return function(e){var n=e;return I({url:s.a.login,data:n,method:"post"})}(n).then(function(e){if("200"!=e.code)return w.MessageBox.alert(e.message),!1;t("SET_TOKEN",e.data),t("SET_INFO",e.data)})}}},O={app:function(e){return e.app},user:function(e){return e.user}};o.default.use(i.a);var T=new i.a.Store({modules:{app:f,user:A},getters:O});n.a=T},IenS:function(e,n,t){"use strict";(function(e){n.b=i,n.a=c;var o=t("X1H5");t.n(o);function i(e){e=e||32;for(var n="ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",t=n.length,o="",i=0;i<e;i++)o+=n.charAt(Math.floor(Math.random()*t));return o}var a=0,r=8;function c(e){return h(s(l(e),e.length*r))}function s(e,n){e[n>>5]|=128<<24-n%32,e[15+(n+64>>9<<4)]=n;for(var t=Array(80),o=1732584193,i=-271733879,a=-1732584194,r=271733878,c=-1009589776,s=0;s<e.length;s+=16){for(var l=o,h=i,m=a,g=r,w=c,v=0;v<80;v++){t[v]=v<16?e[s+v]:f(t[v-3]^t[v-8]^t[v-14]^t[v-16],1);var b=p(p(f(o,5),u(v,i,a,r)),p(p(c,t[v]),d(v)));c=r,r=a,a=f(i,30),i=o,o=b}o=p(o,l),i=p(i,h),a=p(a,m),r=p(r,g),c=p(c,w)}return Array(o,i,a,r,c)}function u(e,n,t,o){return e<20?n&t|~n&o:e<40?n^t^o:e<60?n&t|n&o|t&o:n^t^o}function d(e){return e<20?1518500249:e<40?1859775393:e<60?-1894007588:-899497514}function p(e,n){var t=(65535&e)+(65535&n);return(e>>16)+(n>>16)+(t>>16)<<16|65535&t}function f(e,n){return e<<n|e>>>32-n}function l(e){for(var n=Array(),t=(1<<r)-1,o=0;o<e.length*r;o+=r)n[o>>5]|=(e.charCodeAt(o/r)&t)<<24-o%32;return n}function h(e){for(var n=a?"0123456789ABCDEF":"0123456789abcdef",t="",o=0;o<4*e.length;o++)t+=n.charAt(e[o>>2]>>8*(3-o%4)+4&15)+n.charAt(e[o>>2]>>8*(3-o%4)&15);return t}}).call(n,t("L7Pj"))},NHnr:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var o=t("/xf8"),i={render:function(){var e=this.$createElement,n=this._self._c||e;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},staticRenderFns:[]};var a=t("C7Lr")({name:"App",methods:{}},i,!1,function(e){t("Hu3T")},null,null).exports,r=t("KGCO");o.default.use(r.a);var c=new r.a({routes:[{path:"/countDown",component:function(){return t.e(1).then(t.bind(null,"qPM6"))}},{path:"/init",component:function(){return t.e(3).then(t.bind(null,"dWTC"))}},{path:"/zhuce",component:function(){return t.e(4).then(t.bind(null,"uFm/"))}},{path:"/gassgame",component:function(){return t.e(0).then(t.bind(null,"10Cu"))}},{path:"*",component:function(){return t.e(2).then(t.bind(null,"+H76"))}}]}),s=t("IcnI");o.default.filter("volume",function(e){var n=Number(e);return n>1e4?(n/1e4).toFixed(1)+"万+":n});var u=t("wSez"),d=t.n(u);t("5OHe"),t("CJFh"),t("8OKJ");o.default.config.productionTip=!1,o.default.use(d.a),new o.default({el:"#app",router:c,store:s.a,components:{App:a},template:"<App/>"})},TuU3:function(e,n,t){"use strict";t.d(n,"a",function(){return i});var o=t("3cXf"),i=(t.n(o),{set:function(e,n){var t=new Date;t.setHours(t.getHours()+168),console.log(t.toGMTString()),document.cookie=e+"="+n+";expires="+t.toGMTString()+";path=/"},get:function(e){for(var n,t=document.cookie.replace(/[ ]/g,"").split(";"),o=0;o<t.length;o++){var i=t[o].split("=");if(e==i[0]){n=i[1];break}}return n}})},X2Oc:function(e,n,t){"use strict";(function(e){n.a=function(){for(var e=window.location.href.lastIndexOf("?")+1,n=window.location.href.substring(e).split("&"),t={},o=0;o<n.length;o++){var i=n[o].split("=");i.length<2?t[i[0]]="":t[i[0]]=i[1]}return t},n.b=function(){i.a.getters.app.code||(a.Indicator.open(),window.location.href="http://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3c1a020f0ec2a5cd&redirect_uri=http%3a%2f%2fh5.redview.com.cn%2findex.html%23%2fgassgame&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect")},n.c=function(n,t,o,i){console.log(n);var a,c=(new Date).valueOf(),u=Object(r.b)(16),d=window.location.href;e.ajax({url:"/rapi/wechats/jsapi_ticket?appid="+appId(),type:"get",dataType:"json",success:function(e){var n="jsapi_ticket="+e.ticket+"&noncestr="+u+"&timestamp="+c+"&url="+d;a=Object(r.a)(n),s.a.config({debug:!1,appId:appId(),timestamp:c,nonceStr:u,signature:a,jsApiList:["onMenuShareAppMessage","onMenuShareTimeline","onMenuShareWeibo","hideMenuItems","showMenuItems","hideAllNonBaseMenuItem","showAllNonBaseMenuItem","translateVoice","startRecord","stopRecord","onRecordEnd","playVoice","pauseVoice","stopVoice","uploadVoice","downloadVoice","chooseImage","previewImage","uploadImage","downloadImage","getNetworkType","openLocation","getLocation","hideOptionMenu","showOptionMenu","closeWindow","scanQRCode","chooseWXPay","openProductSpecificView","addCard","chooseCard","openCard"]})}}),s.a.checkJsApi({jsApiList:["updateAppMessageShareData","updateTimelineShareData"],success:function(e){}}),s.a.ready(function(){s.a.onMenuShareTimeline({title:n,link:o.split("#")[0].split("?")[0]+"#"+o.split("#")[1],imgUrl:i,success:function(){}}),s.a.onMenuShareAppMessage({title:n,desc:t,link:o.split("#")[0].split("?")[0]+"#"+o.split("#")[1],imgUrl:i,success:function(){}})})};t("TuU3");var o=t("myXI"),i=(t.n(o),t("IcnI")),a=t("wSez"),r=(t.n(a),t("IenS")),c=t("X1H5"),s=t.n(c);t("2U82")}).call(n,t("L7Pj"))},myXI:function(e,n){e.exports={testUrl:"test-card.zuanliantech.com",devIp:"http://10.3.201.6:8888",prodIp:"http://i0.wehaicao.com/"}}},["NHnr"]);
//# sourceMappingURL=app.63041fbd1dc272ff7ff6.js.map