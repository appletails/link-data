import React, { Component } from 'react';
import Title from '../Title'
import Card from '../Card'
import styles from './dataviex.less';

class DataView extends Component {
  render() {
    const data = [
      {
        title: '标题位置',
        cont: '152655'
      },
      {
        title: '标题位置',
        cont: '152655'
      },
      {
        title: '标题位置',
        cont: '152655'
      },
      {
        title: '标题位置',
        cont: '152655'
      },
      {
        title: '标题位置',
        cont: '152655'
      }
    ]
    return (
      <div className={styles.dataview}>
        <Title title="可视化数据" />
        <div className={styles.data_line}>
          {
            data.map((item, i) => <Card data={item} key={i} />)
          }
          <div className={styles.cardFalse}></div>
          <div className={styles.cardFalse}></div>
          <div className={styles.cardFalse}></div>
          <div className={styles.cardFalse}></div>
          <div className={styles.cardFalse}></div>
        </div>
        <div className={styles.body}>
          
        </div>
      </div>
    )
  }
}

export default DataView