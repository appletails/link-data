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
  storeType(start,end){
    return timestamp(end)-timestamp(start)?'有效':'无效'
  }
  render() {
    const data = this.state.data
    return (
      <div className={styles.describe}>
        <Title title="铺位空间主题页" />
        <div className={styles.title}>所在楼层：<span className={styles.link} onClick={this.changeData.bind(this, data.storey?data.storey.nid:'')}>{data.storey?data.storey.label:''}层</span></div>
        <div className={styles.title}>租约列表</div>
        <div className={styles.list}>
          <p><span>租约ID</span><span>起Date</span><span>止Date</span><span>有效状态</span></p>
          {data.rentActions ? data.rentActions.map((item, i) => <p key={i}>
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