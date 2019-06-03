<template>
  <div>
    <section class="section-meals">
      <div class="container pale-red">
        <div class="section__title color-dark-red">НАПИТКИ</div>
        <ul class="meal-group">
          <li v-for="drink in drinks" :key="drink.key" class="meal-item color-dark-red">
            <h4>{{drink.name}}</h4>
            <div class="portion-size-choise-box">
              <a
                v-if="drink.costSmall != 0"
                class="portion__option"
                @click="addToBasket(drink, drink.costSmall)"
              >
                <div class="portion__size-price">
                  <div class="portion__size">{{drink.portionSmall}}</div>
                  <div class="portion__price">{{drink.costSmall}}₸</div>
                </div>
                <div class="basket-icon">
                  <font-awesome-icon icon="shopping-basket"/>
                </div>
              </a>
              <a class="portion__option" @click="addToBasket(drink, drink.costStand)">
                <div class="portion__size-price">
                  <div class="portion__size">{{drink.portionStand}}</div>
                  <div class="portion__price">{{drink.costStand}}₸</div>
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
import db from "../../firebase/firebase-init";

export default {
  data() {
    return {
      drinks: []
    };
  },
  methods: {
    addToBasket: function(drink, cost) {
      console.log(drink);

      //set name and cost to work with
      const drinkToSend = { ...drink };
      drinkToSend.nameDefault = drink.name;
      if (drinkToSend.costSmall != 0) {
        if (cost == drink.costSmall) {
          drinkToSend.name += ` (${drinkToSend.portionSmall.toLowerCase()})`;
          drinkToSend.cost = drinkToSend.costSmall;
        } else {
          drinkToSend.name += ` (${drinkToSend.portionStand.toLowerCase()})`;
          drinkToSend.cost = drinkToSend.costStand;
        }
      } else {
        drinkToSend.cost = drinkToSend.costStand;
      }
      console.log(drinkToSend);
      this.$emit("addToBasket", drinkToSend);
    }
  },
  created() {
    db.collection("dishes")
      .doc("drinks")
      .get()
      .then(doc => {
        const drinks = doc.data().drinks;
        for (let i = 0; i < drinks.length; i++) {
          const drinkItem = {
            key: `drink${i}`,
            type: "drinks",
            name: drinks[i].name,
            portionSmall: drinks[i].portionSmall,
            portionStand: drinks[i].portionStand,
            costSmall: drinks[i].costSmall,
            costStand: drinks[i].costStand
          };
          this.drinks.push(drinkItem);
        }
      });
  }
};
</script>

<style scoped>
</style>


