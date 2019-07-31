import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import styles from './header.less'
import Input from '../../components/Input'

class Header extends Component {
  render() {
    return (
      <div className={styles.header}>
        <div className={styles.body}>
            {/* <div className={styles.right}>Linked Data PoC</div> */}
          <Link to="/" className={styles.left} replace>Linked Data PoC</Link>
          <div className={styles.center}>
            <Input />
          </div>
        </div>
      </div>
    )
  }
}
export default Header