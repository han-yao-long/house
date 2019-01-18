<template>
  <div id="updata">
    <div class="bodys">
      <p>上传照片</p>
      <div class="list">
        <div><updata :clearImg="clearImg" @getNew="getImgs"></updata>
        <span>剥离前</span>
        </div>
         <div><updata :clearImg="clearImg" @getNew="getImgs"></updata>
         <span>剥离前</span>
         </div>
      </div>
        <div class="updata" @click="pushimg"></div>
      <div class="wingame"  @click="winPrize"></div>
      <div class="lookImg" @click="show_imagesss"></div>
    </div>
    <!-- 蒙版 -->
    <div v-show="isShowAlert" class="Mask" @click="closeAlsert">
      <imglist :listImgs="listImg" @closeAlserts="isShowAlert=false"></imglist>
      <div class="alertMsg"></div>
    </div>
  </div>
</template>
<script>
import updata from "@/components/imgUpload/index.vue";
import imglist from "./child/imglist.vue";
import { upload_imagess, addresss, win_prizess,show_imagess} from "@/api/common"; // 公共api
export default {
  components: {
    updata,imglist
  },
  data() {
    return {
      arr: [],
      nameArr: [],
      open_id: "",
      is_win_prize: true,
      choujiang: "抽奖",
      listImg:[],
      isShowAlert:false,
      isImgList:false,
      clearImg:false,
      is_win:false
    };
  },
  methods: {
    getImgs(target) {
      this.arr.push(target[0][0]);
      this.nameArr.push(target[1]);
    },
    closeAlsert(){
      this.isShowAlert = false;
      this.isImgList = false
    },
    pushimg() {
      if (this.arr.length == 2) {
        let file1 = new File([this.nameArr[0]], this.nameArr[0].name, {
          type: this.arr[0].type
        }); // 创建file 对象
        let file2 = new File([this.nameArr[1]], this.nameArr[1].name, {
          type: this.arr[1].type
        }); // 创建file 对象
        let param = new FormData(); //创建form对象
        param.append("avatar", file1); //通过append向form对象添加数据
        param.append("images", file2); //通过append向form对象添加数据
        param.append("open_id", this.open_id); //通过append向form对象添加数据
        console.log(param);
        upload_imagess(param).then(res => {
          if (res.status == 200) {
             this.clearImg = true;
             this.isImgList = true;
          }
        });
      } else {
        alert("图片必须两张两张上传");
      }
    },
    show_imagesss(){
      this.isShowAlert = true
      let data = {
        open_id:this.open_id
      }
     show_imagess(data).then(res=>{
       this.listImg = res.images
     })
    },
    // 抽奖
    winPrize() {
      if (this.is_win_prize) {
        this.choujiang = "摇一摇";
        this.yaoyiyao();
      } else {
        alert("不能抽奖");
      }
    },
    yaoyiyao() {
         let data = {
        open_id:this.open_id
      }
          win_prizess(data).then(res => {
              this.is_win_prize = false;
              this.is_win = res.is_win;
              if(this.is_win){
                alert('中奖')
              }else{
                alert('未中奖')
              }
            });
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
        window.addEventListener("devicemotion", deviceMotionHandler, false);
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
            (Math.abs(x + y + z - last_x - last_y - last_z) / diffTime) * 10000;
          var status = document.getElementById("status");
          if (speed > shake) {
            // win_prizess().then(res => {
            //   this.is_win_prize = false;
            //   alert("抽奖流程结束", res);
            //   console.log("抽奖流程结束", res);
            // });
          }
        }
        last_x = x;
        last_y = y;
        last_z = z;
      }
    }
  },
  mounted() {
    this.open_id = this.$route.query.open_id;
    addresss()
  }
};
</script>
<style scoped lang="less">
p{
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
    overflow: hidden;
    p{
      font-size: .4rem;
      color: #fdd000;
      text-align: center;
      margin-top: 1.82rem;
    }
      .list {
    width: 6rem;
    display: flex;
    justify-content: space-around;
    margin: 0 auto;
    span{
      font-size: .36rem;
        color: #fdd000;
        display: flex;
        justify-content: center
    }
  }
  .wingame{
      background: url("./../../assets/gassgame/wingame.png") no-repeat center;
  background-size: 100% 100%;
  width: 2.04rem;
  height: .8rem;
  margin: 0 auto
  }
  .lookImg{
          background: url("./../../assets/gassgame/lookImg.png") no-repeat center;
  background-size: 100% 100%;
  width: 3rem;
  height: .9rem;
  margin: 0 auto
  }
    .updata{
          background: url("./../../assets/gassgame/updata.png") no-repeat center;
  background-size: 100% 100%;
  width: 2.1rem;
  height: .9rem;
  margin: 0 auto
  }
  }
}
.Mask{
     width: 100%;
    height: 100%;
    background: rgba(000, 000, 000, 0.6);
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center
}
.alertMsg{
  width: 5.3rem;
  border:#fff solid 0.01rem;
  border-radius: .4rem .4rem;
  line-height: .88rem;
  text-align: center;
  padding: .16rem .16rem;
  position: absolute;
  top: 50%;
  left: 50%;
}
</style>

