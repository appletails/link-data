import React, { Component } from 'react';
import styles from './badge.less'

class Badge extends Component {
  toSearch(path){
    this.props.history.push(`/search/${this.props.type}/${encodeURIComponent(path)}`)
  }
  render() {
    const mmbBadge = this.props.data
    const title = this.props.title
    return (
      <div className={styles.badge}>
        <div className={styles.title}>
          <span>{title}</span>
          <span style={{flex:1}}></span>
          <span>标题</span>
          <span>标题</span>
          <span>标题</span>
          <span>标题</span>
        </div>
        <div className={styles.body}>
          <ul className={styles.main}>
            {
              mmbBadge.map((item, i) => {
                if (i >= 5) return ''
                return <li
                key={i}
                onClick={this.toSearch.bind(this,item.nid)}
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
                onClick={this.toSearch.bind(this,item.nid)}
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
export default Badge