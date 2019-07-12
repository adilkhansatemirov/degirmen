<template>
   <div>
      <section class="section-meals">
         <div class="container pale-red">
            <div class="section__title color-dark-red">ВЫПЕЧКА</div>
            <ul class="meal-group">
               <li
                  v-for="bakery in bakerys"
                  :key="bakery.key"
                  class="meal-item color-dark-red"
               >
                  <h4>{{ bakery.name }}</h4>
                  <div class="portion-size-choise-box">
                     <a
                        v-if="bakery.costSmall != 0"
                        class="portion__option"
                        @click="addToBasket(bakery, bakery.costSmall)"
                     >
                        <div class="portion__size-price">
                           <div class="portion__size">
                              {{ bakery.portionSmall }}
                           </div>
                           <div class="portion__price">
                              {{ bakery.costSmall }}₸
                           </div>
                        </div>
                        <div class="basket-icon">
                           <font-awesome-icon icon="shopping-basket" />
                        </div>
                     </a>
                     <a
                        class="portion__option"
                        @click="addToBasket(bakery, bakery.costStand)"
                     >
                        <div class="portion__size-price">
                           <div class="portion__size">
                              {{ bakery.portionStand }}
                           </div>
                           <div class="portion__price">
                              {{ bakery.costStand }}₸
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
   </div>
</template>

<script>
import db from "../../../firebase/firebase-init";

export default {
   computed: {
      bakerys() {
         return this.$store.state.dishes.dishes.bakerys;
      }
   },
   methods: {
      addToBasket: function(bakery, cost) {
         //set name and cost to work with
         const bakeryToSend = { ...bakery };
         bakeryToSend.nameDefault = bakery.name;
         if (bakeryToSend.costSmall != 0) {
            if (cost == bakery.costSmall) {
               bakeryToSend.name += ` (${bakeryToSend.portionSmall.toLowerCase()})`;
               bakeryToSend.cost = bakeryToSend.costSmall;
            } else {
               bakeryToSend.name += ` (${bakeryToSend.portionStand.toLowerCase()})`;
               bakeryToSend.cost = bakeryToSend.costStand;
            }
         } else {
            bakeryToSend.cost = bakeryToSend.costStand;
         }
         this.$emit("addToBasket", bakeryToSend);
      }
   }
};
</script>

<style scoped>
</style>


