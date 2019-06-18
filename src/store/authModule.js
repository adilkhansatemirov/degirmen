import firebase from 'firebase/app'
import db from '../firebase/firebase-init'

export default {
  state: {
    user: null,
    isAuthentificated: false
  },
  mutations: {
    LOGIN_SUCCESS: (state, user) => {
      state.user = user
      state.isAuthentificated = true
    },
    LOGOUT_SUCCESS: state => {
      state.user = null
      state.isAuthentificated = false
    }
  },
  actions: {
    login: (context, uid) => {
      if (uid) {
        db.collection('users')
          .doc(uid)
          .get()
          .then(doc => {
            context.commit('LOGIN_SUCCESS', doc.data())
          })
      }
    },
    logout: (context, vm) => {
      firebase
        .auth()
        .signOut()
        .then(() => {
          context.commit('LOGOUT_SUCCESS')
          vm.$router.push('/login')
        })
    }
  },
  getters: {
    getCurrentUser: state => {
      return state.user ? state.user : ''
    }
  }
}
