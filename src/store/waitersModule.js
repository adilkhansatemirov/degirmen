import db from '../firebase/firebase-init'
export default {
  state: {
    waitersList: []
  },
  mutations: {
    FILL_WAITERS_LIST: (state, waitersList) => {
      state.waitersList = waitersList
    }
  },
  actions: {
    getWaitersList: context => {
      const waitersList = []
      db.collection('users')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            if (doc.data().status === 'Офицант') {
              waitersList.push(doc.data())
            }
          })
          context.commit('FILL_WAITERS_LIST', waitersList)
        })
    }
  },
  getters: {}
}
