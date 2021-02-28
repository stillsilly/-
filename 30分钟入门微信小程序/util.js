import {ajax} from 'ajax.js'
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * @param {String} time - like '2018-05-02' 
 */
const formatPublishTime = time => {

  // 4种：今天、昨天、本周（周一到周日），日期（超出本周的）
  time = time.replace(/-/g, "/") // 兼容iOS
  time = new Date(time);
  let now = new Date()

  if(isSameDay(time,now)){
    return '今天';
  }else if(isYesterday(time,now)){
    return '昨天';
  }else if(isSameWeek(time,now)){
    let list = ['日','一','二','三','四','五','六'];
    return '周' + list[time.getDay()];
  }else{
    return (time.getMonth()+1) + '月' + time.getDate() + '日';
  }
}

function isSameDay(old,now){
  return old.getFullYear() === now.getFullYear()
         && old.getMonth() === now.getMonth()
         && old.getDate() === now.getDate()
}
function isYesterday(old,now){
  return old.getFullYear() === now.getFullYear()
         && old.getMonth() === now.getMonth()
         && old.getDate() === now.getDate()-1
}
function isSameWeek(old, now) {
  let oneDayTime = 1000 * 60 * 60 * 24;
  let old_count = parseInt(old.getTime() / oneDayTime);
  let now_other = parseInt(now.getTime() / oneDayTime);
  return parseInt((old_count + 4) / 7) == parseInt((now_other + 4) / 7);
}  

const formatFavourTime = time => {
  time = time.replace(/-/g, "/") // 兼容iOS
  time = new Date(time);
  let now = new Date()
  if(isSameDay(time, now)){
    return '今天'
  }else if(isYesterday(time, now)){
    return '昨天'
  }else {
    let distance = (now.getTime() - time.getTime()) / (1000*60*60*24)
    return Math.floor(distance) + '天前'
  }
}
function findByKey(list,key,value){
  for(let item of list){
    if(item[key] === value){
      return item
    }
  }
}
function findById(list,value){
  return findByKey(list,'id',value)
}

function safeAddList(option){
  let self = this
  let arrName = option.arrName
  let originList = option.originList
  let originLen = originList.length
  let appendList = option.appendList
  let extra = option.extra || {}
  self.setData = option.setData
  let newList = {}
  if (appendList && appendList.length) {
    let newList = {};
    for (let i = 0; i < appendList.length; i++) {
      let item = appendList[i]
      newList[`${arrName}[${originLen}]`] = item
      originLen ++
    }
    for(let k in extra){
      newList[k] = extra[k]
    }
    self.setData(newList);
  }
}


function removeLocalFavourStick(data){
  let id
  if(typeof data === 'object'){
    id = data.id
  }else{
    id = data
  }
  let stickList = wx.getStorageSync('favourStickList') || [];
  let temp = []
  stickList.forEach(function (item) {
    if (item.id !== id) {
      temp.push({
        id: item.id
      })
    }
  })
  stickList = temp
  wx.setStorageSync('favourStickList', stickList)
}

function getHighLightList(str, word) {
  if (!word) {
    return [str]
  }
  let arr = [];
  let start = 0;
  let exp = new RegExp(word, 'ig')
  let result = str.match(exp)
  if (result !== null) {
    for (let j = 0; j < result.length; j++) {
      let pos = str.indexOf(result[j], start)
      if (pos !== -1) {
        if (pos > start) {
          arr.push(str.substring(start, pos))
        }
        arr.push({
          word: result[j]
        });
        start = pos + result[j].length;
      }
    }
  }
  if (start !== str.length) {
    arr.push(str.substring(start, str.length))
  }
  return arr
}

export {
  ajax,  
  formatTime,
  formatPublishTime,
  findById,
  findByKey,
  safeAddList,
  removeLocalFavourStick,
  getHighLightList,
  formatFavourTime,
}
