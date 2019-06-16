<template>
  <div>
    <section class="section-meals">
      <div class="container pale-red">
        <div class="section__title color-dark-red">ГАРНИРЫ</div>
        <ul class="meal-group">
          <li v-for="garnir in garnirs" :key="garnir.key" class="meal-item color-dark-red">
            <h4>{{garnir.name.split(" ")[1]}}</h4>
            <div class="portion-size-choise-box">
              <a
                v-if="garnir.costSmall != 0"
                class="portion__option"
                @click="addToBasket(garnir, garnir.costSmall)"
              >
                <div class="portion__size-price">
                  <div class="portion__size">{{garnir.portionSmall}}</div>
                  <div class="portion__price">{{garnir.costSmall}}₸</div>
                </div>
                <div class="basket-icon">
                  <font-awesome-icon icon="shopping-basket"/>
                </div>
              </a>
              <a class="portion__option" @click="addToBasket(garnir, garnir.costStand)">
                <div class="portion__size-price">
                  <div class="portion__size">{{garnir.portionStand}}</div>
                  <div class="portion__price">{{garnir.costStand}}₸</div>
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
      garnirs: []
    };
  },
  methods: {
    addToBasket: function(garnir, cost) {
      //set name and cost to work with
      const garnirToSend = { ...garnir };
      garnirToSend.nameDefault = garnir.name;
      if (garnirToSend.costSmall != 0) {
        if (cost == garnir.costSmall) {
          garnirToSend.name += ` (${garnirToSend.portionSmall.toLowerCase()})`;
          garnirToSend.cost = garnirToSend.costSmall;
        } else {
          garnirToSend.name += ` (${garnirToSend.portionStand.toLowerCase()})`;
          garnirToSend.cost = garnirToSend.costStand;
        }
      } else {
        garnirToSend.cost = garnirToSend.costStand;
      }
      this.$emit("addToBasket", garnirToSend);
    }
  },
  created() {
    db.collection("dishes")
      .doc("garnirs")
      .get()
      .then(doc => {
        const garnirs = doc.data().garnirs;
        for (let i = 0; i < garnirs.length; i++) {
          const garnirItem = {
            key: `garnir${i}`,
            type: "garnirs",
            name: garnirs[i].name,
            portionSmall: garnirs[i].portionSmall,
            portionStand: garnirs[i].portionStand,
            costSmall: garnirs[i].costSmall,
            costStand: garnirs[i].costStand
          };
          this.garnirs.push(garnirItem);
        }
      });
  }
};
</script>

<style scoped>
</style>


