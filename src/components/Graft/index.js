import React, { Component } from 'react';
// import Title from '../Title'
import styles from './graft.less'

class Graft extends Component{
  constructor(props){
    super(props)
    this.state={}
  }
  render(){
    // const title = this.props.title
    return (
      <div className={styles.graft}>
        {/* <Title title={title}/> */}
        <div className={styles.body}></div>
      </div>
    )
  }
}

export default Graft