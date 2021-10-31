import store from './store'
import panel from './panel.vue'
import parity from './parity.vue'

const registration = {
  type: 'Panel',
  name: 'DisksPanel',
  component: 'DisksPanel',
}

export default {
  install(Vue, vuex) {
    if (!vuex) throw new Error('Vuex store required.')
    vuex.dispatch('registerPlugin', registration)

    vuex.registerModule(['DISKS'], store)
    Vue.component('DisksPanel', panel)
    Vue.component('ParityPanel', parity)

    vuex.dispatch('DISKS/connect')
  }
}