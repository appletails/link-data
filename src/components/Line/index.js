import React, { Component } from 'react';

// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import 'echarts/lib/chart/line';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

class Line extends Component {
  componentDidUpdate() {
    const id = this.props.id
    // 基于准备好的dom，初始化echarts实例
    let myChart = echarts.init(document.getElementById(id));
    let option = {
      title: {
        text: this.props.title
      },
      tooltip: {
        trigger: 'axis'
      },
      grid: {
        left: '5%',
        right: '7%',
        bottom: '5%',
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        name: '时间',
        type: 'category',
        boundaryGap: false,
        data: this.props.data.map(item => item.name)
      },
      yAxis:{
        name: this.props.YName || '',
        type: 'value',
      },
      series: [
        {
          type: 'line',
          stack: this.props.stack,
          data: this.props.data.map(item => item.value)
        }
      ]
    };


    // 绘制图表
    myChart.setOption(option);
  }
  render() {
    return (
      <div id={this.props.id} style={{ width: 800, height: 400 ,margin: "auto"}}></div>
    )
  }
}

export default Line;