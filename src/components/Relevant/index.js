import React, { Component } from 'react';
import Title from '../Title'
import LinesEllipsis from 'react-lines-ellipsis'
import { Link } from 'react-router-dom'
import styles from './relevant.less'

import icon from '../../assets/img/icon_title_small.png'


class Relevant extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "类似的关键词",
      data: [
        {
          title: '测试的标题测试的标题测试的标题测试的标题',
          context: '测试的内容测试的内容测试的内容测试的内容测试的内容测试的内容测试的内容测试的内容测试的内容测试的内容'
        },
        {
          title: '测试的标题',
          context: '测试的内容测试的内容测试的内容测试的内容测试的内容测试的内容测试的内容测试的内容测试的内容测试的内容测试的内容测试的内容测试的内容测试的内容测试的内容测试的内容测试的内容测试的内容测试的内容测试的内容'
        },
        {
          title: '测试的标题',
          context: '测试的内容测试的内容测试的内容测试的内容测试的内容测试的内容测试的内容测试的内容测试的内容测试的内容测试的内容测试的内容测试的内容测试的内容测试的内容测试的内容测试的内容测试的内容测试的内容测试的内容测试的内容测试的内容测试的内容测试的内容测试的内容测试的内容测试的内容测试的内容测试的内容测试的内容'
        },
        {
          title: '测试的标题',
          context: '测试的内容测试的内容测试的内容测试的内容测试的内容测试的内容测试的内容测试的内容测试的内容测试的内容'
        }
      ]
    }
  }
  render() {
    const { data } = this.state
    return (
      <div className={styles.relevant}>
        <Title title={this.state.title} />
        {
          data.map((item, i) =>
            <Link
              to={`/search/${item.title}`}
              key={i}>
              <Title
                title={item.title}
                icon={icon}
                width="20"
                height="38"
                size="16"
              />
              <LinesEllipsis
                className={styles.context}
                text={item.context}
                maxLine='4'
                ellipsis='......'
                trimRight
                basedOn='letters'
              />
            </Link>)
        }
      </div>
    )
  }
}

export default Relevant