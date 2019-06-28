import React, { Component } from 'react';
import styles from './title.less'

class Title extends Component {
  render() {
    const {
      title,
      icon,
      height,
      size,
      position,
      width
    } = this.props
    
    return (
      <div
        className={styles.title}
        style={{ height: height? `${height}px` : '' }}
      >
        <span
          className={icon ? styles.img : styles.icon}
          style={icon ? {
            backgroundImage: `url(${icon})`,
            backgroundPositionX: position ? position : 'left',
            width:width?`${width}px`:''
          } : {}}
        ></span>
        <span
          className={styles.text}
          style={{ fontSize: size ? `${size}px` : '' }}
        >{title}</span>
      </div>
    )
  }
}

export default Title