// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('main'));

// 指定图表的配置项和数据
var option = {
    color: ['#0abccb', '#4483fc', '#ffc0cb'],
    tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
        textStyle:{
            color: '#ffffff'//字体颜色
        },
        data: ['备课数', '计划数', '完成率'],
        right: 10
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
            axisLabel: {
                textStyle: {
                    color: '#ffffff'
                }
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            axisLabel : {
                textStyle: {
                    color: '#ffffff'
                }
            }
        }
    ],
    series: [
        {
            name: '备课数',
            type: 'bar',
            barWidth: 5,
            stack: '统计',
            barWidth : 15,//柱图宽度
            data: [120, 132, 101, 134, 290, 230, 220, 0, 220, 220, 220, 0]
        },
        {
            name: '计划数',
            type: 'bar',
            stack: '统计',
            barWidth : 15,//柱图宽度
            data: [7000, 11340, 9800, 7501, 2234, 6990, 2130, 520, 3534, 2334, 5500, 5334]
        },
        {
            name: '完成率',
            type: 'bar',
            stack: '统计',
            barWidth : 15,//柱图宽度
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }
    ]
};


// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);