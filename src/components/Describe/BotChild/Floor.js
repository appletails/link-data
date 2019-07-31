import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import store from '../../../redux/store'
import Title from '../../Title'
import styles from '../describe.less';
import $http from '../../../api'
import { timestamp } from '../../../utils/filter'
import Line from '../../Line'

class Floor extends Component {
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
    const data = await $http.getBotTopic(encodeURIComponent(nid))
    if (!data) return
    this.props.history.push(`/search/${this.props.match.params.type}/${encodeURIComponent(nid)}`)
  }
  render() {
    const data = this.state.bot
    const sum = data.customerCounterRecords ? data.customerCounterRecords.sort((a, b) => {
      return timestamp(a.time) - timestamp(b.time)
    }) : null
    const option = {
      title: {
        text: '客流量趋势折线图'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        data: ['inSum', 'outSum', 'inSum-outSum']
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      dataZoom: [
        {
          show: true,
          realtime: true,
          start: 0,
          end: 100
        },
        {
          type: 'inside',
          realtime: true,
          start: 0,
          end: 100
        }
      ],
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: sum.map(val => val.time)
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'inSum',
          type: 'line',
          stack: 'inSum',
          data: sum.map(val => val.inSum)
        },
        {
          name: 'outSum',
          type: 'line',
          stack: 'outSum',
          data: sum.map(val => val.outSum)
        },
        {
          name: 'inSum-outSum',
          type: 'line',
          stack: 'inSum-outSum',
          data: sum.map(val => val.inSum-val.outSum)
        }
      ]
    };
    return (
      <div className={styles.describe}>
        <Title title="包含的铺位空间列表" />
        {/* <div className={styles.title}>包含的铺位空间列表</div> */}
        <div className={styles.list}>
          <p>
            {data.spaceUnits ? data.spaceUnits.map((item, i) =>
              <span className={styles.link} key={i} onClick={this.changeData.bind(this, item.nid)}>{item.label}</span>) : ''}
            <span></span><span></span><span></span><span></span><span></span><span></span><span></span>
          </p>
        </div>
          <Title title="客流量记录列表" />
        {/* <div className={styles.title}>客流量记录列表</div> */}
        <Line option={option} id="sum"/>
        <div className={styles.list}>
          <p><span>inSum</span><span>outSum</span><span>time</span></p>
          {sum ? sum.map((item, i) => <p key={i}>
            <span>{item.inSum}</span>
            <span>{item.outSum}</span>
            <span>{item.time}</span>
          </p>) : ''}
        </div>
      </div>
    )
  }
}
export default withRouter(Floor)