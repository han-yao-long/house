<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  // import {MessageBox} from 'mint-ui'
  // import {setToken} from '@/utils/auth.js'
  // import {wxAuth} from "@/utils/common"
  // import {mapGetters} from "vuex"
  export default {
  name: 'App',
  // computed:{
  //   ...mapGetters([
  //     'app',
  //     'user'
  //   ])
  // },
  created(){
      console.log('2:14')
    // // 测试代码开始
    // setToken('eyJhbGciOiJIUzUxMiJ9.eyJpaGF2ZXUiOiJiZWxpMTkiLCJzdWIiOiIxMDYyNTYwOTU2OTk1NTcxNzEyXzIiLCJleHAiOjE1NDI5NTY0MDQsImlhdCI6MTU0MjM1MTYwNH0._CSWF-srAdnYqz1EMo7EqV6HqiNQtxzZlYy1M_mGg7Dto-RnZf9BjK5CHnt_27r3UamZspsVEkJhc-xCaXL5Pg')
    // //测试代码结束
  },
  methods:{

  }
}
</script>

<style>
#app {
  margin: 0;
  padding: 0;
}
</style>
