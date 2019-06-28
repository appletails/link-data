import React, {Component} from 'react';
import styles from './card.less';
import iconMoney from '../../assets/img/icon_money.png'

class Card extends Component{
  constructor(props){
    super(props)
    this.state={}
  }
  render(){
    const { data } = this.props
    return(
      <div className={styles.card}>
        <div>
          <div className={styles.title}>{data.title}</div>
          <div className={styles.money}>
            <img src={iconMoney} alt='icon'/>
            <span>{data.cont}</span>
          </div>
        </div>
      </div>
    )
  }
}
export default Card