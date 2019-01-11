<template>
  <div class="head">
    <div class="contents">
      <div class="icon"></div>
      <div class="texts">海草公社,能赚会花</div>
      <div class="downs" @click="goAndDowns">下载APP</div>
    </div>
  </div>
</template>
<script>
import { goAndDown } from "@/utils/common.js";
import { Toast, Indicator, MessageBox } from "mint-ui";
export default {
  data() {
    return {};
  },
  methods: {
    goAndDowns() {
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
    }
  }
};
</script>
<style lang="less" scoped>
.head {
  width: 100%;
  height: 1.2rem;
  background: #fff;
  position: relative;
  .contents {
    width: 100%;
    height: 1.2rem;
    margin: 0 auto;
    display: flex;
    align-items: center;
    border-bottom: 0.01rem solid #f4f4f4;
    .icon {
      width: 0.66rem;
      height: 0.66rem;
      background: url("./../../static/icon.png");
      background-size: 100% 100%;
      margin-left: 0.3rem;
    }
    .texts {
      flex: 1;
      font-size: 0.28rem;
      color: #555555;
      padding: 0 16px;
      box-sizing: border-box;
    }
    .downs {
      width: 1.54rem;
      height: 0.52rem;
      //   background: url("./../../static/hx_command_btn.png");
      //   background-size: 100% 100%;
      color: #202127;
      background: #ffcc00;
      border-radius: 0.26rem 0.26rem;
      font-size: 0.24rem;
      line-height: 0.52rem;
      text-align: center;
      margin-right: 0.2rem;
    }
  }
}
</style>

