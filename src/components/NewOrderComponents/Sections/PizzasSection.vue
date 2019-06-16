<template>
  <div>
    <section class="section-meals">
      <div class="container pale-red">
        <div class="section__title color-dark-red">ПИЦЦЫ</div>
        <ul class="meal-group">
          <li v-for="pizza in pizzas" :key="pizza.key" class="meal-item color-dark-red">
            <h4>{{returnName(pizza)}}</h4>
            <div class="portion-size-choise-box">
              <a class="portion__option" @click="addToBasket(pizza, pizza.costSmall)">
                <div class="portion__size-price">
                  <div class="portion__size">{{pizza.portionSmall}}</div>
                  <div class="portion__price">{{pizza.costSmall}}₸</div>
                </div>
                <div class="basket-icon">
                  <font-awesome-icon icon="shopping-basket"/>
                </div>
              </a>
              <a class="portion__option" @click="addToBasket(pizza, pizza.costStand)">
                <div class="portion__size-price">
                  <div class="portion__size">{{pizza.portionStand}}</div>
                  <div class="portion__price">{{pizza.costStand}}₸</div>
                </div>
                <div class="basket-icon">
                  <font-awesome-icon icon="shopping-basket"/>
                </div>
              </a>
            </div>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import db from "../../../firebase/firebase-init";

export default {
  data() {
    return {
      pizzas: []
    };
  },
  methods: {
    addToBasket: function(pizza, cost) {
      const pizzaToSend = { ...pizza };
      pizzaToSend.nameDefault = pizza.name;
      if (cost == pizza.costSmall) {
        pizzaToSend.name += ` (${pizzaToSend.portionSmall.toLowerCase()})`;
        pizzaToSend.cost = pizzaToSend.costSmall;
      } else {
        pizzaToSend.name += ` (${pizzaToSend.portionStand.toLowerCase()})`;
        pizzaToSend.cost = pizzaToSend.costStand;
      }
      this.$emit("addToBasket", pizzaToSend);
    },
    returnName: function(pizza) {
      let pizzaArr = pizza.name.split(" ");
      let pizzaNameResult = "";
      for (let i = 1; i < pizzaArr.length; i++) {
        pizzaNameResult += pizzaArr[i];
        pizzaNameResult += " ";
      }
      return pizzaNameResult;
    }
  },
  created() {
    db.collection("dishes")
      .doc("pizzas")
      .get()
      .then(doc => {
        const pizzas = doc.data().pizzas;
        for (let i = 0; i < pizzas.length; i++) {
          const pizzaItem = {
            key: `pizza${i}`,
            type: "pizzas",
            name: pizzas[i].name,
            portionSmall: pizzas[i].portionSmall,
            portionStand: pizzas[i].portionStand,
            costSmall: pizzas[i].costSmall,
            costStand: pizzas[i].costStand
          };
          this.pizzas.push(pizzaItem);
        }
      });
  }
};
</script>

<style scoped>
</style>


