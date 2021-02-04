// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('main2'));

// 指定图表的配置项和数据
var option = {
    color: ['#00ca5a', '#00dbfe', '#3e61bf'],
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
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
            radius: ['40%', '60%'],
            center: ['50%', '60%'],
            roseType: 'area',
            data: [
                {value: 10, name: '校组织'},
                {value: 10, name: '年级组织'},
                {value: 10, name: '班组织'}
            ]
        }
    ]
};


// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);