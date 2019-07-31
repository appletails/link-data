const defaultState = {
  member: {},
  store: {},
  bot: {}
}
export default (state = defaultState, action) => {
  switch (action.type) {
    case 'changeMember':
      const dataMember = JSON.parse(JSON.stringify(state)); // 深度拷贝
      dataMember.member = action.value;
      return dataMember;

    case 'changeStore':
      const dataStore = JSON.parse(JSON.stringify(state)); // 深度拷贝
      dataStore.store = action.value;
      return dataStore;

    case 'changeBot':
      const dataBot = JSON.parse(JSON.stringify(state)); // 深度拷贝
      dataBot.bot = action.value;
      return dataBot;
      
    default:
      console.log('没有找到对应的方法')
      break;
  }
  return state;
}