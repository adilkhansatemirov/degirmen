<template>
  <div>
    <section class="section-meals">
      <div class="container pale-red">
        <div class="section__title color-dark-red">ПИРОЖЕНЫЕ</div>
        <ul class="meal-group">
          <li v-for="cake in cakes" :key="cake.key" class="meal-item color-dark-red">
            <h4>{{cake.name}}</h4>
            <div class="portion-size-choise-box">
              <a
                v-if="cake.costSmall != 0"
                class="portion__option"
                @click="addToBasket(cake, cake.costSmall)"
              >
                <div class="portion__size-price">
                  <div class="portion__size">{{cake.portionSmall}}</div>
                  <div class="portion__price">{{cake.costSmall}}₸</div>
                </div>
                <div class="basket-icon">
                  <font-awesome-icon icon="shopping-basket"/>
                </div>
              </a>
              <a class="portion__option" @click="addToBasket(cake, cake.costStand)">
                <div class="portion__size-price">
                  <div class="portion__size">{{cake.portionStand}}</div>
                  <div class="portion__price">{{cake.costStand}}₸</div>
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
      cakes: []
    };
  },
  methods: {
    addToBasket: function(cake, cost) {
      //set name and cost to work with
      const cakeToSend = { ...cake };
      cakeToSend.nameDefault = cake.name;
      if (cakeToSend.costSmall != 0) {
        if (cost == cake.costSmall) {
          cakeToSend.name += ` (${cakeToSend.portionSmall.toLowerCase()})`;
          cakeToSend.cost = cakeToSend.costSmall;
        } else {
          cakeToSend.name += ` (${cakeToSend.portionStand.toLowerCase()})`;
          cakeToSend.cost = cakeToSend.costStand;
        }
      } else {
        cakeToSend.cost = cakeToSend.costStand;
      }
      this.$emit("addToBasket", cakeToSend);
    }
  },
  created() {
    db.collection("dishes")
      .doc("cakes")
      .get()
      .then(doc => {
        const cakes = doc.data().cakes;
        for (let i = 0; i < cakes.length; i++) {
          const cakeItem = {
            key: `cake${i}`,
            type: "cakes",
            name: cakes[i].name,
            portionSmall: cakes[i].portionSmall,
            portionStand: cakes[i].portionStand,
            costSmall: cakes[i].costSmall,
            costStand: cakes[i].costStand
          };
          this.cakes.push(cakeItem);
        }
      });
  }
};
</script>

<style scoped>
</style>


