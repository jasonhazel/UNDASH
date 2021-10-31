import NchanSubscriber from 'nchan'

export default {
  namespaced: true,
  state: {
    ups: { total: 0, available: 0 }
  },
  mutations: {
    SET(state, value) {
      state.ups = value
    }
  },
  actions: {
    connect({ commit }) {
      let nchan = new NchanSubscriber('/sub/undash-ups')
      nchan.on('error', (_, description) => { console.log('error', description) })

      nchan.on('message', (message) => {
        commit('SET', JSON.parse(message))
      })
      
      nchan.start()
    }
  },
  getters: {
    ups: state => state.ups
  }
}
