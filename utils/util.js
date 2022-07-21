const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatDate = () =>{
  const date = new Date();
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return  [year, month, day].map(formatNumber).join('-');
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const notZeroStart = val => {
  if(val.length >= 2){
    let f = val.slice(0,1);
    let s = val.slice(1,2);
    if(f == '0' && s != '.'){
      val = val.slice(1);
    }
  }
  return val;
};

module.exports = {
  formatTime: formatTime,
  formatDate: formatDate,
  notZeroStart: notZeroStart,
}
