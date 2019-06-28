// 百分比保留两位小数
const cent = Percentage => Percentage ? (Percentage * 100).toFixed(2) + '%' : ''

/*
  时间戳转换日期
  返回格式：2019-06-11 15:42:03
*/
const datetamp = (timestamp) => {
  if (!timestamp) return
  // 判断时间戳是否为13位
  timestamp = timestamp.toString().length < 13 ? parseInt(timestamp) * 1000 : parseInt(timestamp)
  let time = new Date(timestamp)
  let y, m, d, h, mm, s
  y = time.getFullYear()
  m = time.getMonth() + 1
  d = time.getDate()
  h = time.getHours()
  mm = time.getMinutes()
  s = time.getSeconds()
  return y + '-' + (m < 10 ? ('0' + m) : m) + '-' + (d < 10 ? ('0' + d) : d) + ' ' + (h < 10 ? ('0' + h) : h) + ':' + (mm < 10 ? ('0' + mm) : mm) + ':' + (s < 10 ? ('0' + s) : s)
}

/*
  日期转换时间戳
  返回 10位时间戳
*/
const timestamp = (datetamp) => datetamp ? Date.parse(new Date(datetamp)) / 1000 : ''

export {
  cent,
  datetamp,
  timestamp
}