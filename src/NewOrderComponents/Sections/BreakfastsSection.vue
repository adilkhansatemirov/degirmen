<template>
  <div>
    <section class="section-meals">
      <div class="container pale-red">
        <div class="section__title color-dark-red">ЗАВТРАКИ</div>
        <ul class="meal-group">
          <li v-for="breakfast in breakfasts" :key="breakfast.key" class="meal-item color-dark-red">
            <h4>{{breakfast.name}}</h4>
            <div class="portion-size-choise-box">
              <a
                v-if="breakfast.costSmall != 0"
                class="portion__option"
                @click="addToBasket(breakfast, breakfast.costSmall)"
              >
                <div class="portion__size-price">
                  <div class="portion__size">{{breakfast.portionSmall}}</div>
                  <div class="portion__price">{{breakfast.costSmall}}₸</div>
                </div>
                <div class="basket-icon">
                  <font-awesome-icon icon="shopping-basket"/>
                </div>
              </a>
              <a class="portion__option" @click="addToBasket(breakfast, breakfast.costStand)">
                <div class="portion__size-price">
                  <div class="portion__size">{{breakfast.portionStand}}</div>
                  <div class="portion__price">{{breakfast.costStand}}₸</div>
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
      breakfasts: []
    };
  },
  methods: {
    addToBasket: function(breakfast, cost) {
      //set name and cost to work with
      const breakfastToSend = { ...breakfast };
      breakfastToSend.nameDefault = breakfast.name;
      if (breakfastToSend.costSmall != 0) {
        if (cost == breakfast.costSmall) {
          breakfastToSend.name += ` (${breakfastToSend.portionSmall.toLowerCase()})`;
          breakfastToSend.cost = breakfastToSend.costSmall;
        } else {
          breakfastToSend.name += ` (${breakfastToSend.portionStand.toLowerCase()})`;
          breakfastToSend.cost = breakfastToSend.costStand;
        }
      } else {
        breakfastToSend.cost = breakfastToSend.costStand;
      }
      this.$emit("addToBasket", breakfastToSend);
    }
  },
  created() {
    db.collection("dishes")
      .doc("breakfasts")
      .get()
      .then(doc => {
        const breakfasts = doc.data().breakfasts;
        for (let i = 0; i < breakfasts.length; i++) {
          const breakfastItem = {
            key: `breakfast${i}`,
            type: "breakfasts",
            name: breakfasts[i].name,
            portionSmall: breakfasts[i].portionSmall,
            portionStand: breakfasts[i].portionStand,
            costSmall: breakfasts[i].costSmall,
            costStand: breakfasts[i].costStand
          };
          this.breakfasts.push(breakfastItem);
        }
      });
  }
};
</script>

<style scoped>
</style>


