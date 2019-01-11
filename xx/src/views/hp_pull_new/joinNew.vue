<template>
  <div class="join-container">
    <headgoapp></headgoapp>
    <div class="share-block">
      <div class="share-content">
        <div class="img-box">
          <img src="@/assets/hp_pull_new/joinNew.png">
        </div>
        <div class="right-content">
          <div class="title">10元现金红包</div>
          <div class="scene">
            累计发放
            <span>{{groupDetail.groupAwardModel.withdrawAmount+groupDetail.groupAwardModel.cashAmount|volume}}</span>现金
          </div>
          <div class="receive">
            <div class="receive-text">
              已领
              <span class="red">{{groupDetail.groupAwardModel.receiveCount|volume}}</span>次
            </div>
          </div>
        </div>
      </div>
      <!-- 拼团成元详情 -->
      <div
        class="group-list"
        v-if="groupDetail.userNum-groupDetail.joinNum!='0'&&groupDetail.groupOrderStatus!='3'"
      >
        <div class="group-box">
          <div
            class="group-item"
            :style="{width:100/groupDetail.members.length+'%',maxWidth:'50%',minWidth:'20%'}"
            v-for="i in groupDetail.members"
            :key="i"
          >
            <div
              v-if="i.joinType=='0'"
              class="group"
              :style="{background:'url('+$store.getters.app.imgIp+i.headPortrait+') no-repeat',backgroundSize: 'cover' }"
            >
              <img class="tzImg" src="@/assets/hp_pull_new/group.png">
            </div>
            <img v-if="i.joinType=='1'" :src="$store.getters.app.imgIp+i.headPortrait">
            <img v-if="!i.id" :src="i.headPortrait">
          </div>
        </div>
      </div>
      <div
        class="residue-time"
        v-if="groupDetail.userNum-groupDetail.joinNum!='0'&&groupDetail.groupOrderStatus!='3'"
      >
        还剩
        <span class="span-center">{{groupDetail.userNum-groupDetail.joinNum}}</span> 个名额，
        <span class="span-right">{{groupDetail.failTimeNum}}</span> 后结束
      </div>
      <div class="fail-team" v-else>
        <div class="fail-title" v-if="groupDetail.userNum-groupDetail.joinNum=='0'">
          <img src="@/assets/hp_pull_new/flag.png">
          <div>团队已满员</div>
        </div>
        <div class="fail-title" v-else>
          <img src="@/assets/hp_pull_new/flag.png">
          <div>团队已失效</div>
        </div>
        <div class="fail-yz">
          <div>一键参团，会为您匹配更多</div>
          <div>
            <img src="@/assets/hp_pull_new/Diamonds.png">
          </div>
        </div>
      </div>
    </div>
    <div class="share-rule">
      <div class="title">
        <div class="line"></div>
        <div class="center">拼团规则</div>
        <div class="line"></div>
      </div>
      <div class="rule">
        <div class="rule-item">
          <img src="@/assets/hp_pull_new/海草新人@2x.png">
          <div class="rule-text">海草新人</div>
        </div>
        <div class="rule-item">
          <img src="@/assets/hp_pull_new/人满成团@2x.png">
          <div class="rule-text">人满成团</div>
        </div>
        <div class="rule-item">
          <img src="@/assets/hp_pull_new/奖励可提@2x.png">
          <div class="rule-text">兑换10元</div>
        </div>
      </div>
      <div class="rule-list">
        <div v-html="groupDetail.groupExplain" class="rule-img"></div>
      </div>
    </div>
    <div class="btn-box">
      <div class="submit" @click="shouModal">参团</div>
    </div>
    <div class="modal" v-if="modal" @click="modal=!modal"></div>
    <div class="form-box" v-if="modal">
      <div class="form-title">确认领取奖励</div>
      <div class="form-item item-top">
        <input class="phone" maxlength="11" v-model="phone" placeholder="请输入11位手机号码">
      </div>
      <div class="form-item">
        <div class="code-left">
          <input class="code" v-model="verifyCode" placeholder="请输入验证码">
        </div>
        <div class="code-right">
          <img class="code-img" @click="getCodeImg" :src="codeImg">
        </div>
      </div>
      <div class="form-item">
        <div class="code-left">
          <input v-model="msCode" placeholder="请输入短信验证码">
        </div>
        <div class="code-right">
          <div class="getCode-text" @click="getCode">{{codeText}}</div>
        </div>
      </div>
      <div class="form-item">
        <div class="submit" @click="submit">参团</div>
      </div>
    </div>
  </div>
</template>
<script>
import headgoapp from "@/components/head_goApp";
import {
  join_group,
  join_get_group_manage,
  join_group_pay
} from "@/api/hp_pull_new";
import { get_smscode, get_verifyCode } from "@/api/common";
import { wxAuth, urlMsg, formatSeconds, wxCharts, appId } from "@/utils/common";
import { cookie } from "@/utils/cache";
import { Indicator, MessageBox } from "mint-ui";
export default {
  name: "index",
  components: {
    headgoapp
  },
  data() {
    return {
      modal: false, // 弹框展示
      codeText: "获取验证码",
      timer: null, // 计时器
      codeImg: "", // 图片验证码
      verifycodekey: "", // 验证码key
      phone: "", // 手机号
      verifyCode: "", // 图片验证码
      msCode: "", // 短信验证码
      groupId: "", //'当前团id',
      userId: "", //'开团用户id',
      invitationCode: "", // 邀请码
      countTime: "", // 当前剩余时间
      normal: "1", // 正常1  非正常0
      groupDetail: {
        goodsImgUrl: "", // 展示图
        groupAwardModel: {}, // 展示信息
        aheadName: "", // 团名称
        goodsPrice: "", // 总金额
        userNum: null, // 总人数
        joinNum: null, // 已参加认识
        finishCount: "", // 已完成场次
        failAt: "", // 失效时间
        failTimeNum: "", // 倒计时
        groupExplain: "", // 团规则
        groupMemberWithdrawAmount: "",
        groupWithdrawAmount: "",
        groupSuperCardAmount: "",
        groupOrderStatus: "", // 团状态
        members: [], // 已经参团团员
        token: ""
      },
      share: {
        url: window.location.href,
        imgUrl: `http://${
          window.location.hostname
        }/h5/haicao_wx/dist/static/hpLogo.jpg`,
        title: "1分换10元，提钱过大年",
        disc: "我刚提现，你还不快来？"
      },
      code: "",
      appId: ""
    };
  },
  created() {
    $("title").html("拉新分享");
    if (this.$store.getters.app.isIOS) {
      this.$toast({
        message: "IOS系统尚未开放，敬请期待",
        duration: 30000
      });
    }
  },
  mounted() {
    this.initMsg();
  },
  methods: {
    // 获取图片验证码
    getCodeImg() {
      Indicator.open();
      this.verifyCode = "";
      this.verifyCodeKey = "";
      get_verifyCode().then(res => {
        this.codeImg = "data:image/png;base64," + res.data;
        this.verifycodekey = res.verifyCodeKey;
        Indicator.close();
      });
    },
    // 获取短信验证码
    getCode() {
      if (!/^[1][0-9]{10}$/.test(this.phone)) {
        this.$toast({
          message: "请输入正确的手机号"
        });
        return false;
      } else if (!this.verifyCode) {
        this.$toast({
          message: "请输入图片验证码"
        });
        return false;
      }

      if (!this.timer) {
        let count = 59;
        // 获取短信验证码
        let target = {
          phone: this.phone,
          templateNum: 1,
          verifyCode: this.verifyCode,
          verifyCodeKey: this.verifycodekey
        };
        Indicator.open();
        get_smscode(target).then(res => {
          if (res.code == "200") {
            this.$toast({
              message: "发送成功"
            });
            this.timer = setInterval(() => {
              if (count > 0) {
                count--;
                this.codeText = count + "重新获取";
              } else {
                this.codeText = "获取验证码";
                clearInterval(this.timer);
                this.timer = null;
                count = null;
                this.getCodeImg();
              }
            }, 1000);
          } else {
            this.getCodeImg();
          }
          Indicator.close();
        });
      }
    },
    // 开团团信息
    get_group_manages() {
      let data = {
        recordId: this.groupId
      };
      Indicator.open();
      join_get_group_manage(data).then(res => {
        this.groupDetail.goodsImgUrl = res.data.goodsImgUrl;
        this.groupDetail.aheadName = res.data.aheadName;
        this.groupDetail.goodsPrice = res.data.goodsPrice;
        this.groupDetail.finishCount = res.data.finishCount;
        this.groupDetail.groupAwardModel = res.data.groupAwardModel; // 汇总信息
        this.groupDetail.userNum = res.data.userNum;
        this.groupDetail.joinNum = res.data.joinNum;
        this.groupDetail.groupMemberWithdrawAmount =
          res.data.groupMemberWithdrawAmount;
        this.groupDetail.groupWithdrawAmount = res.data.groupWithdrawAmount;
        this.groupDetail.groupSuperCardAmount = res.data.groupSuperCardAmount;
        this.groupDetail.groupExplain = res.data.groupExplain;
        this.groupDetail.groupOrderStatus = res.data.groupOrderStatus;
        this.groupDetail.failAt = res.data.failAt.slice(0, 10);
        this.groupDetail.members = res.data.members;
        // 头像补充
        if (this.groupDetail.userNum - this.groupDetail.joinNum > 0) {
          for (
            let i = 0;
            i < this.groupDetail.userNum - this.groupDetail.joinNum;
            i++
          ) {
            this.groupDetail.members.push({
              headPortrait: require("@/assets/hp_pull_new/user.png")
            });
          }
        }
        let count = Number(res.data.failTimeNum);
        setInterval(() => {
          if (count > 0) {
            this.countTime = count;
            this.groupDetail.failTimeNum = formatSeconds(count--);
          } else {
            this.groupDetail.failTimeNum = 0;
          }
        }, 1000);
        this.$nextTick(() => {
          $(".rule-img")
            .find("img")
            .css({ margin: "0 auto", width: "100%" });
        });
        Indicator.close();
      });
    },
    // 弹框
    shouModal() {
      if (this.$store.getters.app.isIOS) {
        this.$toast({
          message: "IOS系统尚未开放，敬请期待"
        });
      } else {
        this.modal = true;
      }
    },
    // 参团提交
    submit() {
      if (!/^[1][0-9]{10}$/.test(this.phone)) {
        this.$toast({
          message: "请输入正确的手机号"
        });
        return false;
      } else if (!this.verifyCode) {
        this.$toast({
          message: "请输入图片验证码"
        });
        return false;
      } else if (!this.msCode) {
        this.$toast({
          message: "请输入短信验证码"
        });
        return false;
      }
      // 调用登录保护SDK的getToken接口，通过接口回调的方式获取token
      let that = this;
      this.wm &&
        this.wm.getToken("4a43a8671e50465f9bb495d860e01588", function(tokens) {
          console.log("tokens", tokens);
          // 提交点赞业务请求
          that.token = tokens;
          //   调取token
          that.submitMsg();
          // 关闭弹框
          that.modal = false;
        });
    },
    // 跟据是否再微信请求不同的请求接口
    submitMsg() {
      Indicator.open();
      //   微信内请求数据
      if (this.appId == "undefined") {
        this.appId = "";
      }
      let target = {
        phone: this.phone,
        smscode: this.msCode,
        groupId: this.groupId,
        invitationCode: this.invitationCode,
        code: this.code,
        etoken: this.token,
        appId: this.appId
        // appId:'wx303bd1d29db76d97'
      };
      //   判断是否在微信内打开
      if (this.isNative == 1) {
        join_group(target).then(res => {
          Indicator.close();
          if (res.code!='200'&&res.code!='9017035'&&res.code!='9017033') {
            this.getCodeImg();
            this.msCode = "";
          } else {
            let isNew = "";
            if (
              this.groupDetail.userNum - this.groupDetail.joinNum != "0" &&
              this.groupDetail.groupOrderStatus != "3"
            ) {
              isNew = "0";
            } else {
              isNew = "1";
            }
            let data = {
              groupId: this.groupId,
              path: "joinNew",
              data: res.data,
              share: this.share,
              isNew: isNew, // 0是老用户(正常参团)，1是新用户（非正常参团）
              countTime: this.countTime, // 倒计时
              img:
              this.$store.getters.app.imgIp + this.groupDetail.goodsImgUrl, // 图片
              groupMemberWithdrawAmount: this.groupDetail
                .groupMemberWithdrawAmount // 秒提金额
            };
            this.$router.push({ path: "hp_anther_isScuess", query: data });
          }
        });
      } else {
        join_group_pay(target).then(res => {
          Indicator.close();
          if (res.code!='200'&&res.code!='9017035'&&res.code!='9017033') {
            this.getCodeImg();
            this.msCode = "";
            // 清空计时
            this.codeText = "获取验证码";
            clearInterval(this.timer);
            this.timer = null;
          } else {
            let isNew = "";
            if (
              this.groupDetail.userNum - this.groupDetail.joinNum != "0" &&
              this.groupDetail.groupOrderStatus != "3"
            ) {
              isNew = "0";
            } else {
              isNew = "1";
            }
            let data = {
              groupId: this.groupId,
              path: "joinNew",
              data: res.data,
              share: this.share,
              isNew: isNew, // 0是老用户(正常参团)，1是新用户（非正常参团）
              countTime: this.countTime, // 倒计时
              img:
              this.$store.getters.app.imgIp + this.groupDetail.goodsImgUrl, // 图片
              groupMemberWithdrawAmount: this.groupDetail
                .groupMemberWithdrawAmount // 秒提金额
            };
            this.$router.push({ path: "hp_anther_isScuess", query: data });
          }
        });
      }
    },
    initMsg() {
      this.isNative = urlMsg().isNative; //1为系统分享，其他均为微信分享
      // 1为系统分享，不必获取code
      if (this.isNative == 1) {
        if (urlMsg().appId) {
          this.appId = urlMsg().appId;
        } else {
          this.appId = appId();
        }
        this.groupId = urlMsg().groupId;
        this.userId = urlMsg().userId;
        this.invitationCode = urlMsg().invitationCode;
        this.getCodeImg();
        this.get_group_manages();
        this.init();
      } else {
        //   微信内分享需要获取code
        let ua = navigator.userAgent.toLowerCase();
        let isWeixin = ua.indexOf("micromessenger") != -1;
        if (isWeixin) {
          let code = urlMsg().code;
          if (code) {
            this.code = code;
            Indicator.open({
              text: "加载中...",
              spinnerType: "fading-circle"
            });
            this.groupId = cookie.get("groupId");
            this.userId = cookie.get("userId");
            this.invitationCode = cookie.get("invitationCode");
            this.appId = cookie.get("appId");
            this.getCodeImg();
            this.get_group_manages();
            this.init();
          } else {
            cookie.set("groupId", urlMsg().groupId); //'当前团id',
            cookie.set("userId", urlMsg().userId); //'开团用户id',
            cookie.set("invitationCode", urlMsg().invitationCode); // 邀请码
            if (urlMsg().appId) {
              cookie.set("appId",urlMsg().appId); // appid
            }else{
               let appid = appId();
               cookie.set("appId",appid); // appid
            }

            wxAuth("/joinNew", urlMsg().appId);
            // this.init();
          }
        } else {
          MessageBox.alert("请在微信内打开", "提示");
          //   this.groupId = urlMsg().groupId;
          //   this.userId = urlMsg().userId;
          //   this.invitationCode = urlMsg().invitationCode;
          //   this.appId = urlMsg().appId;
          //   this.getCodeImg();
          //   this.get_group_manages();
          //   this.init();
        }
      }
    },
    // 获取易盾token
    init() {
      this.wm = null;
      let that = this;
      // 初始化SDK，只需初始化一次
      // auto使用默认值，即自动化模式
      initWatchman({
        productNumber: "YD00287362910423",
        onload: function(instance) {
          that.wm = instance;
        }
      });
    }
  },

  beforeDestroy() {
    $("title").html("海草公社");
  }
};
</script>

<style lang="less" scoped>
// 验证码样式
.vaptcha-init-main {
  width: 6.22rem;
  height: 0.8rem;
  margin: 0 auto;
  font-size: 0.32rem;
  line-height: 0.8rem;
  background: #ccc;
  border-radius: 0.4rem;
}
.join-container {
  background: #fff;
  .share-block {
    width: 100%;
    background: #fff;
    .share-content {
      padding: 0.32rem 0;
      display: flex;
      .img-box {
        flex: 1;
        text-align: center;
        img {
          width: 3rem;
          height: 3rem;
        }
      }
      .right-content {
        flex: 1;
        overflow: hidden;
        position: relative;
        .title {
          margin-top: 0.36rem;
          font-size: 0.36rem;
          font-weight: bold;
        }
        .scene {
          margin-top: 0.04rem;
          font-size: 0.28rem;
          color: #333;
          span {
            color: #ff001f;
          }
        }
        .receive {
          margin-top: 0.8rem;
          font-size: 0.24rem;
          display: flex;
          .receive-text {
            color: #999999;
            font-size: 0.26rem;
          }
          .red {
            color: #ff001f;
          }
        }
        .sum {
          margin-top: 0.04rem;
          font-size: 0.24rem;
        }
        .number {
          width: 2.64rem;
          height: 0.4rem;
          line-height: 0.4rem;
          text-align: center;
          font-size: 0.22rem;
          background: #ffe83b;
          position: absolute;
          left: 0;
          top: 2.6rem;
        }
      }
    }
    .group-list {
      width: 70%;
      margin: 0 auto;
      .group-box {
        display: flex;
        flex-flow: wrap;
        .group-item {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0.24rem 0;
          .group {
            width: 0.72rem;
            height: 0.72rem;
            display: flex;
            justify-content: center;
            border-radius: 50%;
            .tzImg {
              width: 0.75rem !important;
              height: 0.85rem !important;
            }
          }
          img {
            border-radius: 50%;
            width: 0.72rem;
            height: 0.72rem;
          }
        }
      }
    }
    .residue-time {
      color: #202127;
      font-size: 0.29rem;
      text-align: center;
      margin-bottom: 0.54rem;
      .span-center {
        color: #ff001f;
        font-size: 0.42rem;
        font-weight: bold;
      }
      .span-right {
        font-size: 0.42rem;
        font-weight: bold;
      }
    }
    .fail-team {
      text-align: center;
      margin: 0.56rem auto;
      color: #666666;
      font-size: 0.29rem;
      width: 88%;
      .fail-title {
        img {
          margin-right: 0.1rem;
          width: 0.28rem;
          height: 0.36rem;
        }
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.36rem;
      }
      .fail-yz {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 0.48rem auto;
        height: 2.08rem;
        background: rgba(255, 204, 0, 0.2);
        border-radius: 0.14rem;
        color: rgba(255, 98, 29, 1);
        font-size: 0.36rem;
        img {
          margin-top: 0.34rem;
          width: 2.17rem;
          height: 0.49rem;
        }
      }
    }
  }
  .share-rule {
    margin-top: 0.32rem;
    margin-bottom: 1rem;
    overflow: hidden;
    width: 100%;
    .title {
      margin: 0 auto;
      width: 88%;
      display: flex;
      align-items: center;
      justify-content: center;
      .line {
        width: 1.4rem;
        height: 1px;
        background: #ccc;
        flex: 1;
      }
      .center {
        text-align: center;
        flex: 1;
        font-size: 0.36rem;
        font-weight: bold;
      }
    }
    .rule {
      margin-top: 0.4rem;
      display: flex;
      align-items: center;
      justify-content: center;
      .rule-item {
        flex-direction: column;
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;
        img {
          border-radius: 50%;
          width: 1.14rem;
          height: 1.14rem;
        }
        .rule-text {
          margin-top: 0.3rem;
          font-size: 0.29rem;
          color: #000;
        }
      }
    }
    .rule-list {
      margin: 0.56rem auto;
      color: #666666;
      font-size: 0.29rem;
      width: 80%;
      line-height: 0.48rem;
      .rule-img {
      }
    }
  }
  .btn-box {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    background: #fff;
    .submit {
      margin: 0.2rem auto;
      text-align: center;
      font-size: 0.36rem;
      width: 6rem;
      height: 0.9rem;
      line-height: 0.9rem;
      background: rgba(255, 204, 0, 1);
      border-radius: 0.56rem;
      &:active {
        background: rgba(255, 204, 0, 0.5);
      }
    }
  }
  .modal {
    top: 0;
    left: 0;
    position: fixed;
    display: flex;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 1);
    opacity: 0.7;
    z-index: 100;
  }
  .form-box {
    z-index: 999;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    margin: auto;
    width: 6.4rem;
    background: rgba(255, 255, 255, 1);
    border-radius: 0.2rem;
    padding: 0.2rem 0.24rem;
    .form-title {
      font-size: 0.36rem;
      text-align: center;
      margin: 0.48rem auto;
    }
    .item-top {
      margin-top: 0.3rem !important;
      text-align: center;
    }
    .phone {
      width: 6.22rem;
    }
    input {
      width: 76%;
      font-size: 0.28rem;
      padding-left: 0.32rem;
      height: 0.8rem;
      border-radius: 0.4rem;
      border: 0.02rem solid rgba(209, 209, 214, 1);
      outline: none;
      -webkit-appearance: none;
    }
    .form-item {
      height: 1rem;
      display: flex;
      margin: 0.32rem auto;
      align-items: center;
      .code-img {
        width: 2.22rem;
        height: 0.8rem;
      }
      .getCode-text {
        font-size: 0.28rem;
        width: 2.22rem;
        height: 0.8rem;
        text-align: center;
        line-height: 0.81rem;
        background: rgba(255, 204, 0, 1);
        border-radius: 0.4rem;
        &:active {
          background: rgba(255, 204, 0, 0.5);
        }
      }
      .code-left {
        flex: 2;
        display: flex;
        align-items: center;
      }
      .code-right {
        flex: 1;
        height: 0.8rem;
        display: flex;
        align-items: center;
      }
    }
    .submit {
      margin: 0 auto;
      width: 2.94rem;
      height: 0.96rem;
      line-height: 0.97rem;
      text-align: center;
      background: rgba(255, 204, 0, 1);
      border-radius: 0.48rem;
      font-size: 0.36rem;
      &:active {
        background: rgba(255, 204, 0, 0.5);
      }
    }
  }
}
</style>
