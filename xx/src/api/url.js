/**
 *功能接口路径配置
 */
module.exports = {
  // 测试生成地址配置
  testUrl: 'test-card.zuanliantech.com',
    devIp:'http://10.3.201.6:8888',
  prodIp: 'http://i0.wehaicao.com/',
//   devIp: 'http://i0.wehaicao.com/',

  dev_redirectUri: 'http%3A%2F%2Ftest-card.zuanliantech.com%2Fh5%2Fhaicao_wx%2Fdist%2Findex.html%23', // 测试重定向地址
  prod_redirectUri: 'http%3a%2f%2f' + window.location.hostname + '%2fh5%2fhaicao_wx%2fdist%2findex.html%23', // 生产重定向地址
  pre_redirectUri: 'http%3a%2f%2f' + window.location.hostname + '%2fh5%2fhaicao_wx%2fdist%2findex.html%23',  //预发布环境
  // 下载路径
  iosdownurl: "https://itunes.apple.com/app/id1415668749", //ios下载地址
  androiddownurl: "http://download.wehaicao.com/GrassBook_10082.apk", //安卓下载地址
  androiddownurlyaoqing: "http://download.wehaicao.com/GrassBook_10072.apk", //邀请收徒页安卓下载地址
  androidApkUrl: "https://a.app.qq.com/o/simple.jsp?pkgname=com.billionstech.grassbook", // 应用宝 安卓版本下载
  // 接口
  login: '/user/login', // 用户登录
  get_user: '/user/get_user', //获取用户信息
  get_account: '/user/get_account', // 获取用户账户详情
  checkResever: '/gp/checkResever', // 是否领取过该草包
  getEndOpen: '/gp/getEndOpen', // 获取终结者信息
  getLuckPerson: '/gp/getLuckPerson', // 最佳手气用户
  get_account_gp: '/user/get_account_gp', // 获取用户账户详情
  search_gp_info: '/search/search_gp_info', // 获取阅读文章信息
  open: '/gp/open', // 拆包
  openAgain: '/gp/openAgain', // 阅读拆包
  gb_withdraw_cash: 'gb_withdraw_cash', //提现 get_account_gp
  get_smscode: '/user/get_smscode_login', // 获取验证码
  get_verifyCode: '/user/get_verifyCode', // 图片验证码
  binding_phone: '/user/binding_phone', // 绑定手机号
  join_group_pay: '/group/join_group_pay', // 拉新支付
  join_get_group_manage: '/group/get_group_manage', //获取拼团详情页面信息
  join_group: '/group/join_group', // 好友助力
  game_guess_status: '/game/guess/status', // 猜拳--进入h5页面状态
  game_guess_thumb: '/game/guess/thumb', // 猜拳--点赞
  game_group_leader: '/group/group_leader', //猜拳--团长信息
  grass_book_share:'/book/article_detail'  // 草书分享详情
}
