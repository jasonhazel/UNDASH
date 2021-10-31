import store from './store'
import panel from './panel.vue'

const registration = {
  type: 'Panel',
  name: 'ProcessorsPanel',
  component: 'ProcessorsPanel',
}

export default {
  install(Vue, vuex) {
    if (!vuex) throw new Error('Vuex store required.')
    vuex.dispatch('registerPlugin', registration)

    vuex.registerModule(['PROCESSORS'], store)    
    Vue.component('ProcessorsPanel', panel)
    
    vuex.dispatch('PROCESSORS/connect')
  }
}