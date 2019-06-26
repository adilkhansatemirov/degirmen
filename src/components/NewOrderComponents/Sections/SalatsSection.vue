<template>
   <div>
      <section class="section-meals">
         <div class="container pale-red">
            <div class="section__title color-dark-red">САЛАТЫ</div>
            <ul class="meal-group">
               <li
                  v-for="salat in salats"
                  :key="salat.key"
                  class="meal-item color-dark-red"
               >
                  <h4>{{ returnName(salat) }}</h4>
                  <div class="portion-size-choise-box">
                     <a
                        v-if="salat.costSmall != 0"
                        class="portion__option"
                        @click="addToBasket(salat, salat.costSmall)"
                     >
                        <div class="portion__size-price">
                           <div class="portion__size">
                              {{ salat.portionSmall }}
                           </div>
                           <div class="portion__price">
                              {{ salat.costSmall }}₸
                           </div>
                        </div>
                        <div class="basket-icon">
                           <font-awesome-icon icon="shopping-basket" />
                        </div>
                     </a>
                     <a
                        class="portion__option"
                        @click="addToBasket(salat, salat.costStand)"
                     >
                        <div class="portion__size-price">
                           <div class="portion__size">
                              {{ salat.portionStand }}
                           </div>
                           <div class="portion__price">
                              {{ salat.costStand }}₸
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
export default {
   computed: {
      salats() {
         return this.$store.state.dishes.dishes.salats;
      }
   },
   methods: {
      addToBasket: function(salat, cost) {
         //set name and cost to work with
         const salatToSend = { ...salat };
         salatToSend.nameDefault = salat.name;
         if (salatToSend.costSmall != 0) {
            if (cost == salat.costSmall) {
               salatToSend.name += ` (${salatToSend.portionSmall.toLowerCase()})`;
               salatToSend.cost = salatToSend.costSmall;
            } else {
               salatToSend.name += ` (${salatToSend.portionStand.toLowerCase()})`;
               salatToSend.cost = salatToSend.costStand;
            }
         } else {
            salatToSend.cost = salatToSend.costStand;
         }
         this.$emit("addToBasket", salatToSend);
      },
      returnName: function(salat) {
         return salat.name.split(" ")[1];
      }
   }
};
</script>

<style scoped>
</style>


