<template>
  <div>
    <section class="section-meals">
      <div class="container pale-red">
        <div class="section__title color-dark-red">САЛАТЫ</div>
        <ul class="meal-group">
          <li v-for="salat in salats" :key="salat.key" class="meal-item color-dark-red">
            <h4>{{returnName(salat)}}</h4>
            <div class="portion-size-choise-box">
              <a
                v-if="salat.costSmall != 0"
                class="portion__option"
                @click="addToBasket(salat, salat.costSmall)"
              >
                <div class="portion__size-price">
                  <div class="portion__size">{{salat.portionSmall}}</div>
                  <div class="portion__price">{{salat.costSmall}}₸</div>
                </div>
                <div class="basket-icon">
                  <font-awesome-icon icon="shopping-basket"/>
                </div>
              </a>
              <a class="portion__option" @click="addToBasket(salat, salat.costStand)">
                <div class="portion__size-price">
                  <div class="portion__size">{{salat.portionStand}}</div>
                  <div class="portion__price">{{salat.costStand}}₸</div>
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
      salats: []
    };
  },
  methods: {
    addToBasket: function(salat, cost) {
      //set name and cost to work with
      const salatToSend = { ...salat };
      salatToSend.nameDefault = salat.name;
      if (salatToSend.costSmall != 0) {
        if (cost == salat.costSmall) {
          salatToSend.name += ` (${salatToSend.portionSmall.toLowerCase()})`;
          salatToSend.cost = salatToSend.costSmall;
        } else {
          salatToSend.name += ` (${salatToSend.portionStand.toLowerCase()})`;
          salatToSend.cost = salatToSend.costStand;
        }
      } else {
        salatToSend.cost = salatToSend.costStand;
      }
      this.$emit("addToBasket", salatToSend);
    },
    returnName(salat) {
      let nameArr = salat.name.split(" ");
      if (nameArr.length == 2) return nameArr[1];

      let salatNameResult = "";
      for (let i = 1; i < nameArr.length; i++) {
        salatNameResult += nameArr[i] + " ";
      }
      return salatNameResult;
    }
  },
  created() {
    db.collection("dishes")
      .doc("salats")
      .get()
      .then(doc => {
        const salats = doc.data().salats;
        for (let i = 0; i < salats.length; i++) {
          const salatItem = {
            key: `salat${i}`,
            type: "salats",
            name: salats[i].name,
            portionSmall: salats[i].portionSmall,
            portionStand: salats[i].portionStand,
            costSmall: salats[i].costSmall,
            costStand: salats[i].costStand
          };
          this.salats.push(salatItem);
        }
      });
  }
};
</script>

</style>


