<template>
  <div id="guss_loading">
    <img @click="plays" class="music" src="@/assets/countDown/music.png" alt>
    <!-- 视频播放器 -->
   <div class="videobod"> <video x5-video-player-type="h5" x5-video-player-fullscreen="true" v-if="true" id="video" ref="video" :src="audioVoice"></video></div>
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
      <div v-else>
        <div class="fengmian-all">
          <fengmian @openVideos="openvideoss" @openAlert="isAlert=true"></fengmian>
        </div>
      </div>
    </div>
    <div v-show="isAlert" class="alert-all">
      <alerts @closeAlsert="isAlert=false"></alerts>
    </div>
    <audio preload="auto" id="audioss" ref="audios" loop="loop">
      <source :src="audioVoices" type="audio/mpeg">
    </audio>
  </div>
</template>
<script>
import axios from "axios";
import { MessageBox,Indicator } from "mint-ui";
import { setInterval, clearInterval, setTimeout } from "timers";
import { wxAuth, urlMsg, formatSeconds, wxCharts, appId } from "@/utils/common";
import fengmian from "./fengmian.vue";
import alerts from "./alert.vue";
import { wx_token } from "@/api/common.js";
import { cookie } from "@/utils/cache.js";
// import aplayer from "vue-aplayer";
export default {
  data() {
    return {
      isLoading: true, //是否显示loading页面
      isAlert: false,
      audioVoice: require("./../../../static/audio.mp4"),
      audioVoices: require("./../../../static/x1.mp3"),
      isVideo: false,
      userMsg: {
        is_new_user: true,
        open_id: "",
      },
       canMusic: true,
    };
  },
  components: {
    fengmian,
    alerts,
    Indicator
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
    wxAuths() {
      const that = this;
      let code = urlMsg().code;
      if (code) {
        this.wxtoken(code);
            document.addEventListener(
      "WeixinJSBridgeReady",
      function() {
        that.$refs["audios"].play();
        $(".music").toggleClass("rotate");
      },
      false
    );
      } else {
        //   微信token验证
        wxAuth();
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
      $(".music").toggleClass("rotate");
    },
    openvideoss() {
      this.isVideo = true;
      $("#video").css({ "z-index": 6666 });
      this.$refs.video.play();
      $("#video")[0].play();
      let that = this;

      setTimeout(function() {
        that.playMusic();
      }, 1000);
    },
    playMusic: function() {
      let musicPl = this.$refs.video;
      let that = this;
      var sUserAgent = navigator.userAgent.toLowerCase();
      var isIOS = sUserAgent.match(/(iPhone|iPod)/i) != null;
      // if (that.userMsg.is_new_user) {
      //   that.$router.push({ path: "/zhuce", query: this.userMsg });
      // } else {
      //   that.$router.push({ path: "/updateimg", query: this.userMsg });
      // }
      if (isIOS) {
        musicPl.addEventListener(
          "ended",
          function() {
            if (that.userMsg.is_new_user) {
              that.$router.push({ path: "/zhuce", query: that.userMsg });
            } else {
              that.$router.push({ path: "/updateimg", query: that.userMsg });
            }
          },
          false
        );
      } else {
        // $("#video").on("ended", function() {
        //   if (that.userMsg.is_new_user) {
        //     that.$router.push({ path: "/zhuce", query: that.userMsg });
        //   } else {
        //     that.$router.push({ path: "/updateimg", query: that.userMsg });
        //   }
        // });
        setTimeout(function(){
          $('#video').css({"display":"none"});
          $('.videobod').css({'display':'none'})
     if (that.userMsg.is_new_user) {
              that.$router.push({ path: "/zhuce", query: that.userMsg });
            } else {
              that.$router.push({ path: "/updateimg", query: that.userMsg });
            }
        },5000)

      }
    },
    // 获取用户openid
    wxtoken(code) {
      Indicator.open()
      let data = { code };
      wx_token(data).then(res => {
        this.userMsg.is_new_user = res.is_new_user;
        this.userMsg.open_id = res.open_id;
        cookie.set('open_id',res.open_id);
      });
      let that = this;
      axios
        .get("/api/api/users/get_access_token", {
          params: {
            code
          }
        })
        .then(function(res) {
              Indicator.close();
          that.userMsg.is_new_user = res.data.is_new_user;
          that.userMsg.open_id = res.data.open_id;
          cookie.set("open_id", res.data.open_id);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
  },
  mounted() {
    this.loading();
    this.wxAuths();
    let that = this;
    document.addEventListener(
      "WeixinJSBridgeReady",
      function() {
        that.$refs["audios"].play();
        $(".music").toggleClass("rotate");
      },
      false
    );
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
.fengmian-all {
  position: absolute;
  bottom: 0;
}
.alert-all {
  z-index: 999;
  position: absolute;
  left: 0;
  top: 0;
}
#video {
  position: absolute;
  left: 0;
  width:7.5rem;

  height: 100vh;
  z-index: -1;
}
.music {
  position: absolute;
  right: 0.3rem;
  top: 0.3rem;
}
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
// >>>>>>> fbab25a7b945d43cb24847c5a2bedd8fb87636ec
}
</style>

