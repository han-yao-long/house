var sUserAgent = navigator.userAgent.toLowerCase();
var isIOS = sUserAgent.match(/(iPhone|iPod)/i) != null;
var isAndroid = sUserAgent.match(/Android/i) != null;
var isIOS9plus = isIOS && sUserAgent.indexOf('os 8') == -1 && sUserAgent.indexOf('os 7') == -1 && sUserAgent.indexOf('os 6') == -1 && sUserAgent.indexOf('os 5') == -1;
var isWechat = sUserAgent.indexOf("micromessenger") != -1;
var isQQmail = sUserAgent.indexOf('mailapp') != -1;
var isQQApp = sUserAgent.indexOf('QQ') != -1;
// var isMpbank = sUserAgent.indexOf('mpbank') != -1;
// var bApplinkValid = true;
var iosdownurl = "https://itunes.apple.com/app/id1444731347";  //ios下载地址(down页面单独存在一个变量，要变都变)
var androiddownurl = "http://download.wehaicao.com/GrassBook_10082.apk";  //安卓下载地址
var androiddownurlyaoqing = "http://download.wehaicao.com/GrassBook_10072.apk";  //邀请收徒页安卓下载地址
var yingyaobao = "https://a.app.qq.com/o/simple.jsp?pkgname=com.billionstech.grassbook"
var iosSwitch = "Y";  //苹果表
var androidSwitch = "Y"; //安卓表
// 获取路径后的参数
export function urlMsg(){
    let legth = window.location.href.lastIndexOf("?")+1;
    let msg = window.location.href.substring(legth).split("&");
    let result = {};
      for(var i = 0; i < msg.length; i++) {
      var temp = msg[i].split('=');
      if(temp.length <2) {
      result[temp[0]] = '';
      } else {
      result[temp[0]] = temp[1];
      }
      }
      return result 
  }

//   唤醒app

export function goapps(longurl){

try {
  if (longurl == undefined || longurl == "" || longurl.indexOf("wehaicao://") != 0) {
      console.log('路径有问题')
      return;
  }

  //微信、QQ邮箱打开
  else if (isWechat || isQQmail) {
      if (isIOS) {
          window.location.href = longurl;
      }
      else {
        window.location.href = yingyaobao;
        //   让其在浏览器打开
        //   alert('请点击右上角，浏览器打开！')
      }
  }
  //浏览器打开
  else{
    //   判断在QQ打开
    if(sUserAgent.indexOf(' qq')>-1 && sUserAgent.indexOf('mqqbrowser') <0){
        if(sUserAgent.indexOf('iphone') > -1 || sUserAgent.indexOf('mac') > -1){
            // longurl = "https://itunes.apple.com/app/id1415668749";
            window.location.href = longurl;  
        }else{
            window.location.href = longurl;
            // alert('请在点击右上角，在浏览器中打开！')
        }
    }else{
        // 浏览器打开
        openAppInBrower(longurl);
    } 
  }
}
catch (e) {
  alert(e);
}
  }
function openAppInBrower(longurl) {
    if (isIOS) {
        if (isIOS9plus) {
            location.href = longurl;
        }
        else {
            openbyIframe(longurl);
        }
    } else {
        openbyIframe(longurl);   
        }
      
}
// 下载，
export function downloadAPPClick() {
    if (isIOS) {
        window.location.href = iosdownurl;
    }else {
        // 安卓版本，先进入app,没有就下载
        window.location.href = androiddownurl;
    }
  }
//   先跳转再下载
  export function goAndDown(istrue) {
    if (isIOS) {
        goapps("wehaicao://")
        setTimeout(function(){
            window.location.href = iosdownurl;
        },2000)
       
    }else {
        // 邀请页面下载地址不同；所以要进行判断
        if(istrue == ''||istrue ==false){
            // 安卓版本，先进入app,没有就下载
        goapps("wehaicao://")
        setTimeout(() => {
         window.location.href = androiddownurl;
        }, 2000);   
        }else{
            goapps("wehaicao://")
            setTimeout(() => {
             window.location.href = androiddownurlyaoqing;
            }, 2000);   
        }
      
    }
  }
  function openbyIframe(longurl) {
       var ifr = document.createElement('iframe');
       ifr.src = longurl;
       ifr.style.display = 'none';
       document.body.appendChild(ifr);
       setTimeout(function () {
           document.body.removeChild(ifr);
       }, 2000);
  
}
// 判断是否为安卓得微信内打开
 export function weChat2and(){
    let sUserAgent = navigator.userAgent.toLowerCase();
    let isAndroid = sUserAgent.match(/Android/i) != null;
    let isWechat = sUserAgent.indexOf("micromessenger") != -1;
    if(isAndroid && isWechat) {
         return true
    }else{
        return false
    }
     
}
// 禁止滚动
export function bodyScroll(event){  
    event.preventDefault();  
} 
export function goAddDownYingYongBao () {
    if (isIOS) {
        goapps("wehaicao://")
        setTimeout(function(){
            window.location.href = iosdownurl;
        },2000)
       
    }else {
        goapps("wehaicao://")
        setTimeout(() => {
         window.location.href = yingyaobao;
        }, 2000);
    }
}
// 直接跳入应用宝
export function goYingyong(){
    window.location.href = yingyaobao;
}