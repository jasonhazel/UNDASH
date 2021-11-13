import NchanSubscriber from 'nchan'

export default {
  namespaced: true,
  state: {
    disks: {
      parity: [],
      data: [],
      cache: []
    },
  },
  mutations: {
    SET(state, value) {
      state.disks = {
        parity: value.parity.filter(d => d.id),
        data: value.data.filter(d => d.id),
        cache: value.cache
      }
    }
  },
  actions: {
    connect({ commit }) {
      let nchan = new NchanSubscriber('/sub/undash-disks')
      nchan.on('error', (_, description) => { console.log('error', description) })

      nchan.on('message', (message) => {
        commit('SET', JSON.parse(message))
      })

      nchan.start()
    }
  },
  getters: {
    disks: state => state.disks,
    parity: state => state.disks.parity,
    data: state => state.disks.data,
    cache: state => state.disks.cache
  }
}