import React, { Component } from 'react'
import Relevant from '../../components/Relevant'
import Member from '../../components/Describe/Member'
import Bot from '../../components/Describe/Bot'
import Store from '../../components/Describe/Store'
import styles from './search.less';
import $http from '../../api'
import store from '../../redux/store'


class Search extends Component {

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
  async showDom() {
    const nid = this.props.match.params.cont
    const type = this.props.match.params.type
    switch (type) {
      case "0":
        await $http.getMmbTopic(nid)
        break;
      case "1":
        await $http.getStoreTopic(nid)
        break;
      case "2":
        await $http.getBotTopic(nid)
        break;
      default:
        break;
    }
  }
  async componentDidMount() {
    this.showDom()
  }

  render() {
    let dom = null
    const type = this.props.match.params.type
    // console.log(data)
    const data = this.state.member
    switch (type) {
      case "0":
        // 前端计算比例
        // 各店的消费比例(比数/金额)
        // 各业态的消费比例(比数/金额)
        // 饼状图
        let pay = [],
          yetai = [],
          lineTime = [],
          payTime = []
        for (let i in data.purchaseHistory) {
          const item = data.purchaseHistory[i].store.label,
            yitem = data.purchaseHistory[i].store.yetai.label,
            money = data.purchaseHistory[i].value,
            lTime = data.purchaseHistory[i].time
          // 各店的消费比例(比数/金额)
          const hasPay = pay.filter(_item => _item.name === item).length
          if (hasPay) {
            pay = pay.map(val => {
              val.value++
              return val
            })
          } else {
            pay.push({ name: item, value: 1, money: money })
          }
          // 各业态的消费比例(比数/金额)
          const hasYetai = yetai.filter(_item => _item.name === yitem).length
          if (hasYetai) {
            yetai = yetai.map(val => {
              val.value++
              return val
            })
          } else {
            yetai.push({ name: yitem, value: 1 })
          }
          // 金额随时间趋势
          const haslineTime = lineTime.filter(_item => _item.name === yitem).length
          if (haslineTime) {
            lineTime = lineTime.map(val => {
              val.value += money
              return val
            })
          } else {
            lineTime.push({ name: lTime, value: money })
          }
          // 笔数随时间趋势
          const haslinePay = payTime.filter(_item => _item.name === yitem).length
          if (haslinePay) {
            payTime = payTime.map(val => {
              val.value++
              return val
            })
          } else {
            payTime.push({ name: lTime, value: 1 })
          }
        }

        dom = <Member
          data={data}
          pay={pay}
          yetai={yetai}
          lineTime={lineTime}
          payTime={payTime}
        />
        break;
      case "1":
        dom = <Store  />
        break;
      case "2":
        dom = <Bot />
        break;
      default:
        dom = <div>NODATA</div>
        break;
    }
    return (
      <div className={styles.search}>
        <div className={styles.body}>
          {dom}
        </div>
        <Relevant data={this.state} />
      </div>
    )
  }
}
export default Search