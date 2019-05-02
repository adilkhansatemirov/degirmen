<template>
  <div id="new-order">
    <v-menu-nav></v-menu-nav>

    <div id="soups"></div>
    <v-soups @addToBasket="addToBasket($event)"></v-soups>

    <div id="mainDishes"></div>
    <v-main-dishes @addToBasket="addToBasket($event)"></v-main-dishes>

    <div id="breakfasts"></div>
    <v-breakfasts @addToBasket="addToBasket($event)"></v-breakfasts>

    <div id="salats"></div>
    <v-salats @addToBasket="addToBasket($event)"></v-salats>

    <div id="garnirs"></div>
    <v-garnirs @addToBasket="addToBasket($event)"></v-garnirs>

    <div id="shashlyks"></div>
    <v-shashlyks @addToBasket="addToBasket($event)"></v-shashlyks>

    <div id="pizzas"></div>
    <v-pizzas @addToBasket="addToBasket($event)"></v-pizzas>

    <div id="tandyrs"></div>
    <v-tandyrs @addToBasket="addToBasket($event)"></v-tandyrs>

    <v-basket-icon ref="basket" @openBasket="openBasket()" :basket="basket"></v-basket-icon>
    <v-basket-modal-box @closeBasket="closeBasket()" :basket="basket" v-if="basketOpen"></v-basket-modal-box>
  </div>
</template>

<script>
import MenuNav from "./MenuNav.vue";
import SoupsSection from "./Sections/SoupsSection.vue";
import MainDishesSection from "./Sections/MainDishesSection.vue";
import BreakfastsSection from "./Sections/BreakfastsSection.vue";
import SalatsSection from "./Sections/SalatsSection.vue";
import GarnirsSection from "./Sections/GarnirsSection.vue";
import ShashlyksSection from "./Sections/ShashlyksSection.vue";
import PizzasSection from "./Sections/PizzasSection.vue";
import TandyrsSection from "./Sections/TandyrsSection.vue";

import BasketIcon from "./BasketButton.vue"; 
import BasketModalBox from "./BasketModalBox.vue";

export default {
  components: {
    "v-menu-nav": MenuNav,
    "v-soups": SoupsSection,
    "v-main-dishes": MainDishesSection,
    "v-breakfasts": BreakfastsSection,
    "v-salats": SalatsSection,
    "v-garnirs": GarnirsSection,
    "v-shashlyks": ShashlyksSection,
    "v-pizzas": PizzasSection,
    "v-tandyrs": TandyrsSection,

    "v-basket-icon": BasketIcon,
    "v-basket-modal-box": BasketModalBox
  },
  data() {
    return {
      basket: [],
      basketOpen: false
    };
  },
  methods: {
    addToBasket: function(soupToGet) {
      const orderedDish = {
        dish: soupToGet,
        amount: 1
      };
      let putInBasket = true;
      for (let i = 0; i < this.basket.length; i++) {
        if (this.basket[i].dish.name === orderedDish.dish.name) {
          this.basket[i].amount++;
          putInBasket = false;
          break;
        }
      }
      if (putInBasket) {
        this.basket.push(orderedDish);
      }
      this.$refs.basket.spinBasket();
    },
    openBasket() {
      this.basketOpen = true;
    },
    closeBasket: function() {
      this.basketOpen = false;
    }
  }
};
</script>

<style scoped>
#new-order {
  overflow: hidden;
  padding-bottom: 4rem;
}
</style>

