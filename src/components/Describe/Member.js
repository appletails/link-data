import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import store from '../../redux/store'
import Title from '../Title'
import styles from './describe.less';
import $http from '../../api'

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
    if(!data) {
      alert("没有数据")
      return
    }
    const action = {
      type: 'changeData',
      value: data
    }
    store.dispatch(action); // 解析action
    this.props.history.push(`/search/1/${encodeURIComponent(nid)}`)
  }

  render() {
    const title = "会员基本信息"
    const data = this.state.data
    console.log(520)
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
            <span className={styles.link} onClick={this.changeData.bind(this,item.store.nid)}>{item.store.label}</span>
            <span>{item.store.yetai.label}</span>
            <span>{item.time}</span>
            <span>{item.value}</span>
          </p>) : ''}
        </div>
      </div>
    )
  }
}
export default withRouter(Member)