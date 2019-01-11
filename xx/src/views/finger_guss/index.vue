<template>
  <div id="finger_guss">
    <headgoapp></headgoapp>
    <div class="content">
      <div class="logo"></div>
      <div
        :class="['text',cardType == 0 ? 'texts-0' : '',cardType == 1 ? 'texts-1' : '',cardType == 2 ? 'texts-2' : '']"
      >
        <div class="top">
          <div class="head-logo">
            <img :src="headerImgSrc" alt>
          </div>
          <p class="name">{{nickName}}</p>
        </div>

        <div class="text-2">
          <p class="text-2-1" v-if="myself == 0">
            {{msg1}}
          </p>
          <p style="margin-top:.2rem" v-else>{{msg1}}{{msg2}}</p>
        </div>
      </div>
      <p
        v-if="myself == 0"
        style="font-size:.2rem;color:#fff;margin-top:.1rem;text-align:center"
      >------花别人的钱，过自己的年------</p>
      <div v-if="myself == 0" class="btns">
        <!-- <div v-if="reviveStatus == 0" class="btn-item close-power" @click.once="pushPower"></div> -->
        <!-- <div v-else class="btn-item goback"></div> -->
        <div class="btn-item down" @click="goAndDown"></div>
        <p class="btns_p1">{{msg2}}</p>
      </div>
      <!-- 复活 -->
      <div v-else class="btns">
        <div v-if="reviveStatus == 0" class="btns-east btn-item close-easte" @click="goEaste"></div>
        <div v-else class="btns-east btn-item close-easte easter" @click="goEaste"></div>
      </div>
      <div class="power-list">
        <div class="tit">
          <div class="tit-bg"></div>
          <p>
            点赞记录（
            <span style="color:#fff">{{thumbNum}}</span>
            /{{standardNum}}）
          </p>
        </div>
        <div class="list">
          <div class="item" v-if="index < standardNum" v-for="(item,index) in list" :key="index">
            <div class="left">
              <div class="power-head">
                <img :src="item.headImgUrl" alt>
              </div>
              <span>{{item.nickName}}</span>
            </div>
            <div class="right">点赞+1</div>
          </div>
        </div>
      </div>
      <div class="bottom-logo"></div>
    </div>
  </div>
</template>
<script>
import headgoapp from "@/components/head_goApp";
import { wxCharts, wxAuth, urlMsg } from "@/utils/common.js";
import { guess_status, guess_thumb } from "@/api/finger_guss";
import { cookie } from "@/utils/cache";
import { goAndDown, randomNum } from "@/utils/common.js";
import { Toast, Indicator, MessageBox } from "mint-ui";
export default {
  components: {
    headgoapp
  },
  data() {
    return {
      nickName: "", // 团长名字
      headerImgSrc: "", //团长头像
      helpStatus: 1, //是否助力 1 已助力，展示已经点过赞；0未点赞过该用户，展示点赞成功,2当日对该用户点过赞，3：点赞人点赞次数已经超了
      myself: 0, //0 ：非本人；1本人；
      list: [], //点赞列表"headImgUrl 头像 nickName"：昵称"
      paramKey: "", //点赞用户唯一id
      reviveStatus: 0, //0 未复活，1，已经结束
      standardNum: 0, //复活需要点赞数
      thumbNum: 0, // 实际点赞数
      userId: "",
      recordId: "",
      cardType: "2", //卡片类型，剪刀（0）石头（1）布（2）
      rewardAmount: "89.6", // 对方中奖金额
      appId: "", //appid
      msg1: "谢谢你助我复活！",
      msg2: "我的对手赢了30.6元的奖励，我要赢回来"
    };
  },
  methods: {
    // 点击助力
    pushPower() {
      let istrue = $(".btns .close-power").hasClass("power");
      if (istrue) {
        $(".btns .close-power").removeClass("power");
        let data = {
          userId: this.userId,
          wechatCode: this.paramKey,
          recordId: this.recordId
        };
        this.guess_thumbs(data);
      } else {
      }
    },
    // 前往a'p'p，无则前往应用宝
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
    // 点击复活按钮
    goEaste() {
      this.goAndDown();
    },
    // 微信分享sdk配置
    wchatShare() {
      let url = `http://${
        window.location.hostname
      }/h5/haicao_wx/dist/index.html#/finger_guss?appId=${this.appId}&userId=${
        this.userId
      }&cardType=${this.cardType}&rewardAmount=${this.rewardAmount}&recordId=${
        this.recordId
      }`;
      const imgUrl = `http://${
        window.location.hostname
      }/h5/haicao_wx/dist/static/icons.png`;
      const title = "跪求点赞";
      const disc = "有人猜拳拿到89.6块，快来帮我复活，我也要！";
      wxCharts(title, disc, url, imgUrl);
    },
    // 猜拳点赞
    guess_thumbs(data) {
      guess_thumb(data).then(res => {
        this.list.unshift(res.data);
      });
      this.thumbNum = this.thumbNum + 1;
    },
    initMsg() {
      let code = urlMsg().code;
      if (code) {
        this.msg2 = "我的对手赢了" + randomNum(100, 1500) / 10 + "元的奖励";
        Indicator.open({
          text: "加载中...",
          spinnerType: "fading-circle"
        });
        this.userId = cookie.get("userId");
        this.recordId = cookie.get("recordId");
        this.appId = cookie.get("appId");
        this.cardType = cookie.get("cardType");
        // this.rewardAmount = cookie.get("rewardAmount");
        $(".content .text").addClass(`text-${this.cardType}`);
        let data = {
          userId: this.userId,
          recordId: this.recordId,
          wechatCode: code,
          appId: this.appId
        };
        guess_status(data).then(res => {
          Indicator.close();
          if (res.code == 200) {
            let msg = res.data;
            this.nickName = msg.nickName;
            this.headerImgSrc =
              this.$store.getters.app.imgIp + msg.headerImgSrc; //团长头像
            this.reviveStatus = msg.reviveStatus;
            this.helpStatus = msg.helpStatus;
            // 判断是否复活
            if (this.reviveStatus == 0 && this.helpStatus == 0) {
              $(".btns .close-power").addClass("power");
            }
            this.myself = msg.myself; //0 ：非本人；1本人；
            this.list = msg.list; //点赞列表"headImgUrl 头像 nickName"：昵称"
            this.paramKey = msg.paramKey; //点赞用户唯一id
            this.standardNum = msg.standardNum; //复活需要点赞数
            this.thumbNum = msg.thumbNum; // 实际点赞数
            if (msg.thumbNum > msg.standardNum) {
              this.thumbNum = msg.standardNum;
            }
            // 修改文案
            // 是本人，未复活
            if (this.myself == 1 && this.reviveStatus == 0) {
              const num = this.standardNum - this.thumbNum;
              this.msg1 = `还差${num}个人，`;
              this.msg2 = "兄dei加把劲鸭！";
            } else if (this.myself == 1 && this.reviveStatus == 1) {
              // 是本人已经复活
              this.msg1 = "人缘不错哟 (・ω< )★";
              this.msg2 = "快去复活鸭！";
            } else {
              switch (this.helpStatus) {
                case 0: //是否助力 1 已助力，展示已经点过赞；0未点赞过该用户，展示点赞成功,2当日对该用户点过赞，3：点赞人点赞次数已经超了
                  this.msg1 = "谢谢你助我复活！";
                  break;
                case 1:
                  this.msg1 = "谢谢你助我复活！";
                  this.$toast({
                    message: "已经点过赞了",
                    duration: 4000
                  });
                  break;
                case 2:
                  this.msg1 = "当日对该用户点过赞";
                  this.$toast({
                    message: "您今日已经帮助过该用户",
                    duration: 4000
                  });
                  break;
                case 3:
                  this.$toast({
                    message: "您今日不可点赞了",
                    duration: 4000
                  });
                  this.msg1 = "谢谢你~明天就能帮我了";
                  break;
                default:
              }
            }
          } else {
            res.message;
          }
          if (this.myself == 1 && this.reviveStatus == 0) {
            // 是本人且尚未复活
            MessageBox("提示", "您尚未复活！");
          } else if (this.myself == 0 && this.helpStatus == 2) {
            //不是本人且本人已经助力过改用户
            MessageBox("提示", "您已点赞过该用户");
          }
        });
        this.wchatShare(); //微信配置
      } else {
        cookie.set("userId", urlMsg().userId);
        cookie.set("recordId", urlMsg().recordId);
        cookie.set("appId", urlMsg().appId);
        cookie.set("cardType", urlMsg().cardType);
        cookie.set("rewardAmount", urlMsg().rewardAmount);
        wxAuth("/finger_guss", urlMsg().appId);
      }
    }
  },
  mounted() {
    $("title").html("跪求点赞");
    this.initMsg();

    //    switch (this.helpStatus) {
    //             case 0: //是否助力 1 已助力，展示已经点过赞；0未点赞过该用户，展示点赞成功,2当日对该用户点过赞，3：点赞人点赞次数已经超了
    //               this.msg1 = "谢谢你助我复活！";
    //               break;
    //             case 1:
    //               this.msg1 = "谢谢你助我复活！";
    //               this.$toast({
    //                 message: "已经点过赞了",
    //                 duration: 30000
    //               });
    //               break;
    //             case 2:
    //               this.msg1 = "当日对该用户点过赞";
    //               this.$toast({
    //                 message: "您今日已经帮助过该用户",
    //                 duration: 30000
    //               });
    //               break;
    //             case 3:
    //               this.$toast({
    //                 message: "您今日不可点赞了",
    //                 duration: 30000
    //               });
    //               this.msg1 = "谢谢你~明天就能帮我了";
    //               break;
    //             default:
    //           }
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
#finger_guss {
  width: 7.5rem;
  margin: 0 auto;
  overflow: hidden;
  .content {
    width: 7.5rem;
    min-height: 16.24rem;
    background: url("./../../assets/finger_guss/bg.gif") no-repeat center;
    background-size: 100% 100%;
    overflow: hidden;
    .logo {
      width: 2.11rem;
      height: 0.78rem;
      //   background: url("./../../assets/finger_guss/head_logo.png") no-repeat
      //     center;
      //   background-size: 100% 100%;
      margin: 0.2rem 0 0 0.2rem;
    }
    .text {
      width: 7.5rem;
      height: 7rem;
      overflow: hidden;
      .top {
        width: 100%;
        display: flex;
        justify-content: center;
        margin: 5rem auto 0;
      }
      .head-logo {
        width: 0.82rem;
        height: 0.82rem;
        border-radius: 50% 50%;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .name {
        font-size: 0.28rem;
        color: #fff;
        max-width: 2.4rem;
        text-align: left;
        line-height: 0.82rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-left: 0.1rem;
      }
      .text-2 {
        margin-top: 0rem;
        font-size: 0.3rem;
        color: #fff;
        text-align: center;
        margin-left: 0.2rem;
        letter-spacing: 0.01rem;
        .text-2-1{
            font-size: .36rem;
            margin-top: .3rem
        }
      }
    }
    // 剪刀
    .texts-0 {
      background: url("./../../assets/finger_guss/text-0.png") no-repeat center;
      background-size: 100% 100%;
    }
    //石头
    .texts-1 {
      background: url("./../../assets/finger_guss/text-1.png") no-repeat center;
      background-size: 100% 100%;
    }
    // 布
    .texts-2 {
      background: url("./../../assets/finger_guss/text-2.png") no-repeat center;
      background-size: 100% 100%;
    }
    .btns {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      .btn-item {
        width: 3rem;
        height: 1.4rem;
        margin-top: 0.1rem;
      }
      .close-power {
        background: url("./../../assets/finger_guss/power_close.png") no-repeat
          center;
        background-size: 100% 100%;
      }
      .power {
        background: url("./../../assets/finger_guss/power.png") no-repeat center;
        background-size: 100% 100%;
      }
      .goback {
        background: url("./../../assets/finger_guss/hasback.png") no-repeat
          center;
        background-size: 100% 100%;
      }
      .down {
        height: 1.8rem;
        background: url("./../../assets/finger_guss/down.png") no-repeat center;
        background-size: 100% 1.4rem;
        margin-left: 0.4rem;
        position: relative;
      }
      .btns_p1 {
        color: #fefefe;
        font-size: 0.16rem;
        width: 100%;
        text-align: right;
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);
        text-align: center;
      }
      .close-easte {
        background: url("./../../assets/finger_guss/no-easter.png") no-repeat
          center;
        background-size: 100% 100%;
      }
      .easter {
        background: url("./../../assets/finger_guss/easter.png") no-repeat
          center;
        background-size: 100% 1.4rem;
      }
    }
    .power-list {
      width: 100%;
      margin-top: 0.6rem;
      .tit {
        height: 0.72rem;
        width: 6.88rem;
        margin: 0 auto;
        position: relative;
        .tit-bg {
          width: 100%;
          height: 0.04rem;
          background: url("./../../assets/finger_guss/list-bg.png") no-repeat
            center;
          background-size: 100% 100%;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
        }
        p {
          color: #82bbff;
          font-size: 0.4rem;
          text-align: center;
          line-height: 0.72rem;
        }
      }
      .list {
        width: 6.3rem;
        margin: 0 auto;
        color: #82bbff;
        min-height: 2rem;
        .item {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.22rem;
          .left {
            display: flex;
            align-items: center;
            .power-head {
              width: 0.86rem;
              height: 0.86rem;
              border-radius: 50% 50%;
              overflow: hidden;
              display: flex;
              img {
                width: 100%;
                height: 100%;
              }
            }
            span {
              font-size: 0.28rem;
              padding-left: 0.1rem;
            }
          }
          .right {
            font-size: 0.36rem;
          }
        }
      }
    }
    .bottom-logo {
      width: 3rem;
      height: 1.06rem;
      background: url("./../../assets/finger_guss/bottm_logo.png") no-repeat
        center;
      background-size: 100% 100%;
      margin: 0.8rem auto 0.5rem;
    }
  }
}
</style>


