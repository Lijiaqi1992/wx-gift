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
    let url = "";
    if(e.currentTarget.id == '1'){
      //收礼
      url = "/in/pageList";
    }else if(e.currentTarget.id == '2'){
      //送礼
      url = "/out/pageList";
    }else{
      //全部
      url = "/in/getAllList";
    }
    http.postRequest(url, this.data,
      (res) => {
        this.setData({
          TabCur: e.currentTarget.id,
          scrollLeft: (e.currentTarget.id-1)*60,
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