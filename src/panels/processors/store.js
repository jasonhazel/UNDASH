import NchanSubscriber from 'nchan'
import ini from 'ini'

export default {
  namespaced: true,
    state: {
    processors: { cpu: { host: 0, guest: 0 } }
  },
  mutations: {
    SET(state, value) {
      state.processors = value
    }
  },
  actions: {
    connect({ commit }) {
      let nchan = new NchanSubscriber('/sub/cpuload')
      nchan.on('error', (_, description) => { console.log('error', description) })
      nchan.on('message', (message) => { commit('SET', ini.parse(message)) })

      nchan.start()
    }
  },
  getters: {
    processors: state => state.processors
  }
}