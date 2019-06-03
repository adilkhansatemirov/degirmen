<template>
  <div>
    <section class="section-meals">
      <div class="container pale-red">
        <div class="section__title color-dark-red">МОЛОЧНЫЕ КОКТЕЙЛИ</div>
        <ul class="meal-group">
          <li v-for="cocktail in cocktails" :key="cocktail.key" class="meal-item color-dark-red">
            <h4>{{returnName(cocktail)}}</h4>
            <div class="portion-size-choise-box">
              <a
                v-if="cocktail.costSmall != 0"
                class="portion__option"
                @click="addToBasket(cocktail, cocktail.costSmall)"
              >
                <div class="portion__size-price">
                  <div class="portion__size">{{cocktail.portionSmall}}</div>
                  <div class="portion__price">{{cocktail.costSmall}}₸</div>
                </div>
                <div class="basket-icon">
                  <font-awesome-icon icon="shopping-basket"/>
                </div>
              </a>
              <a class="portion__option" @click="addToBasket(cocktail, cocktail.costStand)">
                <div class="portion__size-price">
                  <div class="portion__size">{{cocktail.portionStand}}</div>
                  <div class="portion__price">{{cocktail.costStand}}₸</div>
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
      cocktails: []
    };
  },
  methods: {
    addToBasket: function(cocktail, cost) {
      //set name and cost to work with
      const cocktailToSend = { ...cocktail };
      cocktailToSend.nameDefault = cocktail.name;
      if (cocktailToSend.costSmall != 0) {
        if (cost == cocktail.costSmall) {
          cocktailToSend.name += ` (${cocktailToSend.portionSmall.toLowerCase()})`;
          cocktailToSend.cost = cocktailToSend.costSmall;
        } else {
          cocktailToSend.name += ` (${cocktailToSend.portionStand.toLowerCase()})`;
          cocktailToSend.cost = cocktailToSend.costStand;
        }
      } else {
        cocktailToSend.cost = cocktailToSend.costStand;
      }
      this.$emit("addToBasket", cocktailToSend);
    },
    returnName: function(cocktail) {
      return cocktail.name.split(" ")[0];
    }
  },
  created() {
    db.collection("dishes")
      .doc("cocktails")
      .get()
      .then(doc => {
        const cocktails = doc.data().cocktails;
        for (let i = 0; i < cocktails.length; i++) {
          const cocktailItem = {
            key: `cocktail${i}`,
            type: "cocktails",
            name: cocktails[i].name,
            portionSmall: cocktails[i].portionSmall,
            portionStand: cocktails[i].portionStand,
            costSmall: cocktails[i].costSmall,
            costStand: cocktails[i].costStand
          };
          this.cocktails.push(cocktailItem);
        }
      });
  }
};
</script>

<style scoped>
</style>


