import db from '../firebase/firebase-init'
export default {
  state: {
    dishes: {}
  },
  mutations: {
    SET_DISHES: (state, dishes) => {
      state.dishes = dishes
    }
  },
  actions: {
    getDishes: ({ commit }) => {
      let dishes = {}
      db.collection('dishes')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            dishes[doc.id] = doc.data()[doc.id]
          })
          for (const dishesSet in dishes) {
            dishes[dishesSet] = dishes[dishesSet].map((dish, i) => {
              return dishesSet === 'doners'
                ? {
                    ...dish,
                    key: `${dishesSet}${i}`,
                    type: dishesSet,
                    toppings: []
                  }
                : {
                    ...dish,
                    key: `${dishesSet}${i}`,
                    type: dishesSet
                  }
            })
          }
          commit('SET_DISHES', dishes)
        })
    }
  },
  getters: {}
}
