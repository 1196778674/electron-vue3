import { createStore } from 'vuex'

export default createStore({
  state: {
    id: JSON.parse((window as any).localStorage.getItem('localId') || 0),
    localList: JSON.parse((window as any).localStorage.getItem('localList')) || []
  },
  mutations: {
    saveLocalList (state, data) {
      state.id++
      state.localList.push(data as never)
      window.localStorage.setItem('localList', JSON.stringify(state.localList))
      window.localStorage.setItem('localId', JSON.stringify(state.id))
    },
    deleteLocalList (state, id) {
      state.localList = state.localList.filter((v: any) => v.id !== id)
      window.localStorage.removeItem('localList')
      window.localStorage.setItem('localList', JSON.stringify(state.localList))
    }
  },
  actions: {
  },
  modules: {
  }
})
