import store from './store'
import panel from './panel.vue'

const registration = {
  type: 'Panel',
  name: 'UpsPanel',
  component: 'UpsPanel',
}

export default {
  install(Vue, vuex) {
    if (!vuex) throw new Error('Vuex store required.')
    vuex.dispatch('registerPlugin', registration)
    
    vuex.registerModule(['UPS'], store)
    Vue.component('UpsPanel', panel)

    vuex.dispatch('UPS/connect')
  }
}