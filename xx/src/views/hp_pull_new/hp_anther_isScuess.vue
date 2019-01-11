
<template>
  <div>
    <!-- 参团 -->
    <!-- 拉新 -->
    <div v-if="wxobj.path == 'joinNew'">
    <!-- <div v-if="true"> -->
      <!-- 参团成功 -->
      <div id="hp_anther_isScuess" v-if="isScuress =='0'">
        <div class="tops">
          <img class="img1" src="@/assets/hp_pull_new/hp_scuess.png" alt>
          <p class="p1">参团成功</p>
          <div class="good">恭喜您获得10元红包</div>
          <p class="p2">剩余时间 ：</p>
          <p class="p3">{{failTimeNum}}</p>
          <p class="p4">可提现得红包都不要？请抓紧时间领取</p>
          <div class="btn" @click="goAndDown">去领红包</div>
        </div>
        <div class="hezi">
          <div class="hezi-p1">
            登陆
            <span>APP</span> 并前往
            <span>海拼</span>
          </div>
        </div>
      </div>
      <!-- 参团失败 -->
      <div id="hp_anther_isScuess_failh" v-else-if="isScuress == '1'">
        <div class="tops">
          <div class="img-box">
            <div class="img-p1">福利到账</div>
            <img class="img1" src="@/assets/hp_pull_new/hp-fail-tit.png" alt>
            <div class="img-p2">10元现金红包（直接提现）</div>
          </div>
          <div class="text">
            <p>您来晚了，该团已结束，别灰心，我悄悄</p>
            <p>给您留了一份，快去APP领取~</p>
          </div>
          <div class="btn" @click="goAndDown">领取</div>
        </div>
        <div class="hezi"></div>
      </div>
      <div style="width:100%;height:.5rem"></div>
    </div>

    <!-- 订单分享 -->
    <div v-if="wxobj.path == 'orderShare'">
      <!-- <div v-if="true"> -->
      <!-- 参团成功 -->
      <div id="hp_anther_isScuess" v-if="isScuress =='0'">
        <div class="tops">
          <img class="img1" src="@/assets/hp_pull_new/hp_scuess.png" alt>
          <p class="pd-p1">参团成功</p>
          <!-- <div class="good">恭喜您获得 10 元红包</div> -->
          <p class="p2">偷偷告诉你，团长能踢人，快去下单锁定福利吧！</p>
          <p class="p3 pd-p3">
            <span>剩余时间 ：</span>
            {{failTimeNum}}
          </p>
        </div>
        <div class="pd-hezi">
          <div class="img"></div>
          <div class="btn-box">
            <div class="btn" @click="goAndDown">进入APP</div>
          </div>
        </div>
      </div>
      <!-- 参团失败 -->
      <div id="hp_anther_isScuess_failh" v-else-if="isScuress =='1'">
        <div class="tops">
          <div class="img-box">
            <div class="img-p1">福利到账</div>
            <img class="img1" src="@/assets/hp_pull_new/hp-fail-tit.png" alt>
            <div class="img-p2">10元现金红包（直接提现）</div>
          </div>
          <div class="text">
            <p>您来晚了，该团已结束，别灰心，我悄悄</p>
            <p>给您留了一份，快去APP领取~</p>
          </div>
          <div class="btn" @click="goAndDown">领取</div>
        </div>
        <div class="hezi"></div>
      </div>
      <div style="width:100%;height:.5rem"></div>
    </div>
    <!-- 阅读分享 -->
    <div v-if="wxobj.path == 'readShare'">
      <!-- <div v-if="true"> -->
      <!-- 参团成功 -->
      <div id="hp_anther_isScuess" v-if="isScuress =='0'">
        <div class="tops">
          <img class="img1" src="@/assets/hp_pull_new/hp_scuess.png" alt>
          <p class="pd-p1">参团成功</p>
          <!-- <div class="good">恭喜您获得 10 元红包</div> -->
          <p class="p2">文中自有“黄金屋”，还不快去读。剩余时间 ：</p>
          <p class="p3">{{failTimeNum}}</p>
        </div>
        <div class="ct-hezi">
          <div class="img"></div>
          <div class="btn-box">
            <div class="btn" @click="goAndDown">进入APP</div>
          </div>
        </div>
      </div>
      <!-- 参团失败 -->
      <div id="hp_anther_isScuess_failh" v-else-if="isScuress =='1'">
        <div class="tops">
          <div class="img-box">
            <div class="img-p1">福利到账</div>
            <img class="img1" src="@/assets/hp_pull_new/hp-fail-tit.png" alt>
            <div class="img-p2">10元现金红包（直接提现）</div>
          </div>
          <div class="text">
            <p>您来晚了，该团已结束，别灰心，我悄悄</p>
            <p>给您留了一份，快去APP领取~</p>
          </div>
          <div class="btn" @click="goAndDown">领取</div>
        </div>
        <div class="hezi"></div>
      </div>
      <div style="width:100%;height:.5rem"></div>
    </div>
  </div>
</template>

<script>
import { goAndDown, formatSeconds } from "@/utils/common.js";
import { wxCharts, Toast, Indicator } from "mint-ui";
import { roup_leader } from "@/api/hp_pull_new";
export default {
  components: {
    Toast,
    Indicator
  },
  data() {
    return {
      wxobj: {},
      isScuress: 1, //0:老用户;1新用户
      payScuress: false,
      nickName: "",
      headPortrait: "",
      path: "joinNew",
      failTimeNum: "0"
    };
  },
  methods: {
    // 唤醒app,无则跳到应用宝
    goAndDown() {
      var sUserAgent = navigator.userAgent.toLowerCase();
      var isIOS = sUserAgent.match(/(iPhone|iPod)/i) != null;
      if (isIOS) {
        Toast({
          message: "IOS暂未开放，敬请期待",
          duration: 3000
        });
      } else {
        Indicator.open({
          text: "跳转中",
          spinnerType: "fading-circle"
        });
        goAndDown();
        setTimeout(function() {
          Indicator.close();
        }, 2000);
      }
    },
    roup_leader() {
      let data = {
        groupId: this.$route.query.groupId
      };
      roup_leader(data).then(res => {
        this.nickName = res.data.nickName;
        this.headPortrait =
          this.$store.getters.app.imgIp + res.data.headPortrait;
      });
    },
    initMsg() {
      let count = Number(this.wxobj.countTime);
      setInterval(() => {
        if (count > 0) {
          this.failTimeNum = formatSeconds(count--);
        } else {
          this.failTimeNum = 0;
        }
      }, 1000);
    },
    // 微信分享sdk配置
    wchatShare() {
      wxCharts(this.wxobj.share.title, this.wxobj.share.disc, this.wxobj.share.url, this.wxobj.share.imgUrl);
    }
  },
  mounted() {
    $("html,body").css({ background: "#f5f5f5" });
    window.scrollTo(0,0);
    this.initMsg();
    wxCharts(this.wxobj.share.title, this.wxobj.share.disc, this.wxobj.share.url, this.wxobj.share.imgUrl);
  },
  created() {
    this.wxobj = this.$route.query;
    console.log(this.wxobj)
    this.isScuress = this.wxobj.isNew;
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
#hp_anther_isScuess {
  width: 7.5rem;
  margin: 0 auto;
  min-height: 100vh;
  overflow: hidden;
  position: relative;
  .tops {
    width: 100%;
    padding-bottom: 0.54rem;
    background: #fff;
    overflow: hidden;
    .img1 {
      width: 2.56rem;
      height: 1.78rem;
      display: block;
      margin: 0.4rem auto 0.16rem;
    }
    .p1 {
      font-size: 0.36rem;
      color: #079900;
      text-align: center;
    }
    // 拼单
    .pd-p1 {
      font-size: 0.36rem;
      color: #ff621d;
      text-align: center;
    }
    .good {
      width: 4.18rem;
      height: 0.7rem;
      background: url("./../../assets/hp_pull_new/bag.png") no-repeat center;
      background-size: 100% 100%;
      text-align: center;
      font-size: 0.3rem;
      color: #d81e06;
      line-height: 0.7rem;
      margin: 0.3rem auto 0;
      padding-left: 0.1rem;
      box-sizing: border-box;
    }
    .p2 {
      color: #202127;
      font-size: 0.3rem;
      text-align: center;
      margin-top: 0.36rem;
    }
    .p3 {
      color: #d81e06;
      margin: 0.28rem auto;
      font-size: 0.44rem;
      text-align: center;
    }
    .pd-p3 {
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        font-size: 0.28rem;
        color: #202127;
      }
    }
    .p4 {
      color: #202127;
      font-size: 0.3rem;
      text-align: center;
      margin: 0.36rem auto;
    }
    .btn {
      width: 4.9rem;
      height: 1.06rem;
      background: url("./../../assets/hp_pull_new/pay_btn.png") no-repeat center;
      background-size: 100% 100%;
      text-align: center;
      line-height: 1.06rem;
      font-size: 0.3rem;
      text-align: center;
      color: #fff;
      margin: 0 auto;
    }
  }
  .hezi {
    width: 100%;
    height: 8.06rem;
    margin: 0.3rem auto 0;
    background: url("./../../assets/hp_pull_new/success.jpg") no-repeat center;
    background-size: 100% 100%;
    overflow: hidden;
    .hezi-p1 {
      font-size: 0.26rem;
      color: #202127;
      background: #fff;
      margin: 1.2rem 0 0 1.4rem;
      display: inline-block;
      span {
        font-weight: bold;
      }
    }
  }
  .pd-hezi {
    width: 100%;
    margin: 0.3rem auto 0;
    background: #f5f5f5;
    .img {
      width: 100%;
      height: 6.03rem;
      background: url("./../../assets/hp_pull_new/pd-img.png") no-repeat center;
      background-size: 100% 100%;
    }
    .btn-box {
      width: 6.92rem;
      height: 2rem;
      margin: 0 auto;
      background: #fff;
      .btn {
        width: 4.9rem;
        height: 1.06rem;
        background: url("./../../assets/hp_pull_new/pay_btn.png") no-repeat
          center;
        background-size: 100% 100%;
        text-align: center;
        line-height: 1.06rem;
        font-size: 0.3rem;
        text-align: center;
        color: #fff;
        margin: 0 auto;
      }
    }
  }
  .ct-hezi {
    width: 100%;
    // height: 8.19rem;
    margin: 0.3rem auto 0;
    background: #f5f5f5;
    .img {
      width: 100%;
      height: 4.62rem;
      background: url("./../../assets/hp_pull_new/read-img.png") no-repeat
        center;
      background-size: 100% 100%;
    }
    .btn-box {
      width: 6.92rem;
      height: 1.6rem;
      margin: 0 auto;
      background: #fff;
      .btn {
        width: 4.9rem;
        height: 1.06rem;
        background: url("./../../assets/hp_pull_new/pay_btn.png") no-repeat
          center;
        background-size: 100% 100%;
        text-align: center;
        line-height: 1.06rem;
        font-size: 0.3rem;
        text-align: center;
        color: #fff;
        margin: 0 auto;
      }
    }
  }
}
#hp_anther_isScuess_failh {
  .tops {
    width: 100%;
    height: 6.88rem;
    background: #fff;
    overflow: hidden;
    .img-box {
      width: 4.18rem;
      height: 3.44rem;
      background: #f5f5f5;
      margin: 0.3rem auto;
      overflow: hidden;
      .img-p1 {
        color: #ff621d;
        font-size: 0.36rem;
        display: block;
        margin: 0.2rem auto;
        text-align: center;
      }
      .img1 {
        width: 1.81rem;
        height: 1.81rem;
        display: block;
        margin: 0 auto;
      }
      .img-p2 {
        text-align: center;
        font-size: 0.28rem;
        color: #202127;
        text-align: center;
        margin-top: 0.2rem;
      }
    }
    .text {
      color: #ff621d;
      font-size: 0.3rem;
      text-align: center;
      line-height: 0.43rem;
    }
    .btn {
      width: 4.9rem;
      height: 1.06rem;
      background: url("./../../assets/hp_pull_new/pay_btn.png") no-repeat center;
      background-size: 100% 100%;
      text-align: center;
      line-height: 1.06rem;
      font-size: 0.3rem;
      text-align: center;
      color: #fff;
      margin: 0.7rem auto;
    }
  }
  .hezi {
    width: 100%;
    height: 8.06rem;
    margin: 0.3rem auto 0;
    background: url("./../../assets/hp_pull_new/fail.png") no-repeat center;
    background-size: 100% 100%;
  }
}
</style>

