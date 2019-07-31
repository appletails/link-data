import React, { Component } from 'react';
import $http from '../../api'
import styles from './input.less';

class Input extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: [],
      yetai: [],
      space: [],
      dates: '',
      yetais: '',
      spaces: ''
    }
  }
  async toSearch(e) {
    if (e.keyCode !== 13) return
    const searchText = e.target.value.split(' ')
    const data = await $http.getGsThree(searchText[0],searchText[1],searchText[2])
    console.log(data)
    this.setState({ value: '' });
  }
  async hanldeChange(e) {
    if (!e.target.value) {
      this.setState({
        date: [],
        yetai: [],
        space: []
      })
      return
    }
    const searchText = e.target.value.split(' ')
    const date = await $http.getPrompt(searchText[0])
    this.setState({
      date: date.filter(item => item.types[0] === 'Month' || item.types[0] === 'Day').slice(0, 6),
    })

    if (searchText.length < 2 || !searchText[1]) return
    const yetai = await $http.getPrompt(searchText[1])
    this.setState({
      yetai: yetai.filter(item => item.types[0] === 'Yetai').slice(0, 6),
    })

    if (searchText.length < 3) return
    const space = await $http.getPrompt(searchText[2])
    this.setState({
      space: space.filter(item => item.types[0] === 'Space' || item.types[0] === 'Storey').slice(0, 6)
    })
  }
  // getDate(text) {
  //   console.log(text)
  //   this.setState({
  //     dates: text
  //   })
  //   console.log(this.state)
  //   document.getElementById('search').value=`${this.state.dates} ${this.state.yetais} ${this.state.spaces}`
  // }
  // getYetai(text) {
  //   this.setState({
  //     yetais: text
  //   })
  //   document.getElementById('search').value=`${this.state.dates} ${this.state.yetais} ${this.state.spaces}`
  // }
  // getSpace(text) {
  //   this.setState({
  //     spaces: text
  //   })
  //   document.getElementById('search').value=`${this.state.dates} ${this.state.yetais} ${this.state.spaces}`
  // }
  render() {
    return (
      <div className={styles.search}>
        <input
          type="text"
          placeholder="请输入内容"
          onKeyUp={this.toSearch.bind(this)}
          onChange={this.hanldeChange.bind(this)}
        />
        {this.state.date.length ?
          <div className={styles.search_text}>
            {this.state.date.length ?
              <p>时间：{this.state.date.map((item, i) => <span key={i} className={styles.code}>{item.date || item.label}</span>)}</p>
              : null}
            {this.state.yetai.length ?
              <p>业态：{this.state.yetai.map((item, i) => <span key={i} className={styles.code}>{item.label}</span>)}</p>
              : null}
            {this.state.space.length ?
              <p>楼层：{this.state.space.map((item, i) => <span key={i} className={styles.code}>{item.date || item.label}</span>)}</p>
              : null}
          </div> : null}
      </div>
    )
  }
}
export default Input