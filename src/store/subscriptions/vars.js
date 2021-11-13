import NchanSubscriber from 'nchan'

export default {
  namespaced: true,
  state: {
    vars: { name: 'UNRAID', version: null, uptime: null, csrf_token: null }
  },
  mutations: {
    SET(state, value) {
      state.vars = value
    }
  },
  actions: {
    connect({ commit }) {
      let nchan = new NchanSubscriber('/sub/undash-vars')
      nchan.on('error', (_, description) => { console.log('error', description) })

      nchan.on('message', (message) => {
        commit('SET', JSON.parse(message))
      })

      nchan.start()
    }
  },
  getters: {
    vars: state => state.vars,
    name: state => state.vars.name,
    version: state => state.vars.version,
    uptime: state => state.vars.uptime,
    csrf_token: state => state.vars.csrf_token
  }
}

