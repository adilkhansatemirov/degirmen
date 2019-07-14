<template>
   <div id="new-order">
      <button class="scroll up" @click="scroll(-300)">
         <font-awesome-icon icon="chevron-up"></font-awesome-icon>
      </button>
      <button class="scroll down" @click="scroll(300)">
         <font-awesome-icon icon="chevron-down"></font-awesome-icon>
      </button>
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

      <div id="coockies"></div>
      <v-coockies @addToBasket="addToBasket($event)"></v-coockies>

      <div id="bakerys"></div>
      <v-bakerys @addToBasket="addToBasket($event)"></v-bakerys>

      <div id="breads"></div>
      <v-breads @addToBasket="addToBasket($event)"></v-breads>

      <div id="pies"></div>
      <v-pies @addToBasket="addToBasket($event)"></v-pies>

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

      <div id="others"></div>
      <v-others @addToBasket="addToBasket($event)"></v-others>

      <v-basket-button ref="basket"></v-basket-button>
      <v-basket-modal-box
         @addToBasket="addToBasket($event)"
         v-if="showBasket"
      ></v-basket-modal-box>
   </div>
</template>

<script>
import db from "../../firebase/firebase-init";

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
import CookiesSection from "./Sections/CookiesSection.vue";
import BakerysSection from "./Sections/BakerysSection.vue";
import BreadsSection from "./Sections/BreadsSection.vue";
import PiesSection from "./Sections/PiesSection.vue";
import OthersSection from "./Sections/OthersSection.vue";

import BasketButton from "./BasketComponents/BasketButton.vue";
import BasketModalBox from "./BasketComponents/BasketModalBox.vue";

import EventBus from "../../eventBus";

import jump from "jump.js";

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
      "v-coockies": CookiesSection,
      "v-bakerys": BakerysSection,
      "v-breads": BreadsSection,
      "v-pies": PiesSection,
      "v-others": OthersSection,

      "v-basket-button": BasketButton,
      "v-basket-modal-box": BasketModalBox
   },
   computed: {
      showBasket() {
         return this.$store.state.basket.showBasket;
      },
      basket() {
         return this.$store.state.basket.basket;
      }
   },
   methods: {
      addToBasket: function(dish) {
         this.$store.dispatch("addToBasket", dish);
         this.$refs.basket.spinBasket();
      },
      openBasket() {
         this.$store.dispatch("openBasket");
      },
      closeBasket: function() {
         this.$store.dispatch("closeBasket");
      },
      newOrder: function() {
         return Object.keys(this.$route.params).length === 0;
      },
      scroll: function(position) {
         jump(position, {
            duration: 300
         });
      }
   },
   created() {
      this.$store.dispatch("closeBasket");
      this.$store.dispatch("getDishes");
      //JUST CHECK IF OBJECT THERE ARE PARAMS IS ROUTE
      if (!this.newOrder()) {
         this.$store.dispatch("getDishesByOrderId", this.$route.params.orderId);
      }
   }
};
</script>

<style scoped>
#new-order {
   overflow: hidden;
   padding-bottom: 4rem;
}
.scroll {
   position: fixed;
   right: 0.5rem;
   width: 4rem;
   height: 4rem;
   font-size: 2rem;
   border-radius: 50%;
   background: rgb(255, 220, 220);
   color: rgb(100, 41, 41);
   border: 2px solid rgb(100, 41, 41);
}
.up {
   top: 5rem;
}
.down {
   bottom: 9rem;
}
@media (max-width: 800px) {
   .scroll {
      display: none;
   }
}
</style>

