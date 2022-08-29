// pages/record/record.js
import http from '../../utils/http.js'
const app = getApp()
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
    data: {
        tab: [{
            name: '全部',
            TabCur: 0
        },
        {
            name: '收礼',
            TabCur: 1
        },
        {
            name: '送礼',
            TabCur: 2
        },
        ],
        TabCur: 0,
        scrollLeft: 0,
        list: [],
        pageNo: 1,
        pageSize: 7,
        totalCount: 0,
        noData: true, //列表没有数据
        screenHeight: app.globalData.screenHeight
    },

    /**
     * 组件的方法列表
     */
    methods: {
        tabSelect(e) {
            // TabCur: e.currentTarget.id,
            this.data.scrollLeft = (e.currentTarget.id - 1) * 60;
            this.getList(e.currentTarget.id);
        },
        delete(obj) {
            let _this = this
            wx.showModal({
                title: '提示',
                content: '确定删除吗？',
                success: function (res) {
                    if (res.confirm) {
                        _this.delData(obj.currentTarget.dataset.type, obj.currentTarget.id, obj.currentTarget.dataset.index)
                    }
                }
            })
        },

        delData(type, id, index) {
            let _this = this
            let url = "";
            if (type == 'in') {
                //收礼
                url = "/in/delete";
            } else if (type == 'out') {
                //送礼
                url = "/out/delete";
            }
            let param = { 'ids': [id] }
            http.postRequest(url, param,
                (res) => {
                    _this.data.list.splice(index, 1);
                    _this.setData({
                        list: _this.data.list
                    })
                },
                (err) => {
                    wx.showToast({
                        title: '删除失败！',
                        icon: 'error'
                    })
                })
        },

        getList(type) {
            let _this = this
            let url = "";
            if (type == '1') {
                //收礼
                url = "/in/pageList";
            } else if (type == '2') {
                //送礼
                url = "/out/pageList";
            } else {
                //全部
                url = "/in/getAllList";
            }
            if (_this.data.TabCur == type) {
                //判断页码防止多余请求
                console.log("===>", this.data.pageNo, this.data.pageSize, this.data.totalCount)
                if (_this.data.pageNo > 1 && (_this.data.pageNo - 1) * _this.data.pageSize >= _this.data.totalCount) {
                    this.setData({
                        noMore: true
                    })
                    return;
                }

            } else {
                this.data.pageNo = 1;
                this.setData({
                    list: []
                })
            }
            http.postRequest(url, this.data,
                (res) => {
                    let dataList = _this.data.list;
                    dataList = dataList.concat(res.data.result);
                    this.data.totalCount = res.data.totalCount
                    this.setData({
                        noData: dataList.length == 0,
                        list: dataList,
                        TabCur: type,
                        pageNo: _this.data.pageNo + 1
                    });
                },
                (res) => {
                    wx.showToast({
                        title: '查询失败',
                        icon: 'error',
                        size: 12
                    })
                }
            )
        }
    },
})