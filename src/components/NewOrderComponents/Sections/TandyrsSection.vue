<template>
   <div>
      <section class="section-meals">
         <div class="container pale-red">
            <div class="section__title color-dark-red">ТАНДЫР МЕНЮ</div>
            <ul class="meal-group">
               <li
                  v-for="tandyr in tandyrs"
                  :key="tandyr.key"
                  class="meal-item color-dark-red"
               >
                  <h4>{{ tandyr.name }}</h4>
                  <div class="portion-size-choise-box">
                     <a
                        v-if="tandyr.costSmall != 0"
                        class="portion__option"
                        @click="addToBasket(tandyr, tandyr.costSmall)"
                     >
                        <div class="portion__size-price">
                           <div class="portion__size">
                              {{ tandyr.portionSmall }}
                           </div>
                           <div class="portion__price">
                              {{ tandyr.costSmall }}₸
                           </div>
                        </div>
                        <div class="basket-icon">
                           <font-awesome-icon icon="shopping-basket" />
                        </div>
                     </a>
                     <a
                        class="portion__option"
                        @click="addToBasket(tandyr, tandyr.costStand)"
                     >
                        <div class="portion__size-price">
                           <div class="portion__size">
                              {{ tandyr.portionStand }}
                           </div>
                           <div class="portion__price">
                              {{ tandyr.costStand }}₸
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
      tandyrs() {
         return this.$store.state.dishes.dishes.tandyrs;
      }
   },
   methods: {
      addToBasket: function(tandyr, cost) {
         //set name and cost to work with
         const tandyrToSend = { ...tandyr };
         tandyrToSend.nameDefault = tandyr.name;
         if (tandyrToSend.costSmall != 0) {
            if (cost == tandyr.costSmall) {
               tandyrToSend.name += ` (${tandyrToSend.portionSmall.toLowerCase()})`;
               tandyrToSend.cost = tandyrToSend.costSmall;
            } else {
               tandyrToSend.name += ` (${tandyrToSend.portionStand.toLowerCase()})`;
               tandyrToSend.cost = tandyrToSend.costStand;
            }
         } else {
            tandyrToSend.cost = tandyrToSend.costStand;
         }
         this.$emit("addToBasket", tandyrToSend);
      }
   }
};
</script>