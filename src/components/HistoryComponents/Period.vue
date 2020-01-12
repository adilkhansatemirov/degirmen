<template>
  <div class="container">
    <h4>
      <v-loading v-if="loading"></v-loading>
      {{ routePosition }}
    </h4>

    <div class="Period__dishes-statistics" v-if="adminMode">
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
      <v-dishes-group
        :dishes="garnirs"
        :sectionName="'Гарниры'"
        :portionStand="'Порция'"
      ></v-dishes-group>

      <!-- SALATS -->
      <v-dishes-group
        :dishes="salats"
        :sectionName="'Салаты'"
        :portionSmall="'Половина'"
        :portionStand="'Порция'"
      ></v-dishes-group>

      <!-- SHASHLYKS -->
      <v-dishes-group
        :dishes="shashlyks"
        :sectionName="'Шашлыки'"
        :portionStand="'Порция'"
      ></v-dishes-group>

      <!-- BREAKFASTS -->
      <v-dishes-group
        :dishes="breakfasts"
        :sectionName="'Завтраки'"
        :portionStand="'Порция'"
      ></v-dishes-group>

      <!-- TANDYRS -->
      <v-dishes-group
        :dishes="tandyrs"
        :sectionName="'Тандыр меню'"
        :portionStand="'Порция'"
      ></v-dishes-group>

      <!-- CAKES -->
      <v-dishes-group
        :dishes="cakes"
        :sectionName="'Пирожные'"
        :portionSmall="'200гр'"
        :portionStand="'500гр'"
      ></v-dishes-group>

      <!-- BAKLAVAS -->
      <v-dishes-group
        :dishes="baklavas"
        :sectionName="'Баклава'"
        :portionStand="'Порция'"
      ></v-dishes-group>

      <!-- COOCKIES -->
      <v-dishes-group
        :dishes="coockies"
        :sectionName="'Печенье'"
        :portionStand="'Киллограм'"
      ></v-dishes-group>

      <!-- BREADS -->
      <v-dishes-group
        :dishes="breads"
        :sectionName="'Хлеб'"
        :portionStand="'Штука'"
      ></v-dishes-group>

      <!-- BAKERYS -->
      <v-dishes-group
        :dishes="bakerys"
        :sectionName="'Выпечка'"
        :portionStand="'Штука'"
      ></v-dishes-group>

      <!-- PIES -->
      <v-dishes-group
        :dishes="pies"
        :sectionName="'Торты'"
        :portionStand="'Киллограм'"
      ></v-dishes-group>

      <!-- ICECREAMS -->
      <v-dishes-group
        :dishes="iceCreams"
        :sectionName="'Мороженое'"
        :portionStand="'Порция'"
      ></v-dishes-group>

      <!-- COCKTAILS -->
      <v-dishes-group
        :dishes="cocktails"
        :sectionName="'Коктейли'"
        :portionStand="'Порция'"
      ></v-dishes-group>

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

      <!-- OTHERS -->
      <v-dishes-group
        :dishes="others"
        :sectionName="'Другое'"
        :portionSmall="'Большая'"
        :portionStand="'Маленькая'"
      ></v-dishes-group>

      <!-- MONEY STATISTICS -->
      <div class="total-money-list">
        <p>Общая сумма с блюд: {{ counterMoney }}</p>
        <p>Сумма сделанных скидок: {{ discountMoney }}</p>
        <p>Деньги за доставку: {{ deliveryMoney }}</p>
        <p>Обслуживание: {{ waitersTotal }}</p>
        <p>
          В кассе:
          {{ counterMoney - discountMoney + deliveryMoney + waitersTotal }}
        </p>
      </div>

      <!-- WAITER'S MONEY -->
      <ul class="waiters-list">
        <li class="waiter-item">
          <p class="waiter-name">Имя</p>
          <p class="waiter-counter">Заказов</p>
          <p class="waiter-counter">Проценты</p>
        </li>
        <li
          class="waiter-item"
          v-for="waiter in waitersStats"
          :key="waiter.key"
        >
          <p class="waiter-name">{{ waiter.name }}</p>
          <p class="waiter-counter">{{ waiter.counterOrders }}</p>
          <p class="waiter-counter">{{ waiter.counterMoney }}</p>
        </li>
      </ul>
    </div>
    <div v-else>
      Извините, информация недоступна. Обращаться к администрации
    </div>
  </div>
</template>

<script>
import db from '../../firebase/firebase-init'
import DishesGroup from './DishesGroup'
import Loading from '../Shared/Loading'

export default {
  components: {
    'v-dishes-group': DishesGroup,
    'v-loading': Loading
  },
  computed: {
    adminMode() {
      if (this.$store.state.auth.user) {
        return this.$store.state.auth.user.status !== 'Официант'
      } else return false
    }
  },
  data() {
    return {
      counterMoney: 0,
      deliveryMoney: 0,
      discountMoney: 0,
      waitersTotal: 0,
      waitersStats: [],
      baklavas: [],
      breakfasts: [],
      cakes: [],
      bakerys: [],
      pies: [],
      coockies: [],
      breads: [],
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
      others: [],
      routePosition: null,
      loading: false
    }
  },
  created() {
    console.log(this.adminMode)
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      const capitalize = string => {
        return string.charAt(0).toUpperCase() + string.slice(1)
      }
      let docName = capitalize(to.path.split('/')[2])

      vm.routePosition = to.name

      const self = vm
      vm.$nextTick(() => {
        self.loading = true
      })

      db.collection('history')
        .doc(docName)
        .get()
        .then(doc => {
          function compare(a, b) {
            if (a.name < b.name) return -1
            if (a.name > b.name) return 1
            return 0
          }
          vm.counterMoney = doc.data().counterMoney
          vm.deliveryMoney = doc.data().deliveryMoney
          vm.discountMoney = doc.data().discountMoney
          vm.waitersStats = doc.data().waitersStats

          vm.baklavas = doc.data().dishes.baklavas
          vm.coockies = doc.data().dishes.coockies
          vm.pies = doc.data().dishes.pies
          vm.bakerys = doc.data().dishes.bakerys
          vm.breads = doc.data().dishes.breads
          vm.breakfasts = doc.data().dishes.breakfasts
          vm.cakes = doc.data().dishes.cakes
          vm.cocktails = doc.data().dishes.cocktails
          vm.doners = doc.data().dishes.doners
          vm.drinks = doc.data().dishes.drinks
          vm.garnirs = doc.data().dishes.garnirs
          vm.hotDrinks = doc.data().dishes.hotDrinks
          vm.iceCreams = doc.data().dishes.iceCreams
          vm.mainDishes = doc.data().dishes.mainDishes
          vm.pizzas = doc.data().dishes.pizzas
          vm.salats = doc.data().dishes.salats
          vm.shashlyks = doc.data().dishes.shashlyks
          vm.soups = doc.data().dishes.soups
          vm.tandyrs = doc.data().dishes.tandyrs
          vm.others = doc.data().dishes.others

          vm.baklavas.sort(compare)
          vm.breakfasts.sort(compare)
          vm.cakes.sort(compare)
          vm.cocktails.sort(compare)
          vm.doners.sort(compare)
          vm.breads.sort(compare)
          vm.coockies.sort(compare)
          vm.bakerys.sort(compare)
          vm.pies.sort(compare)
          vm.drinks.sort(compare)
          vm.garnirs.sort(compare)
          vm.hotDrinks.sort(compare)
          vm.iceCreams.sort(compare)
          vm.mainDishes.sort(compare)
          vm.pizzas.sort(compare)
          vm.salats.sort(compare)
          vm.shashlyks.sort(compare)
          vm.soups.sort(compare)
          vm.tandyrs.sort(compare)
          vm.others.sort(compare)

          vm.loading = false

          vm.waitersTotal = 0
          vm.waitersStats.forEach(waiter => {
            vm.waitersTotal += waiter.counterMoney * 2
          })
        })
    })
  }
}
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
  justify-content: space-around;
  font-size: 1.2rem;
}
.total-money-list p {
  margin-bottom: 0.5rem;
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
