
<template>
  <div>
    <!-- 参团成功 -->
    <div id="hp_pull_new_wxpay" v-if="isScuress ==1">
      <div class="tit">参团成功</div>
      <p class="p1">恭喜您成功加入我的团队</p>
      <div class="qizi">
        <div class="contents">
          <div class="lf"><img :src="headPortrait" alt=""></div>
          <div class="ri">{{nickName}}</div>
        </div>
      </div>
      <div class="hezi">
        <p class="p1">您现在就可以支付1分，兑换一元秒提金。</p>
        <p class="p2">如下载app，您只要在海拼进入新人福利，也可以找到兑换口。</p>
        <div v-if="isWxPay">
          <div class="btn" @click="wxpay">支付1分·换一元</div>
          <div class="down" @click="goAndDown">下载APP ></div>
        </div>
        <div v-else>
          <div class="btns" @click="goAndDown">下载APP</div>
        </div>
      </div>
    </div>
    <!-- 参团失败 -->
    <div id="hp_pull_new_wxpay_failh" v-else-if="isScuress == 0">
      <div class="top">
        <img src="./../../assets/hp_pull_new/failture.png" alt>
        <p class="p1">参团失败</p>
        <p class="p2">该团成员已满或已经失效</p>
        <p class="p3">别担心！我们已为您单独开启新人福利！
          <br>1分兑换1元钱，可立即提现秒到账
        </p>
      </div>
      <div class="bottom">
        <div class="tit">
          <span></span>
          <p>领取攻略</p>
        </div>
        <div class="guide">
          <div class="guide-1">
            <div class="g1">1</div>
            <div class="g2">下载《海草公社》APP</div>
            <div class="g3"></div>
          </div>
          <div class="guide-2">
            <div class="g1" style="margin-top:.44rem">2</div>
            <div class="g2">
              <p>登录并前往 &nbsp&nbsp海拼</p>
            </div>
          </div>
          <div class="guide-3">
            <div class="g1">3</div>
            <div class="g2">
              <p>我在右上方</p>
            </div>
            <div class="gift"></div>
          </div>
        </div>
        <div class="btns" @click="goAndDown">进入APP</div>
      </div>
    </div>
    <!-- 提现流程 -->
    <div id="hp_pull_new_wxpay_flow" v-else-if="isScuress == 2">
      <div class="bodys">
        <div class="tit">
          <div class="tit-bg"></div>
          <p class="p1">提现流程</p>
        </div>
        <div class="flow">
          <p>下载《海草公社》APP</p>
          <img class="img1" src="@/assets/hp_pull_new/icon.png" alt>
          <p>登录并前往 &nbsp &nbsp 我的</p>
          <img class="img2" src="@/assets/hp_pull_new/guide2.png" alt>
          <p>选中&nbsp &nbsp 待提现&nbsp &nbsp 开始提现</p>
          <img class="img3" src="@/assets/hp_pull_new/guide3.png" alt>
        </div>
        <div class="step">
          <div class="line"></div>
          <div class="step-item">1</div>
          <div class="step-item step-item-2">2</div>
          <div class="step-item step-item-3">3</div>
        </div>
        <div class="btns" @click="goAndDown">下载APP</div>
      </div>
    </div>
    <div style="width:100%;height:.5rem"></div>
  </div>
</template>

<script>
import { goAndDown } from "@/utils/common.js";
import { Toast, Indicator } from "mint-ui";
 import {roup_leader} from "@/api/hp_pull_new"
export default {
  components: {
    Toast,
    Indicator
  },
  data() {
    return {
      isWxPay: true,
      wxobj: {},
      isScuress: 1, //1:拼团成功;0:拼团失败；2：拼团流程
      payScuress: false,
      nickName:'',
      headPortrait:''
    };
  },
  methods: {
    //   微信支付
    wxpay() {
        this.isScuress = 2
      if (typeof WeixinJSBridge == "undefined") {
        if (document.addEventListener) {
          document.addEventListener(
            "WeixinJSBridgeReady",
            this.onBridgeReady,
            false
          );
        } else if (document.attachEvent) {
          document.attachEvent("WeixinJSBridgeReady", this.onBridgeReady);
          document.attachEvent("onWeixinJSBridgeReady", this.onBridgeReady);
        }
      } else {
        this.onBridgeReady();
      }
    },
    // 唤起支付页面
    onBridgeReady() {
      let that = this;
      let timeStamp = String(new Date().valueOf());
      WeixinJSBridge.invoke(
        "getBrandWCPayRequest",
        {
          appId: that.wxobj.appId, //公众号名称，由商户传入
          timeStamp: that.wxobj.timeStamp, //时间戳，自1970年以来的秒数
          nonceStr: that.wxobj.nonceStr, //随机串
          package: that.wxobj.package,
          signType: that.wxobj.signType, //微信签名方式：
          paySign: that.wxobj.paySign //微信签名
        },
        function(res) {
          switch (res.err_msg) {
            case "get_brand_wcpay_request:cancel":
              alert("取消支付");
              break;
            case "get_brand_wcpay_request:fail":
              alert(JSON.stringify(res));
              break;
            case "get_brand_wcpay_request:ok":
              alert("支付成功");
              break;
          }
        }
      );
    },
    // 唤醒app,无则跳到应用宝
    goAndDown() {
      Indicator.open({
        text: "跳转中",
        spinnerType: "fading-circle"
      });
      goAndDown();
      setTimeout(function() {
        Indicator.close();
      }, 2000);
    },
    roup_leader(){
        let data = {
            groupId:this.$route.query.groupId
        }
        roup_leader(data).then(res=>{
            this.nickName = res.data.nickName;
           this.headPortrait =this.$store.getters.app.imgIp + res.data.headPortrait
        })
    }
  },
  mounted() {
    $("html,body").css({ background: "#fff7a4" });
    if (this.isScuress) {
      $("title").html("拉新提现团");
    } else {
      $("title").html("新人福利");
    };
    this.roup_leader()
  },
  created() {
      this.wxobj =JSON.parse(this.$route.query.payContent)
  },
  beforeDestroy() {
    $("html,body").css({ background: "#f6f6f6" });
    $("title").html("海草公社");
  }
};
</script>

<style lang="less" scoped>
p {
  margin: 0;
  padding: 0;
}
#hp_pull_new_wxpay {
  width: 7.5rem;
  margin: 0 auto;
  min-height: 13.3rem;
  background: url("./../../assets/hp_pull_new/hp_wxpay_bg1.png") no-repeat
    center;
  background-size: 100% 100%;
  overflow: hidden;
  position: relative;

  .tit {
    color: #ff621d;
    font-size: 0.54rem;
    text-align: center;
    margin: 0.4rem auto 0;
  }
  .p1 {
    font-size: 0.3rem;
    color: #493f05;
    text-align: center;
    margin-top: 0.2rem;
  }
  .qizi {
    width: 6.93rem;
    height: 4.27rem;
    background: url("./../../assets/hp_pull_new/qizi.png") no-repeat center;
    background-size: 100% 100%;
    margin: 0.2rem auto 0;
    .contents {
      width: 3.8rem;
      height: 1.4rem;
      margin: 0 auto;
      display: flex;
      align-items: center;
      .lf {
        width: 0.9rem;
        height: 0.9rem;
        background: #ff621d;
        border-radius: 50% 50%;
        margin: 0 0.3rem;
        overflow: hidden;
        img{
            width: 100%;
            height: 100%;
        }
      }
      .ri {
        flex: 1;
        height: 1.4rem;
        line-height: 1.4rem;
        font-size: 0.3rem;
        color: #493f05;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .hezi {
    width: 6.96rem;
    height: 8.54rem;
    background: url("./../../assets/hp_pull_new/hezi.png") no-repeat center;
    background-size: 100% 100%;
    position: absolute;
    left: 50%;
    top: 3.14rem;
    transform: translateX(-50%);
    overflow: hidden;
    .p1 {
      font-size: 0.28rem;
      color: #ff621d;
      text-align: center;
      margin: 4.6rem auto 0;
    }
    .p2 {
      font-size: 0.22rem;
      color: #666666;
      text-align: center;
      margin: 0.4rem auto 0;
    }
    .btn {
      width: 4.92rem;
      height: 1.06rem;
      margin: 0.6rem auto 0;
      background: url("./../../assets/hp_pull_new/pay_btn.png") no-repeat center;
      background-size: 100% 100%;
      line-height: 1rem;
      text-align: center;
      color: #fff;
      font-size: 0.3rem;
    }
    .btns {
      width: 4.92rem;
      height: 1.06rem;
      margin: 1.1rem auto 0;
      background: url("./../../assets/hp_pull_new/pay_btn.png") no-repeat center;
      background-size: 100% 100%;
      line-height: 1rem;
      text-align: center;
      color: #fff;
      font-size: 0.3rem;
    }
    .down {
      width: 2rem;
      height: 1rem;
      line-height: 1rem;
      text-align: center;
      color: #000;
      font-size: 0.3rem;
      margin: 0 auto;
    }
  }
}
#hp_pull_new_wxpay_failh {
  .top {
    width: 6.92rem;
    height: 4.73rem;
    background: #fff;
    margin: 0.3rem auto 0;
    overflow: hidden;
    text-align: center;
    img {
      width: 2.02rem;
      height: 1.58rem;
      margin: 0.68rem auto 0;
      display: block;
    }
    .p1 {
      color: #ff621d;
      font-size: 0.36rem;
    }
    .p2 {
      margin-top: 0.1rem;
      color: #c2c2c2;
      font-size: 0.27rem;
    }
    .p3 {
      margin-top: 0.36rem;
      color: #ff621d;
      font-size: 0.27rem;
      line-height: 0.43rem;
    }
  }
  .bottom {
    width: 6.92rem;
    height: 7rem;
    background: #fff;
    margin: 0.3rem auto 0.5rem;
    .tit {
      width: 3.96rem;
      height: 1.16rem;
      margin: 0 auto;
      position: relative;
      span {
        display: block;
        width: 100%;
        height: 0.2rem;
        background: url("./../../assets/hp_pull_new/tit.png") no-repeat center;
        background-size: 100% 100%;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
      }
      p {
        text-align: center;
        line-height: 1.16rem;
        color: #cd7650;
        font-size: 0.32rem;
      }
    }
    .guide {
      width: 5.73rem;
      border-left: 0.01rem #cd7650 solid;
      padding-left: 0.6rem;
      box-sizing: border-box;
      color: #cd7650;
      font-size: 0.26rem;
      margin-left: 0.5rem;
      .g1 {
        width: 0.48rem;
        height: 0.48rem;
        border-radius: 50% 50%;
        background: #cd7650;
        color: #fff;
        font-size: 0.3rem;
        text-align: center;
        line-height: 0.48rem;
        margin: 0 0.36rem 0 -0.84rem;
      }
      .guide-1 {
        width: 100%;
        height: 0.64rem;
        display: flex;
        .g2 {
          line-height: 0.48rem;
        }
        .g3 {
          width: 0.32rem;
          height: 0.32rem;
          margin-top: 0.08rem;
          background: url("./../../assets/hp_pull_new/icon.png") no-repeat
            center;
          background-size: 100% 100%;
          margin-left: 0.1rem;
        }
      }
      .guide-2 {
        width: 100%;
        display: flex;
        .g2 {
          width: 4.52rem;
          height: 2.58rem;
          background: url("./../../assets/hp_pull_new/guide1.png") no-repeat
            center;
          background-size: 100% 100%;
          p {
            color: #cd7650;
            font-size: 0.26rem;
            margin-top: 0.5rem;
          }
        }
      }
      .guide-3 {
        width: 100%;
        display: flex;
        position: relative;
        height: auto;
        p {
          color: #cd7650;
          font-size: 0.26rem;
          margin-top: 0.06rem;
        }
        .gift {
          width: 1.16rem;
          height: 1.12rem;
          background: url("./../../assets/hp_pull_new/gift.png") no-repeat
            center;
          background-size: 100% 100%;
          position: absolute;
          left: 1.8rem;
        }
      }
    }
    .btns {
      width: 4.92rem;
      height: 1.06rem;
      margin: 1rem auto 0;
      background: url("./../../assets/hp_pull_new/pay_btn.png") no-repeat center;
      background-size: 100% 100%;
      line-height: 0.9rem;
      text-align: center;
      color: #fff;
      font-size: 0.3rem;
    }
  }
}
#hp_pull_new_wxpay_flow {
  width: 100%;
  height: auto;
  .bodys {
    width: 6.92rem;
    height: 11.5rem;
    margin: 0.3rem auto 0;
    background: #fff;
    overflow: hidden;
    position: relative;
    .tit {
      width: 3.96rem;
      margin: 0 auto;
      color: #cd7650;
      font-size: 0.32rem;
      position: relative;
      text-align: center;
      margin-top: 0.6rem;
      font-weight: bold;
      height: 0.4rem;
      line-height: 0.4rem;
      .tit-bg {
        width: 100%;
        height: 0.2rem;
        background: url("./../../assets/hp_pull_new/tit.png") no-repeat center;
        background-size: 100% 100%;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    .flow {
      margin-top: 0.4rem;
      width: 100%;
      padding-left: 1.1rem;
      box-sizing: border-box;
      color: #cd7650;
      font-size: 0.26rem;
      .img1 {
        width: 1.18rem;
        height: 1.18rem;
        margin: 0.5rem 0 0.6rem 0;
      }
      .img2 {
        width: 5.08rem;
        height: auto;
        margin: -0.2rem 0 0.2rem 0;
      }
      .img3 {
        width: 4.54rem;
        height: auto;
        margin-top: 0.4rem;
      }
    }
    .step {
      width: 0.96rem;
      height: 6.5rem;
      position: absolute;
      left: 0;
      top: 1.35rem;
      .line {
        width: 0.02rem;
        height: 100%;
        background: #cd7650;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        z-index: 0;
      }
      .step-item {
        width: 0.48rem;
        height: 0.48rem;
        color: #fff;
        font-size: 0.3rem;
        text-align: center;
        line-height: 0.48rem;
        background: #cd7650;
        border-radius: 50% 50%;
        margin: 0 auto;
        z-index: 999;
        position: relative;
      }
      .step-item-2 {
        margin-top: 2.24rem;
      }
      .step-item-3 {
        margin-top: 2.84rem;
      }
    }
    .btns {
      width: 4.92rem;
      height: 1.06rem;
      margin: .4rem auto 0;
      background: url("./../../assets/hp_pull_new/pay_btn.png") no-repeat center;
      background-size: 100% 100%;
      line-height: .9rem;
      text-align: center;
      color: #fff;
      font-size: 0.3rem;
    }
  }
}
</style>

