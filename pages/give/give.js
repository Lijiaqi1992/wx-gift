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
    showText_money: ''

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
      showText_money: ''
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
        console.log(res, '2222')
      }
    )
  },
  /**
   * 选择关联的记录
   */
  swich(e) {
    console.log(e);
    console.log(e.detail.value.split('_')[1]);
    let str = e.detail.value.split('|');
    this.setData({
      showText_date: str[0],
      showText_money: str[1],
      inId: str[2]
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },

  create(c) {
    console.log(this.data);
    console.log(c);

    http.postRequest('/out/create', this.data,
      (res) => {
        console.log(res, '11111')
      },
      (res) => {
        console.log(res, '2222')
      }
    )
  },
})