import React, { Component } from 'react';
import styles from './nav.less';

class Nav extends Component {
  constructor(props){
    super(props);
    // 不要在这里调用 this.setState()
    this.state = { nav: [
      "链接一",
      "链接二",
      "链接三",
      "链接四",
      "链接五",
    ] };
  }
  render() {
    return (
      <div className={styles.nav}>
        <div className={styles.body}>
          <ul>
            <li>导航：</li>
            {this.state.nav.map((item,i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
      </div>
    )
  }
}

export default Nav