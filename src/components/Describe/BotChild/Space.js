import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import store from '../../../redux/store'
import Title from '../../Title'
import styles from '../describe.less';
import $http from '../../../api'
import { timestamp } from '../../../utils/filter'

class Space extends Component {
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
  // 当前店铺的更改
  async changeData(nid) {
    const data = await $http.getBotTopic(encodeURIComponent(nid))
    if(!data) return
    this.props.history.push(`/search/${this.props.match.params.type}/${encodeURIComponent(nid)}`)
  }
  // 
  async toStore(nid) {
    const data = await $http.getStoreTopic(encodeURIComponent(nid))
    if(!data) return
    this.props.history.push(`/search/1/${encodeURIComponent(nid)}`)
  }
  storeType(start,end){
    return timestamp(end)-timestamp(start)?'有效':'无效'
  }
  render() {
    const data = this.state.bot
    return (
      <div className={styles.describe}>
        <div className={styles.title}>所在楼层：<span className={styles.link} onClick={this.changeData.bind(this, data.storey?data.storey.nid:'')}>{data.storey?data.storey.label:''}层 {data.label}</span></div>
        {/* <div className={styles.title}>租约列表</div> */}
        <Title title="租约列表" />
        <div className={styles.list}>
          <p><span>店铺</span><span>租约ID</span><span>起Date</span><span>止Date</span><span>有效状态</span></p>
          {data.rentActions ? data.rentActions.map((item, i) => <p key={i}>
            <span className={styles.link} onClick={this.toStore.bind(this, item.agent.nid)}>{item.agent.label}</span>
            <span>{item.nid}</span>
            <span>{item.startDate}</span>
            <span>{item.endDate}</span>
            <span>{this.storeType(item.startDate,item.endDate)}</span>
          </p>) : ''}
        </div>
      </div>
    )
  }
}
export default withRouter(Space)