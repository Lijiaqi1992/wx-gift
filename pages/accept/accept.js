// pages/home/home.js
import http from '../../utils/http.js'
import util from '../../utils/util.js'
const { $Message } = require('../../iview/base/index');
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    reason: '',
    inMoney: '',
    inDate: util.formatDate(),
    returnMoney: '0',
    returnReason: '',
    note: '',
    returnDate: util.formatDate(),
    hl: false, // 还礼？  
    headers: {
      token: ''
    }
  },
  DateChange(e) {
    this.setData({
      returnDate: e.detail.value
    })
  },
  inDateChange(e) {
    this.setData({
      inDate: e.detail.value
    })
  },

  hlchange(env) {
    this.setData({
      hl: env.detail.value
    })
  },
  create(c) {
    console.log(this.data);
    if (!this.data.hl) {
      this.setData({
        returnMoney: '0',
        returnReason: ''
      })
    }
    http.postRequest('/in/create', this.data,
      (res) => {
        console.log(res, '11111')
        $Message({
          content: '这是一条普通提醒',
          type: 'success'
        });
      },
      (res) => {
        console.log(res, '2222')
      }
    )
  },
})