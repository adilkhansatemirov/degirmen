<template>
  <div class="container">
    <h4>{{routePosition}}</h4>

    <!-- SOUPS -->
    <ul class="dishes-list">
      <li class="dish-item">
        <p class="dish-name">Супы</p>
        <p class="dish-counter">Половина</p>
        <p class="dish-counter">Порция</p>
        <p class="dish-counter">Сумма</p>
      </li>
      <li :class="returnClass(soup)" class="dish-item" v-for="soup in soups" :key="soup.key">
        <p class="dish-name">{{soup.name}}</p>
        <p class="dish-counter">{{soup.counterSmall}} ({{soup.costSmall}}тг)</p>
        <p class="dish-counter">{{soup.counterStand}} ({{soup.costStand}}тг)</p>
        <p class="dish-counter">{{soup.counterMoney}}</p>
      </li>
    </ul>

    <!-- MAIN DISHES -->
    <ul class="dishes-list">
      <li class="dish-item">
        <p class="dish-name">Горячие блюда</p>
        <p class="dish-counter"></p>
        <p class="dish-counter">Порция</p>
        <p class="dish-counter">Сумма</p>
      </li>
      <li :class="returnClass(dish)" v-for="dish in mainDishes1" :key="dish.key">
        <p class="dish-name">{{dish.name}}</p>
        <p class="dish-counter">
          <span v-if="dish.costSmall!=0">{{dish.counterSmall}} ({{dish.costSmall}}тг)</span>
        </p>
        <p class="dish-counter">{{dish.counterStand}} ({{dish.costStand}}тг)</p>
        <p class="dish-counter">{{dish.counterMoney}}</p>
      </li>
      <li class="dish-item">
        <p class="dish-name">Горячие блюда</p>
        <p class="dish-counter">Без гарнира</p>
        <p class="dish-counter">С гарниром</p>
        <p class="dish-counter">Сумма</p>
      </li>
      <li :class="returnClass(dish)" v-for="dish in mainDishes2" :key="dish.key">
        <p class="dish-name">{{dish.name}}</p>
        <p class="dish-counter">
          <span v-if="dish.costSmall!=0">{{dish.counterSmall}} ({{dish.costSmall}}тг)</span>
        </p>
        <p class="dish-counter">{{dish.counterStand}} ({{dish.costStand}}тг)</p>
        <p class="dish-counter">{{dish.counterMoney}}</p>
      </li>
    </ul>

    <!-- DONERS -->
    <ul class="dishes-list">
      <li class="dish-item">
        <p class="dish-name">Донеры</p>
        <p class="dish-counter">Стандарт</p>
        <p class="dish-counter">Полтора</p>
        <p class="dish-counter">Сумма</p>
      </li>
      <li :class="returnClass(doner)" class="dish-item" v-for="doner in doners" :key="doner.key">
        <p class="dish-name">{{doner.name}}</p>
        <p class="dish-counter">{{doner.counterSmall}} ({{doner.costSmall}}тг)</p>
        <p class="dish-counter">{{doner.counterStand}} ({{doner.costStand}}тг)</p>
        <p class="dish-counter">{{doner.counterMoney}}</p>
      </li>
    </ul>

    <!-- PIZZAS -->
    <ul class="dishes-list">
      <li class="dish-item">
        <p class="dish-name">Пиццы</p>
        <p class="dish-counter">30см</p>
        <p class="dish-counter">35см</p>
        <p class="dish-counter">Сумма</p>
      </li>
      <li :class="returnClass(pizza)" class="dish-item" v-for="pizza in pizzas" :key="pizza.key">
        <p class="dish-name">{{pizza.name}}</p>
        <p class="dish-counter">{{pizza.counterSmall}} ({{pizza.costSmall}}тг)</p>
        <p class="dish-counter">{{pizza.counterStand}} ({{pizza.costStand}}тг)</p>
        <p class="dish-counter">{{pizza.counterMoney}}</p>
      </li>
    </ul>

    <!-- GARNIRS -->
    <ul class="dishes-list">
      <li class="dish-item">
        <p class="dish-name">Гарниры</p>
        <p class="dish-counter"></p>
        <p class="dish-counter">Порция</p>
        <p class="dish-counter">Сумма</p>
      </li>
      <li
        :class="returnClass(garnir)"
        class="dish-item"
        v-for="garnir in garnirs"
        :key="garnir.key"
      >
        <p class="dish-name">{{garnir.name}}</p>
        <p class="dish-counter">
          <span v-if="garnir.costSmall!=0">{{garnir.counterSmall}} ({{garnir.costSmall}}тг)</span>
        </p>
        <p class="dish-counter">{{garnir.counterStand}} ({{garnir.costStand}}тг)</p>
        <p class="dish-counter">{{garnir.counterMoney}}</p>
      </li>
    </ul>

    <!-- SALATS -->
    <ul class="dishes-list">
      <li class="dish-item">
        <p class="dish-name">Салаты</p>
        <p class="dish-counter"></p>
        <p class="dish-counter">Порция</p>
        <p class="dish-counter">Сумма</p>
      </li>
      <li :class="returnClass(salat)" class="dish-item" v-for="salat in salats" :key="salat.key">
        <p class="dish-name">{{salat.name}}</p>
        <p class="dish-counter">
          <span v-if="salat.costSmall!=0">{{salat.counterSmall}} ({{salat.costSmall}}тг)</span>
        </p>
        <p class="dish-counter">{{salat.counterStand}} ({{salat.costStand}}тг)</p>
        <p class="dish-counter">{{salat.counterMoney}}</p>
      </li>
    </ul>

    <!-- SHASHLYKS -->
    <ul class="dishes-list">
      <li class="dish-item">
        <p class="dish-name">Шашлыки</p>
        <p class="dish-counter"></p>
        <p class="dish-counter">Порция</p>
        <p class="dish-counter">Сумма</p>
      </li>
      <li :class="returnClass(shashlyk)" class="dish-item" v-for="shashlyk in shashlyks" :key="shashlyk.key">
        <p class="dish-name">{{shashlyk.name}}</p>
        <p class="dish-counter">
          <span v-if="shashlyk.costSmall!=0">{{shashlyk.counterSmall}} ({{shashlyk.costSmall}}тг)</span>
        </p>
        <p class="dish-counter">{{shashlyk.counterStand}} ({{shashlyk.costStand}}тг)</p>
        <p class="dish-counter">{{shashlyk.counterMoney}}</p>
      </li>
    </ul>

    <!-- BREAKFASTS -->
    <ul class="dishes-list">
      <li class="dish-item">
        <p class="dish-name">Завтраки</p>
        <p class="dish-counter"></p>
        <p class="dish-counter">Порция</p>
        <p class="dish-counter">Сумма</p>
      </li>
      <li :class="returnClass(breakfast)" class="dish-item" v-for="breakfast in breakfasts" :key="breakfast.key">
        <p class="dish-name">{{breakfast.name}}</p>
        <p class="dish-counter">
          <span v-if="breakfast.costSmall!=0">{{breakfast.counterSmall}} ({{breakfast.costSmall}}тг)</span>
        </p>
        <p class="dish-counter">{{breakfast.counterStand}} ({{breakfast.costStand}}тг)</p>
        <p class="dish-counter">{{breakfast.counterMoney}}</p>
      </li>
    </ul>

    <!-- TANDYRS -->
    <ul class="dishes-list">
      <li class="dish-item">
        <p class="dish-name">Тандыр меню</p>
        <p class="dish-counter"></p>
        <p class="dish-counter">Порция</p>
        <p class="dish-counter">Сумма</p>
      </li>
      <li :class="returnClass(tandyr)" class="dish-item" v-for="tandyr in tandyrs" :key="tandyr.key">
        <p class="dish-name">{{tandyr.name}}</p>
        <p class="dish-counter">
          <span v-if="tandyr.costSmall!=0">{{tandyr.counterSmall}} ({{tandyr.costSmall}}тг)</span>
        </p>
        <p class="dish-counter">{{tandyr.counterStand}} ({{tandyr.costStand}}тг)</p>
        <p class="dish-counter">{{tandyr.counterMoney}}</p>
      </li>
    </ul>

    <!-- SWEETS -->
    <ul class="dishes-list">
      <li class="dish-item">
        <p class="dish-name">Сладости</p>
        <p class="dish-counter"></p>
        <p class="dish-counter">Порция</p>
        <p class="dish-counter">Сумма</p>
      </li>
      <li :class="returnClass(sweet)" class="dish-item" v-for="sweet in sweets" :key="sweet.key">
        <p class="dish-name">{{sweet.name}}</p>
        <p class="dish-counter">
          <span v-if="sweet.costSmall!=0">{{sweet.counterSmall}} ({{sweet.costSmall}}тг)</span>
        </p>
        <p class="dish-counter">{{sweet.counterStand}} ({{sweet.costStand}}тг)</p>
        <p class="dish-counter">{{sweet.counterMoney}}</p>
      </li>
    </ul>

    <!-- HOT DRINKS -->
    <ul class="dishes-list">
      <li class="dish-item">
        <p class="dish-name">Горячие напитки</p>
        <p class="dish-counter">Чашка</p>
        <p class="dish-counter">Чайник</p>
        <p class="dish-counter">Сумма</p>
      </li>
      <li :class="returnClass(hotDrink)" class="dish-item" v-for="hotDrink in hotDrinks" :key="hotDrink.key">
        <p class="dish-name">{{hotDrink.name}}</p>
        <p class="dish-counter">
          <span v-if="hotDrink.costSmall!=0">{{hotDrink.counterSmall}} ({{hotDrink.costSmall}}тг)</span>
        </p>
        <p class="dish-counter">{{hotDrink.counterStand}} ({{hotDrink.costStand}}тг)</p>
        <p class="dish-counter">{{hotDrink.counterMoney}}</p>
      </li>
    </ul>

    <!-- DRINKS -->
    <ul class="dishes-list">
      <li class="dish-item">
        <p class="dish-name">Напитки</p>
        <p class="dish-counter">0.5л</p>
        <p class="dish-counter">1л</p>
        <p class="dish-counter">Сумма</p>
      </li>
      <li :class="returnClass(drink)" class="dish-item" v-for="drink in drinks" :key="drink.key">
        <p class="dish-name">{{drink.name}}</p>
        <p class="dish-counter">
          <span v-if="drink.costSmall!=0">{{drink.counterSmall}} ({{drink.costSmall}}тг)</span>
        </p>
        <p class="dish-counter">{{drink.counterStand}} ({{drink.costStand}}тг)</p>
        <p class="dish-counter">{{drink.counterMoney}}</p>
      </li>
    </ul>

    <!-- MONEY STATISTICS -->
    <div class="total-money-list">
      <p>Общая сумма: {{counterTotal}}</p>
      <p>Скидка: {{discountMoney}}</p>
      <p>Доставка: {{deliveryMoney}}</p>
      <p>В кассе: {{counterTotal - discountMoney + deliveryMoney}}</p>
    </div>

    <!-- WAITER'S MONEY -->
    <ul class="waiters-list">
      <li class="waiter-item">
        <p class="waiter-name">Имя</p>
        <p class="waiter-counter">Заказов</p>
        <p class="waiter-counter">Проценты</p>
      </li>
      <li class="waiter-item" v-for="waiter in waitersMoney" :key="waiter.key">
        <p class="waiter-name">{{waiter.waiterName}}</p>
        <p class="waiter-counter">{{waiter.numberOfOrders}}</p>
        <p class="waiter-counter">{{waiter.counterMoney}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import db from "../firebase/firebase-init";
export default {
  data() {
    return {
      counterTotal: 0,
      deliveryMoney: 0,
      discountMoney: 0,
      waitersMoney: [],
      soups: [],
      mainDishes1: [],
      mainDishes2: [],
      doners: [],
      pizzas: [],
      garnirs: [],
      salats: [],
      shashlyks: [],
      breakfasts: [],
      tandyrs: [],
      sweets: [],
      hotDrinks: [],
      drinks: [],
      routePosition: null
    };
  },
  methods: {
    returnClass: function(dish) {
      let className = "dish-item";
      if (dish.counterSmall == 0 && dish.counterStand == 0) {
        className += " not-taken";
      }
      if (dish.name.includes("(с сыром)")) {
        className += " margin";
      }
      return className;
    }
  },
  beforeRouteEnter(to, from, next){
    console.log(to.name);
    next(vm => {
      vm.routePosition = to.name;
    });
    
  },
  created() {
    // db.collection("history")
    //   .doc("April")
    //   .get()
    //   .then(doc => {
    //     this.counterTotal = doc.data().counterTotal;
    //     this.deliveryMoney = doc.data().deliveryMoney;
    //     this.discountMoney = doc.data().discountMoney;
    //     this.waitersMoney = doc.data().waitersMoney;

    //     const dishes = doc.data().dishes;
    //     for (let i = 0; i < dishes.length; i++) {
    //       if (dishes[i].type == "Супы") {
    //         this.soups.push(dishes[i]);
    //       } else if (dishes[i].type == "Горячие блюда") {
    //         if (dishes[i].costSmall == 0) {
    //           this.mainDishes1.push(dishes[i]);
    //         } else {
    //           this.mainDishes2.push(dishes[i]);
    //         }
    //       } else if (dishes[i].type == "Донеры") {
    //         this.doners.push(dishes[i]);
    //       } else if (dishes[i].type == "Пиццы") {
    //         this.pizzas.push(dishes[i]);
    //       } else if (dishes[i].type == "Гарниры") {
    //         this.garnirs.push(dishes[i]);
    //       } else if (dishes[i].type == "Салаты") {
    //         this.salats.push(dishes[i]);
    //       } else if (dishes[i].type == "Шашлыки") {
    //         this.shashlyks.push(dishes[i]);
    //       } else if (dishes[i].type == "Завтраки") {
    //         this.breakfasts.push(dishes[i]);
    //       } else if (dishes[i].type == "Тандыр меню") {
    //         this.tandyrs.push(dishes[i]);
    //       } else if (dishes[i].type == "Сладости") {
    //         this.sweets.push(dishes[i]);
    //       } else if (dishes[i].type == "Горячие напитки") {
    //         this.hotDrinks.push(dishes[i]);
    //       } else if (dishes[i].type == "Напитки") {
    //         this.drinks.push(dishes[i]);
    //       }
    //     }
    //   });
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
}
.dishes-list {
  margin-bottom: 1.5rem;
}
.dish-item {
  display: flex;
  border-bottom: 1px solid rgba(170, 22, 22, 0.158);
  margin-bottom: 0.1rem;
}
.not-taken {
  opacity: 0.5;
}
.dish-name {
  flex: 3;
}
.dish-counter {
  text-align: right;
  flex: 1;
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
.margin{
  margin-bottom: 1rem;
}
</style>
