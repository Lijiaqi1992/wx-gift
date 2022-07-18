//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    newItemList: [],
    PageCur: 'accept'
  },

  NavChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    //先不获取用户昵称
    //this.getUserInfo();
    wx.login({
      success : res=>{
        wx.request({
          url: app.globalData.$url +"/auth/wx",
          data: {'code': res.code, 'nickName': this.data.userInfo.nickName},
          method: 'POST',
          success: succ=>{
            console.log(succ);
            wx.setStorage({
              key:"token",
              data: succ.header.token
            })
          }
        })
      }
    })
  },
  getUserInfo() {
    var _this = this
    wx.showModal({
      title: '温馨提示',
      content: '亲，授权微信登录后才能正常使用小程序功能',
      success(res) {
        //如果用户点击了确定按钮
        if (res.confirm) {
          wx.getUserProfile({
            desc: '获取你的昵称、头像、地区及性别',
            success: res => {
              _this.setData({
                userInfo: res.userInfo,
                hasUserInfo: true
              })
            },
            fail: res => {
              console.log(res)
              //拒绝授权
              wx.showToast({
                title: '您拒绝了请求,不能正常使用小程序',
                icon: 'error',
                duration: 2000
              });
              return;
            },
            complete: cc=>{
              console.log(90000);
            }
          });
        } else if (res.cancel) {
          //如果用户点击了取消按钮
          wx.showToast({
            title: '您拒绝了请求,不能正常使用小程序',
            icon: 'error',
            duration: 2000
          });
          return;
        }
      }
    });
  }
})
