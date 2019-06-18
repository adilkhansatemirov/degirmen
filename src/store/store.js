import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import authModule from './authModule'
import basketModule from './basketModule'
import waitersModule from './waitersModule'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth: authModule,
    basket: basketModule,
    waiters: waitersModule
  }
})
