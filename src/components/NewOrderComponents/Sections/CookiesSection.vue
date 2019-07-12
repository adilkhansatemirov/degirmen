<template>
   <div>
      <section class="section-meals">
         <div class="container pale-red">
            <div class="section__title color-dark-red">ПЕЧЕНЬЕ</div>
            <ul class="meal-group">
               <li
                  v-for="coockie in coockies"
                  :key="coockie.key"
                  class="meal-item color-dark-red"
               >
                  <h4>{{ coockie.name }}</h4>
                  <div class="portion-size-choise-box">
                     <a
                        v-if="coockie.costSmall != 0"
                        class="portion__option"
                        @click="addToBasket(coockie, coockie.costSmall)"
                     >
                        <div class="portion__size-price">
                           <div class="portion__size">
                              {{ coockie.portionSmall }}
                           </div>
                           <div class="portion__price">
                              {{ coockie.costSmall }}₸
                           </div>
                        </div>
                        <div class="basket-icon">
                           <font-awesome-icon icon="shopping-basket" />
                        </div>
                     </a>
                     <a
                        class="portion__option"
                        @click="addToBasketFloatAmount(coockie)"
                     >
                        <div class="portion__size-price">
                           <div class="portion__size">
                              {{ coockie.portionStand }}
                           </div>
                           <div class="portion__price">
                              {{ coockie.costStand }}₸
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
      coockies() {
         return this.$store.state.dishes.dishes.coockies;
      }
   },
   methods: {
      addToBasket: function(coockie, cost) {
         //set name and cost to work with
         const coockieToSend = { ...coockie };
         coockieToSend.nameDefault = coockie.name;
         if (coockieToSend.costSmall != 0) {
            if (cost == coockie.costSmall) {
               coockieToSend.name += ` (${coockieToSend.portionSmall.toLowerCase()})`;
               coockieToSend.cost = coockieToSend.costSmall;
            } else {
               coockieToSend.name += ` (${coockieToSend.portionStand.toLowerCase()})`;
               coockieToSend.cost = coockieToSend.costStand;
            }
         } else {
            coockieToSend.cost = coockieToSend.costStand;
         }
         this.$emit("addToBasket", coockieToSend);
      },
      addToBasketFloatAmount: function(coockie) {
         const coockieToSend = { ...coockie };
         coockieToSend.nameDefault = coockie.name;
         coockieToSend.name += " (на развес)";
         coockieToSend.cost = coockie.costStand;
         const amount = parseFloat(prompt("В граммах")) / 1000;
         if (!amount) {
            return;
         }
         this.$store.dispatch("addToBasketFloatAmount", {
            dish: coockieToSend,
            amount
         });
      }
   }
};
</script>

<style scoped>
</style>


