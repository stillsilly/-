// const ROOT_PATH = 'http://127.0.0.1:8088'
// const ROOT_PATH = 'http://192.168.6.28:8081'
const app = getApp()
//const ROOT_PATH = 'https://hire.hanergy.com/hanergy-webapi-users-lock' 
//'https://hire.hanergy.com/hanergy-webapi-users-test'    // 'https://hire.hanergy.com/hanergy-webapi'
const ROOT_PATH = 'https://hire.hanergy.com/hanergy-webapi-email'
// 'https://hire.hanergy.com/hanergy-webapi-demo'

const ajax = function(option){
  if(!option.url){
    option.url = ROOT_PATH;
  } else if (option.url.indexOf('http') !== 0){
    option.url = ROOT_PATH + option.url;
  }
  
  let baseOption = {
    method: 'POST',
    header: {
      'content-type':'application/x-www-form-urlencoded',
      "user_info": wx.getStorageSync('user_info') || ''
    },
    fail:function(){
      wx.showToast({
        title: '网络异常，请稍后重试',
        icon:'none'
      })
    }
  }

  option = Object.assign(baseOption,option)
  wx.request(option);
}

export {ajax};