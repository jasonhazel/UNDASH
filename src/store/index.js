import Vue from 'vue'
import Vuex from 'vuex'

import vars from './subscriptions/vars'

import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({ 
  storage: window.localStorage,
  reducer: (state) => ({ options: state.options })
})

Vue.use(Vuex)

var store = new Vuex.Store({
  plugins: [vuexLocal.plugin],
  modules: {
    VARS: vars,
  },
  state: {
    undash: { version: 'alpha' }, 
    plugins: [],
    name: 'UNRAID',
    version: null,
    options: {
      dark: false,
      opened: { }
    },
    vms: []
  },
  mutations: {
    SET_DARK(state, value) {
      state.options.dark = !!value
    },
    REGISTER_PLUGIN(state, value) {
      let existing = state.plugins.find(p => p.name == value.name)
      if (!existing) {
        state.plugins.push(value)
      }
    },
    TOGGLE_OPENED(state, panel) {
      state.options.opened[panel] = !state.options.opened[panel]
    },
    SET_OPENED(state, { panel, value }) {
      Vue.set(state.options.opened, panel, value)
    }
  },
  actions: {
    setDark({ commit }, value) {
      commit('SET_DARK', value)
    },
    registerPlugin({ commit }, value = {}) {
      commit('REGISTER_PLUGIN', value)
    },
    toggleOpened({ commit }, panel) {
      commit('TOGGLE_OPENED', panel)
    },
    setOpened({ commit }, settings) {
      commit('SET_OPENED', settings)
    }
  },
  getters: {
    undash: state => state.undash,
    // front end settings only.
    dark: state => state.options.dark,
    opened: state => state.options.opened,
    // faked below
    vms: state => state.vms,
  }
})

store.dispatch('VARS/connect')


export default store

