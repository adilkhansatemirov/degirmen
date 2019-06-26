<template>
   <div>
      <!-- SECTION SOUPS -->
      <section class="section-meals" id="section-soups">
         <div class="container pale-red">
            <div class="section__title color-dark-red">СУПЫ</div>
            <ul class="meal-group">
               <li
                  v-for="soup in soups"
                  :key="soup.key"
                  class="meal-item color-dark-red"
               >
                  <h4>{{ soup.name }}</h4>
                  <div class="portion-size-choise-box">
                     <a
                        v-if="soup.costSmall != 0"
                        class="portion__option"
                        @click="addToBasket(soup, soup.costSmall)"
                     >
                        <div class="portion__size-price">
                           <div class="portion__size">
                              {{ soup.portionSmall }}
                           </div>
                           <div class="portion__price">
                              {{ soup.costSmall }}₸
                           </div>
                        </div>
                        <div class="basket-icon">
                           <font-awesome-icon icon="shopping-basket" />
                        </div>
                     </a>
                     <a
                        class="portion__option"
                        @click="addToBasket(soup, soup.costStand)"
                     >
                        <div class="portion__size-price">
                           <div class="portion__size">
                              {{ soup.portionStand }}
                           </div>
                           <div class="portion__price">
                              {{ soup.costStand }}₸
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
      soups() {
         return this.$store.state.dishes.dishes.soups;
      }
   },
   methods: {
      addToBasket: function(soup, cost) {
         const soupToSend = { ...soup };
         soupToSend.nameDefault = soup.name;
         if (cost == soup.costSmall) {
            soupToSend.name += ` (${soupToSend.portionSmall.toLowerCase()})`;
            soupToSend.cost = soupToSend.costSmall;
         } else {
            soupToSend.name += ` (${soupToSend.portionStand.toLowerCase()})`;
            soupToSend.cost = soupToSend.costStand;
         }
         this.$emit("addToBasket", soupToSend);
      }
   }
};
</script>