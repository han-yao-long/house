<template>
  <div id="allPicture">
    <div class="all-list">
      <ul class=".clearfix">
        <li>图片</li>
        <li>图片</li>
        <li>图片</li>
        <li>图片</li>
        <li>图片</li>
        <li>图片</li>
      </ul>
    </div>
  </div>
</template>
<style lang="less" scoped>
ul,li{
    margin: 0;
    padding: 0;
    list-style: none;
}
#allPicture{
    width: .75rem;
    margin: 0 auto;
    height: 100vh;
    ul{
        
    }
}
/* 清除浮动 */
.clearfix:after {
    content: "";
    height: 0;
    line-height: 0;
    display: block;
    clear: both;
    visibility: hidden;
}

.clearfix {
    zoom: 1
}
</style>

