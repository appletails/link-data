import React, { Component } from 'react';
import Badge from '../../components/Badge';
import styles from './home.less';
import $http from '../../api'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      mmbBadge: [],
      botBadge: [],
      storeBadge: []
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
  async componentDidMount() {
    const mmbBadge = await $http.getMmbBadge(0, 10)
    const botBadge = await $http.getBotBadge(0, 10)
    const storeBadge = await $http.getStoreBadge(0, 10)
    this.setState({
      mmbBadge: mmbBadge,
      botBadge: botBadge,
      storeBadge: storeBadge
    });
  }
  render() {
    const value = this.state.value

    return (
      <div className={styles.home}>
        <div className={styles.body}>
          <div className={styles.titleBody}>
            <div className={styles.title}>Linked Data PoC</div>
            <div className={styles.nav}>可能会有的菜单：菜单一 菜单二 菜单三 菜单四 菜单五</div>
            <input
              type="text"
              placeholder="请输入关键字搜索"
              onKeyUp={this.toSearch.bind(this)}
              value={value}
              onChange={this.hanldeChange.bind(this)}
            />
          </div>
        </div>
        <div className={styles.cardBody}>
          <Badge
            title="会员"
            data={this.state.mmbBadge}
            history={this.props.history}
            type={0}
          />
          <Badge
            title="店铺"
            data={this.state.storeBadge}
            history={this.props.history}
            type={1}
          />
          <Badge
            title="空间"
            data={this.state.botBadge}
            history={this.props.history}
            type={2}
          />
        </div>
      </div>
    )
  }
}
export default Home
