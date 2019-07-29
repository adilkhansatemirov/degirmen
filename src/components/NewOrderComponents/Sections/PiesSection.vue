<template>
   <div>
      <section class="section-meals">
         <div class="container pale-red">
            <div class="section__title color-dark-red">ТОРТЫ</div>
            <ul class="meal-group">
               <li
                  v-for="pie in pies"
                  :key="pie.key"
                  class="meal-item color-dark-red"
               >
                  <h4>{{ pie.name }}</h4>
                  <div class="portion-size-choise-box">
                     <a
                        v-if="pie.costSmall != 0"
                        class="portion__option"
                        @click="addToBasket(pie, pie.costSmall)"
                     >
                        <div class="portion__size-price">
                           <div class="portion__size">
                              {{ pie.portionSmall }}
                           </div>
                           <div class="portion__price">
                              {{ pie.costSmall }}₸
                           </div>
                        </div>
                        <div class="basket-icon">
                           <font-awesome-icon icon="shopping-basket" />
                        </div>
                     </a>
                     <a
                        class="portion__option"
                        @click="addToBasketFloatAmount(pie)"
                     >
                        <div class="portion__size-price">
                           <div class="portion__size">
                              {{ pie.portionStand }}
                           </div>
                           <div class="portion__price">
                              {{ pie.costStand }}₸
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
      pies() {
         return this.$store.state.dishes.dishes.pies;
      }
   },
   methods: {
      addToBasket: function(pie, cost) {
         //set name and cost to work with
         const pieToSend = { ...pie };
         pieToSend.nameDefault = pie.name;
         if (pieToSend.costSmall != 0) {
            if (cost == pie.costSmall) {
               pieToSend.name += ` (${pieToSend.portionSmall.toLowerCase()})`;
               pieToSend.cost = pieToSend.costSmall;
            } else {
               pieToSend.name += ` (${pieToSend.portionStand.toLowerCase()})`;
               pieToSend.cost = pieToSend.costStand;
            }
         } else {
            pieToSend.cost = pieToSend.costStand;
         }
         this.$emit("addToBasket", pieToSend);
      },
      addToBasketFloatAmount: function(pie) {
         const pieToSend = { ...pie };
         pieToSend.nameDefault = pie.name;
         pieToSend.name += " (на развес)";
         pieToSend.cost = pie.costStand;
         const amount = parseFloat(prompt("В граммах")) / 1000;
         if (!amount) {
            return;
         }
         this.$store.dispatch("addToBasketFloatAmount", {
            dish: pieToSend,
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


