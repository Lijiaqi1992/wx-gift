// pages/home/home.js
import http from '../../utils/http.js'
import util from '../../utils/util.js'
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
  inMoneyCheck(e){
    let val = e.detail.value;
    val = util.notZeroStart(val);
    this.setData({
      inMoney :val.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1'),
    })
  },
  returnMoneyCheck(e){
    let val = e.detail.value;
    val = util.notZeroStart(val);
    this.setData({
      returnMoney : val.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1')
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
        wx.showToast({
          title: '添加成功！',
          icon: 'success'
        })
      },
      (res) => {
        wx.showToast({
          title: '添加失败！',
          icon: 'error'
        })
      }
    )
  },
})