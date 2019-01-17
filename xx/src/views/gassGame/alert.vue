<template>
  <div class="alerts">
    <div class="mask" @click="closeAlsert">
      <div class="alerts" @click.stop>
        <span class="close" @click="closeAlsert"></span>
        <img class="tit" src="@/assets/countDown/tit.png" alt>
        <div class="texts">
          <p class="item-tit">活动时间：</p>
          <p class="item-disc">2019年1月20日08:30-2019年2月28日24:00</p>
          <p class="item-disc">活动区域</p>
          <p class="item-tit">大陆地区（不含港澳台）</p>
          <p class="item-tit">夺金步骤：</p>
          <p class="item-tit">1、参与方式：</p>
          <p class="item-disc">@伊利各销售大区的业务员，只需每日上传优酸乳堆头剥离前后对比照片，即有机会成为终极锦鲤宝宝。</p>
          <p class="item-tit">2、活动说明：</p>
          <p class="item-disc">每日上传3组优酸乳堆头剥离前后对比照片，即可获得抽奖机会；持续参与活动的业务员，既有机会夺取终极锦鲤宝宝-现金大奖。</p>
          <p class="item-tit">好运等级：</p>
          <p class="item-disc">幸运锦鲤宝宝：神秘好礼</p>
          <p class="item-disc">周锦鲤宝宝：2888元现金</p>
          <p class="item-disc">终极锦鲤宝宝：5888元现金</p>
          <p class="item-bottoms">
            <span>备注：</span>每天下午8点，系统会及时更新周锦鲤宝宝排名和终极锦鲤宝宝排名哦~
          </p>
          <p class="item-bottoms">
            <span>活动期间，可不要有作弊行为哦~各销售大区的任何一名锦鲤宝宝如有作弊行为，都将取消夺金资格。</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    methods:{
        closeAlsert(){
        this.$emit('closeAlsert')
        }
    }
}
</script>

<style lang="less" scoped>
p{
    margin: 0;
    padding: 0;
}
.alerts {
  width: 100%;
  height: 100vh;
  z-index: 999;
  .mask {
    width: 100%;
    height: 100%;
    background: rgba(000, 000, 000, 0.6);
    position: fixed;
    left: 0;
    top: 0;
    .close {
      position: absolute;
      top: 0.24rem;
      right: 0.24rem;
      width: 0.5rem;
      height: 0.5rem;
      background: url("./../../assets/countDown/close.png") no-repeat center;
      background-size: 100% 100%;
    }
    .alerts {
      width: 6.1rem;
      height: 10rem;
      position: absolute;
      left: 50%;
      top: 1rem;
      transform: translateX(-50%);
      background: url("./../../assets/countDown/msg.png") no-repeat center;
      background-size: 100% 100%;
      .tit {
        width: 4.24rem;
        height: 0.7rem;
        display: block;
        margin: 0.6rem auto 0;
      }
      .texts {
        width: 5.1rem;
        font-size: 0.22rem;
        line-height: 0.36rem;
        margin: 0.2rem auto 0;
        .item-tit {
          color: #fdd000;
        }
        .item-disc {
          color: #fff;
        }
      }
      .item-bottoms {
        color: #fff;
        font-size: 0.18rem;
        line-height: 0.28rem;
        span {
          color: #fdd000;
        }
      }
    }
  }
}
</style>

