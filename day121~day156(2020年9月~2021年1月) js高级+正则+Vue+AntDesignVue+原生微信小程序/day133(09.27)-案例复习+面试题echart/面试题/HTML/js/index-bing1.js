// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('main1'));

// 指定图表的配置项和数据
var option = {
    color: ['#00ca5a', '#00dbfe', '#3e61bf', '#fd7922', '#caab00', '#00ca95'],
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
        textStyle:{
            color: '#ffffff'//字体颜色
        },
        orient: 'vertical',
        top: 65,
        left: 20,
        data: ['主题教育', '专题教育', '理论学习', '其他教育', '经常性教育', '基础教育']
    },
    toolbox: {
        show: true,
        feature: {
            mark: {show: true},
            dataView: {show: true, readOnly: false},
            magicType: {
                show: true,
                type: ['pie', 'funnel']
            },
            restore: {show: true},
            saveAsImage: {show: true}
        }
    },
    series: [
        {
            name: '面积模式',
            type: 'pie',
            radius: [10, 50],
            center: ['60%', '55%'],
            label: {
                normal: {
                    show: true,
                    formatter: "{d}%"
                }
            },
            roseType: 'area',
            data: [
                {value: 10, name: '主题教育'},
                {value: 10, name: '专题教育'},
                {value: 10, name: '理论学习'},
                {value: 10, name: '其他教育'},
                {value: 10, name: '经常性教育'},
                {value: 10, name: '基础教育'}
            ]
        }
    ]
};


// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);