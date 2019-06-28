
import Home from '../page/Home';
import Search from '../page/Search';

export default [
  {
    name:"home",
    path:"/",
    component:Home
  },
  {
    name:"home",
    path:"/search/:type/:cont",
    component:Search
  }
]