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
    inMoney: '0',
    inDate: util.formatDate(),
    returnMoney: 0,
    returnReason: '',
    note: '',
    returnDate: util.formatDate(),
    hl: false, // 还礼？
    hlswitch: false,
    headers: {
      token: ''
    }
  },

  quickWrite(e) {
    this.setData({
      reason: e.target.id
    })
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
  inMoneyCheck(e) {
    let val = e.detail.value;
    val = util.notZeroStart(val);
    this.setData({
      inMoney: val.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1'),
    })
  },
  returnMoneyCheck(e) {
    let val = e.detail.value;
    val = util.notZeroStart(val);
    this.setData({
      returnMoney: val.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1')
    })
  },

  create(c) {
    if (!this.data.hl) {
      this.setData({
        returnMoney: '0',
        returnReason: ''
      })
    }
    if(this.data.name==''){
      wx.showToast({
        title: '请填写姓名！',
        icon: 'error'
      })
      return;
    }
    let _this = this
    http.postRequest('/in/create', this.data,
      (res) => {
        wx.showToast({
          title: '添加成功！',
          icon: 'success'
        })
        _this.setData({
          name: '',
          reason: '',
          inMoney: '0',
          // inDate: util.formatDate(),
          returnMoney: 0,
          returnReason: '',
          note: '',
          returnDate: util.formatDate(),
          hl: false, // 还礼？ 
          hlswitch: false
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