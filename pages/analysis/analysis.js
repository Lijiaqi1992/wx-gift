import * as echarts from '../../ec-canvas/echarts';

const app = getApp();

function initChart(canvas, width, height, dpr) {
    const chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr // new
    });
    canvas.setChart(chart);

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
            radius: ['20%', '40%'],
            data: [{
                value: 55,
                name: '北京'
            }, {
                value: 20,
                name: '武汉'
            }, {
                value: 10,
                name: '杭州'
            }, {
                value: 20,
                name: '广州'
            }, {
                value: 38,
                name: '上海'
            }]
        }]
    };

    chart.setOption(option);
    console.log(chart);
    return chart;
}

Page({

    data: {
        ec: {
            onInit: initChart
        },
        TabCur: 0,
        tab: [
        {
            name: '收礼',
            TabCur: 0
        },
        {
            name: '送礼',
            TabCur: 1
        },
        ],
    },


});
