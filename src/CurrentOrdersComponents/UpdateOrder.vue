<template>
  <div id="update-order">
    <v-menu-nav></v-menu-nav>
    <div id="soups"></div>
    
    <v-soups @addToBasket="addToBasket($event)"></v-soups>

    <div id="mainDishes"></div>
    <v-main-dishes @addToBasket="addToBasket($event)"></v-main-dishes>

    <v-basket-icon ref="basket" @openBasket="openBasket()" :basket="basket"></v-basket-icon>
    <v-basket-modal-box
      @closeBasket="closeBasket()"
      :basket="basket"
      :docToUpdate="docToUpdate"
      v-if="basketOpen"
    ></v-basket-modal-box>
  </div>
</template>

<script>
import MenuNav from "../NewOrderComponents/MenuNav.vue";
import SoupsSection from "../NewOrderComponents/Sections/SoupsSection.vue";
import MainDishesSection from "../NewOrderComponents/Sections/MainDishesSection.vue";

import BasketIcon from "../NewOrderComponents/BasketButton.vue";
import BasketModalBox from "../NewOrderComponents/BasketModalBox.vue";
import db from "../firebase/firebase-init";

export default {
  components: {
    "v-menu-nav": MenuNav,
    "v-soups": SoupsSection,
    "v-main-dishes": MainDishesSection,

    "v-basket-icon": BasketIcon,
    "v-basket-modal-box": BasketModalBox
  },
  data() {
    return {
      basket: [],
      basketOpen: false,
      docToUpdate: null
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
        if (this.basket[i].dish.name == orderedDish.dish.name) {
          this.basket[i].amount++;
          putInBasket = false;
          break;
        }
      }
      if (putInBasket) {
        this.basket.push(orderedDish);
      }
      this.$refs.basket.spinBasket();
      console.log(this.basket);
    },
    openBasket() {
      this.basketOpen = true;
    },
    closeBasket: function() {
      this.basketOpen = false;
    }
  },
  created() {
    db.collection("currentOrders")
      .doc(this.$route.params.orderId)
      .get()
      .then(doc => {
        const order = {
          id: doc.id,
          dishes: doc.data().dishes,
          time: doc.data().time,
          type: doc.data().type,
          total: doc.data().total
        };
        this.docToUpdate = doc.id;
        if (doc.data().type == "Доставка") {
          order.address = doc.data().address;
        } else if (doc.data().type == "Кафе") {
          order.waiterName = doc.data().waiterName;
          order.table = doc.data().table;
        }
        this.basket = order.dishes;
      });
  }
};
</script>

<style scoped>
#update-order {
  overflow: hidden;
  padding-bottom: 4rem;
}
</style>
