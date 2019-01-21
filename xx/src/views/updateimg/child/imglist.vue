<template>
  <div id="imgList" @click.stop>
    <img class="tit" src="@/assets/countDown/tit.png" alt>
    <span class="close" @click="closeAlsert"></span>
    <ul class="clearfloat">
      <li v-for="(item,index) in listImgs" :key="index">
          <img :src="item" alt="">
      </li>
    </ul>
  </div>
</template>
<script>
export default {
    props:{
     listImgs:{
         type:Array,
         default:[]
     }
    },
    data(){
        return{
            urls:''
        }
    },
    methods:{
        closeAlsert(){
            this.$emit('closeAlserts')
        }
    }
}
</script>

<style lang="less" scoped>
ul,
li {
  margin: 0;
  padding: 0;
  list-style: none;
}
#imgList {
  width: 6.1rem;
  height: 10rem;
  background: url("./../../../assets/countDown/msg.png") no-repeat center;
  background-size: 100% 100%;
  overflow: hidden;
  position: relative;
  .tit {
    width: 4.34rem;
    height: 0.7rem;
    margin: 0 auto;
    display: flex;
    margin-top: 0.3rem;
  }
  ul {
    width: 5.28rem;
    margin-left: 0.67em;
    max-height: 6rem;
    overflow-y: auto;
    li {
      width: 2.36rem;
      height: 1.68rem;
      border-radius: 0.1rem;
      border: solid #febf00 0.01rem;
      float: left;
      margin: 0.24rem 0.24rem 0 0;
      img{
          display: block;
          width: 100%;
          height: 100%;
          display: block;
      }
    }
  }
  .close {
    position: absolute;
    top: 0.24rem;
    right: 0.24rem;
    width: 0.5rem;
    height: 0.5rem;
    background: url("./../../../assets/countDown/close.png") no-repeat center;
    background-size: 100% 100%;
  }
}
/*清除浮动代码*/
.clearfloat:after {
  display: block;
  clear: both;
  content: "";
  visibility: hidden;
  height: 0;
}
.clearfloat {
  zoom: 1;
}
</style>

