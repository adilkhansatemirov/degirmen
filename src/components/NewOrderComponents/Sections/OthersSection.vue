<template>
   <div>
      <section class="section-meals">
         <div class="container pale-red">
            <div class="section__title color-dark-red">ДРУГОЕ</div>
            <ul class="meal-group">
               <li
                  v-for="other in others"
                  :key="other.key"
                  class="meal-item color-dark-red"
               >
                  <h4>{{ other.name }}</h4>
                  <div class="portion-size-choise-box">
                     <a
                        v-if="other.costSmall != 0"
                        class="portion__option"
                        @click="addToBasket(other, other.costSmall)"
                     >
                        <div class="portion__size-price">
                           <div class="portion__size">
                              {{ other.portionSmall }}
                           </div>
                           <div class="portion__price">
                              {{ other.costSmall }}₸
                           </div>
                        </div>
                        <div class="basket-icon">
                           <font-awesome-icon icon="shopping-basket" />
                        </div>
                     </a>
                     <a
                        class="portion__option"
                        @click="addToBasket(other, other.costStand)"
                     >
                        <div class="portion__size-price">
                           <div class="portion__size">
                              {{ other.portionStand }}
                           </div>
                           <div class="portion__price">
                              {{ other.costStand }}₸
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
      others() {
         return this.$store.state.dishes.dishes.others;
      }
   },
   methods: {
      addToBasket: function(other, cost) {
         //set name and cost to work with
         const otherToSend = { ...other };
         otherToSend.nameDefault = other.name;
         if (otherToSend.costSmall != 0) {
            if (cost == other.costSmall) {
               otherToSend.name += ` (${otherToSend.portionSmall.toLowerCase()})`;
               otherToSend.cost = otherToSend.costSmall;
            } else {
               otherToSend.name += ` (${otherToSend.portionStand.toLowerCase()})`;
               otherToSend.cost = otherToSend.costStand;
            }
         } else {
            otherToSend.cost = otherToSend.costStand;
         }
         this.$emit("addToBasket", otherToSend);
      }
   }
};
</script>

<style scoped>
</style>


