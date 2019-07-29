<template>
   <div>
      <section class="section-meals">
         <div class="container pale-red">
            <div class="section__title color-dark-red">БАКЛАВА</div>
            <ul class="meal-group">
               <li
                  v-for="baklava in baklavas"
                  :key="baklava.key"
                  class="meal-item color-dark-red"
               >
                  <h4>{{ baklava.name }}</h4>
                  <div class="portion-size-choise-box">
                     <a
                        v-if="baklava.costSmall != 0"
                        class="portion__option"
                        @click="addToBasket(baklava, baklava.costSmall)"
                     >
                        <div class="portion__size-price">
                           <div class="portion__size">
                              {{ baklava.portionSmall }}
                           </div>
                           <div class="portion__price">
                              {{ baklava.costSmall }}₸
                           </div>
                        </div>
                        <div class="basket-icon">
                           <font-awesome-icon icon="shopping-basket" />
                        </div>
                     </a>
                     <a
                        class="portion__option"
                        @click="addToBasketFloatAmount(baklava)"
                     >
                        <div class="portion__size-price">
                           <div class="portion__size">
                              {{ baklava.portionStand }}
                           </div>
                           <div class="portion__price">
                              {{ baklava.costStand }}₸
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
      baklavas() {
         return this.$store.state.dishes.dishes.baklavas;
      }
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
      },
      addToBasketFloatAmount: function(baklava) {
         const baklavaToSend = { ...baklava };
         baklavaToSend.nameDefault = baklava.name;
         baklavaToSend.name += " (на развес)";
         baklavaToSend.cost = baklava.costStand;
         const amount = parseFloat(prompt("В граммах")) / 1000;
         if (!amount) {
            return;
         }
         this.$store.dispatch("addToBasketFloatAmount", {
            dish: baklavaToSend,
            amount
         });
         if (!this.newOrder()) {
            this.$store.dispatch("addToSecondBasketFloatAmount", {
               dish: baklavaToSend,
               amount
            });
         }
      },
      newOrder: function() {
         return Object.keys(this.$route.params).length === 0;
      }
   }
};
</script>

<style scoped>
</style>


