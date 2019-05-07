<template>
  <div>
    <section class="section-meals">
      <div class="container pale-red">
        <div class="section__title color-dark-red">БАКЛАВА</div>
        <ul class="meal-group">
          <li v-for="baklava in baklavas" :key="baklava.key" class="meal-item color-dark-red">
            <h4>{{baklava.name}}</h4>
            <div class="portion-size-choise-box">
              <a
                v-if="baklava.costSmall != 0"
                class="portion__option"
                @click="addToBasket(baklava, baklava.costSmall)"
              >
                <div class="portion__size-price">
                  <div class="portion__size">{{baklava.portionSmall}}</div>
                  <div class="portion__price">{{baklava.costSmall}}₸</div>
                </div>
                <div class="basket-icon">
                  <font-awesome-icon icon="shopping-basket"/>
                </div>
              </a>
              <a class="portion__option" @click="addToBasket(baklava, baklava.costStand)">
                <div class="portion__size-price">
                  <div class="portion__size">{{baklava.portionStand}}</div>
                  <div class="portion__price">{{baklava.costStand}}₸</div>
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
      baklavas: []
    };
  },
  methods: {
    addToBasket: function(baklava, cost) {
      //set name and cost to work with
      const baklavaToSend = { ...baklava };
      baklavaToSend.nameDefault = baklava.name;
      if (baklavaToSend.costSmall != 0) {
        if (cost == baklava.costSmall) {
          baklavaToSend.name += ` (${baklavaToSend.portionSmall.toLowerCase()})`;
          baklavaToSend.cost = baklavaToSend.costSmall;
        } else {
          baklavaToSend.name += ` (${baklavaToSend.portionStand.toLowerCase()})`;
          baklavaToSend.cost = baklavaToSend.costStand;
        }
      } else {
        baklavaToSend.cost = baklavaToSend.costStand;
      }
      this.$emit("addToBasket", baklavaToSend);
    }
  },
  created() {
    db.collection("dishes")
      .doc("baklavas")
      .get()
      .then(doc => {
        const baklavas = doc.data().baklavas;
        for (let i = 0; i < baklavas.length; i++) {
          const baklavaItem = {
            key: `baklava${i}`,
            name: baklavas[i].name,
            portionSmall: baklavas[i].portionSmall,
            portionStand: baklavas[i].portionStand,
            costSmall: baklavas[i].costSmall,
            costStand: baklavas[i].costStand
          };
          this.baklavas.push(baklavaItem);
        }
      });
  }
};
</script>

<style scoped>
</style>


