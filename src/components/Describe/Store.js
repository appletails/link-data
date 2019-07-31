import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { timestamp } from '../../utils/filter'
import Title from '../Title'
import styles from './describe.less';
import store from '../../redux/store';
import $http from '../../api'

class Store extends Component {
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
  storeType(start, end) {
    return timestamp(end) - timestamp(start) ? '有效' : '无效'
  }
  // 动态监听输入变化inputValue值
  async changeData(nid) {
    const data = await $http.getBotTopic(encodeURIComponent(nid))
    if (!data) return
    this.props.history.push(`/search/2/${encodeURIComponent(nid)}`)
  }
  render() {
    const title = "店铺基本信息",
      data = this.state.store,
      address = data.tradeActions ? data.rentActions[0].rentObject[0] : {}
    return (
      <div className={styles.describe}>
        <Title title={title} />
        <div className={styles.body}>
          <span>名称：{data.label}</span>
          <span>位置：<span className={styles.link} onClick={this.changeData.bind(this, address.nid)}>{address.label}</span></span>
          <span>{data.yetai ? `业态：${data.yetai.label}` : ''}</span>
        </div>
        <div className={styles.title}>租约列表</div>
        <div className={styles.list}>
          <p><span>租约ID</span><span>起Date</span><span>止Date</span><span>租出空间</span><span>有效状态</span></p>
          {data.rentActions ? data.rentActions.map((item, i) => <p key={i}>
            <span>{item.nid}</span>
            <span>{item.startDate}</span>
            <span>{item.endDate}</span>
            <span>{item.rentObject ? item.rentObject.map((item, i) => i === 0 ? item.label : `,${item.label}`) : ""}</span>
            <span>{this.storeType(item.startDate, item.endDate)}</span>

          </p>) : ''}
        </div>
        <div className={styles.title}>营业额列表</div>
        <div className={styles.list}>
          <p><span>流水单ID</span><span>金额</span><span>时间</span></p>
          {data.tradeActions ? data.tradeActions.map((item, i) => <p key={i}>
            <span>{item.nid}</span>
            <span>{item.value}</span>
            <span>{item.time}</span>
          </p>) : ''}
        </div>
      </div>
    )
  }
}
export default withRouter(Store)