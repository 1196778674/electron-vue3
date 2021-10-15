import { createStore } from 'vuex'

export default createStore({
  state: {
    localList: JSON.parse((window as any).localStorage.getItem('localList')) || []
  },
  mutations: {
    saveLocalList (state, data) {
      state.localList.push(data as never)
      window.localStorage.setItem('localList', JSON.stringify(state.localList))
    }
  },
  actions: {
  },
  modules: {
  }
})
