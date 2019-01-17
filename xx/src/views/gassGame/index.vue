<template>
  <div id="guss_loading">
    <img class="head" src="@/assets/gassgame/head.png" alt>
    <div class="bodys">
      <div v-if="isLoading">
        <img class="discc" src="@/assets/gassgame/disc.png" alt>
        <div class="box">
          <img class="fish" src="@/assets/gassgame/fish.png" alt>
          <div class="loading-box">loading
            <div class="color-loading"></div>
          </div>
        </div>
      </div>
      <div>
          
      </div>
    </div>
  </div>
</template>
<script>
import { MessageBox } from "mint-ui";
import { setInterval, clearInterval, setTimeout } from "timers";
import { wxAuth, urlMsg, formatSeconds, wxCharts, appId } from "@/utils/common";
// import aplayer from "vue-aplayer";
export default {
  data() {
    return {
      isLoading: false  //是否显示loading页面
    };
  },
  components: {
    // aplayer
  },
  methods: {
    loading() {
      let nu = 0.1;
      let nus = -5;
      let that = this;
      let stops = setInterval(function() {
        nu = nu + 0.05;
        nus = nus + 0.05;
        if (nu >= 5) {
          clearInterval(stops);
          setTimeout(function() {
            that.isLoading = false;
          }, 500);
        }
        $(".fish").css({ left: nu + "rem" });
        $(".color-loading").css({ left: nus + "rem" });
      }, 18);
    },
    // 获取code码
    wxAuths(){
       wxAuth() 
    }
  },
  mounted() {
    this.loading();
    this.wxAuths()
  },
  created() {
    // let sUserAgent = navigator.userAgent.toLowerCase();
    // let isWechat = sUserAgent.indexOf("micromessenger") != -1;
    // if (!isWechat) {
    //   MessageBox.alert("请在微信内打开", "提示");
    // }
  }
};
</script>

<style lang="less" scoped>
p {
  margin: 0;
  padding: 0;
}
#guss_loading {
  font-family: TSZT;
  width: 7.5rem;
  height: 100vh;
  background: url("./../../assets/gassgame/loading-bg.png") no-repeat center;
  background-size: 100% 100%;
  margin: 0 auto;
  position: relative;
  .head {
    width: 100%;
    height: auto;
  }
  .bodys {
    width: 100%;
    height: 80vh;
    position: absolute;
    bottom: 0;
    .discc {
      width: 5.24rem;
      height: 3.02rem;
      display: block;
      margin: 1.1rem auto 0;
    }
    .box {
      width: 100%;
      height: 1.5rem;
      position: relative;
      .fish {
        width: 1.5rem;
        height: 0.82rem;
        position: absolute;
        left: 0;
        top: 0;
      }
      .loading-box {
        width: 5rem;
        height: 0.4rem;
        border: solid #f6e16f 0.04rem;
        border-radius: 0.2rem 0.2rem;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 0;
        font-size: 0.36rem;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        overflow: hidden;
        .color-loading {
          width: 5rem;
          height: 0.4rem;
          border-radius: 0.2rem 0.2rem;
          background: #fdd000;
          position: absolute;
          left: -3rem;
          border: solid #f6e16f 0.04rem;
          top: -0.04rem;
          z-index: -1;
        }
      }
    }
  }
}
</style>

