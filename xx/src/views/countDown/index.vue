<template>
  <div id="daojishi">
    <img @click="plays" class="music" src="@/assets/countDown/music.png" alt>
    <div class="timebox">
     <div> <span>{{days}}</span>天</div>
    </div>
    <div class="btns" @click="closeAlsert"></div>
    <div v-show="isAlert" class="mask" @click="closeAlsert">
      <div class="alerts" @click.stop>
        <span class="close" @click="closeAlsert"></span>
        <img class="tit" src="@/assets/countDown/tit.png" alt>
        <div class="texts">
          <p class="item-tit">活动时间：</p>
          <p class="item-disc">2019年1月20日08:30-2019年2月28日24:00</p>
          <p class="item-disc">活动区域</p>
          <p class="item-tit">大陆地区（不含港澳台）</p>
          <p class="item-tit">夺金步骤：</p>
          <p class="item-tit">1、参与方式：</p>
          <p class="item-disc">@伊利各销售大区的业务员，只需每日上传优酸乳堆头剥离前后对比照片，即有机会成为终极锦鲤宝宝。</p>
          <p class="item-tit">2、活动说明：</p>
          <p class="item-disc">每日上传3组优酸乳堆头剥离前后对比照片，即可获得抽奖机会；持续参与活动的业务员，既有机会夺取终极锦鲤宝宝-现金大奖。</p>
          <p class="item-tit">好运等级：</p>
          <p class="item-disc">幸运锦鲤宝宝：神秘好礼</p>
          <p class="item-disc">周锦鲤宝宝：2888元现金</p>
          <p class="item-disc">终极锦鲤宝宝：5888元现金</p>
          <p class="item-bottoms">
            <span>备注：</span>每天下午8点，系统会及时更新周锦鲤宝宝排名和终极锦鲤宝宝排名哦~
          </p>
          <p class="item-bottoms">
            <span>活动期间，可不要有作弊行为哦~各销售大区的任何一名锦鲤宝宝如有作弊行为，都将取消夺金资格。</span>
          </p>
        </div>
      </div>
    </div>
    <!-- <aplayer autoplay :music="musicList"></aplayer> -->
    <audio preload="auto" id="audioss" ref="audios" loop="loop">
      <source :src="audioVoice" type="audio/mpeg">
    </audio>
  </div>
</template>
<script>
import { wxCharts } from "@/utils/common";
import { MessageBox } from "mint-ui";
// import aplayer from "vue-aplayer";
export default {
  data() {
    return {
      isAlert: false,
      days: "",
      canMusic: true,
      musicList: {
        title: "youkao100",
        author: "youkao100",
        url: "./../../../static/x1.mp3",
        pic: "",
        lrc: "[00:00.00]lrc here\n[00:01.00]aplayer"
      },
      audioVoice: require("./../../../static/x1.mp3"),
      share: {
        title: "pick优酸乳 动手赢好运",
        disc:
          "每日上传3组优酸乳堆头剥离前后对比照片，即可获得抽奖机会；持续参与活动的业务员，既有机会夺取终极锦鲤宝宝-现金大奖",
        imgUrl: `http://www.redview.com.cn/haicao_wx/dist/static/logo.png`,
        url: ""
      }
    };
  },
  components: {
    // aplayer
  },
  methods: {
    initColor() {
      $("body").css({ background: "#6e3599" });
    },
    closeAlsert() {
      if (this.isAlert) {
        this.isAlert = false;
      } else {
        this.isAlert = true;
      }
    },
    plays() {
      if (this.canMusic) {
        this.$refs["audios"].pause();
        this.canMusic = false;
      } else {
        this.$refs["audios"].play();
        this.canMusic = true;
      }
       $('.music').toggleClass("rotate")
    },
    // 倒计时
    ShowCountDown(year, month, day, divname) {
      let that = this;
      let now = new Date();
      let endDate = new Date(2019, 0, 21, 0, 0, 0);
      console.log(endDate);
      let leftTime = endDate.getTime() - now.getTime();
      that.days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10); //计算剩余的天数
      setInterval(function() {
        let now = new Date();
        let endDate = new Date(2019, 0, 21, 0, 0, 0);
        let leftTime = endDate.getTime() - now.getTime();
        that.days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10); //计算剩余的天数
      }, 1000);
    },
    // 微信分享获取豆腐块
    // 微信分享sdk配置
    wchatShare() {
      wxCharts(
        this.share.title,
        this.share.disc,
        this.share.url,
        this.share.imgUrl
      );
    }
  },
  mounted() {
    this.initColor();
    this.ShowCountDown();
    let that = this;
    document.addEventListener(
      "WeixinJSBridgeReady",
      function() {
        that.$refs["audios"].play();
         $('.music').toggleClass("rotate")
      },
      false
    );
      $("body a").css({ 'height': "0 !important",'overflow':'hidden'});
  },
  created() {
    let sUserAgent = navigator.userAgent.toLowerCase();
    let isWechat = sUserAgent.indexOf("micromessenger") != -1;
    if (!isWechat) {
      MessageBox.alert("请在微信内打开", "提示");
    }
  }
};
</script>

<style lang="less" scoped>
p {
  margin: 0;
  padding: 0;
}
#daojishi {
  font-family: TSZT;
  width: 7.5rem;
  height: calc(100vh);
  // height: 13.34rem;
  background: url("./../../assets/countDown/countDownAll.jpg") no-repeat center;
  background-size: 100% 100%;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
  .timebox {
    width: 4rem;
    height: 2.4rem;
    margin: 51vh auto 0;
    font-size: 1.5rem;
    color: #d70290;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      font-size: 1.8rem;
    }
  }
  .btns {
    width: 2.48rem;
    height: 0.94rem;
    background: url("./../../assets/countDown/btn.png") no-repeat center;
    background-size: 100% 100%;
    margin: 1rem auto 0;
  }
  .mask {
    width: 100%;
    height: 100%;
    background: rgba(000, 000, 000, 0.6);
    position: fixed;
    left: 0;
    top: 0;
    .close {
      position: absolute;
      top: 0.24rem;
      right: 0.24rem;
      width: 0.5rem;
      height: 0.5rem;
      background: url("./../../assets/countDown/close.png") no-repeat center;
      background-size: 100% 100%;
    }
    .alerts {
      width: 6.1rem;
      height: 10rem;
      position: absolute;
      left: 50%;
      top: 1rem;
      transform: translateX(-50%);
      background: url("./../../assets/countDown/msg.png") no-repeat center;
      background-size: 100% 100%;
      .tit {
        width: 4.24rem;
        height: 0.7rem;
        display: block;
        margin: 0.6rem auto 0;
      }
      .texts {
        width: 5.1rem;
        font-size: 0.22rem;
        line-height: 0.36rem;
        margin: 0.2rem auto 0;
        .item-tit {
          color: #fdd000;
        }
        .item-disc {
          color: #fff;
        }
      }
      .item-bottoms {
        color: #fff;
        font-size: 0.18rem;
        line-height: 0.28rem;
        span {
          color: #fdd000;
        }
      }
    }
  }
}
.music {
  position: absolute;
  right: 0.3rem;
  top: 0.3rem;
}
// 旋转代码
.rotate {
  -webkit-animation: rotating 3s linear infinite;
  -moz-animation: rotating 3s linear infinite;
  -o-animation: rotating 3s linear infinite;
  animation: rotating 3s linear infinite;
}

@-webkit-keyframes rotating {
  from {
    -webkit-transform: rotate(0);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes rotating {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-moz-keyframes rotating {
  from {
    -moz-transform: rotate(0);
  }
  to {
    -moz-transform: rotate(360deg);
  }
}
</style>

