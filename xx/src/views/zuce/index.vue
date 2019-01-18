<template>
  <div id="zuce">
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
        <li>
          <span>大区：</span>
          <input type="text">
        </li>
        <li>
          <span>区域：</span>
          <input type="text">
        </li>
        <li>
          <span>城市群：</span>
          <input v-model="msg.address_id" type="text">
        </li>
      </ul>
      <div class="btn" @click="signs"></div>
    </div>
  </div>
</template>
<script>
import { sign } from "@/api/common.js";
import { Indicator, MessageBox } from "mint-ui";
export default {
  data() {
    return {
      msg: {
        phone: "",
        name: "",
        job_number: "",
        address_id: "1", //三级地区得id
        open_id: ""
      },
      wxobj: {}
    };
  },
  methods: {
    signs() {
      if (
        this.msg.phone != "" &&
        this.msg.name != "" &&
        this.msg.job_number != "" &&
        this.msg.address_id != ""
      ) {
        if (!/^[1][0-9]{10}$/.test(this.phone)) {
          sign(this.msg).then(res => {
            if ((res.status = "200")) {
              this.$router.push({
                path: "/updateimg",
                query: this.this.userMsg
              });
            } else {
              this.msg = {
                phone: "",
                name: "",
                job_number: "",
                address_id: "1", //三级地区得id
                open_id: ""
              };
            }
          });
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
    }
  },
  mounted() {
    this.wxobj = this.$route.query;
    this.msg.open_id = this.wxobj.open_id;
    console.log(this.wxobj);
  }
};
</script>

<style lang="less" scoped>
ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
#zuce {
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
    ul {
      width: 4.9rem;
      margin: 2rem auto;
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
  background: red;
  margin: 0 auto;
}
</style>
