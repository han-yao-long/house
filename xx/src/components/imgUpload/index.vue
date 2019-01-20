<template>
  <div class="img-box">
    <div class="img-group" v-if="viewImgs.length>0" v-for="(i,index) in viewImgs" :key="index">
      <div class="del" @click="del(index)"></div>
      <div v-if="index == 0" class="main-img">主图</div>
      <img :src="i" :key="i" />
    </div>
    <div class="add-box" v-if="viewImgs.length <1">
      <div class="add">
        <input type="file" accept="image/*" @change="addImg">
      </div>
    </div>
  </div>
</template>

<script>
import { VueCropper } from "vue-cropper";
import conmon from "@/api/common"; // 公共api
export default {
  // name: "indexs",
  components: {
    VueCropper
  },
  props: {
    index: Number
  },
  data: function () {
    const width = document.body.clientWidth * 0.8; //屏幕宽度

    return {
      width: width,
      viewImgs: [], // 预览图
      file: [],
      showModal: false,
      proportion: "square",
      bobl:[]
    };
  },
  methods: {
    // 图片添加
    addImg(e) {
      let file = e.target.files[0];
      this.file = e.target.files[0];
      let _URL = window.URL || window.webkitURL;
      this.viewImgs.push(_URL.createObjectURL(file));

          let reader = new FileReader();
        reader.readAsDataURL(file);
                reader.onload = (loadEvent) => {
                    var url = loadEvent.target.result;
                    var img = new Image();
                    img.src = url;
                    var bobl = this.resizeMe(img, 200, 200);
                    this.bobl = bobl;
                    console.log(this.bobl,this.file)
                }
      this.newImgs();
    },
    // 删除图片
    del(index) {
      this.viewImgs.splice(index, 1);
      this.newImgs();
      this.file = [];
    },
    newImgs() {
      this.$emit("getNew", {
        index: this.index,
        file: this.file,
        bobl:this.bobl
      });
    },
    clearImg() {
      this.viewImgs = [];
      this.file = [];
    },
         resizeMe: function (img, max_width, max_height) {
            var canvas = document.createElement('canvas');

            var width = img.width;
            var height = img.height;

            // 宽高压缩
            /*if (width > height) {
                if (width > max_width) {
                    height = Math.round(height *= max_width / width);
                    width = max_width;
                }
            } else {
                if (height > max_height) {
                    width = Math.round(width *= max_height / height);
                    height = max_height;
                }
            }*/

            canvas.width = width;
            canvas.height = height;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, width, height);
            let base64s = canvas.toDataURL("image/jpeg", 0.3);
          
            return   this.dataURLtoBlob(base64s)
        }   ,
        // base64转bole
   dataURLtoBlob(dataurl) {
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    }
  }
};
</script>

<style scoped lang="less">
.img-box {
  display: flex;
  flex-flow: wrap;
  .img-group {
    width: 100%;
    height: auto;
    position: relative;
    .del {
      background: url("./../../assets/countDown/delImg.png") no-repeat;
      background-size: 100%;
      width: 0.3rem;
      height: 0.3rem;
      position: absolute;
      margin-bottom: -0.18rem;
      left: 0rem;
      z-index: 6;
    }
    .main-img {
      position: absolute;
      z-index: 1;
      bottom: 0.16rem;
      font-size: 0.24rem;
      left: 0.08rem;
      border-radius: 0.04rem;
      padding: 0px 0.04rem 0.02rem;
      background: rgba(255, 204, 0, 0.7);
    }
    img {
      top: 0;
      left: 0;
      border-radius: 0.08rem;
      position: relative;
      width: 2.5rem;
      height: 3rem;
      /*pointer-events: none;*/
      /*vertical-align: sub;*/
      /*-webkit-touch-callout: none;*/
      /*-webkit-user-select: none;*/
      /*-moz-user-select: none;*/
      /*-ms-user-select: none;*/
      /*user-select: none;*/
    }
  }
  .add-box {
    .add {
      width: 2.5rem;
      height: 3.2rem;
      background: url("../../assets/countDown/add.png") no-repeat;
      background-size: 100%;
      background-position-y: 10px;
      input {
        width: 100%;
        height: 100%;
        opacity: 0;
        position: relative;
        left: 0px;
        top: 0px;
        display: block;
      }
    }
  }
}
.cut-box {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: #fff;
  top: 0;
  left: 0;
  z-index: 1000;
  .cut-top {
    display: flex;
    color: #fff;
    font-size: 0.24rem;
    height: 0.8rem;
    align-items: center;
    background: rgba(0, 0, 0, 0.7);
    .title {
      flex: 1;
      font-size: 0.32rem;
      display: flex;
      justify-content: center;
    }
    .cancel {
      flex: 1;
      display: flex;
      padding-left: 0.24rem;
    }
    .sure {
      flex: 1;
      display: flex;
      width: max-content;
      justify-content: flex-end;
      padding-right: 0.24rem;
    }
  }
  .cut-content {
    height: 80%;
  }
  .cut-bottom {
    width: 100%;
    margin-top: 0.32rem;
    font-size: 0.28rem;
    display: flex;
    color: #202127;
    .square {
      margin-left: 0.24rem;
      width: 0.6rem;
      text-align: center;
      .square-img {
        width: 0.6rem;
        height: 0.6rem;
        background: url("../../assets/countDown/square.png") no-repeat;
        background-size: 100%;
      }
      .square-img-gray {
        width: 0.6rem;
        height: 0.6rem;
        background: url("../../assets/countDown/square-gray.png") no-repeat;
        background-size: 100%;
      }
    }
    .long {
      margin-left: 0.24rem;
      width: 0.6rem;
      text-align: center;
      .long-img {
        width: 0.6rem;
        height: 0.6rem;
        background: url("../../assets/countDown/long.png") no-repeat;
        background-size: 100%;
      }
      .long-img-gray {
        width: 0.6rem;
        height: 0.6rem;
        background: url("../../assets/countDown/long.png") no-repeat;
        background-size: 100%;
      }
    }
    .text-color {
      color: #e42011;
    }
  }
}
</style>
