import store from './store'
import panel from './panel.vue'

const registration = {
  type: 'Panel',
  name: 'DockerPanel',
  component: 'DockerPanel',
}

export default {
  install(Vue, vuex) {
    if (!vuex) throw new Error('Vuex store required.')
    vuex.dispatch('registerPlugin', registration)

    vuex.registerModule(['DOCKER'], store)
    Vue.component('DockerPanel', panel)

    vuex.dispatch('DOCKER/connect')
  }
}