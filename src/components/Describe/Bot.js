import React, { Component } from 'react';
import store from '../../redux/store'
import styles from './describe.less';
import Space from './BotChild/Space'
import Floor from './BotChild/Floor'

class Bot extends Component {
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
  render() {
    return (
      <div className={styles.describe}>
        {
          this.state.data.spaceUnits?<Floor />:<Space />
        }
      </div>
    )
  }
}
export default Bot