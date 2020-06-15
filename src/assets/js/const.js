'use strict'
const TOKEN_KEY = 'token';
let SERVER_URL;
let GATEWAY_BASE_URL;
let APP_RUL;
switch (process.env.VUE_APP_ENV) {
  case 'development':
    SERVER_URL = 'api/';
    GATEWAY_BASE_URL = '/wgfw';
    APP_RUL = 'http://test-hybtask.log56.com/';
    break;
  case 'testing':
    SERVER_URL = 'http://test-hybtask.log56.com/hyb-task-microserver';
    GATEWAY_BASE_URL = 'http://test-basic.log56.com/luge';
    APP_RUL = 'http://test-hybtask.log56.com/';
    break;
  case 'prepub':
    SERVER_URL = 'https://pre-hybtask.log56.com/hyb-task-microserver';
    GATEWAY_BASE_URL = 'http://pre-basic.log56.com/luge';
    APP_RUL = 'http://pre-hybtask.log56.com/';
    break;
  case 'production':
    SERVER_URL = 'https://hybtask.log56.com/hyb-task-microserver';
    GATEWAY_BASE_URL = 'http://basic.log56.com/luge';
    APP_RUL = 'http://hybtask.log56.com/';
    break;
  default:
    break;
}

const SERVER_CODE = {
    SUCCESS_CODE_0 :'0',
    SUCCESS_CODE_200:'200',
    SYS_ERROR_CODE:'1',//系统级异常
    FORBIDDEN_ERROR_CODE:'100',//禁言的code
    SESSION_ERROR_CODE:'-1000',//踢人的异常
    TOKEN_ERROR_CODE:'3001',//token验证错误
    UPGRADE_ERROR_CODE:'2000',//需要升级的code码
    MSG_ERROR_CODE:'3000'
}
const SERVER_MSG = {
    MSG_ERROR_MSG:'网络/数据异常，请稍后重试',
    ERROR_HTTP_MSG:'抱歉，您访问的页面已下架',
    SQ_FAIL_MSG:'呜呜出错了，请联系卡友部落吧~~客服电话</br>(400-106-1156)'
}
export default {
    TOKEN_KEY,
    SERVER_URL, 
    GATEWAY_BASE_URL,
    APP_RUL,
    SERVER_CODE, 
    SERVER_MSG
}
