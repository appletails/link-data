const defaultState = {
  data: {}
}
export default (state = defaultState, action) => {
  switch (action.type) {
    case 'changeData':
      // console.log("changeData")
      const newState = JSON.parse(JSON.stringify(state)); // 深度拷贝
      newState.data = action.value;
      return newState;
    default:
      console.log('没有找到对应的方法')
      break;
  }
  return state;
}