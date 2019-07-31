import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import store from '../../redux/store'
import Title from '../Title'
import styles from './describe.less';
import $http from '../../api'
import Pie from '../Pie'
import Line from '../Line'

class Member extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...store.getState()
    }
    this.handleStoreChange = this.handleStoreChange.bind(this);
    // 注册监听store，store变化后调用组件的handleStoreChange方法更新组件的state
    store.subscribe(this.handleStoreChange);
  }
  handleStoreChange() {
    this.setState(
      store.getState()
    )
  }

  // 动态监听输入变化inputValue值
  async changeData(nid) {
    const data = await $http.getStoreTopic(encodeURIComponent(nid))
    if (!data) {
      alert("没有数据")
      return
    }
    this.props.history.push(`/search/1/${encodeURIComponent(nid)}`)
  }

  render() {
    const title = "会员基本信息"
    const data = this.state.member
    const pay = {
      title: {
        text: "比数随时间趋势"
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
        data: this.props.payTime.map(item => item.name)
      },
      yAxis: {
        name: "消费比数",
        type: 'value',
      },
      series: [
        {
          type: 'line',
          stack: this.props.stack,
          data: this.props.payTime.map(item => item.value)
        }
      ]
    }
    const line = {
      title: {
        text: "金额随时间趋势"
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
        data: this.props.lineTime.map(item => item.name)
      },
      yAxis: {
        name: "消费金额",
        type: 'value',
      },
      series: [
        {
          type: 'line',
          stack: this.props.stack,
          data: this.props.lineTime.map(item => item.value)
        }
      ]
    }
    return (
      <div className={styles.describe}>
        <Title title={title} />
        <div className={styles.body}>
          <span>姓名：{data.label}</span>
          <span>会员ID：{data.nid}</span>
        </div>
        <div className={styles.title}>消费记录</div>
        <div className={styles.list}>
          <p><span>店铺名称</span><span>店铺行业</span><span>消费时间</span><span>消费金额</span></p>
          {data.purchaseHistory ? data.purchaseHistory.map((item, i) => <p key={i}>
            <span className={styles.link} onClick={this.changeData.bind(this, item.store.nid)}>{item.store.label}</span>
            <span>{item.store.yetai.label}</span>
            <span>{item.time}</span>
            <span>{item.value}</span>
          </p>) : ''}
        </div>

        <Title title="可视化数据" />
        <div className={styles.pie}>
          <Pie
            data={this.props.pay}
            id="pay"
            title="各店的消费比例"
          />
          <Pie
            data={this.props.yetai}
            id="yetai"
            title="各业态的消费比例"
          />
        </div>
        <Line
          option={line}
          id="lineTime"
        />
        <Line
          option={pay}
          id="payTime"
        />
      </div>
    )
  }
}
export default withRouter(Member)