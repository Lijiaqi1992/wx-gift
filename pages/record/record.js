// pages/record/record.js
import http from '../../utils/http.js'

// pages/record/rrr.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在 methods 段中定义的方法名
    attached: function () { 
      this.getList('0');
      wx.setBackgroundColor({
        backgroundColor: '#111111', // 窗口的背景色为白色
      })
    },
    moved: function () { },
    detached: function () { },
  },

  /**
   * 组件的初始数据
   */
  data:{
    tab:[
      {name : '全部', TabCur: 0},
      {name : '收礼', TabCur: 1},
      {name : '送礼', TabCur: 2},
    ],
    TabCur: 0,
    scrollLeft:0, 
    list:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tabSelect(e){
      this.setData({
        TabCur: e.currentTarget.id,
        scrollLeft: (e.currentTarget.id-1)*60,
      });
      this.getList(e.currentTarget.id);
    },

    getList(type) {
      let url = "";
      if(type == '1'){
        //收礼
        url = "/in/pageList";
      }else if(type == '2'){
        //送礼
        url = "/out/pageList";
      }else{
        //全部
        url = "/in/getAllList";
      }
      http.postRequest(url, this.data,
        (res) => {
          this.setData({
            list: res.data.result
          });
        },
        (res) => {
          console.log(res, '2222')
        }
      )
    }
    ,
    onReachBottom(e){
        console.log(11)
    }
  },
})
