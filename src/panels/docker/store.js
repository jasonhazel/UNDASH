import NchanSubscriber from 'nchan'
import axios from 'axios'

export default {
  namespaced: true,
  state: {
    docker: []
  },
  mutations: {
    SET(state, value) {
      state.docker = value
    }
  },
  actions: {
    connect({ commit }) {
      let nchan = new NchanSubscriber('/sub/undash-docker')
      nchan.on('error', (_, description) => { console.log('error', description) })
      nchan.on('message', (message) => { commit('SET', JSON.parse(message)) })
      nchan.start()
    },
    command({ commit }, command) {
      return axios.get('endpoints/docker.php', { params: command })
    },
  },
  getters: {
    docker: state => state.docker
  }
}
