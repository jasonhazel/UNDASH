import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import store from './store'
import router from './router'

import vuetify from './plugins/vuetify'

import axios from 'axios'
axios.defaults.baseURL = '/plugins/undash/';

import './app.scss'

Vue.config.productionTip = false

// filters
import './filters/file_size'
import './filters/threshold'
import './filters/chunk'

// TODO
Vue.mixin({ methods: { TODO() { alert('TODO') }, } })

import ProcessorsPanel from './panels/processors'
Vue.use(ProcessorsPanel, store)

import UpsPanel from './panels/ups'
Vue.use(UpsPanel, store)

import MemoryPanel from './panels/memory'
Vue.use(MemoryPanel, store)

import DisksPanel from './panels/disks'
Vue.use(DisksPanel, store)

import DockerPanel from './panels/docker'
Vue.use(DockerPanel, store)


new Vue({
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
