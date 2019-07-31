import React, { Component } from 'react';
import Badge from '../../components/Badge';
import styles from './home.less';
import Input from '../../components/Input'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
  }
  toSearch(e) {
    if (e.keyCode !== 13 || !this.state.value) return
    this.props.history.push(`/search/${this.state.value}`)
    this.setState({ value: '' });
  }
  hanldeChange(e) {
    this.setState({ value: e.target.value });
  }
  render() {
    // const value = this.state.value

    return (
      <div className={styles.home}>
        <div className={styles.body}>
          <div className={styles.titleBody}>
            <div className={styles.title}>Linked Data PoC</div>
            <div className={styles.nav}>此处敬请期待......</div>
            <Input />
          </div>
        </div>
        <div className={styles.cardBody}>
          <Badge
            title="会员"
            type="0"
          />
          <Badge
            title="店铺"
            type="1"
          />
          <Badge
            title="空间"
            type="2"
          />
        </div>
      </div>
    )
  }
}
export default Home
