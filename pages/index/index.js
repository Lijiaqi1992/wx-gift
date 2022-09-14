//index.js
//获取应用实例
import http from '../../utils/http.js'

const app = getApp()

Component({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    newItemList: [],
    PageCur: 'accept'
  },
  methods: {
    onReachBottom() {
      let recordComp = this.selectComponent("#record");
      if (recordComp) {
        recordComp.getList(recordComp.data.TabCur);
      }
    },
    NavChange(e) {
      this.setData({
        PageCur: e.currentTarget.dataset.cur
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
                //拒绝授权
                wx.showToast({
                  title: '您拒绝了请求,不能正常使用小程序',
                  icon: 'error',
                  duration: 2000
                });
                return;
              },
              complete: cc => {}
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
    },
  },
  ready: function () {
    http.login();
  }

  // //事件处理函数
  // bindViewTap: function () {
  //     wx.navigateTo({
  //         url: '../logs/logs'
  //     })
  // },

})