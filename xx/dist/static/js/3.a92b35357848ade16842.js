webpackJsonp([3],{"3Ulx":function(t,e){},WpAC:function(t,e,s){"use strict";(function(t){var i=s("t5DY"),n=s("aozt"),o=s.n(n),a=s("wSez"),c=(s.n(a),s("TuU3"));e.a={components:{Indicator:a.Indicator,MessageBox:a.MessageBox,Picker:a.Picker,Button:a.Button},data:function(){return{msg:{phone:"",name:"",job_number:"",address_id:"1",open_id:""},isPinker:!1,wxobj:{},slots:[{values:[]}],bigcity:"",twocity:"",smallcity:"",level:-1,provinces:[],provinces1:[],provinces2:[],audioVoice:s("Ybrj"),canMusic:!1}},methods:{signs:function(){var t=this;this.provinces2.forEach(function(e){console.log(e),t.smallcity==e.name&&(t.msg.address_id=e.id)}),console.log(this.msg),""!=this.msg.phone&&""!=this.msg.name&&""!=this.msg.job_number&&""!=this.msg.address_id?/^[1][0-9]{10}$/.test(this.phone)?this.$toast({message:"请输入正确的手机号"}):Object(i.b)(this.msg).then(function(e){(e.status="200")?t.$router.push({path:"/updateimg",query:t.open_id}):t.msg={phone:"",name:"",job_number:"",address_id:"1",open_id:""}}):this.$toast({message:"输入不能为空！"})},plays:function(){this.canMusic?(this.$refs.audios.pause(),this.canMusic=!1):(this.$refs.audios.play(),this.canMusic=!0),t(".music").toggleClass("rotate")},onValuesChange:function(t,e){1==this.level?this.bigcity=e:2==this.level?this.twocity=e:3==this.level?this.smallcity=e:this.bigcity=""},handleConfirm:function(){this.isPinker=!1},first:function(){this.level=1,this.isPinker=!0,this.twocity="",this.smallcity="",this.msg.open_id=c.a.get("open_id"),this.provinces;var t=this.provinces.map(function(t){return t.name});this.slots=[{flex:1,values:t,className:"slot1",textAlign:"center"}]},scend:function(){var t=this;this.level=2,this.isPinker=!0,this.smallcity="",this.provinces.forEach(function(e){if(e.name==t.bigcity){t.provinces1=e.city;var s=t.provinces1.map(function(t){return console.log(t),t.name});t.slots=[{flex:1,values:s,className:"slot1",textAlign:"center"}]}})},three:function(){var t=this;this.level=3,this.isPinker=!0,this.provinces1.forEach(function(e){if(e.name==t.twocity){t.provinces2=e.town;var s=t.provinces2.map(function(t){return console.log(t),t.name});t.slots=[{flex:1,values:s,className:"slot1",textAlign:"center"}]}})},closepinker:function(){this.isPinker=!1}},mounted:function(){var e=this;o.a.get("/api/api/address",{params:{}}).then(function(t){e.provinces=t.data.provinces,console.log(e.provinces,"afa"),console.log(t,"res");var s=t.data.provinces.map(function(t){return t.name});e.slots=[{flex:1,values:s,className:"slot1",textAlign:"center"}]}).catch(function(t){console.log(t)}),this.msg.open_id=c.a.get("open_id"),document.addEventListener("WeixinJSBridgeReady",function(){e.$refs.audios.play(),t(".music").toggleClass("rotate")},!1)}}}).call(e,s("L7Pj"))},"uFm/":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s("WpAC"),n={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"zuce"}},[i("img",{staticClass:"music",attrs:{src:s("sxLT"),alt:""},on:{click:t.plays}}),t._v(" "),i("div",{staticClass:"bodys"},[i("ul",[i("li",[i("span",[t._v("姓名：")]),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:t.msg.name,expression:"msg.name"}],attrs:{type:"text"},domProps:{value:t.msg.name},on:{input:function(e){e.target.composing||t.$set(t.msg,"name",e.target.value)}}})]),t._v(" "),i("li",[i("span",[t._v("手机号：")]),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:t.msg.phone,expression:"msg.phone"}],attrs:{type:"text"},domProps:{value:t.msg.phone},on:{input:function(e){e.target.composing||t.$set(t.msg,"phone",e.target.value)}}})]),t._v(" "),i("li",[i("span",[t._v("工号：")]),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:t.msg.job_number,expression:"msg.job_number"}],attrs:{type:"text"},domProps:{value:t.msg.job_number},on:{input:function(e){e.target.composing||t.$set(t.msg,"job_number",e.target.value)}}})]),t._v(" "),i("li",{on:{click:t.first}},[i("span",[t._v("大区：")]),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:t.bigcity,expression:"bigcity"}],attrs:{onfocus:"this.blur()",type:"text"},domProps:{value:t.bigcity},on:{input:function(e){e.target.composing||(t.bigcity=e.target.value)}}})]),t._v(" "),i("li",{on:{click:t.scend}},[i("span",[t._v("区域：")]),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:t.twocity,expression:"twocity"}],attrs:{onfocus:"this.blur()",type:"text"},domProps:{value:t.twocity},on:{input:function(e){e.target.composing||(t.twocity=e.target.value)}}})]),t._v(" "),i("li",{on:{click:t.three}},[i("span",[t._v("城市群：")]),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:t.smallcity,expression:"smallcity"}],attrs:{onfocus:"this.blur()",type:"text"},domProps:{value:t.smallcity},on:{input:function(e){e.target.composing||(t.smallcity=e.target.value)}}})])]),t._v(" "),i("mt-popup",{staticClass:"mint-popup",attrs:{position:"bottom"},model:{value:t.isPinker,callback:function(e){t.isPinker=e},expression:"isPinker"}},[i("mt-button",{staticClass:"sure",on:{click:t.handleConfirm}},[t._v("确认")]),t._v(" "),i("mt-picker",{ref:"pinkers",staticClass:"pinkers",attrs:{"value-key":"cName",slots:t.slots},on:{change:t.onValuesChange}})],1),t._v(" "),i("audio",{ref:"audios",attrs:{preload:"auto",id:"audioss",loop:"loop"}},[i("source",{attrs:{src:t.audioVoice,type:"audio/mpeg"}})]),t._v(" "),i("div",{staticClass:"btn",on:{click:t.signs}})],1)])},staticRenderFns:[]};var o=function(t){s("3Ulx")},a=s("C7Lr")(i.a,n,!1,o,"data-v-9153b9f4",null);e.default=a.exports}});
//# sourceMappingURL=3.a92b35357848ade16842.js.map