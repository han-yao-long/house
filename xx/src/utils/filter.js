import Vue from 'vue'

Vue.filter('volume', function(target) {
  let code=Number(target)
  let value=''
  if(code>10000){
    value =(code/10000).toFixed(1)+'万+'
  }else value=code
  return value
})
