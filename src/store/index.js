import { createStore } from 'vuex'
import tab from './tab';

export default createStore({
  //公共state对象，存储所有组件的状态
  state: {
    user:{
      name:'http://192.168.47.164:8080/static/',
    }
  },
  //唯一取值的方法,计算属性
  getters: {
    getUser(state){
      return state.user;
    }
  },
  //唯一可以修改state值的方法，同步阻塞
  mutations: {
    updateUser(state,user){
      state.user = user;
    }
  },
  //异步调用 mutations方法
  actions: {
    asyncUpdateUser(context,user){
      context.commit('updateUser',user);
    }
  },
  modules: {
    tab
  }
})
