<template>
  <div id="imgList" @click.stop>
    <div v-if="msgTrue">
      <img class="tit" src="@/assets/countDown/tit.png" alt>
      <span class="close" @click="closeAlsert"></span>
      <div class="bg">
        <div class="btnList">
          <div @click="lists(1)">{{ripaihang}}</div>
          <div @click="lists(2)"></div>
          <div @click="lists(3)"></div>
        </div>
        <ul :class="{h70: tab == 2}">
          <li v-for="(item,index) in arr" :key="index">
            <div class="indexs">{{index+1}}</div>
            <div class="name">{{item.name}}</div>
            <div class="phoone">{{item.town}}</div>
            <div class="nu">{{item.image_count}}张</div>
          </li>
        </ul>
        <div v-show="islast" class="last">
          <div class="indexs">{{paihangmsg.current_rank.raning}}</div>
          <div class="name" style="min-width:.6rem">{{paihangmsg.current_rank.name}}</div>
          <div class="phoone"  style="min-width:.6rem">{{paihangmsg.current_rank.phone}}</div>
          <div class="nu">{{paihangmsg.current_rank.image_count}}张</div>
        </div>
        <img class="the" :src="the1" alt>
      </div>
    </div>
    <div v-else>
      <img class="tit" src="@/assets/countDown/tit.png" alt>
      <span class="close" @click="closeAlsert"></span>
      <div class="bg">
        <div class="btnList">
          <div @click="lists(1)">{{ripaihang}}</div>
          <div @click="lists(2)"></div>
          <div @click="lists(3)"></div>
        </div>
        <ul>
          <li v-for="(item,index) in arr" :key="index">
            <div class="indexs"></div>
            <div class="name"></div>
            <div class="phoone"></div>
            <div class="nu"></div>
          </li>
        </ul>
        <div v-show="islast" class="last" >
          <div class="indexs"></div>
          <div style="min-width:.6rem" class="name"></div>
          <div class="phoone"></div>
          <div class="nu"></div>
        </div>
        <img class="the" :src="the1" alt>
      </div>
    </div>
    <p class="dayTime" style="margin-top:-.22rem">每周日晚上8点，系统更新每周排名</p>
     <p class="dayTime" style="margin-top:0rem">我的资料填写完整才可以上榜</p>
  </div>
</template>
<script>
export default {
  props: {
    paihangmsg: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      the1: require("./../../../assets/gassgame/the1.png"),
      ripaihang: "日排行",
      arr: [],
      islast: true,
      msgTrue: false,
      tab: 1
    };
  },
  methods: {
    closeAlsert() {
      this.$emit("closeAlserts");
    },
    lists(i) {
      if (i == 1) {
        this.the1 = require("./../../../assets/gassgame/the1.png");
        this.ripaihang = "日排行";
        this.arr = this.paihangmsg.day_list;
        this.islast = true;
        this.tab = 1;
      } else if (i == 2) {
        this.the1 = require("./../../../assets/gassgame/the2.png");
        this.ripaihang = "";
        this.arr = this.paihangmsg.week_list;
        this.islast = false;
        this.tab = 2;
      } else {
        this.the1 = require("./../../../assets/gassgame/the3.png");
        this.ripaihang = "";
        this.arr = this.paihangmsg.all_list;
        this.islast = true;
        this.tab = 3;
      }
    }
  },
  mounted() {
    let that = this;
    if (that.paihangmsg.day_list) {
      this.msgTrue = true;
      that.arr = that.paihangmsg.day_list;
    } else {
      // setTimeout(function(){

      // },1000)
      that.arr = that.paihangmsg.day_list;
    }
  },
  watch: {
    paihangmsg: function(msg) {
      let that = this;
      if (that.paihangmsg.day_list) {
        this.msgTrue = true;
        that.arr = that.paihangmsg.day_list;
      } else {
        // setTimeout(function(){

        // },1000)
        that.arr = that.paihangmsg.day_list;
      }
    }
  }
};
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
  .bg {
    width: 4.98rem;
    height: 7.42rem;
    background: url("./../../../assets/gassgame/bg.png") no-repeat center;
    background-size: 100% 100%;
    margin: 0 auto;
    position: relative;
    .the {
      width: 4.1rem;
      height: auto;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 0.6rem;
    }
    .btnList {
      width: 4.1rem;
      margin: 0 auto;
      display: flex;
      div {
        flex: 1;
        color: #cb078f;
        font-size: 0.3rem;
        margin-top: 0.6rem;
        font-weight: bold;
        height: 0.56rem;
        z-index: 1;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    ul {
      height: 55%;
      z-index: 999;
      position: relative;
      overflow: auto;

      &.h70 {
        height: 70%;
      }
      li {
        padding: 0 0.26rem 0 0.5rem;
        font-size: 0.26rem;
        text-align: left;
        color: #cc0690;
        justify-content: left;
        align-items: center;
        overflow: hidden;
        display: flex;
        div {
          float: left;
        }

        .indexs {
          width: 0.5rem;
          height: 0.5rem;
          border: 0.04rem solid #000;
          border-radius: 100% 100%;
          font-size: 0.4rem;
          display: flex;
          font-weight: bold;
          justify-content: center;
          font-weight: bold;
          align-items: center;
          margin-right: 0.05rem;
        }
        .name {
          width: 0.8rem;
          font-size: 0.26rem;
          text-align: center;
          margin-right: 0.1rem;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          margin-left: 0.2rem;
          min-width: .6rem;
        }
        .nu {
          margin-right: 0.6rem;
          flex: 1;
          text-align: right;
        }
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
    display: flex;
    font-size: 0.26rem;
    text-align: center;
    color: #cc0690;
    justify-content: center;
    align-items: center;
    .indexs {
      width: 0.5rem;
      height: 0.5rem;
      border: 0.04rem solid #000;
      border-radius: 100% 100%;
      font-size: 0.4rem;
      display: flex;
      font-weight: bold;
      justify-content: center;
      font-weight: bold;
      align-items: center;
      margin-right: 0.1rem;
    }
    .name {
      font-size: 0.26rem;
      text-align: center;
      margin-right: 0.1rem;
      m-width: .4rem
    }
    .phone {
      font-size: 0.26rem;
      text-align: center;
      margin-left: 0.2rem;
    }
    .nu {
      margin-left: 0.1rem;
    }
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
.last {
  width: 4.1rem;
  height: 1rem;
  border: 0.02rem solid #000;
  border-radius: 0.3rem 0.3rem;
  position: absolute;
  bottom: 0.5rem;
  left: 50%;
  transform: translateX(-50%);
  background: #f6e16f;
  display: flex;
  font-size: 0.26rem;
  text-align: center;
  color: #cc0690;
  justify-content: space-around;
  align-items: center;
  .indexs {
    width: 0.5rem;
    height: 0.5rem;
    border: 0.04rem solid #000;
    border-radius: 100% 100%;
    font-size: 0.4rem;
    display: flex;
    font-weight: bold;
    justify-content: center;
    font-weight: bold;
    align-items: center;
    margin-right: 0.1rem;
  }
  .name {
    font-size: 0.26rem;
    text-align: center;
    margin-right: 0.1rem;
  }
  .nu {
    margin-left: 0.1rem;
  }
}
.dayTime {
  font-size: 0.28rem;
  color: #f6e16e;
  margin: 0;
//   margin: -0.1rem 0 0 0;
  text-align: center;
}
</style>

