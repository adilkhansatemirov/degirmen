import db from "../firebase/firebase-init";
export default {
  state: {
    basket: [],
    secondBasket: [],
    showBasket: false
  },
  mutations: {
    ADD_TO_BASKET: (state, dish) => {
      const orderedDish = {
        dish,
        amount: 1
      };
      let putInBasket = true;
      for (let i = 0; i < state.basket.length; i++) {
        if (state.basket[i].dish.name === orderedDish.dish.name) {
          state.basket[i].amount++;
          putInBasket = false;
          break;
        }
      }
      if (putInBasket) {
        state.basket.push(orderedDish);
      }
      console.log(orderedDish);
    },
    ADD_TO_SECOND_BASKET: (state, dish) => {
      const orderedDish = {
        dish,
        amount: 1
      };
      let putInBasket = true;
      for (let i = 0; i < state.secondBasket.length; i++) {
        if (state.secondBasket[i].dish.name === orderedDish.dish.name) {
          state.secondBasket[i].amount++;
          putInBasket = false;
          break;
        }
      }
      if (putInBasket) {
        state.secondBasket.push(orderedDish);
      }
      console.log("second", orderedDish);
    },
    ADD_TO_BASKET_FLOAT_AMOUNT: (state, dishWithAmount) => {
      console.log(dishWithAmount);
      state.basket.push(dishWithAmount);
    },
    ADD_TO_SECOND_BASKET_FLOAT_AMOUNT: (state, dishWithAmount) => {
      console.log("second", dishWithAmount);
      state.secondBasket.push(dishWithAmount);
    },
    DECREASE_AMOUNT: (state, dish) => {
      for (let i = 0; i < state.basket.length; i++) {
        if (dish.name == state.basket[i].dish.name) {
          state.basket[i].amount--;
          if (state.basket[i].amount == 0) {
            state.basket.splice(i, 1);
            break;
          }
        }
      }
      for (let i = 0; i < state.secondBasket.length; i++) {
        if (dish.name == state.secondBasket[i].dish.name) {
          state.secondBasket[i].amount--;
          if (state.secondBasket[i].amount == 0) {
            state.secondBasket.splice(i, 1);
            break;
          }
        }
      }
    },
    OPEN_BASKET: state => {
      state.showBasket = true;
    },
    SET_BASKET: (state, basket) => {
      state.basket = basket;
    },
    SET_SECOND_BASKET: (state, basket) => {
      state.secondBasket = basket;
    },
    CLOSE_BASKET: state => {
      state.showBasket = false;
    }
  },
  actions: {
    addToBasket: (context, dish) => {
      context.commit("ADD_TO_BASKET", dish);
    },
    addToBasketFloatAmount: (context, dishWithAmount) => {
      context.commit("ADD_TO_BASKET_FLOAT_AMOUNT", dishWithAmount);
    },
    addToSecondBasket: (context, dish) => {
      console.log("fired");

      context.commit("ADD_TO_SECOND_BASKET", dish);
    },
    addToSecondBasketFloatAmount: (context, dishWithAmount) => {
      context.commit("ADD_TO_SECOND_BASKET_FLOAT_AMOUNT", dishWithAmount);
    },
    openBasket: context => {
      context.commit("OPEN_BASKET");
    },
    closeBasket: context => {
      context.commit("CLOSE_BASKET");
    },
    getDishesByOrderId: (context, orderId) => {
      db.collection("currentOrders")
        .doc(orderId)
        .get()
        .then(doc => {
          console.log(doc.data());

          context.commit("SET_BASKET", doc.data().dishes);
        });
    },
    decreaseAmount: (context, dish) => {
      context.commit("DECREASE_AMOUNT", dish);
    },
    setBasket: (context, basket) => {
      context.commit("SET_BASKET", basket);
    },
    setSecondBasket: (context, basket) => {
      context.commit("SET_SECOND_BASKET", basket);
    }
  },
  getters: {}
};
