/**
 *功能接口路径配置
 */
module.exports = {
  // 测试生成地址配置
  testUrl: 'test-card.zuanliantech.com',
  devIp: 'http://10.3.201.6:8888',
  prodIp: 'http://i0.wehaicao.com/',
  //   devIp: 'http://i0.wehaicao.com/',
  wxtoken: '/api/users/get_access_token',
  sign: 'api/users/register_user', //注册,
  upload_images :"/api/user_lotter_records/upload_images",
// <<<<<<< HEAD
//   address:'/api/address' ,     //地址
//   win_prizes:'/api/address'      //地址
// =======
  address:'/api/address'  ,    //地址
  show_images:'/api/user_lotter_records/show_images',     //显示图片
  win_prizes:'/api/user_lotteries/luck_draw',
  rank_list_desc:'/api/user_lotter_records/rank_list_desc',
  changeUier:'/api/users/'

}
