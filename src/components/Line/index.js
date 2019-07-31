import React, { Component } from 'react';

// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import 'echarts/lib/chart/line';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/dataZoom';

class Line extends Component {
  componentDidMount() {
    const id = this.props.id
    // 基于准备好的dom，初始化echarts实例
    let myChart = echarts.init(document.getElementById(id));
    console.log(this.props)
    let option = this.props.option

    // 绘制图表
    myChart.setOption(option);
  }
  componentDidUpdate() {
    const id = this.props.id
    // 基于准备好的dom，初始化echarts实例
    let myChart = echarts.init(document.getElementById(id));
    console.log(this.props)
    let option = this.props.option

    // 绘制图表
    myChart.setOption(option);
  }
  render() {
    return (
      <div id={this.props.id} style={{ width: '100%', height: 400 ,margin: "auto"}}></div>
    )
  }
}

export default Line;