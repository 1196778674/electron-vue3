import { createStore } from 'vuex'

const reloadList = (state: any) => {
  window.localStorage.removeItem('localList')
  window.localStorage.setItem('localList', JSON.stringify(state.localList))
  window.localStorage.setItem('localId', JSON.stringify(state.localId))
}

export default createStore({
  state: {
    localId: !!(window as any).localStorage.getItem('localId') ? JSON.parse((window as any).localStorage.getItem('localId')) : 0,
    localList: !!(window as any).localStorage.getItem('localList') && JSON.parse((window as any).localStorage.getItem('localList')) || [],
    selectList: []
  },
  mutations: {
    saveLocalList (state, data) {
      state.localId++
      state.localList.push(data as never)
      window.localStorage.setItem('localList', JSON.stringify(state.localList))
      window.localStorage.setItem('localId', JSON.stringify(state.localId))
    },
    deleteLocalList (state, id) {
      state.localList = state.localList.filter((v: any) => v.localId !== id)
      reloadList(state)
    },
    doneLocalList (state, id) {
      state.localList = state.localList.map((v: any) => {
        if(v.localId === id) {
          v.type = 1
        }
        return v
      })
      reloadList(state)
    },
    restartCase (state,id) {
      state.localList = state.localList.map((v: any) => {
        if(v.localId === id) {
          v.type = 0
        }
        return v
      })
      reloadList(state)
    },
    importObj (state, objs) {
      const obj = JSON.parse(objs);
      state.localList = obj.localList;
      state.localId = obj.localId
      reloadList(state)
    },
    selectListFun (state, list) {
      state.selectList = list
    }
  },
  actions: {
  },
  modules: {
  }
})

