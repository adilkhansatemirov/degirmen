<template>
  <div>
    <!-- SECTION MAIN DISHES -->
    <section class="section-meals" id="section-main-dishes">
      <div class="container pale-red">
        <div class="section__title color-dark-red">ГОРЯЧИЕ БЛЮДА</div>
        <ul class="meal-group">
          <li v-for="dish in dishes" :key="dish.key" class="meal-item color-dark-red">
            <h4>{{dish.name}}</h4>
            <div class="portion-size-choise-box">
              <a
                v-if="dish.costSmall != 0"
                class="portion__option"
                @click="addToBasket(dish, dish.costSmall)"
              >
                <div class="portion__size-price">
                  <div class="portion__size">{{dish.portionSmall}}</div>
                  <div class="portion__price">{{dish.costSmall}}₸</div>
                </div>
                <div class="basket-icon">
                  <font-awesome-icon icon="shopping-basket"/>
                </div>
              </a>
              <a class="portion__option" @click="openGarnirs(dish)">
                <div class="portion__size-price">
                  <div class="portion__size">{{dish.portionStand}}</div>
                  <div class="portion__price">{{dish.costStand}}₸</div>
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
    <v-choose-garnir
      ref="chooseGarnir"
      @chooseGarnir="chooseGarnir($event)"
      @closeGarnirs="closeGarnirs()"
      v-show="garnirsWindowOpen"
    ></v-choose-garnir>
  </div>
</template>

<script>
import db from "../../firebase/firebase-init";
import ChooseGarnir from "../ChooseGarnirModalBox.vue";

export default {
  components: {
    "v-choose-garnir": ChooseGarnir
  },
  data() {
    return {
      dishes: [],
      garnirChosen: null,
      dishWithGarnir: null,
      garnirsWindowOpen: false
    };
  },
  methods: {
    addToBasket: function(dish, cost) {
      //set name and cost to work with
      const dishToSend = { ...dish };
      dishToSend.nameDefault = dish.name;
      if (dishToSend.costSmall != 0) {
        if (this.garnirChosen != null) {
          dishToSend.name += ` с гарниром ${this.garnirChosen}`;
          dishToSend.cost = cost;
          this.garnirChosen = null;
        }else{
          dishToSend.name += ` (${dishToSend.portionSmall.toLowerCase()})`;
          dishToSend.cost = dishToSend.costSmall;
        }

        // if (cost == dish.costSmall) {
        //   dishToSend.name += ` (${dishToSend.portionSmall.toLowerCase()})`;
        //   dishToSend.cost = dishToSend.costSmall;
        // } else {
        //   if (this.garnirChosen != null) {
        //     dishToSend.name += ` с гарниром ${this.garnirChosen}`;
        //     this.garnirChosen = null;
        //   } else {
        //     dishToSend.name += ` (${dishToSend.portionStand.toLowerCase()})`;
        //   }
        //   dishToSend.cost = dishToSend.costStand;
        // }
      } else {
        dishToSend.cost = dishToSend.costStand;
      }
      this.$emit("addToBasket", dishToSend);
    },
    openGarnirs: function(dish) {
      if (dish.costSmall != 0) {
        //open garnir menu and save dishWithGarnir
        this.garnirsWindowOpen = true;
        this.dishWithGarnir = dish;
      } else {
        this.addToBasket(dish, dish.costStand);
      }
    },
    closeGarnirs: function() {
      this.garnirsWindowOpen = false;
    },
    chooseGarnir: function(garnir) {
      this.garnirChosen = garnir.name;
      this.addToBasket(this.dishWithGarnir, this.dishWithGarnir.costStand + garnir.cost);
      this.closeGarnirs();
      
    }
  },
  created() {
    db.collection("dishes")
      .doc("mainDishes")
      .get()
      .then(doc => {
        const dishes = doc.data().mainDishes;
        for (let i = 0; i < dishes.length; i++) {
          const dishItem = {
            key: `mainDish${i}`,
            name: dishes[i].name,
            portionSmall: dishes[i].portionSmall,
            portionStand: dishes[i].portionStand,
            costSmall: dishes[i].costSmall,
            costStand: dishes[i].costStand
          };
          this.dishes.push(dishItem);
        }
      });
  }
};
</script>

<style scoped>
</style>


