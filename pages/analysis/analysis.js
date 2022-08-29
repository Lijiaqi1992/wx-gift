import * as echarts from '../../ec-canvas/echarts';
import http from '../../utils/http.js'

const app = getApp();
var chart = null;

function initChart(canvas, width, height, dpr) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);
  return chart;
}

Component({
  data: {
    ec: {
      // 将lazyLoad设为true后，就可手动初始化了
      // lazyLoad:true
    },
    TabCur: 0,
    scrollLeft: 0,
    tab: [{
        name: '收礼',
        TabCur: 0
      },
      {
        name: '送礼',
        TabCur: 1
      },
    ],
    statistics: {
      inMoneyCount: 0,
      outMoneyCount: 0,
      diff: 0
    }
  },

  ready: function () {
    const k = 'ec.onInit'
    this.setData({
      [k]: initChart,
    }, () => {
      this.analysisPost();
      this.echartsPost(0);
    })
  },

  methods: {
    tabSelect(e) {
      this.setData({
        TabCur: e.currentTarget.id
      })
      this.echartsPost(this.data.TabCur)
    },
    analysisPost() {
      let url = "/my/statistics"
      let _this = this
      http.postRequest(url, {},
        (res) => {
          const _k1 = 'statistics.inMoneyCount'
          const _k2 = 'statistics.outMoneyCount'
          const _k3 = 'statistics.diff'
          _this.setData({
            [_k1]: res.data.inMoneyCount,
            [_k2]: res.data.outMoneyCount,
            [_k3]: res.data.diff
          })
        },
        (err) => {
          console.log(err)
        }
      )
    },

    echartsPost(TabCur) {
      let url = ""
      if (TabCur == 0) {
        url = "/my/INanalysis"
      } else {
        url = "/my/OUTanalysis"
      }
      http.postRequest(url, {},
        (res) => {
          var option = {
            backgroundColor: "#ffffff",
            series: [{
              label: {
                normal: {
                  fontSize: 14
                }
              },
              type: 'pie',
              center: ['50%', '50%'],
              radius: ['30%', '70%'],
              data: res.data
            }]
          };
          chart.setOption(option);
        },
        (err) => {
          console.log(err);
        }
      )
    },
  }
})