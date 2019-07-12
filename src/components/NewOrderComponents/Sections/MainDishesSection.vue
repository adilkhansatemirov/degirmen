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
         v-show="garnirsModalOpen"
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
         garnirsModalOpen: false
      };
   },
   computed: {
      dishes() {
         return this.$store.state.dishes.dishes.mainDishes;
      }
   },
   methods: {
      openGarnirs: function(dish, cost) {
         dish.cost = cost;
         //open garnir menu and save dishWithGarnir
         this.garnirsModalOpen = true;
         this.dishWithGarnir = dish;
      },
      closeGarnirs: function() {
         this.garnirsModalOpen = false;
      },
      chooseGarnir: function(garnir) {
         const dishToSend = { ...this.dishWithGarnir };
         console.log(dishToSend);
         //set default cost and name for dish
         dishToSend.nameDefault = dishToSend.name;
         dishToSend.costDefault = dishToSend.cost;

         if (dishToSend.costDefault === dishToSend.costSmall) {
            dishToSend.name += ` (${dishToSend.portionSmall.toLowerCase()})`;
         } else {
            dishToSend.name += ` (${dishToSend.portionStand.toLowerCase()})`;
         }
         //modify name and cost
         if (garnir.name === "(без гарнира)") {
            dishToSend.name += "(без гарнира)";
         } else {
            dishToSend.name += ` с гарниром ${garnir.name}`;
         }
         //set total cost with garnir's cost
         dishToSend.cost += garnir.cost;
         dishToSend.garnirs = garnir.selected;

         this.$emit("addToBasket", dishToSend);
         console.log(dishToSend);
         this.closeGarnirs();
      }
   }
};
</script>