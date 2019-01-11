<template>
  <div id="grassBookShare">
    <div v-show="!isWechat" class="head-tit">草书</div>
    <div class="head">
      <div class="head-logo">
        <img :src="headPortrait" alt>
      </div>
      <div class="nick-name">
        <p>{{initmsg.nickName}}</p>
        <p class="p2">{{initmsg.createdAt}}</p>
      </div>
    </div>
    <!-- 轮播图 -->
    <div class="swipers">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item,index) in swiperArr" :key="index">
          <img :src="item.url" alt>
          <div
            class="label"
            v-for="(items,indexs) in item.label"
            :key="indexs"
            :style="{left:items.x*100+'%',top:items.y*100+'%'}"
          >
            <div style="display:flex;justify-content:center;align-items:center" v-if="items.isLeft">
              <div class="circle"></div>
              <div class="line"></div>
              <div class="text">
                <span>{{items.name}}</span>
              </div>
            </div>
            <div style="display:flex;justify-content:center;align-items:center" v-else>
              <div class="text text-rights">{{items.name}}</div>
              <div class="line line-right"></div>
              <div class="circle circle-right"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="numb">{{swiperIndex}}/{{initmsg.sources.length}}</div>
    </div>
    <!-- 文章内容 -->
    <div class="bodys">
      <div class="disc">
        <div class="open" @click="openMsg">
          ...
          <span>展开</span>
        </div>
        <div class="close" @click="openMsg">收起</div>
        <div class="view" v-html="initmsg.content"></div>
      </div>
      <div class="btm">
        <div class="lists">
          <div class="item" @click="goRegister">
            <img src="@/assets/grassBookShrare/total.png" alt>
            <p>{{initmsg.commentCount}}</p>
          </div>
          <div class="item-zhong" @click="goRegister">
            <img src="@/assets/grassBookShrare/share.png" alt>
            <p>{{initmsg.shareCount}}</p>
          </div>
          <div class="item-zan"></div>
          <div class="item" @click="goRegister">
            <img src="@/assets/grassBookShrare/like.png" alt>
            <p>{{initmsg.collectionCount}}</p>
          </div>
        </div>
        <div class="btn" @click="goRegister">
          <span>更多文章</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Swiper from "swiper";
import { msginit } from "@/api/grass_book_share";
import { wxCharts, urlMsg, goAndDown } from "@/utils/common.js";
import { Toast, Indicator, MessageBox } from "mint-ui";
export default {
  data() {
    return {
      initmsg: {},
      headPortrait: "",
      swiperArr: [],
      swiperIndex: 1,
      isOpen: false, //false.未打开文章
      initDiscHeight: 0,
      isWechat: false,
      articleId: ""
    };
  },
  methods: {
    init() {
      this.articleId = urlMsg().grassBookArticleId;
      let data = {
        articleId: this.articleId
      };
      msginit(data).then(res => {
        let that = this;
        this.initmsg = res.data;
        this.headPortrait =
          this.$store.getters.app.imgIp + res.data.headPortrait;
        this.swiperArr = res.data.sources.map(a => {
          return { url: that.$store.getters.app.imgIp + a.url, label: a.label };
        });
        this.isWechats();
        setTimeout(function() {
          var mySwiper = new Swiper(".swipers", {
            // autoplay: true, //等同于以下设置
            on: {
              slideChange: function() {
                that.swiperIndex = this.activeIndex + 1;
              }
            }
          });
          that.initDiscHeight = $(".disc").height();
          for (let i = 0; i < res.data.sources.length; i++) {
            let scales = res.data.sources[i].scale;
            console.log(scales)
            if (scales != 1) {
              const heights = 7.18 / scales + "rem";
              $(".swipers .swiper-wrapper .swiper-slide").eq(i).css({ height: heights });
            }else{
                 $(".swipers .swiper-wrapper .swiper-slide").eq(i).css({ height:'7.18rem'});
            }
          }
        }, 300);
      });
    },
    openMsg() {
      if (this.isOpen) {
        this.isOpen = false;
        $(".disc").animate({ height: this.initDiscHeight }, "slow");
        setTimeout(function() {
          $(".open").show();
          $(".close").hide();
        }, 300);
      } else {
        this.isOpen = true;
        let allheight = $(".view").height();
        $(".disc").animate({ height: allheight + 40 }, "slow");
        setTimeout(function() {
          $(".open").hide();
          $(".close").show();
        }, 300);
      }
    },
    goRegister() {
      var sUserAgent = navigator.userAgent.toLowerCase();
      var isIOS = sUserAgent.match(/(iPhone|iPod)/i) != null;
      if (isIOS) {
        Toast({
          message: "IOS暂未开放，敬请期待",
          duration: 3000
        });
      } else {
        Indicator.open({
          text: "跳转中",
          spinnerType: "fading-circle"
        });
        goAndDown();
        setTimeout(function() {
          Indicator.close();
        }, 2000);
      }
    },
    // 判断是否再微信内打开
    isWechats() {
      let sUserAgent = navigator.userAgent.toLowerCase();
      this.isWechat = sUserAgent.indexOf("micromessenger") != -1;
      if (this.isWechat) {
        let url = `http://${
          window.location.hostname
        }/h5/haicao_wx/dist/index.html#/grass_book_share?grassBookArticleId=${
          this.articleId
        }`;
        const imgUrl = `http://${
          window.location.hostname
        }/h5/haicao_wx/dist/static/icons.png`;
        const title = this.initmsg.title;
        const disc = this.initmsg.content;
        wxCharts(title, disc, url, imgUrl);
      }
    }
  },
  mounted() {
    this.init();
  },
  updated() {
    let allheight = $(".view").height();
    let disheight = $(".disc").height();
    if (allheight <= disheight) {
      $(".open").hide();
    } else {
      $(".open").show();
    }
  }
};
</script>

<style lang="less" scoped>
p {
  margin: 0;
  padding: 0;
}
#grassBookShare {
  width: 7.5rem;
  height: 100%;
  margin: 0 auto;
  .head-tit {
    font-size: 0.36rem;
    text-align: center;
    height: 0.8rem;
    line-height: 0.8rem;
    border-bottom: 0.02rem solid #eeeeee;
    font-weight: bold;
  }
  .head {
    width: 7.18rem;
    margin: 0 auto;
    display: flex;
    justify-content: left;
    align-items: center;
  }
  .head-logo {
    width: 0.64rem;
    height: 0.64rem;
    border-radius: 50% 50%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
  .nick-name {
    margin-left: 0.06rem;
    height: 0.96rem;
    overflow: hidden;
    p {
      font-size: 0.32rem;
      line-height: 0.5rem;
      margin-top: 0.1rem;
      font-weight: bold;
    }
    .p2 {
      font-size: 0.24rem;
      color: #999999;
      line-height: 0.26rem;
      margin: 0;
    }
  }
  .swipers {
    margin: 0.12rem auto 0.3rem;
    border-radius: 0.16rem;
    overflow: hidden;
    width: 7.18rem;
    height: auto;
    position: relative;
    .swiper-wrapper {
      width: 100%;
      height: 100%;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        display: block;
      }
      .label {
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 999;
        position: absolute;
        .circle {
          width: 0.1rem;
          height: 0.1rem;
          background: #fff;
          border: 0.04rem solid rgba(000, 000, 000, 0.8);
          border-radius: 50% 50%;
        }
        .line {
          width: 0.18rem;
          height: 0.04rem;
          background: #fff;
          z-index: 999;
          margin-left: -0.04rem;
        }
        .text {
          //   margin-left: -0.06rem;
          padding: 0 0.2rem 0 0.2rem;
          height: 0.5rem;
          background: rgba(000, 000, 000, 0.4);
          color: #fff;
          font-size: 0.26rem;
          text-align: center;
          display: flex;
          justify-content: center;
          align-items: center;
          border: 0.04rem solid #fff;
          //   background: linear-gradient(120deg, transparent 0.12rem, #1e1e1e 0)
          //       top left,
          //     linear-gradient(60deg, transparent 0.12rem, #1e1e1e 0) bottom left;
          //   background-size: 100% 50%;
          //   background-repeat: no-repeat;
          border-radius: 0.29rem 0.29rem;
        }
        .text-rights {
          //        padding: 0 0.2rem 0 0.1rem;
          //   background: linear-gradient(-120deg, transparent 0.12rem, #1e1e1e 0)
          //       top right,
          //     linear-gradient(-60deg, transparent 0.12rem, #1e1e1e 0) bottom right;
          //   background-size: 100% 50%;
          //   background-repeat: no-repeat;
          //   border-radius: 0.06rem 0.06rem;
        }
        .circle-right {
          margin-right: 0;
          margin-left: -0.04rem;
        }
      }
    }
    .numb {
      width: 0.96rem;
      height: 0.48rem;
      background: #888888;
      border-radius: 0.24rem 0.24rem;
      font-size: 0.28rem;
      color: #000;
      text-align: center;
      line-height: 0.48rem;
      position: absolute;
      right: 0.1rem;
      bottom: 0.1rem;
      z-index: 999;
    }
  }
  .bodys {
    .disc {
      width: 6.86rem;
      margin: 0 auto;
      height: 2rem;
      overflow: hidden;
      position: relative;
      .view {
        font-size: 0.32rem;
        color: #333333;
        width: 6.86rem;
        margin: 0 auto;
        line-height: 0.4rem;
      }
      .open {
        width: 54px;
        position: absolute;
        right: 0;
        bottom: 0;
        background: #f6f6f6;
        font-size: 0.32rem;
        text-align: right;
        span {
          color: #8e8e93;
        }
      }
      .close {
        position: absolute;
        left: 0;
        bottom: 0;
        background: #f6f6f6;
        font-size: 0.32rem;
        text-align: right;
        color: #8e8e93;
        display: none;
      }
    }
    .btm {
      width: 6.86rem;
      margin: 0.46rem auto 0;
      .lists {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #999999;
        font-size: 0.24rem;
        text-align: center;
        img {
          width: 0.4rem;
          height: 0.4rem;
        }
        .item-zhong {
          margin-left: 0.8rem;
        }
        .item-zan {
          flex: 1;
        }
      }
      .btn {
        width: 2.6rem;
        height: 1rem;
        background: #ffcc00;
        border-radius: 0.5rem 0.5rem;
        font-size: 0.36rem;
        text-align: center;
        line-height: 1rem;
        font-weight: bold;
        margin: 1rem auto;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>

