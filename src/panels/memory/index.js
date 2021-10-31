import store from './store'
import panel from './panel.vue'

const registration = {
  type: 'Panel',
  name: 'MemoryPanel',
  component: 'MemoryPanel',
}

export default {
  install(Vue, vuex) {
    if (!vuex) throw new Error('Vuex store required.')
    vuex.dispatch('registerPlugin', registration)

    vuex.registerModule(['MEMORY'], store)
    Vue.component('MemoryPanel', panel)

    vuex.dispatch('MEMORY/connect')
  }
}