import $axios from '../assets/js/axios'
import store from '../redux/store'
export default {
  // ----------------------------------------------------  会员
  /**
    * 会员Badge
    * @param {enum} rank  0: 金额(+) 1: 金额(-) 2: 比数(+) 2: 比数(-) —— 正序(+)-由小到大，倒序(-)-由大到小
    * @param {int}  limit 默认：10
  */
  getMmbBadge: async function (rank, limit) {
    const response = await $axios.get(`/api/data/mmb?rank=${rank}&limit=${limit}`)
    return response.data
  },
  /**
    * 会员主题
    * @param {string} nid
    * @param {string} label
  */
  getMmbTopic: async function (nid, label) {
    const response = await $axios.get(`/api/data/topic/mmb?nid=${nid}&label=${label}`)
    if(!response.data.length){
      alert("么得数据")
      return false
    }
    const action = {
      type: 'changeMember',
      value: response.data.length?response.data[0]:[]
    }
    store.dispatch(action); // 解析action
    return true
  },
  // ----------------------------------------------------  空间
  /**
    * 空间Badge
    * @param {enum} rank  0: 楼层 1: 铺位空间
    * @param {int}  limit 默认：10
  */
  getBotBadge: async function (rank, limit) {
    const response = await $axios.get(`/api/data/bot?rank=${rank}&limit=${limit}`)
    return response.data
  },
  /**
    * 空间主题
    * @param {string} nid
    * @param {string} label
  */
  getBotTopic: async function (nid, label) {
    const response = await $axios.get(`/api/data/topic/bot?nid=${nid}&label=${label}`)
    if(!response.data.length){
      alert("么得数据")
      return false
    }
    const action = {
      type: 'changeBot',
      value: response.data.length?response.data[0]:[]
    }
    store.dispatch(action); // 解析action
    return true
  },
  // ----------------------------------------------------  店铺
  /**
    * 店铺Badeg
    * @param {enum} rank  0: 营业额(+) 1: 营业额(-) 2: 签约日(+) 2: 签约日(-)
    * @param {int}  limit 默认：10
   */
  getStoreBadge: async function (rank, limit) {
    const response = await $axios.get(`/api/data/store?rank=${rank}&limit=${limit}`)
    return response.data
  },
  /**
    * 店铺主题
    * @param {string} nid
    * @param {string} label
  */
  getStoreTopic: async function (nid, label) {
    const response = await $axios.get(`/api/data/topic/store?nid=${nid}&label=${label}`)
    if(!response.data.length){
      alert("么得数据")
      return false
    }
    const action = {
      type: 'changeStore',
      value: response.data.length?response.data[0]:[]
    }
    store.dispatch(action); // 解析action
    return true
  },
  // ----------------------------------------------------  定制查询服务
  /**
    * 关键词Prompt服务
    * @param {string} keyword
   */
  getPrompt: async function (keyword) {
    const response = await $axios.get(`/api/service/prompt?keyword=${keyword}`)
    return response.data
  },
  /**
    * X年度X业态销售合计值(时间段聚合，明确指标)
    * @param {int}    year
    * @param {string} yetaiNID
   */
  getGsOne: async function (year, yetaiNID) {
    const response = await $axios.get(`/api/service/gs1?year=${year}&yetaiNID=${yetaiNID}`)
    return response.data
  },
  /**
    * xx店YYY-MM-DD起X日内的销售额报告 (时间段聚合，统计与趋势报告)
    * @param {string} startDate
    * @param {int}    span
    * @param {string} storeNID
    * @param {string} storeLabel
  */
  getGsTwo: async function (startDate, span, storeNID, storeLabel) {
    const response = await $axios.get(`/api/service/gs2?startDate=${startDate}&span=${span}&storeNID=${storeNID}&storeLabel=${storeLabel}`)
    return response.data
  },
  /**
    * YYY-MM-DD中XX业态在各楼层的销售分布与客流比较 (多层关系聚合)
    * @param {string} date
    * @param {string} yetaiNID
  */
  getGsThree: async function (date, yetaiNID,yetaiLabel) {
    const response = await $axios.get(`/api/service/gs3?date=${date}&yetaiNID=${yetaiNID}&yetaiLabel=${yetaiLabel}`)
    return response.data
  }
}

