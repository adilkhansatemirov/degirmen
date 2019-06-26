<template>
   <div>
      <section class="section-meals">
         <div class="container pale-red">
            <div class="section__title color-dark-red">ГОРЯЧИЕ НАПИТКИ</div>
            <ul class="meal-group">
               <li
                  v-for="hotDrink in hotDrinks"
                  :key="hotDrink.key"
                  class="meal-item color-dark-red"
               >
                  <h4>{{ hotDrink.name }}</h4>
                  <div class="portion-size-choise-box">
                     <a
                        v-if="hotDrink.costSmall != 0"
                        class="portion__option"
                        @click="addToBasket(hotDrink, hotDrink.costSmall)"
                     >
                        <div class="portion__size-price">
                           <div class="portion__size">
                              {{ hotDrink.portionSmall }}
                           </div>
                           <div class="portion__price">
                              {{ hotDrink.costSmall }}₸
                           </div>
                        </div>
                        <div class="basket-icon">
                           <font-awesome-icon icon="shopping-basket" />
                        </div>
                     </a>
                     <a
                        class="portion__option"
                        @click="addToBasket(hotDrink, hotDrink.costStand)"
                     >
                        <div class="portion__size-price">
                           <div class="portion__size">
                              {{ hotDrink.portionStand }}
                           </div>
                           <div class="portion__price">
                              {{ hotDrink.costStand }}₸
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
      hotDrinks() {
         return this.$store.state.dishes.dishes.hotDrinks;
      }
   },
   methods: {
      addToBasket: function(hotDrink, cost) {
         const hotDrinkToSend = { ...hotDrink };
         hotDrinkToSend.nameDefault = hotDrink.name;
         if (cost == hotDrink.costSmall) {
            hotDrinkToSend.name += ` (${hotDrinkToSend.portionSmall.toLowerCase()})`;
            hotDrinkToSend.cost = hotDrinkToSend.costSmall;
         } else {
            hotDrinkToSend.name += ` (${hotDrinkToSend.portionStand.toLowerCase()})`;
            hotDrinkToSend.cost = hotDrinkToSend.costStand;
         }
         this.$emit("addToBasket", hotDrinkToSend);
      }
   }
};
</script>