<template>
  <div class="fengmian">
    <img class="light" src="@/assets/gassgame/fengmian-leight.png" alt>
    <img class="tit" @click="openVideo"  src="@/assets/gassgame/fengmian-tit.png" alt>
    <img class="heads" src="@/assets/gassgame/heads.png" alt>
    <img @click="openAtert" class="btn" src="@/assets/gassgame/fengmian-btn.png" alt>
    <div class="doms"></div>
  </div>
</template>
<script>
import { MessageBox } from "mint-ui";
export default {
  methods: {
    openAtert() {
      this.$emit("openAlert");
    },
    openVideo(){
         this.$emit("openVideos");
    }
  }
};
</script>

<style lang="less" scoped>
.fengmian {
  width: 7.5rem;
  height: 80vh;
  background: url("./../../assets/gassgame/fengmian-bg.png") no-repeat center;
  background-size: 100% 100%;
  overflow: hidden;
  .light {
    width: 100%;
    height: auto;
    position: absolute;
    top: -1rem;
    left: 0;
  }
  .tit {
    width: 100%;
    height: auto;
    margin-top: 1rem;
    z-index: 1;
    position: relative;
  }
  .btn {
    width: 2.54rem;
    height: auto;
    display: block;
    z-index: 1;
    position: absolute;
    bottom: 1.4rem;
    left: 50%;
    transform: translateX(-50%)
  }
  .heads {
    width: 0.78rem;
    height: 0.9rem;
    position: absolute;
    left: 2.6rem;
    top: 4.8rem;
    animation: identifier 1s infinite;
  }
  .doms {
    width: 2rem;
    height: 1.6rem;
    position: absolute;
    top: 3.2rem;
    z-index: 99;
    left: .8rem;
  }
  @keyframes identifier {
    0% {
      transform: translate(10%, 10%);
      /*left: 2.6rem;*/
      /*top: 4.8rem;*/
    }
    50% {
      transform: translate(-10%, -10%);
      /*left: 2.4rem;*/
      /*top: 4.6rem;*/
    }
    100% {
      transform: translate(10%, 10%);
      /*left: 2.6rem;*/
      /*top: 4.8rem;*/
    }
  }
}
</style>

