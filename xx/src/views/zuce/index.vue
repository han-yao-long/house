<template>
  <div id="zuce">
    <div class="bodys">
      <ul>
        <li>
          <span>姓名：</span>
          <input type="text">
        </li>
            <li>
          <span>手机号：</span>
          <input type="text">
        </li>
            <li>
          <span>工号：</span>
          <input type="text">
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
          <input type="text">
        </li>
      </ul>
    </div>
  </div>
</template>
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
      height: 1rem;
      li {
        color: #fdd000;
        font-size: 0.4rem;
        display: flex;
        justify-content:flex-end;
        align-items: center;
        margin-bottom: 0.46rem;
        span{
            display: flex;
            justify-content: center;
            align-items: center
        }
        input{
            max-width: 3.2rem
        }
      }
    }
  }
}
</style>
