<template>
   <div>
      <!-- SECTION MAIN DISHES -->
      <section class="section-meals" id="section-main-dishes">
         <div class="container pale-red">
            <div class="section__title color-dark-red">ГОРЯЧИЕ БЛЮДА</div>
            <ul class="meal-group">
               <li
                  v-for="dish in dishes"
                  :key="dish.key"
                  class="meal-item color-dark-red"
               >
                  <h4>{{ dish.name }}</h4>
                  <div class="portion-size-choise-box">
                     <a
                        v-if="dish.costSmall != 0"
                        class="portion__option"
                        @click="openGarnirs(dish, dish.costSmall)"
                     >
                        <div class="portion__size-price">
                           <div class="portion__size">
                              {{ dish.portionSmall }}
                           </div>
                           <div class="portion__price">
                              {{ dish.costSmall }}₸
                           </div>
                        </div>
                        <div class="basket-icon">
                           <font-awesome-icon icon="shopping-basket" />
                        </div>
                     </a>
                     <a
                        class="portion__option"
                        @click="openGarnirs(dish, dish.costStand)"
                     >
                        <div class="portion__size-price">
                           <div class="portion__size">
                              {{ dish.portionStand }}
                           </div>
                           <div class="portion__price">
                              {{ dish.costStand }}₸
                           </div>
                        </div>
                        <div class="basket-icon">
                           <font-awesome-icon icon="shopping-basket" />
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
         v-show="showGarnirsModal"
      ></v-choose-garnir>
   </div>
</template>

<script>
import db from "../../../firebase/firebase-init";
import ChooseGarnir from "../ChooseGarnirModalBox.vue";

export default {
   components: {
      "v-choose-garnir": ChooseGarnir
   },
   data() {
      return {
         garnirChosen: null,
         dishWithGarnir: null,
         showGarnirsModal: false
      };
   },
   computed: {
      dishes() {
         return this.$store.state.dishes.dishes.mainDishes;
      }
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
            } else {
               dishToSend.name += ` (${dishToSend.portionSmall.toLowerCase()})`;
               dishToSend.cost = dishToSend.costSmall;
            }
         } else {
            dishToSend.cost = dishToSend.costStand;
         }
         this.$emit("addToBasket", dishToSend);
      },
      openGarnirs: function(dish, cost) {
         if (dish.costSmall != 0) {
            dish.cost = cost;
            //open garnir menu and save dishWithGarnir
            this.showGarnirsModal = true;
            this.dishWithGarnir = dish;
         } else {
            this.addToBasket(dish, dish.costStand);
         }
      },
      closeGarnirs: function() {
         this.showGarnirsModal = false;
      },
      chooseGarnir: function(garnir) {
         const dishToSend = { ...this.dishWithGarnir };
         dishToSend.nameDefault = dishToSend.name;
         if (garnir.name === "(без гарнира)") {
            dishToSend.name += "(без гарнира)";
         } else {
            dishToSend.name += ` с гарниром ${garnir.name}`;
         }
         dishToSend.cost += garnir.cost;
         this.$emit("addToBasket", dishToSend);
         console.log(dishToSend);

         // this.garnirChosen = garnir.name;
         // this.addToBasket(
         //    this.dishWithGarnir,
         //    this.dishWithGarnir.costStand + garnir.cost
         // );
         this.closeGarnirs();
      }
   }
};
</script>