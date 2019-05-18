<template>
  <div id="new-order">
    <v-menu-nav></v-menu-nav>

    <div id="soups"></div>
    <v-soups @addToBasket="addToBasket($event)"></v-soups>

    <div id="mainDishes"></div>
    <v-main-dishes @addToBasket="addToBasket($event)"></v-main-dishes>

    <div id="doners"></div>
    <v-doners @addToBasket="addToBasket($event)"></v-doners>

    <div id="pizzas"></div>
    <v-pizzas @addToBasket="addToBasket($event)"></v-pizzas>

    <div id="garnirs"></div>
    <v-garnirs @addToBasket="addToBasket($event)"></v-garnirs>

    <div id="salats"></div>
    <v-salats @addToBasket="addToBasket($event)"></v-salats>

    <div id="shashlyks"></div>
    <v-shashlyks @addToBasket="addToBasket($event)"></v-shashlyks>

    <div id="breakfasts"></div>
    <v-breakfasts @addToBasket="addToBasket($event)"></v-breakfasts>

    <div id="tandyrs"></div>
    <v-tandyrs @addToBasket="addToBasket($event)"></v-tandyrs>

    <div id="cakes"></div>
    <v-cakes @addToBasket="addToBasket($event)"></v-cakes>

    <div id="baklavas"></div>
    <v-baklavas @addToBasket="addToBasket($event)"></v-baklavas>

    <div id="iceCreams"></div>
    <v-ice-creams @addToBasket="addToBasket($event)"></v-ice-creams>

    <div id="hotDrinks"></div>
    <v-hot-drinks @addToBasket="addToBasket($event)"></v-hot-drinks>

    <div id="cocktails"></div>
    <v-cocktails @addToBasket="addToBasket($event)"></v-cocktails>

    <div id="drinks"></div>
    <v-drinks @addToBasket="addToBasket($event)"></v-drinks>

    <v-basket-icon ref="basket" @openBasket="openBasket()" :basket="basket"></v-basket-icon>
    <v-basket-modal-box
      @closeBasket="closeBasket()"
      @addToBasket="addToBasket($event)"
      :basket="basket"
      :secondBasket="secondBasket"
      v-if="basketOpen"
    ></v-basket-modal-box>
  </div>
</template>

<script>
import db from "../firebase/firebase-init";

import MenuNav from "./MenuNav.vue";
import SoupsSection from "./Sections/SoupsSection.vue";
import MainDishesSection from "./Sections/MainDishesSection.vue";
import DonersSection from "./Sections/DonersSection.vue";
import BreakfastsSection from "./Sections/BreakfastsSection.vue";
import SalatsSection from "./Sections/SalatsSection.vue";
import GarnirsSection from "./Sections/GarnirsSection.vue";
import ShashlyksSection from "./Sections/ShashlyksSection.vue";
import PizzasSection from "./Sections/PizzasSection.vue";
import TandyrsSection from "./Sections/TandyrsSection.vue";
import HotDrinksSection from "./Sections/HotDrinksSection.vue";
import CocktailsSection from "./Sections/CocktailsSection.vue";
import DrinksSection from "./Sections/DrinksSection.vue";
import CakesSection from "./Sections/CakesSection.vue";
import BaklavasSection from "./Sections/BaklavasSection.vue";
import IceCreamsSection from "./Sections/IceCreamsSection.vue";

import BasketIcon from "./BasketButton.vue";
import BasketModalBox from "./BasketModalBox.vue";

import EventBus from "../eventBus";

export default {
  components: {
    "v-menu-nav": MenuNav,
    "v-soups": SoupsSection,
    "v-main-dishes": MainDishesSection,
    "v-doners": DonersSection,
    "v-breakfasts": BreakfastsSection,
    "v-salats": SalatsSection,
    "v-garnirs": GarnirsSection,
    "v-shashlyks": ShashlyksSection,
    "v-pizzas": PizzasSection,
    "v-tandyrs": TandyrsSection,
    "v-hot-drinks": HotDrinksSection,
    "v-cocktails": CocktailsSection,
    "v-drinks": DrinksSection,
    "v-cakes": CakesSection,
    "v-baklavas": BaklavasSection,
    "v-ice-creams": IceCreamsSection,

    "v-basket-icon": BasketIcon,
    "v-basket-modal-box": BasketModalBox
  },
  data() {
    return {
      basket: [],
      secondBasket: [],
      basketOpen: false
    };
  },
  methods: {
    addToBasket: function(dish) {
      const orderedDish = {
        dish,
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
      if (Object.keys(this.$route.params).length !== 0) {
        this.addToSecondBasket(dish);
      }
      this.$refs.basket.spinBasket();
    },
    addToSecondBasket: function(dish) {
      const orderedDish = {
        dish,
        amount: 1
      };
      let putInBasket = true;
      for (let i = 0; i < this.secondBasket.length; i++) {
        if (this.secondBasket[i].dish.name === orderedDish.dish.name) {
          this.secondBasket[i].amount++;
          putInBasket = false;
          break;
        }
      }
      if (putInBasket) {
        this.secondBasket.push(orderedDish);
      }
    },
    openBasket() {
      this.basketOpen = true;
    },
    closeBasket: function() {
      this.basketOpen = false;
    },
    newOrder: function() {
      return Object.keys(this.$route.params).length === 0;
    }
  },
  created() {
    //JUST CHECK IF OBJECT THERE ARE PARAMS IS ROUTE
    if (!this.newOrder()) {
      db.collection("currentOrders")
        .doc(this.$route.params.orderId)
        .get()
        .then(doc => {
          this.basket = doc.data().dishes;
        });
    }
    EventBus.$on("openMenu", () => {
      if (!this.newOrder()) {
        this.basket = [];
        this.secondBasket = [];
      }
    });
  },
  beforeDestroy() {
    EventBus.$off("openMenu");
  }
};
</script>

<style scoped>
#new-order {
  overflow: hidden;
  padding-bottom: 4rem;
}
</style>

