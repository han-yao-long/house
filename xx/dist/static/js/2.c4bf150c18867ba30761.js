webpackJsonp([2],{"/dsf":function(t,e,s){"use strict";var i={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"alerts"},[e("div",{staticClass:"mask",on:{click:this.closeAlsert}},[e("div",{staticClass:"alerts",on:{click:function(t){t.stopPropagation()}}},[e("span",{staticClass:"close",on:{click:this.closeAlsert}}),this._v(" "),e("img",{staticClass:"tit",attrs:{src:s("KISI"),alt:""}}),this._v(" "),this._m(0)])])])},staticRenderFns:[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"texts"},[s("p",{staticClass:"item-tit"},[t._v("活动时间：")]),t._v(" "),s("p",{staticClass:"item-disc"},[t._v("2019年1月20日08:30-2019年2月28日24:00")]),t._v(" "),s("p",{staticClass:"item-disc"},[t._v("活动区域")]),t._v(" "),s("p",{staticClass:"item-tit"},[t._v("大陆地区（不含港澳台）")]),t._v(" "),s("p",{staticClass:"item-tit"},[t._v("夺金步骤：")]),t._v(" "),s("p",{staticClass:"item-tit"},[t._v("1、参与方式：")]),t._v(" "),s("p",{staticClass:"item-disc"},[t._v("@伊利各销售大区的业务员，只需每日上传优酸乳堆头剥离前后对比照片，即有机会成为终极锦鲤宝宝。")]),t._v(" "),s("p",{staticClass:"item-tit"},[t._v("2、活动说明：")]),t._v(" "),s("p",{staticClass:"item-disc"},[t._v("每日上传3组优酸乳堆头剥离前后对比照片，即可获得抽奖机会；持续参与活动的业务员，既有机会夺取终极锦鲤宝宝-现金大奖。")]),t._v(" "),s("p",{staticClass:"item-tit"},[t._v("好运等级：")]),t._v(" "),s("p",{staticClass:"item-disc"},[t._v("幸运锦鲤宝宝：神秘好礼")]),t._v(" "),s("p",{staticClass:"item-disc"},[t._v("周锦鲤宝宝：2888元现金")]),t._v(" "),s("p",{staticClass:"item-disc"},[t._v("终极锦鲤宝宝：5888元现金")]),t._v(" "),s("p",{staticClass:"item-bottoms"},[s("span",[t._v("备注：")]),t._v("每天下午8点，系统会及时更新周锦鲤宝宝排名和终极锦鲤宝宝排名哦~\n        ")]),t._v(" "),s("p",{staticClass:"item-bottoms"},[s("span",[t._v("活动期间，可不要有作弊行为哦~各销售大区的任何一名锦鲤宝宝如有作弊行为，都将取消夺金资格。")])])])}]};var a=s("C7Lr")({methods:{closeAlsert:function(){this.$emit("closeAlsert")}}},i,!1,function(t){s("7m0+")},"data-v-2f261d8d",null);e.a=a.exports},"10Cu":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s("pk43"),a={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"guss_loading"}},[i("img",{staticClass:"music",attrs:{src:s("sxLT"),alt:""},on:{click:t.plays}}),t._v(" "),i("div",{staticClass:"videobod"},[i("video",{ref:"video",attrs:{"x5-video-player-type":"h5","x5-video-player-fullscreen":"true",id:"video",src:t.audioVoice}})]),t._v(" "),i("img",{staticClass:"head",attrs:{src:s("OYYD"),alt:""}}),t._v(" "),i("div",{staticClass:"bodys"},[t.isLoading?i("div",[i("img",{staticClass:"discc",attrs:{src:s("JQGJ"),alt:""}}),t._v(" "),t._m(0)]):i("div",[i("div",{staticClass:"fengmian-all"},[i("fengmian",{on:{openVideos:t.openvideoss,openAlert:function(e){t.isAlert=!0}}})],1)])]),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:t.isAlert,expression:"isAlert"}],staticClass:"alert-all"},[i("alerts",{on:{closeAlsert:function(e){t.isAlert=!1}}})],1),t._v(" "),i("audio",{ref:"audios",attrs:{preload:"auto",id:"audioss",loop:"loop"}},[i("source",{attrs:{src:t.audioVoices,type:"audio/mpeg"}})])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"box"},[e("img",{staticClass:"fish",attrs:{src:s("OlNT"),alt:""}}),this._v(" "),e("div",{staticClass:"loading-box"},[this._v("loading\n          "),e("div",{staticClass:"color-loading"})])])}]};var n=function(t){s("zFyJ")},o=s("C7Lr")(i.a,a,!1,n,"data-v-3409950e",null);e.default=o.exports},"3Tg4":function(t,e){},"7m0+":function(t,e){},"9r/T":function(t,e,s){(function(t){var i=void 0!==t&&t||"undefined"!=typeof self&&self||window,a=Function.prototype.apply;function n(t,e){this._id=t,this._clearFn=e}e.setTimeout=function(){return new n(a.call(setTimeout,i,arguments),clearTimeout)},e.setInterval=function(){return new n(a.call(setInterval,i,arguments),clearInterval)},e.clearTimeout=e.clearInterval=function(t){t&&t.close()},n.prototype.unref=n.prototype.ref=function(){},n.prototype.close=function(){this._clearFn.call(i,this._id)},e.enroll=function(t,e){clearTimeout(t._idleTimeoutId),t._idleTimeout=e},e.unenroll=function(t){clearTimeout(t._idleTimeoutId),t._idleTimeout=-1},e._unrefActive=e.active=function(t){clearTimeout(t._idleTimeoutId);var e=t._idleTimeout;e>=0&&(t._idleTimeoutId=setTimeout(function(){t._onTimeout&&t._onTimeout()},e))},s("AYvJ"),e.setImmediate="undefined"!=typeof self&&self.setImmediate||void 0!==t&&t.setImmediate||this&&this.setImmediate,e.clearImmediate="undefined"!=typeof self&&self.clearImmediate||void 0!==t&&t.clearImmediate||this&&this.clearImmediate}).call(e,s("9AUj"))},AYvJ:function(t,e,s){(function(t,e){!function(t,s){"use strict";if(!t.setImmediate){var i,a,n,o,c,r=1,d={},f=!1,u=t.document,l=Object.getPrototypeOf&&Object.getPrototypeOf(t);l=l&&l.setTimeout?l:t,"[object process]"==={}.toString.call(t.process)?i=function(t){e.nextTick(function(){m(t)})}:!function(){if(t.postMessage&&!t.importScripts){var e=!0,s=t.onmessage;return t.onmessage=function(){e=!1},t.postMessage("","*"),t.onmessage=s,e}}()?t.MessageChannel?((n=new MessageChannel).port1.onmessage=function(t){m(t.data)},i=function(t){n.port2.postMessage(t)}):u&&"onreadystatechange"in u.createElement("script")?(a=u.documentElement,i=function(t){var e=u.createElement("script");e.onreadystatechange=function(){m(t),e.onreadystatechange=null,a.removeChild(e),e=null},a.appendChild(e)}):i=function(t){setTimeout(m,0,t)}:(o="setImmediate$"+Math.random()+"$",c=function(e){e.source===t&&"string"==typeof e.data&&0===e.data.indexOf(o)&&m(+e.data.slice(o.length))},t.addEventListener?t.addEventListener("message",c,!1):t.attachEvent("onmessage",c),i=function(e){t.postMessage(o+e,"*")}),l.setImmediate=function(t){"function"!=typeof t&&(t=new Function(""+t));for(var e=new Array(arguments.length-1),s=0;s<e.length;s++)e[s]=arguments[s+1];var a={callback:t,args:e};return d[r]=a,i(r),r++},l.clearImmediate=v}function v(t){delete d[t]}function m(t){if(f)setTimeout(m,0,t);else{var e=d[t];if(e){f=!0;try{!function(t){var e=t.callback,i=t.args;switch(i.length){case 0:e();break;case 1:e(i[0]);break;case 2:e(i[0],i[1]);break;case 3:e(i[0],i[1],i[2]);break;default:e.apply(s,i)}}(e)}finally{v(t),f=!1}}}}}("undefined"==typeof self?void 0===t?this:t:self)}).call(e,s("9AUj"),s("V0EG"))},CUyz:function(t,e,s){t.exports=s.p+"static/img/fengmian-leight.d2d97e7.png"},FZ8z:function(t,e,s){t.exports=s.p+"static/img/fengmian-tit.368506b.png"},JQGJ:function(t,e,s){t.exports=s.p+"static/img/disc.14c33cc.png"},KISI:function(t,e,s){t.exports=s.p+"static/img/tit.c8a8795.png"},OYYD:function(t,e,s){t.exports=s.p+"static/img/head.52abb9f.png"},OlNT:function(t,e,s){t.exports=s.p+"static/img/fish.d6c966f.png"},cmKv:function(t,e){t.exports="data:image/png;base64,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"},dGGx:function(t,e,s){t.exports=s.p+"static/img/fengmian-btn.e4a9bcc.png"},fgzp:function(t,e,s){"use strict";s("wSez");var i={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"fengmian"},[e("img",{staticClass:"light",attrs:{src:s("CUyz"),alt:""}}),this._v(" "),e("img",{staticClass:"tit",attrs:{src:s("FZ8z"),alt:""},on:{click:this.openVideo}}),this._v(" "),e("img",{staticClass:"heads",attrs:{src:s("cmKv"),alt:""}}),this._v(" "),e("img",{staticClass:"btn",attrs:{src:s("dGGx"),alt:""},on:{click:this.openAtert}}),this._v(" "),e("div",{staticClass:"doms"})])},staticRenderFns:[]};var a=s("C7Lr")({methods:{openAtert:function(){this.$emit("openAlert")},openVideo:function(){this.$emit("openVideos")}}},i,!1,function(t){s("3Tg4")},"data-v-bdf51c2c",null);e.a=a.exports},l364:function(t,e,s){t.exports=s.p+"static/media/audio.f024d1b.mp4"},pk43:function(t,e,s){"use strict";(function(t){var i=s("aozt"),a=s.n(i),n=s("wSez"),o=(s.n(n),s("9r/T")),c=(s.n(o),s("X2Oc")),r=s("fgzp"),d=s("/dsf"),f=(s("t5DY"),s("TuU3"));e.a={data:function(){return{isLoading:!0,isAlert:!1,audioVoice:s("l364"),audioVoices:s("Ybrj"),isVideo:!1,userMsg:{is_new_user:!0,open_id:""},canMusic:!0}},components:{fengmian:r.a,alerts:d.a,Indicator:n.Indicator},methods:{loading:function(){var e=.1,s=-5,i=this,a=Object(o.setInterval)(function(){s+=.05,(e+=.05)>=5&&(Object(o.clearInterval)(a),Object(o.setTimeout)(function(){i.isLoading=!1},500)),t(".fish").css({left:e+"rem"}),t(".color-loading").css({left:s+"rem"})},18)},wxAuths:function(){var e=this,s=Object(c.a)().code;s?(this.wxtoken(s),document.addEventListener("WeixinJSBridgeReady",function(){e.$refs.audios.play(),t(".music").toggleClass("rotate")},!1)):Object(c.b)()},plays:function(){this.canMusic?(this.$refs.audios.pause(),this.canMusic=!1):(this.$refs.audios.play(),this.canMusic=!0),t(".music").toggleClass("rotate")},openvideoss:function(){this.isVideo=!0,t("#video").css({"z-index":6666}),this.$refs.video.play(),t("#video")[0].play();var e=this;Object(o.setTimeout)(function(){e.playMusic()},1e3)},playMusic:function(){var e=this.$refs.video,s=this;null!=navigator.userAgent.toLowerCase().match(/(iPhone|iPod)/i)?e.addEventListener("ended",function(){s.userMsg.is_new_user?s.$router.push({path:"/zhuce",query:s.userMsg}):s.$router.push({path:"/updateimg",query:s.userMsg})},!1):Object(o.setTimeout)(function(){t("#video").css({display:"none"}),t(".videobod").css({display:"none"}),s.userMsg.is_new_user?s.$router.push({path:"/zhuce",query:s.userMsg}):s.$router.push({path:"/updateimg",query:s.userMsg})},5e3)},wxtoken:function(t){n.Indicator.open();var e=this;a.a.get("/api/api/users/get_access_token",{params:{code:t}}).then(function(t){n.Indicator.close(),e.userMsg.is_new_user=t.data.is_new_user,e.userMsg.open_id=t.data.open_id,f.a.set("open_id",t.data.open_id)}).catch(function(t){console.log(t)})}},mounted:function(){this.loading(),this.wxAuths();var e=this;document.addEventListener("WeixinJSBridgeReady",function(){e.$refs.audios.play(),t(".music").toggleClass("rotate")},!1)},created:function(){-1!=navigator.userAgent.toLowerCase().indexOf("micromessenger")||n.MessageBox.alert("请在微信内打开","提示")}}}).call(e,s("L7Pj"))},zFyJ:function(t,e){}});
//# sourceMappingURL=2.c4bf150c18867ba30761.js.map