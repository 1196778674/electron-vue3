import { createStore } from 'vuex'

const reloadList = (state: any) => {
  window.localStorage.removeItem('localList')
      window.localStorage.setItem('localList', JSON.stringify(state.localList))
}

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
      reloadList(state)
    },
    doneLocalList (state, id) {
      state.localList = state.localList.map((v: any) => {
        if(v.id === id) {
          v.type = 1
        }
        return v
      })
      reloadList(state)
    }
  },
  actions: {
  },
  modules: {
  }
})

