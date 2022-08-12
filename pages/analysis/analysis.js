// pages/analysis/analysis.js
Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    chart: {}
  },
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在 methods 段中定义的方法名
    attached: function () {
      this.showChat();
      wx.setBackgroundColor({
        backgroundColor: '#111111', // 窗口的背景色为白色
      })
    },
    moved: function () {},
    detached: function () {},
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showChat() {

    }
  }
})