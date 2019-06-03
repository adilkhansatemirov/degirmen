<template>
  <div class="container">
    <h4>
      <v-loading v-if="loading"></v-loading>
      {{routePosition}}
    </h4>

    <!-- SOUPS -->
    <v-dishes-group
      :dishes="soups"
      :sectionName="'Супы'"
      :portionSmall="'Половина'"
      :portionStand="'Порция'"
    ></v-dishes-group>

    <!-- MAIN DISHES -->
    <v-dishes-group
      :dishes="mainDishes"
      :sectionName="'Горячие блюда'"
      :portionSmall="'Половина'"
      :portionStand="'Порция'"
    ></v-dishes-group>

    <!-- DONERS -->
    <v-dishes-group
      :dishes="doners"
      :sectionName="'Донер меню'"
      :portionSmall="'Стандарт'"
      :portionStand="'Полтора'"
    ></v-dishes-group>

    <!-- PIZZAS -->
    <v-dishes-group
      :dishes="pizzas"
      :sectionName="'Пиццы'"
      :portionSmall="'24см'"
      :portionStand="'38см'"
    ></v-dishes-group>

    <!-- GARNIRS -->
    <v-dishes-group :dishes="garnirs" :sectionName="'Гарниры'" :portionStand="'Порция'"></v-dishes-group>

    <!-- SALATS -->
    <v-dishes-group
      :dishes="salats"
      :sectionName="'Салаты'"
      :portionSmall="'Половина'"
      :portionStand="'Порция'"
    ></v-dishes-group>

    <!-- SHASHLYKS -->
    <v-dishes-group :dishes="shashlyks" :sectionName="'Шашлыки'" :portionStand="'Порция'"></v-dishes-group>

    <!-- BREAKFASTS -->
    <v-dishes-group :dishes="breakfasts" :sectionName="'Завтраки'" :portionStand="'Порция'"></v-dishes-group>

    <!-- TANDYRS -->
    <v-dishes-group :dishes="tandyrs" :sectionName="'Тандыр меню'" :portionStand="'Порция'"></v-dishes-group>

    <!-- CAKES -->
    <v-dishes-group
      :dishes="cakes"
      :sectionName="'Пирожные'"
      :portionSmall="'200гр'"
      :portionStand="'500гр'"
    ></v-dishes-group>

    <!-- BAKLAVAS -->
    <v-dishes-group :dishes="baklavas" :sectionName="'Баклава'" :portionStand="'Порция'"></v-dishes-group>

    <!-- ICECREAMS -->
    <v-dishes-group :dishes="iceCreams" :sectionName="'Мороженое'" :portionStand="'Порция'"></v-dishes-group>

    <!-- HOT DRINKS -->
    <v-dishes-group
      :dishes="hotDrinks"
      :sectionName="'Горячие напитки'"
      :portionSmall="'Чашка'"
      :portionStand="'Чайник'"
    ></v-dishes-group>

    <!-- DRINKS -->
    <v-dishes-group
      :dishes="drinks"
      :sectionName="'Напитки'"
      :portionSmall="'0.5л'"
      :portionStand="'1л'"
    ></v-dishes-group>

    <!-- MONEY STATISTICS -->
    <div class="total-money-list">
      <p>Общая сумма: {{counterMoney}}</p>
      <p>Скидка: {{discountMoney}}</p>
      <p>Доставка: {{deliveryMoney}}</p>
      <p>В кассе: {{counterMoney - discountMoney + deliveryMoney}}</p>
    </div>

    <!-- WAITER'S MONEY -->
    <ul class="waiters-list">
      <li class="waiter-item">
        <p class="waiter-name">Имя</p>
        <p class="waiter-counter">Заказов</p>
        <p class="waiter-counter">Проценты</p>
      </li>
      <li class="waiter-item" v-for="waiter in waitersStats" :key="waiter.key">
        <p class="waiter-name">{{waiter.name}}</p>
        <p class="waiter-counter">{{waiter.counterOrders}}</p>
        <p class="waiter-counter">{{waiter.counterMoney}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import db from "../firebase/firebase-init";
import DishesGroup from "./DishesGroup";
import Loading from "../Mixins/Loading";

export default {
  components: {
    "v-dishes-group": DishesGroup,
    "v-loading": Loading
  },
  data() {
    return {
      counterMoney: 0,
      deliveryMoney: 0,
      discountMoney: 0,
      waitersStats: [],
      baklavas: [],
      breakfasts: [],
      cakes: [],
      cocktails: [],
      doners: [],
      drinks: [],
      garnirs: [],
      hotDrinks: [],
      iceCreams: [],
      mainDishes: [],
      pizzas: [],
      salats: [],
      shashlyks: [],
      soups: [],
      tandyrs: [],
      routePosition: null,
      loading: false
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      const capitalize = string => {
        return string.charAt(0).toUpperCase() + string.slice(1);
      };
      let docName = capitalize(to.path.split("/")[2]);

      vm.routePosition = to.name;

      const self = vm;
      vm.$nextTick(() => {
        self.loading = true;
      });

      db.collection("history")
        .doc(docName)
        .get()
        .then(doc => {
          vm.counterMoney = doc.data().counterMoney;
          vm.deliveryMoney = doc.data().deliveryMoney;
          vm.discountMoney = doc.data().discountMoney;
          vm.waitersStats = doc.data().waitersStats;

          vm.baklavas = doc.data().dishes.baklavas;
          vm.breakfasts = doc.data().dishes.breakfasts;
          vm.cakes = doc.data().dishes.cakes;
          vm.cocktails = doc.data().dishes.cocktails;
          vm.doners = doc.data().dishes.doners;
          vm.drinks = doc.data().dishes.drinks;
          vm.garnirs = doc.data().dishes.garnirs;
          vm.hotDrinks = doc.data().dishes.hotDrinks;
          vm.iceCreams = doc.data().dishes.iceCreams;
          vm.mainDishes = doc.data().dishes.mainDishes;
          vm.pizzas = doc.data().dishes.pizzas;
          vm.salats = doc.data().dishes.salats;
          vm.shashlyks = doc.data().dishes.shashlyks;
          vm.soups = doc.data().dishes.soups;
          vm.tandyrs = doc.data().dishes.tandyrs;

          vm.loading = false;
        });
    });
  }
};
</script>

<style scoped>
.container {
  margin-bottom: 4rem;
}
h4 {
  text-align: center;
  font-size: 1.5rem;
  margin: 0.5rem 0;
  position: relative;
}
.total-money-list {
  margin-bottom: 2rem;
  text-align: right;
  display: flex;
  justify-content: space-around;
  font-size: 1.2rem;
}
.waiter-item {
  display: flex;
}
.waiter-name {
  flex: 3;
}
.waiter-counter {
  text-align: center;
  flex: 1;
}
.waiters-list {
  padding-bottom: 5rem;
}
</style>