import React, { Component } from 'react';
import styles from './foot.less';
import logo from '../../assets/img/logo.png';
class Footer extends Component {
  constructor(props){
    super(props);
    // 不要在这里调用 this.setState()
    this.state = { nav: [
      "此处敬请期待......"
    ] };
  }
  render(){
    return(
      <div className={styles.foot}>
        <div className={styles.body}>
          <div className={styles.left}>
            <img src={logo} alt="logo"/>
          </div>
          <div className={styles.center}>
            <ul>
              {this.state.nav.map((item,i) => <li key={i}>{item}</li>)}
            </ul>
            <p>©2019版权所有信息参考。版权所有。</p>
          </div>
          <div className={styles.right}></div>
        </div>
      </div>
    )
  }
}

export default Footer