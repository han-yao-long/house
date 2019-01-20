import {
  cookie
} from '@/utils/cache'
import url from '@/api/url'
import store from '@/store/index' // 统一信息管理
import {
  Indicator
} from 'mint-ui';
import {
  randomString,
  hex_sha1
} from './wxshare.js';
import wx from "weixin-js-sdk";
import {
  goAddDownYingYongBao
} from './goAndDown.js'
// 公共工具类方法

// 获取数据
export function urlMsg() {
  let legth = window.location.href.lastIndexOf("?") + 1;
  let msg = window.location.href.substring(legth).split("&");
  let result = {};
  for (var i = 0; i < msg.length; i++) {
    var temp = msg[i].split('=');
    if (temp.length < 2) {
      result[temp[0]] = '';
    } else {
      result[temp[0]] = temp[1];
    }
  }
  return result
};

// 微信认证获取code
export function wxAuth() {
  // 判断是否为生产环境
  let redirectUri = 'http%3a%2f%2fh5.redview.com.cn%2findex.html%23%2fcountDown';
  let appIds = 'wx3c1a020f0ec2a5cd';
  let state = "STATE"
  let strUrl = "http://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appIds + "&redirect_uri=" + redirectUri + "&response_type=code&scope=snsapi_userinfo&connect_redirect=1&state=" + state + "#wechat_redirect";
  if (!store.getters.app.code) {
    Indicator.open();
    window.location.href = strUrl;
  }
};
// 微信分享
export function wxCharts(shareTitle, descContent, lineLink, imgUrl) {
  console.log(shareTitle)
  var timestamp = (new Date()).valueOf();
  // 生成签名随机串y
  var nonceStr = randomString(16);
  // 签名
  var signature;
  //   原来
  var url = window.location.href;

  //    let url = lineLink;
  // 现在
  //   加密前获取拼接好的路径，
  $.ajax({
    url: `/rapi/wechats/jsapi_ticket?appid=${appId()}`,
    type: 'get',
    dataType: 'json',
    success: function (resp) {
      var string1 = "jsapi_ticket=" + resp.ticket + "&noncestr=" + nonceStr + "&timestamp=" + timestamp + "&url=" + url
      signature = hex_sha1(string1)
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: appId(), // 必填，公众号的唯一标识
        timestamp: timestamp, // 必填，生成签名的时间戳
        nonceStr: nonceStr, // 必填，生成签名的随机串
        signature: signature, // 必填，签名，见附录1
        jsApiList: [
          'onMenuShareAppMessage',
          'onMenuShareTimeline',
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
        ]
      });
    }
  });
  wx.checkJsApi({
    jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
    success: function (res) {
      // 以键值对的形式返回，可用的api值true，不可用为false
      // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
    }
  });
  wx.ready(function () {
    // alert(lineLink);
    wx.onMenuShareTimeline({
      title: shareTitle, // 分享标题
      link: lineLink.split('#')[0].split('?')[0] + '#' + lineLink.split('#')[1], // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      // link: lineLink,
      imgUrl: imgUrl, // 分享图标
      success: function () {
        // 用户点击了分享后执行的回调函数
      },
    })

    wx.onMenuShareAppMessage({
      title: shareTitle, // 分享标题
      desc: descContent, // 分享描述
      link: lineLink.split('#')[0].split('?')[0] + '#' + lineLink.split('#')[1], // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      // link: lineLink,
      imgUrl: imgUrl, // 分享图标
      success: function () {
        // 用户点击了分享后执行的回调函数
      }
    });
  })
}

// 获取appId
// export function appId() {
//   let appId = ''
//   if (window.location.hostname == 'test-card.zuanliantech.com') {
//     // 测试环境
//     appId = 'wx303bd1d29db76d97';
//   } else if (window.location.hostname == 'wehaicao.com' || window.location.hostname == 'grassbooker.com') {
//     appId = 'wx8ec0673d2b219cc3'; // 公众号AppID
//   } else {
//     // 生产环境
//     appId = 'wx71e7a902969b01f4'; // 公众号AppID
//   };
//   // 判断路径后面是否有appid
//   // let cookieAppid = cookie.get('appId');
//   // if (cookieAppid) { //如果appId存在
//   //   appId = cookieAppid
//   // }
//   console.log(appId, 'appid出现')
//   return appId
// }

// 获取userId
// export function userId() {
//   let userId = ''
//   // 第一次进入项目
//   if (urlMsg().userId) {
//     cookie.set('userId', urlMsg().userId);
//   }
//   // 重定向后进入项目 获取userId
//   if (cookie.get('userId')) { //如果userId存在
//     userId = cookie.get('userId')
//   }
//   return userId
// }

// 唤醒app,无app则跳入应用宝
export function goAndDown() {
  goAddDownYingYongBao()
}
// 时间倒计时
export function formatSeconds(value) {
  var secondTime = parseInt(value); // 秒
  var minuteTime = 0; // 分
  var hourTime = 0; // 小时
  if (secondTime > 60) { //如果秒数大于60，将秒数转换成整数
    //获取分钟，除以60取整数，得到整数分钟
    minuteTime = parseInt(secondTime / 60);
    //获取秒数，秒数取佘，得到整数秒数
    secondTime = parseInt(secondTime % 60);
    //如果分钟大于60，将分钟转换成小时
    if (minuteTime > 60) {
      //获取小时，获取分钟除以60，得到整数小时
      hourTime = parseInt(minuteTime / 60);
      //获取小时后取佘的分，获取分钟除以60取佘的分
      minuteTime = parseInt(minuteTime % 60);
    }
  }
  let s = '' // 秒
  let m = '' // 分
  let h = '' // 时
  // 秒过滤
  if (secondTime > 9) {
    s = secondTime
  } else {
    s = '0' + secondTime
  }
  // 分过滤
  if (minuteTime > 9) {
    m = minuteTime
  } else {
    m = '0' + minuteTime
  }
  // 时过滤
  if (hourTime > 9) {
    h = hourTime
  } else {
    h = '0' + hourTime
  }
  var result = "" + s;

  if (minuteTime > 0) {
    result = "" + m + ":" + result;
  }
  if (hourTime > 0) {
    result = "" + h + ":" + result;
  }
  return result;
}
export function randomNum(minNum, maxNum) {
  switch (arguments.length) {
    case 1:
      return parseInt(Math.random() * minNum + 1, 10);
      break;
    case 2:
      return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
      break;
    default:
      return 0;
      break;
  }
}
export function chooseImg(){
  // 判断是否为生产环境
  let redirectUri = 'http%3a%2f%2fh5.redview.com.cn%2findex.html%23%2fgassgame';
  let appIds = 'wx3c1a020f0ec2a5cd';
  let state = "STATE"
  let strUrl = "http://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appIds + "&redirect_uri=" + redirectUri + "&response_type=code&scope=snsapi_userinfo&state=" + state + "#wechat_redirect";
  if (!store.getters.app.code) {
    Indicator.open();
    window.location.href = strUrl;
  }
};
// 微信分享
export function getImgmsg(ticket) {
  var timestamp = (new Date()).valueOf();
  // 生成签名随机串y
  var nonceStr = randomString(16);
  // 签名
  var signature;
  //   原来
  var url = window.location.href;

  //    let url = lineLink;
  // 现在
  //   加密前获取拼接好的路径，
  $.ajax({
    url: `/rapi/wechats/jsapi_ticket?appid=${appId()}`,
    type: 'get',
    dataType: 'json',
    success: function (resp) {
      var string1 = "jsapi_ticket=" + ticket + "&noncestr=" + nonceStr + "&timestamp=" + timestamp + "&url=" + url
      signature = hex_sha1(string1)
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: appId(), // 必填，公众号的唯一标识
        timestamp: timestamp, // 必填，生成签名的时间戳
        nonceStr: nonceStr, // 必填，生成签名的随机串
        signature: signature, // 必填，签名，见附录1
        jsApiList: [
          "chooseImage", "uploadImage", "downloadImage"
        ]
      });
    }
  });
  wx.checkJsApi({
    jsApiList: ["chooseImage", "uploadImage", "downloadImage"] ,
    success: function (res) {
      // 以键值对的形式返回，可用的api值true，不可用为false
      // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
    }
  });
}
