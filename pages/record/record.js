// pages/record/record.js
import http from '../../utils/http.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab:[
      {name : '全部', TabCur: 0},
      {name : '收礼', TabCur: 1},
      {name : '送礼', TabCur: 2},
    ],
    TabCur: 0,
    scrollLeft:0, 
    list:[]
  },
  tabSelect(e) {
    http.postRequest('/in/pageList', this.data,
      (res) => {
        console.log(res, '11111')
        this.setData({
          TabCur: e.currentTarget.dataset.id,
          scrollLeft: (e.currentTarget.dataset.id-1)*60,
          list: res.data.result
        });
      },
      (res) => {
        console.log(res, '2222')
      }
    )


   

  }, 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})