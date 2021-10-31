import NchanSubscriber from 'nchan'

export default {
  namespaced: true,
  state: {
    memory: { total: 0, available: 0 }
  },
  mutations: {
    SET(state, value) {
      state.memory = value
    }
  },
  actions: {
    connect({ commit }) {
      let nchan = new NchanSubscriber('/sub/undash-memory')
      nchan.on('error', (_, description) => { console.log('error', description) })

      nchan.on('message', (message) => {
        commit('SET', JSON.parse(message))
      })


      nchan.start()
    }
  },
  getters: {
    memory: state => state.memory
  }
}
