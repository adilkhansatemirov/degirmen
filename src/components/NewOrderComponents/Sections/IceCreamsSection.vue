<template>
  <div>
    <section class="section-meals">
      <div class="container pale-red">
        <div class="section__title color-dark-red">МОРОЖЕНОЕ</div>
        <ul class="meal-group">
          <li v-for="iceCream in iceCreams" :key="iceCream.key" class="meal-item color-dark-red">
            <h4>{{iceCream.name}}</h4>
            <div class="portion-size-choise-box">
              <a
                v-if="iceCream.costSmall != 0"
                class="portion__option"
                @click="addToBasket(iceCream, iceCream.costSmall)"
              >
                <div class="portion__size-price">
                  <div class="portion__size">{{iceCream.portionSmall}}</div>
                  <div class="portion__price">{{iceCream.costSmall}}₸</div>
                </div>
                <div class="basket-icon">
                  <font-awesome-icon icon="shopping-basket"/>
                </div>
              </a>
              <a class="portion__option" @click="addToBasket(iceCream, iceCream.costStand)">
                <div class="portion__size-price">
                  <div class="portion__size">{{iceCream.portionStand}}</div>
                  <div class="portion__price">{{iceCream.costStand}}₸</div>
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
      iceCreams: []
    };
  },
  methods: {
    addToBasket: function(iceCream, cost) {
      //set name and cost to work with
      const iceCreamToSend = { ...iceCream };
      iceCreamToSend.nameDefault = iceCream.name;
      if (iceCreamToSend.costSmall != 0) {
        if (cost == iceCream.costSmall) {
          iceCreamToSend.name += ` (${iceCreamToSend.portionSmall.toLowerCase()})`;
          iceCreamToSend.cost = iceCreamToSend.costSmall;
        } else {
          iceCreamToSend.name += ` (${iceCreamToSend.portionStand.toLowerCase()})`;
          iceCreamToSend.cost = iceCreamToSend.costStand;
        }
      } else {
        iceCreamToSend.cost = iceCreamToSend.costStand;
      }
      this.$emit("addToBasket", iceCreamToSend);
    }
  },
  created() {
    db.collection("dishes")
      .doc("iceCreams")
      .get()
      .then(doc => {
        const iceCreams = doc.data().iceCreams;
        for (let i = 0; i < iceCreams.length; i++) {
          const iceCreamItem = {
            key: `iceCream${i}`,
            type: "iceCreams",
            name: iceCreams[i].name,
            portionSmall: iceCreams[i].portionSmall,
            portionStand: iceCreams[i].portionStand,
            costSmall: iceCreams[i].costSmall,
            costStand: iceCreams[i].costStand
          };
          this.iceCreams.push(iceCreamItem);
        }
      });
  }
};
</script>

<style scoped>
</style>


