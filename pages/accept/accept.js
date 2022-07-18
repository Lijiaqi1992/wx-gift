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
      },
      (res) => {
        console.log(res, '2222')
      }
    )

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    console.log("22223feergeger");
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})