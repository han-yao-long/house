<template>
  <div id="updata">
    <div class="list">
      <updata @getNew="getImgs"></updata>
      <updata @getNew="getImgs"></updata>
    </div>
    <div @click="pushimg">上传</div>
    <div @click="winPrize">{{choujiang}}</div>
  </div>
</template>
<script>
import updata from "@/components/imgUpload/index.vue";
import { upload_imagess, addresss, win_prizess } from "@/api/common"; // 公共api
export default {
  components: {
    updata
  },
  data() {
    return {
      arr: [],
      open_id: "13",
      is_win_prize: true,
      choujiang: "抽奖"
    };
  },
  methods: {
    getImgs(target) {
      this.arr.push(target[0]);
    },
    pushimg() {
      if (this.arr.length == 2) {
        console.log(this.arr);
        let file1 = new File([this.arr[0]], Math.random(), {
          type: this.arr[0].type
        }); // 创建file 对象
        let file2 = new File([this.arr[1]], Math.random(), {
          type: this.arr[1].type
        }); // 创建file 对象
        let images = [file1, file2];
        let param = new FormData(); //创建form对象
        param.append("avatar",file1); //通过append向form对象添加数据
        param.append("images",file2); //通过append向form对象添加数据
        param.append("open_id", "1312"); //通过append向form对象添加数据
        upload_imagess(param).then(res => {
          console.log(res);
        });
      } else {
        alert("图片必须两张两张上传");
      }
    },
    // 抽奖
    winPrize() {
      if (this.is_win_prize) {
        this.choujiang = "摇一摇";
        this.yaoyiyao()
      } else {
        alert("不能抽奖");
      }
    },
    yaoyiyao() {
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
            win_prizess().then(res=>{
                this.is_win_prize = false;
                alert('抽奖流程结束',res);
                console.log('抽奖流程结束',res)
            })
          }
        }
        last_x = x;
        last_y = y;
        last_z = z;
      }
    }
  },
  mounted() {
    addresss();
  }
};
</script>
<style scoped lang="less">
#updata {
  width: 7.5rem;
  height: 100vh;
  margin: 0 auto;
  .list {
    width: 100%;
    display: flex;
    justify-content: center;
  }
}
</style>

