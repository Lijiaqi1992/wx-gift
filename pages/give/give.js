// pages/give.js
import http from '../../utils/http.js'
import util from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    outDate: util.formatDate(),
    name: '',
    reason: '',
    outMoney: '',
    note: '',
    modalName: '',
    slList: [],
    inId: '',
    showText_date: '',
    showText_money: '',
    showText_reason: ''

  },
  quickWrite(e) {
    this.setData({
      reason: e.target.id
    })
  },
  DateChange(e) {
    this.setData({
      slDate: e.detail.value
    })
  },
  clearContact(e) {
    this.setData({
      inId: '',
      showText_date: '',
      showText_money: '',
      showText_reason: ''
    })
  },

  /**
   * 来往，根据姓名查询收礼记录
   */
  showModal(e) {
    if (this.data.name == '') {
      wx.showToast({
        title: '请输入姓名',
        icon: 'error',
        size: 12
      })
      return;
    }
    let _this = this;
    http.postRequest('/in/list', {
        'name': this.data.name
      },
      (res) => {
        if (res.data.length <= 0) {
          wx.showToast({
            title: '没有匹配的记录',
            icon: 'error',
            size: 12
          })
        } else {
          _this.setData({
            slList: res.data,
            modalName: e.currentTarget.dataset.target
          })
        }

      },
      (res) => {
        wx.showToast({
          title: '查询失败',
          icon: 'error',
          size: 12
        })
      }
    )
  },
  /**
   * 选择关联的记录
   */
  swich(e) {
    let str = e.detail.value.split('|');
    this.setData({
      showText_date: str[0],
      showText_money: str[1],
      showText_reason: str[2],
      inId: str[3]
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  outMoneyCheck(e) {
    let val = e.detail.value;
    val = util.notZeroStart(val);
    this.setData({
      outMoney: val.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1')
    })
  },

  create(c) {
    let _this = this
    http.postRequest('/out/create', this.data,
      (res) => {
        wx.showToast({
          title: '添加成功！',
          icon: 'success'
        })
        _this.setData({
          outDate: util.formatDate(),
          name: '',
          reason: '',
          outMoney: '',
          note: '',
          modalName: '',
          slList: [],
          inId: '',
          showText_date: '',
          showText_money: '',
          showText_reason: ''
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