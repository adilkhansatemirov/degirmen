import Vue from "vue";
import Vuex from "vuex";

// Modules
import auth from "./auth";
import basket from "./basket";
import waiters from "./waiters";
import dishes from "./dishes";
import orders from "./orders";
import updateDishesModule from "./updateDishesModule";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth: auth,
    basket: basket,
    waiters: waiters,
    dishes: dishes,
    orders: orders,
    updateDishes: updateDishesModule
  }
});
