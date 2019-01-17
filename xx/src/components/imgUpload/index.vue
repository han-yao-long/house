<template>
  <div>
    <div class="img-box">
      <div class="img-group"  @touchmove="move" @touchstart="down(index)" @touchend="up" ref="imgs" :id="'img'+index" v-if="viewImgs.length>0" v-for="(i,index) in viewImgs" :key="index">
        <div class="del" @click="del(index)"></div>
        <div v-if="index=='0'" class="main-img">主图</div>
        <img :src="i" :key="i">
      </div>
      <div class="add-box" v-if="viewImgs.length <1">
        <div class="add">
          <input type="file" id="file" accept="image/png,image/gif,image/jpeg" @change="addImg">
        </div>
      </div>
    </div>
    <div class="cut-box" v-if="showModal">
      <div class="cut-top">
        <div class="cancel"><div @click="closeEdit">取消</div></div>
        <div class="title">裁剪</div>
        <div class="sure"><div @click="uploadImg">确定</div></div>
      </div>
      <div class="cut-content">
        <vueCropper
          ref="cropper"
          :img="option.img"
          :outputSize="option.size"
          :outputType="option.outputType"
          :info="true"
          :full="option.full"
          :canMove="option.canMove"
          :canMoveBox="option.canMoveBox"
          :fixedBox="option.fixedBox"
          :original="option.original"
          :autoCrop="option.autoCrop"
          :autoCropWidth="option.autoCropWidth"
          :autoCropHeight="option.autoCropHeight"
          :centerBox="option.centerBox"
          :high="option.high"
          :infoTrue="option.infoTrue"
          :enlarge="option.enlarge"
          :mode="option.mode"
        ></vueCropper>
      </div>
      <div class="cut-bottom">
        <div @click="cutImg('square')" class="square">
          <div :class="proportion=='square'?'square-img':'square-img-gray'"></div>
          <div :class="proportion=='square'?'text-color':''">方图</div>
        </div>
        <div @click="cutImg('long')" class="long">
          <div :class="proportion=='long'?'long-img':'long-img'"></div>
          <div :class="proportion=='long'?'text-color':''">长图</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  const width=document.body.clientWidth*0.8 //屏幕宽度
  import { VueCropper }  from 'vue-cropper'
  import conmon from '@/api/common' // 公共api
  export default {
    // name: "indexs",
    components:{
      VueCropper
    },
    data(){
      return{
        viewImgs:[], // 预览图
        imgs:[], // 图片流
        showModal:false,
        option: {
          img: "",
          size: 1,
          full: true,
          outputType: "jpeg || png || web",
          canMove: true,
          fixedBox: true,
          original: false,
          canMoveBox: true,
          autoCrop: true,
          // 只有自动截图开启 宽度高度才生效
          autoCropWidth: width,
          autoCropHeight: width,
          centerBox: true,
          high: true,
          cropData: {},
          enlarge: 1,
          mode:'cover'
        },
        proportion:'square',
      }
    },
    mounted(){
    },
    methods:{
      // 图片比例选择
      cutImg(target){
        if(target=='square'){
          this.option.autoCropWidth=width
          this.option.autoCropHeight=width
        }else {
          this.option.autoCropWidth=width
          this.option.autoCropHeight=width/0.75
        }
        this.proportion=target
      },
      // 图片编辑
      edit(i){
        this.showModal=true
        // this.option.img='http://cdn.xyxiao.cn/Landscape_3.jpg'
        this.option.img=i
        console.log(this.option)
      },
      closeEdit(){
        this.showModal=false
        var file = $('#file')[0];
        file.value = '';
      },
      // 图片添加
      addImg(e){
        let file = e.target.files[0];
        let _URL = window.URL || window.webkitURL;
        this.option.img=_URL.createObjectURL(file);
        this.showModal=true;
      },
      // 图片上传
      uploadImg(){
        this.$refs.cropper.getCropBlob(data => {
          let img = data
          let _URL = window.URL || window.webkitURL;
          this.viewImgs.push(_URL.createObjectURL(img));
          this.imgs.push(data)
          this.showModal=false
          var file = $('#file')[0];
          file.value = '';
          this.newImgs()
            // let file= new File([data], Math.random(),{type:data.type}); // 创建file 对象
            // let param = new FormData(); //创建form对象
            // param.append('file',file);//通过append向form对象添加数据
            // this.showModal=false
            // this.$vux.loading.show({
            //   text: 'Loading'
            // })
            // conmon.upLoad_single(param).then(res=>{
            //   this.imgs.push(res.data)
            //   // 清空input记录
            //   var file = $('#file')[0];
            //   file.value = '';
            //   this.newImgs()
            //   this.$vux.loading.hide()
            // })
          });
      },
      // 删除图片
      del(index){
        this.imgs.splice(index,1)
        this.viewImgs.splice(index,1)
        this.newImgs()
      },
      newImgs(){
          console.log(this.imgs)
        this.$emit('getNew',this.imgs)
      },
      // 点击事件
      down(index){
        console.log(event)
      },
      // 移动事件
      move(i){

      },
      // 放开事件
      up(){}
    }
  }
</script>

<style scoped lang="less">
  .img-box{
    display: flex;
    flex-flow: wrap;
    .img-group{
      width: 25%;
      height: auto;
      position: relative;
      .del{
        background: url("./../../assets/countDown/delImg.png") no-repeat;
        background-size: 100%;
        width:.3rem;
        height: .3rem;
        position: relative;
        margin-bottom: -.18rem;
        left: -08rem;
        z-index: 10;
      }
      .main-img{
        position: absolute;
        z-index: 1;
        bottom: .16rem;
        font-size: .24rem;
        left: .08rem;
        border-radius: .04rem;
        padding: 0px .04rem .02rem;
        background: rgba(255, 204, 0, .7);
      }
     img{
       top: 0;
       left: 0;
       border-radius:.08rem;
       position: relative;
       width: 96%;
       height: 22vw;
       /*pointer-events: none;*/
       /*vertical-align: sub;*/
       /*-webkit-touch-callout: none;*/
       /*-webkit-user-select: none;*/
       /*-moz-user-select: none;*/
       /*-ms-user-select: none;*/
       /*user-select: none;*/
     }
    }
    .add-box{
      width: 25%;
      height: 25vw;
      .add{
        width: 96%;
        height: 96%;
        background: url("../../assets/countDown/add.png") no-repeat;
        background-size: 100%;
        background-position-y: 10px;
        input{
          width: 100%;
          height: 100%;
          opacity: 0;
          position: relative;
          left: 0px;
          top: 0px;
        }
      }
    }
  }
  .cut-box{
    position: fixed;
    width: 100vw;
    height: 100vh;
    background: #fff;
    top: 0;
    left: 0;
    z-index: 1000;
    .cut-top{
      display: flex;
      color: #fff;
      font-size: .24rem;
      height: .8rem;
      align-items: center;
      background: rgba(0,0,0,.7);
      .title{
        flex: 1;
        font-size: .32rem;
        display: flex;
        justify-content: center;
      }
      .cancel{
        flex: 1;
        display: flex;
        padding-left: .24rem;
      }
      .sure{
        flex: 1;
        display: flex;
        width: max-content;
        justify-content: flex-end;
        padding-right: .24rem;
      }
    }
    .cut-content{
      height: 80%;
    }
    .cut-bottom{
      width: 100%;
      margin-top: .32rem;
      font-size: .28rem;
      display: flex;
      color: #202127;
      .square{
        margin-left: .24rem;
        width: .6rem;
        text-align: center;
        .square-img{
          width: .6rem;
          height: .6rem;
          background: url("../../assets/countDown/square.png") no-repeat;
          background-size: 100%;
        }
        .square-img-gray{
          width: .6rem;
          height: .6rem;
          background: url("../../assets/countDown/square-gray.png") no-repeat;
          background-size: 100%;
        }
      }
      .long{
        margin-left: .24rem;
        width: .6rem;
        text-align: center;
        .long-img{
          width: .6rem;
          height: .6rem;
          background: url("../../assets/countDown/long.png") no-repeat;
          background-size: 100%;
        }
        .long-img-gray{
          width: .6rem;
          height: .6rem;
          background: url("../../assets/countDown/long.png") no-repeat;
          background-size: 100%;
        }
      }
      .text-color{
        color: #E42011;
      }
    }
  }
</style>
