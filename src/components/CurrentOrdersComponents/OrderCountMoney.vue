<template>
   <div>
      <p class="order-total">Итог: {{ order.total }}</p>
      <div v-if="order.type == 'Кафе'">
         <p class="order-total" v-if="!order.takeaway">
            Обслуживание: {{ service(order) }}
         </p>
         <div v-if="order.discount != 0">
            <p class="order-total">Скидка: -{{ order.discount }}%</p>
         </div>
      </div>
      <p v-else class="order-total">Доставка: 400</p>

      <p class="order-total">К оплате: {{ toPay(order) }}</p>
   </div>
</template>

<script>
const axios = require("axios");

export default {
   props: {
      order: {
         type: Object
      },
      adminMode: {
         type: Boolean
      }
   },
   methods: {
      // @decs returns positive value of discount if not 0
      countDiscount: function(order) {
         let totalWithService = order.total + this.service(order);
         return Math.round((totalWithService * order.discount) / 100);
      },
      // @decs returns 10% money of the order.total
      service: function(order) {
         if (order.takeaway) {
            return 0;
         }
         return Math.round((order.total * 10) / 100);
      },
      toPay: function(order) {
         if (order.type == "Кафе") {
            return (
               order.total + this.service(order) - this.countDiscount(order)
            );
         } else {
            return order.total + 400;
         }
      }
   }
};
</script>

<style scoped>
.order-total {
   text-align: right;
}
</style>
