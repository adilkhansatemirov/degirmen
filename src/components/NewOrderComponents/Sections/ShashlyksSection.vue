<template>
  <div>
    <section class="section-meals">
      <div class="container pale-red">
        <div class="section__title color-dark-red">ШАШЛЫКИ</div>
        <ul class="meal-group">
          <li v-for="shashlyk in shashlyks" :key="shashlyk.key" class="meal-item color-dark-red">
            <h4>{{shashlyk.name}}</h4>
            <div class="portion-size-choise-box">
              <a
                v-if="shashlyk.costSmall != 0"
                class="portion__option"
                @click="addToBasket(shashlyk, shashlyk.costSmall)"
              >
                <div class="portion__size-price">
                  <div class="portion__size">{{shashlyk.portionSmall}}</div>
                  <div class="portion__price">{{shashlyk.costSmall}}₸</div>
                </div>
                <div class="basket-icon">
                  <font-awesome-icon icon="shopping-basket"/>
                </div>
              </a>
              <a class="portion__option" @click="addToBasket(shashlyk, shashlyk.costStand)">
                <div class="portion__size-price">
                  <div class="portion__size">{{shashlyk.portionStand}}</div>
                  <div class="portion__price">{{shashlyk.costStand}}₸</div>
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
      shashlyks: []
    };
  },
  methods: {
    addToBasket: function(shashlyk, cost) {
      //set name and cost to work with
      const shashlykToSend = { ...shashlyk };
      shashlykToSend.nameDefault = shashlyk.name;
      if (shashlykToSend.costSmall != 0) {
        if (cost == shashlyk.costSmall) {
          shashlykToSend.name += ` (${shashlykToSend.portionSmall.toLowerCase()})`;
          shashlykToSend.cost = shashlykToSend.costSmall;
        } else {
          shashlykToSend.name += ` (${shashlykToSend.portionStand.toLowerCase()})`;
          shashlykToSend.cost = shashlykToSend.costStand;
        }
      } else {
        shashlykToSend.cost = shashlykToSend.costStand;
      }
      this.$emit("addToBasket", shashlykToSend);
    }
  },
  created() {
    db.collection("dishes")
      .doc("shashlyks")
      .get()
      .then(doc => {
        const shashlyks = doc.data().shashlyks;
        for (let i = 0; i < shashlyks.length; i++) {
          const shashlykItem = {
            key: `shashlyk${i}`,
            type: "shashlyks",
            name: shashlyks[i].name,
            portionSmall: shashlyks[i].portionSmall,
            portionStand: shashlyks[i].portionStand,
            costSmall: shashlyks[i].costSmall,
            costStand: shashlyks[i].costStand
          };
          this.shashlyks.push(shashlykItem);
        }
      });
  }
};
</script>

<style scoped>
</style>


