import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import authModule from './authModule'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth: authModule
  }
})
