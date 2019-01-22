<template>
  <div id="ceshi" @click.stop>
    <span class="close" @click="closeAlsert"></span>
    <div class="bodys">
      <ul>
        <li>
          <span>姓名：</span>
          <input v-model="msg.name" type="text">
        </li>
        <li>
          <span>手机号：</span>
          <input v-model="msg.phone" type="text">
        </li>
        <li>
          <span>工号：</span>
          <input v-model="msg.job_number" type="text">
        </li>
        <li @click="first">
          <span>大区：</span>
          <input onfocus="this.blur()" v-model="bigcity" type="text">
        </li>
        <li @click="scend">
          <span>区域：</span>
          <input onfocus="this.blur()" v-model="twocity" type="text">
        </li>
        <li @click="three">
          <span>城市群：</span>
          <input onfocus="this.blur()" v-model="smallcity" type="text">
        </li>
      </ul>
      <!-- <div v-show="isPinker" style="background:#fff">
        <mt-picker
          @change="onValuesChange"
          value-key="cName"
          ref="pinkers"
          :slots="slots"
        >
         <mt-button @click="handleConfirm" class="sure">确认</mt-button>
        </mt-picker>
      </div>-->
      <mt-popup v-model="isPinker" position="bottom" class="mint-popup">
        <mt-button @click="handleConfirm" class="sure">确认</mt-button>
        <mt-picker
          class="pinkers"
          @change="onValuesChange"
          value-key="cName"
          ref="pinkers"
          :slots="slots"
        ></mt-picker>
      </mt-popup>
      <audio preload="auto" id="audioss" ref="audios" loop="loop">
        <source :src="audioVoice" type="audio/mpeg">
      </audio>
      <div class="btn" @click="signs"></div>
    </div>
  </div>
</template>
<script>
import { sign, addresss } from "@/api/common.js";
import axios from "axios";
import { Indicator, MessageBox, Picker, Button, Popup } from "mint-ui";
import { cookie } from "@/utils/cache.js";
export default {
  props: {
    modal: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Indicator,
    MessageBox,
    Picker,
    Button
  },
  data() {
    return {
      msg: {
        phone: "",
        name: "",
        job_number: "",
        address_id: "1", //三级地区得id
        open_id: ""
      },
      isPinker: false,
      wxobj: {},
      slots: [{ values: [] }],
      bigcity: "",
      twocity: "",
      smallcity: "",
      province_id: "",
      city_id: "",
      town_id: "",
      level: -1,
      provinces: [],
      provinces1: [],
      provinces2: [],
      audioVoice: require("./../../../../static/x1.mp3"),
      canMusic: false
    };
  },
  methods: {
    signs() {
      this.province_id = "";
      this.city_id = "";
      this.town_id = "";
      this.provinces.forEach(a => {
        if (this.bigcity == a.name) {
          this.province_id = a.id;
          a.city.forEach(b => {
            if (this.twocity == b.name) {
              this.city_id = b.id;
              b.town.forEach(c => {
                if (this.smallcity == c.name) {
                  this.town_id = c.id;
                }
              });
            }
          });
        }
      });
      if (
        this.msg.phone != "" &&
        this.msg.name != "" &&
        this.msg.job_number != "" &&
        this.msg.address_id != "" &&
        this.province_id != "" &&
        this.city_id != "" &&
        this.town_id != ""
      ) {
        if (!/^[1][0-9]{10}$/.test(this.phone)) {
            console.log(this.msg.open_id)
          axios
            .put("/api/api/users/" + this.msg.open_id, {
              name: this.msg.name,
              phone: this.msg.phone,
              job_number: this.msg.job_number,
              province_id: this.msg.province_id,
              city_id: this.city_id,
              town_id: this.town_id
            })
            .then(res => {
              console.log(res);
              if ((res.status = "200")) {
                this.$toast({
                  message: "修改成功！"
                });
                // Toast('')
                this.$emit("close");
              } else {
                this.msg = {
                  phone: "",
                  name: "",
                  job_number: ""
                };
              }
            });
          // changeUiers(this.msg).then(res => {
          //   if ((res.status = "200")) {
          //      Toast('修改成功！')
          //   } else {
          //     this.msg = {
          //       phone: "",
          //       name: "",
          //       job_number: "",
          //       address_id: "1", //三级地区得id
          //       open_id: ""
          //     };
          //   }
          // });
        } else {
          this.$toast({
            message: "请输入正确的手机号"
          });
        }
      } else {
        this.$toast({
          message: "输入不能为空！"
        });
      }
    },
    plays() {
      if (this.canMusic) {
        this.$refs["audios"].pause();
        this.canMusic = false;
      } else {
        this.$refs["audios"].play();
        this.canMusic = true;
      }
      $(".music").toggleClass("rotate");
    },
    onValuesChange(a, b) {
      if (this.level == 1) {
        this.bigcity = b;
      } else if (this.level == 2) {
        this.twocity = b;
      } else if (this.level == 3) {
        this.smallcity = b;
      } else {
        this.bigcity = "";
      }
    },
    handleConfirm() {
      this.isPinker = false;
    },
    first() {
      this.level = 1;
      this.isPinker = true;
      this.twocity = "";
      this.smallcity = "";
    //   this.msg.open_id = cookie.get("open_id");
      this.provinces;
      let arr = this.provinces.map(res => {
        return res.name;
      });
      this.slots = [
        {
          flex: 1,
          values: arr,
          className: "slot1",
          textAlign: "center"
        }
      ];
    },
    scend() {
      this.level = 2;
      this.isPinker = true;
      this.smallcity = "";
      this.provinces.forEach(element => {
        if (element.name == this.bigcity) {
          this.provinces1 = element.city;
          let arr = this.provinces1.map(res => {
            console.log(res);
            return res.name;
          });

          this.slots = [
            {
              flex: 1,
              values: arr,
              className: "slot1",
              textAlign: "center"
            }
          ];
        }
      });
    },
    three() {
      this.level = 3;
      this.isPinker = true;
      this.provinces1.forEach(element => {
        if (element.name == this.twocity) {
          this.provinces2 = element.town;
          let arr = this.provinces2.map(res => {
            console.log(res);
            return res.name;
          });

          this.slots = [
            {
              flex: 1,
              values: arr,
              className: "slot1",
              textAlign: "center"
            }
          ];
        }
      });
    },
    closeAlsert() {
        console.log(13231)
      this.$emit("closeAlsert");
    },
    closepinker() {
      this.isPinker = false;
    },
    getuserInfo() {
      //获取用户信息
      let that = this;
      axios
        .get("/api/api/users/show_info ", {
          params: { open_id: this.msg.open_id }
        })
        .then(function(res) {
          this.msg.name = res.data.name;
          this.msg.phone = res.data.phone;
          this.msg.job_number = res.data.job_number;
          this.msg.address_id = res.data.town_id;
          let bigcity_id = res.data.province_id;
          let twocity_id = res.data.city_id;
          let smallcity_id = res.data.town_id;
          this.provinces.forEach(element1 => {
            if (element1.id == bigcity_id) {
              this.bigcity = element1.name;
              element1.city.forEach(element2 => {
                if (element2.id == twocity_id) {
                  this.twocity = element2.name;
                  element2.city.forEach(element3 => {
                    if (element3.id == smallcity_id) {
                      this.smallcity = element3.name;
                    }
                  });
                }
              });
            }
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getuserInfoById() {
      axios
        .get("/api/api/users/" + this.msg.open_id + "/show_info")
        .then(res => {
          console.log(res);
          this.msg.name = res.data.user.name;
          this.msg.phone = res.data.user.phone;
          this.msg.job_number = res.data.user.job_number;
          this.msg.address_id = res.data.user.town_id;
          let bigcity_id = res.data.user.province_id;
          let twocity_id = res.data.user.city_id;
          let smallcity_id = res.data.user.town_id;
          this.provinces.forEach(element1 => {
            if (element1.id == bigcity_id) {
              this.bigcity = element1.name;
              element1.city.forEach(element2 => {
                if (element2.id == twocity_id) {
                  this.twocity = element2.name;
                  element2.town.forEach(element3 => {
                    if (element3.id == smallcity_id) {
                      this.smallcity = element3.name;
                    }
                  });
                }
              });
            }
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    stopClick() {
      return false;
    },
    // closeAlsert() {
    //     console.log(13213)
    //   this.$emit("closeAlsert");
    // }
  },
  mounted() {
    let that = this;
    this.msg.open_id = cookie.get("open_id");
    // this.msg.open_id = 'oJQPhjkCi09UegN5D6G6j3Jvgd94'
    axios
      .get("/api/api/address", {
        params: {}
      })
      .then(function(res) {
        that.provinces = res.data.provinces;
        console.log(that.provinces, "afa");
        console.log(res, "res");
        let arr = res.data.provinces.map(res => {
          return res.name;
        });
        that.slots = [
          {
            flex: 1,
            values: arr,
            className: "slot1",
            textAlign: "center"
          }
        ];
        if (that.modal === true) {
          that.getuserInfoById();
        }
      })
      .catch(function(error) {
        console.log(error);
      });
    //    addresss().then(res=>{
    //      this.provinces = res.provinces;
    //       let arr = res.provinces.map(res=>{
    //        return res.name
    //       });
    //      this.slots = [
    //        {
    //       flex: 1,
    //       values: arr,
    //       className: 'slot1',
    //       textAlign: 'center'
    //     }

    //      ]
    //    });
    document.addEventListener(
      "WeixinJSBridgeReady",
      function() {
        that.$refs["audios"].play();
        $(".music").toggleClass("rotate");
      },
      false
    );
  }
};
</script>

<style lang="less" scoped>
ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
#ceshi {
  width: 6.1rem;
  height: 10rem;
  background: url("./../../../assets/countDown/msg.png") no-repeat center;
  background-size: 100% 100%;
  overflow: hidden;
  position: relative;
  font-family: TSZT;
  .bodys {
    width: 100%;
    height: 80vh;
    position: absolute;
    bottom: 0;
    overflow: hidden;
    ul {
      width: 4.9rem;
      margin: 1rem auto 0;
      li {
        color: #fdd000;
        font-size: 0.4rem;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-bottom: 0.46rem;
        span {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        input {
          max-width: 3.2rem;
        }
      }
    }
  }
}
.btn {
  width: 2rem;
  height: 1rem;
  background: url("./../../../assets/zc/tijiao.png") no-repeat center;
  background-size: 100% 100%;
  margin: 1rem auto 0;
}
.sure {
  position: absolute;
  right: 0;
  bottom: 2.8rem;
  z-index: 10000;
}
.pinkers {
  width: 7.5rem;
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
.close {
  position: absolute;
  top: 0.24rem;
  right: 0.24rem;
  width: 0.5rem;
  height: 0.5rem;
  background: url("./../../../assets/countDown/close.png") no-repeat center;
  background-size: 100% 100%;
  z-index: 999;
}
</style>

