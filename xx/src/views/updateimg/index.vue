<template>
  <div id="updata">
    <img class="ppd"  @click="phb" src="@/assets/countDown/ppd.png" alt="">
    <!-- <aplayer autoplay :music="musicList"></aplayer> -->
      <img @click="plays" class="music" src="@/assets/countDown/music.png" alt>
    <audio preload="auto" id="audioss" ref="audios" loop="loop">
      <source :src="audioVoice" type="audio/mpeg">
    </audio>
    <div v-if="isGetprize">
      <div v-if="!staying">
         <img v-if="is_win" class="win" src="@/assets/gassgame/win.jpg" alt="">
      <img v-if="!is_win" class="win" src="@/assets/gassgame/nowin.jpg" alt="">
      </div>
    </div>
    <div class="bodys">
      <div v-show="!isGetprize">
        <p>上传照片</p>
        <div class="list">
          <div>
            <updata :index="0" @getNew="getImgs"></updata>
            <span>剥离前</span>
          </div>
          <div>
            <updata :index="1" @getNew="getImgs"></updata>
            <span>剥离后</span>
          </div>
        </div>
        <div class="updata" @click="pushimg"></div>
       <div class="wingame" @click="winPrize"></div>
        <div class="lookImg" @click="show_imagesss"></div>
      </div>
      <!-- 中奖页面 -->
      <div v-show="isGetprize">
        <div v-show="staying">
          <img class="winprize" src="@/assets/gassgame/winprize.png" alt>
          <p id="yaoyiyao">摇一摇</p>
          <p id="yaoyiyao">领取神秘好礼</p>
        </div>
        <div v-show="!staying">
         <div v-if="is_win">
         </div>
         <div>
        
         </div>
        </div>
      </div>
    </div>
    <!-- 蒙版 -->
    <div v-show="isShowAlert" class="Mask" @click="closeAlsert">
      <imglist v-show="isImgList" :listImgs="listImg" @closeAlserts="closeAlsert"></imglist>
      <div v-show="isalertmsg" class="alertMsg">{{choujiang}}</div>
      <paihang :paihangmsg="paihangmsg" v-if="ispaihang" @closeAlserts="closeAlsert"></paihang>
    </div>
  </div>
</template>
<script>
import updata from "@/components/imgUpload/index.vue";
import {chooseImg} from "@/utils/common.js";
import imglist from "./child/imglist.vue";
import paihang from "./child/paihang.vue";
import { Indicator } from 'mint-ui';
import axios from 'axios';
import {
  randomString,
  hex_sha1
} from './../../utils/wxshare.js';
import wx from "weixin-js-sdk";
import {
  upload_imagess,
  addresss,
  win_prizess,
  show_imagess,rank_list_desc
} from "@/api/common"; // 公共api
import { cookie } from "@/utils/cache.js";

export default {
  components: {
    updata,
    imglist,
    paihang,Indicator
  },
  data() {
    return {
      arr: [],
      open_id: "",
      is_win_prize: false,
      choujiang: "需要同时上传'剥离前'和'剥离后的照片'才可提交成功",
      listImg: [],
      isShowAlert: false,
      isImgList: false,
      is_win: true,
      isalertmsg: false,
      isGetprize: false, //展示获奖页面
      staying:false,   //展示抽奖页面 false展示抽奖结果
      ispaihang:false,
      paihangmsg:{},
       audioVoice: require("./../../../static/x1.mp3"),
       canMusic:false,
       bobl:[]
    };
  },
  methods: {
    getImgs(data) {
      console.log('-------------------', data);
      this.arr[data.index] = data.file;
      this.bobl[data.index] = data.bobl;
    },
    closeAlsert() {
      this.isShowAlert = false;
      this.isImgList = false;
      this.isalertmsg = false;
      this.ispaihang = false
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
    phb(){
      this.ispaihang =true;
        this.isShowAlert = true;
    },
    pushimg() {
      if (this.arr.length == 2) {
        let param = new FormData(); //创建form对象
        param.append("avatar", this.arr[0]); //通过append向form对象添加数据
        param.append("images", this.arr[1]); //通过append向form对象添加数据
        param.append("open_id", this.open_id); //通过append向form对象添加数据
        console.log(param);
        Indicator.open();
        upload_imagess(param).then(res => {
          if (res.status == 200) {
            this.arr.length =0;
            Indicator.close();
            // this.isImgList = true;
          }
        });
      } else {
        this.isalertmsg = true;
        this.isShowAlert = true;
        this.choujiang = "需要同时上传'剥离前'和'剥离后的照片'才可提交成功";
      }
    },
    show_imagesss() {
      // this.isShowAlert = true;
      let data = {
        open_id: this.open_id
      };
      show_imagess(data).then(res => {
           this.isImgList = true;
           this.isShowAlert = true;
        this.listImg = res.images;
      });
    },
    // 抽奖
    winPrize() {
      this.yaoyiyao();
      // chooseImg()
    },
    yaoyiyao() {
      let that = this;
      let data = {
        open_id: this.open_id
      };
      win_prizess(data).then(res => {
        if (res.status == 200) {
             this.isGetprize = true;
          this.staying = true
          // 跳入页面
          if (res.is_win) {
            let shake = 4000;
            let last_update = 0;
            let count = 0;
            let x = 0;
            let y = 0;
            let z = 0;
            let last_x = 0;
            let last_y = 0;
            let last_z = 0;
            if (window.DeviceMotionEvent) {
              window.addEventListener(
                "devicemotion",
                deviceMotionHandler,
                false
              );
            } else {
              alert("本设备不支持devicemotion事件");
            }
            // 手机摇一摇监听
            function deviceMotionHandler(eventData) {
              let acceleration = eventData.accelerationIncludingGravity;
              let currTime = new Date().valueOf();
              let diffTime = currTime - last_update;
              if (diffTime > 100) {
                last_update = currTime;
                x = acceleration.x;
                y = acceleration.y;
                var speed =
                  (Math.abs(x + y + z - last_x - last_y - last_z) / diffTime) *
                  10000;
                var status = document.getElementById("status");
                if (speed > shake) {
                   that.staying = false;
                  that.is_win = true;
                }
              }
              last_x = x;
              last_y = y;
              last_z = z;
            }
          } else {
                   let shake = 4000;
            let last_update = 0;
            let count = 0;
            let x = 0;
            let y = 0;
            let z = 0;
            let last_x = 0;
            let last_y = 0;
            let last_z = 0;
            if (window.DeviceMotionEvent) {
              window.addEventListener(
                "devicemotion",
                deviceMotionHandler,
                false
              );
            } else {
              alert("本设备不支持devicemotion事件");
            }
            // 手机摇一摇监听
            function deviceMotionHandler(eventData) {
              let acceleration = eventData.accelerationIncludingGravity;
              let currTime = new Date().valueOf();
              let diffTime = currTime - last_update;
              if (diffTime > 100) {
                last_update = currTime;
                x = acceleration.x;
                y = acceleration.y;
                var speed =
                  (Math.abs(x + y + z - last_x - last_y - last_z) / diffTime) *
                  10000;
                var status = document.getElementById("status");
                if (speed > shake) {
                   that.staying = false;
                  that.is_win = false;
                }
              }
              last_x = x;
              last_y = y;
              last_z = z;
            }
          }
        } else {
          this.choujiang = "传满三组堆头剥离照片才能和好运更进一步哦！";
          this.isalertmsg = true;
          this.isShowAlert = true;
        }
      });
    }
  },
  mounted() {
    this.open_id = cookie.get("open_id");
    // this.open_id='oJQPhjhEFluUcmTGcbDCsnUwRIKY'
    // rank_list_desc().then(res=>{
    //      this.paihangmsg = res
    // })
    let that = this;
       axios
        .get("/api/api/user_lotter_records/rank_list_desc", {
          params: {
            open_id:this.open_id
            //  open_id:'oJQPhjhEFluUcmTGcbDCsnUwsRIKY'
          }
        })
        .then(function(res) {
         that.paihangmsg = res.data;
        })
        .catch(function(error) {
          console.log(error);
        });
           document.addEventListener(
      "WeixinJSBridgeReady",
      function() {
        that.$refs["audios"].play();
         $('.music').toggleClass("rotate")
      },
      false
    );
  }
};
</script>
<style scoped lang="less">
p {
  margin: 0 auto;
  padding: 0 auto;
}
#updata {
  width: 7.5rem;
  height: 100vh;
  margin: 0 auto;
  font-family: TSZT;
  background: url("./../../assets/zc/zc-bg.png") no-repeat center;
  background-size: 100% 100%;
  position: relative;
  .bodys {
    width: 100%;
    height: 80vh;
    position: absolute;
    bottom: 0;
    overflow-y: auto;
    p {
      font-size: 0.4rem;
      color: #fdd000;
      text-align: center;
      margin-top: 1.82rem;
    }
    .list {
      width: 6rem;
      display: flex;
      justify-content: space-around;
      margin: 0 auto;
      span {
        font-size: 0.36rem;
        color: #fdd000;
        display: flex;
        justify-content: center;
      }
    }
    .uddataall{
      display: flex;
      justify-content: center;
      align-items: center;
        .wingame {
      background: url("./../../assets/gassgame/wingame.png") no-repeat center;
      background-size: 100% 100%;
      width: 2.04rem;
      height: 0.8rem;

    }
        .up {
      background: url("./../../assets/countDown/up.png") no-repeat center;
      background-size: 100% 100%;
      width: 2.04rem;
      height: 0.8rem;
     font-size: .5rem;
      display: flex;
      justify-content: center;
      align-items: center
    }
    }
         .wingame {
      background: url("./../../assets/gassgame/wingame.png") no-repeat center;
      background-size: 100% 100%;
      width: 2.04rem;
      height: 0.8rem;
      margin: 0 auto

    }
    .lookImg {
      background: url("./../../assets/gassgame/lookImg.png") no-repeat center;
      background-size: 100% 100%;
      width: 3rem;
      height: 0.9rem;
      margin: 0.12rem auto 0;
    }
    .updata {
      background: url("./../../assets/gassgame/updata.png") no-repeat center;
      background-size: 100% 100%;
      width: 2.1rem;
      height: 0.9rem;
      margin: 0 auto;
    }
  }
  #yaoyiyao {
    font-size: 0.4rem;
    color: #fdd100;
    text-align: center;
    line-height: 0.62rem;
    margin: 0.5rem auto 0;
  }
}
.Mask {
  width: 100%;
  height: 100%;
  background: rgba(000, 000, 000, 0.6);
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}
.alertMsg {
  width: 5.3rem;
  border: #fff solid 0.02rem;
  border-radius: 0.4rem 0.4rem;
  line-height: 0.88rem;
  text-align: center;
  padding: 0.16rem 0.16rem;
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 0.4rem;
  color: #f6e16e;
  transform: translate(-50%, -70%);
}
.winprize {
  width: 6.16rem;
  height: 2.46rem;
  margin: 2rem auto 0;
  display: block;
}
.win{
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  right: 0;
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
.ppd{
  width: .88rem;
  height: 1.56rem;
  position: absolute;
  right: 0;
  top: 1.6rem;
  z-index: 9999;
}
</style>

