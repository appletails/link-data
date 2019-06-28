import React, { Component } from 'react';

// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import 'echarts/lib/chart/pie';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

class Pie extends Component {
  constructor(props){
    super(props)
    this.state={}
  }
  componentDidUpdate() {
    console.log(this.props)
    const id = this.props.id
    const title = this.props.title
    // 基于准备好的dom，初始化echarts实例
    let myChart = echarts.init(document.getElementById(id));
    let option = {
      title: {
        text: title,
        // subtext: '纯属虚构',
        x: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        // data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: '70%',
          center: ['50%', '55%'],
          data: this.props.data,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    // 绘制图表
    myChart.setOption(option);
  }
  render() {
    return (
      <div id={this.props.id} style={{ width: 400, height: 400 }}></div>
    );
  }
}

export default Pie;