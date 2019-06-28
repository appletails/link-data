import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import store from '../../../redux/store'
import Title from '../../Title'
import styles from '../describe.less';
import $http from '../../../api'

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

    if(!data) {
      alert("没有数据")
      return
    }
    const action = {
      type: 'changeData',
      value: data
    }
    store.dispatch(action); // 解析action
    this.props.history.push(`/search/${this.props.match.params.type}/${encodeURIComponent(nid)}`)
  }
  render() {
    const data = this.state.data
    return (
      <div className={styles.describe}>
        <Title title="楼层主题页" />
        <div className={styles.title}>包含的铺位空间列表</div>
        <div className={styles.list}>
          <p>
            {data.spaceUnits ? data.spaceUnits.map((item, i) =>
              <span className={styles.link} key={i} onClick={this.changeData.bind(this, item.nid)}>{item.label}</span>) : ''}
              <span></span><span></span><span></span><span></span><span></span><span></span><span></span>
          </p>
        </div>
        <div className={styles.title}>客流量记录列表</div>
        <div className={styles.list}>
          <p><span>inSum</span><span>outSum</span><span>time</span></p>
          {data.customerCounterRecords ? data.customerCounterRecords.map((item, i) => <p key={i}>
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