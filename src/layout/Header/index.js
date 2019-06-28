import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import styles from './header.less'
import store from '../../redux/store'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = store.getState();
    // console.log(this.state)
  }
  toSearch(e){
    if (e.keyCode !== 13 || !this.state.value) return
    this.props.history.push(`/search/${this.state.value}`)
  }
  hanldeChange(e){
    this.setState({value: e.target.value});
  }
  render() {
    var value = this.state.value;
    return (
      <div className={styles.header}>
        <div className={styles.body}>
            {/* <div className={styles.right}>Linked Data PoC</div> */}
          <Link to="/" className={styles.left} replace>Linked Data PoC</Link>
          <div className={styles.center}>
            <input
              type="text"
              placeholder="请输入关键字搜索"
              onKeyUp={this.toSearch.bind(this)}
              value={value}
              onChange={this.hanldeChange.bind(this)}
            />
          </div>
        </div>
      </div>
    )
  }
}
export default Header