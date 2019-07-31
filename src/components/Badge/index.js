import React, { Component } from 'react';
import styles from './badge.less'
import $http from '../../api'
import { withRouter } from 'react-router-dom'

class Badge extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      link: [
        [
          { value: "金额(+)", type: 0 },
          { value: "金额(-)", type: 1 },
          { value: "笔数(+)", type: 2 },
          { value: "笔数(-)", type: 3 }
        ],
        [
          { value: "营业额(+)", type: 0 },
          { value: "营业额(-)", type: 1 },
          { value: "签约日(+)", type: 2 },
          { value: "签约日(-)", type: 3 }
        ],
        [
          { value: "楼层", type: 0 },
          { value: "铺位空间", type: 1 }
        ]
      ],
      action: 0
    }
  }
  async toSearch(nid) {
    let data = null
    switch (this.props.type) {
      case "0":
        data = await $http.getMmbTopic(encodeURIComponent(nid))
        break;
      case "1":
        data = await $http.getStoreTopic(encodeURIComponent(nid))
        break;
      case "2":
        data = await $http.getBotTopic(encodeURIComponent(nid))
        break;
      default:
        break;
    }
    console.log(data)
    if (!data) return
    this.props.history.push(`/search/${this.props.type}/${encodeURIComponent(nid)}`)
  }
  async componentDidMount() {
    await this.changeData(0)
  }
  async changeData(page) {
    let data = []
    switch (this.props.type) {
      case "0":
        data = await $http.getMmbBadge(page)
        break;
      case "1":
        data = await $http.getStoreBadge(page)
        break;
      case "2":
        data = await $http.getBotBadge(page)
        break;
      default:
        break;
    }
    this.setState({
      data: data,
      action: page
    })
  }
  render() {
    const mmbBadge = this.state.data
    const title = this.props.title
    return (
      <div className={styles.badge}>
        <div className={styles.title}>
          <span>{title}</span>
          <span style={{ flex: 1 }}></span>
          {this.state.link[this.props.type].map(
            (item, i) =>
              <span className={`${this.state.action === item.type ? styles.action : ''} ${styles.link}`} key={i} onClick={this.changeData.bind(this, item.type)}>{item.value}</span>
          )}
        </div>
        <div className={styles.body}>
          <ul className={styles.main}>
            {
              mmbBadge.map((item, i) => {
                if (i >= 5) return ''
                return <li
                  key={i}
                  onClick={this.toSearch.bind(this, item.nid)}
                >
                  <span>{item.label}</span>
                  <span>{item.value}</span>
                </li>
              })
            }
          </ul>
          <ul className={styles.main}>
            {
              mmbBadge.map((item, i) => {
                if (i < 5) return ''
                return <li
                  key={i}
                  onClick={this.toSearch.bind(this, item.nid)}
                >
                  <span>{item.label}</span>
                  <span>{item.value}</span>
                </li>
              })
            }
          </ul>
        </div>
      </div>
    )
  }
}
export default withRouter(Badge)