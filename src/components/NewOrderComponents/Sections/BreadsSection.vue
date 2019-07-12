<template>
   <div>
      <section class="section-meals">
         <div class="container pale-red">
            <div class="section__title color-dark-red">ХЛЕБ</div>
            <ul class="meal-group">
               <li
                  v-for="bread in breads"
                  :key="bread.key"
                  class="meal-item color-dark-red"
               >
                  <h4>{{ bread.name }}</h4>
                  <div class="portion-size-choise-box">
                     <a
                        v-if="bread.costSmall != 0"
                        class="portion__option"
                        @click="addToBasket(bread, bread.costSmall)"
                     >
                        <div class="portion__size-price">
                           <div class="portion__size">
                              {{ bread.portionSmall }}
                           </div>
                           <div class="portion__price">
                              {{ bread.costSmall }}₸
                           </div>
                        </div>
                        <div class="basket-icon">
                           <font-awesome-icon icon="shopping-basket" />
                        </div>
                     </a>
                     <a
                        class="portion__option"
                        @click="addToBasket(bread, bread.costStand)"
                     >
                        <div class="portion__size-price">
                           <div class="portion__size">
                              {{ bread.portionStand }}
                           </div>
                           <div class="portion__price">
                              {{ bread.costStand }}₸
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
      breads() {
         return this.$store.state.dishes.dishes.breads;
      }
   },
   methods: {
      addToBasket: function(bread, cost) {
         //set name and cost to work with
         const breadToSend = { ...bread };
         breadToSend.nameDefault = bread.name;
         if (breadToSend.costSmall != 0) {
            if (cost == bread.costSmall) {
               breadToSend.name += ` (${breadToSend.portionSmall.toLowerCase()})`;
               breadToSend.cost = breadToSend.costSmall;
            } else {
               breadToSend.name += ` (${breadToSend.portionStand.toLowerCase()})`;
               breadToSend.cost = breadToSend.costStand;
            }
         } else {
            breadToSend.cost = breadToSend.costStand;
         }
         this.$emit("addToBasket", breadToSend);
      }
   }
};
</script>

<style scoped>
</style>


