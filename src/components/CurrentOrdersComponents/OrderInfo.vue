<template>
   <div class="order-info-container">
      <div class="order-info" v-if="order.type == 'Доставка'">
         <p>Адрес: {{ order.address }}</p>
      </div>
      <div class="order-info" v-else>
         <div v-if="order.takeaway == true">
            <p>С собой</p>
         </div>
         <div v-else>
            <p>Официант: {{ order.waiterName }}</p>
            <p>Столик: {{ order.table }}</p>
         </div>
      </div>
      <div class="print-options">
         <div class="print-button" @click="printRequest(order, 'KITCHEN')">
            <span>На кухню</span>
            <font-awesome-icon icon="print" />
         </div>
         <div
            class="print-button"
            @click="printRequest(order, 'CASHIER_TABLE')"
         >
            <span>На кассу</span>
            <font-awesome-icon icon="print" />
         </div>
         <div
            class="print-button"
            @click="printRequest(order, 'KITCHEN', 'doners')"
            v-if="orderContains('doners')"
         >
            <span>Донер</span>
            <font-awesome-icon icon="print" />
         </div>
         <div
            class="print-button"
            @click="printRequest(order, 'KITCHEN', 'shashlyks')"
            v-if="orderContains('shashlyks')"
         >
            <span>Шашлык</span>
            <font-awesome-icon icon="print" />
         </div>
      </div>
   </div>
</template>

<script>
import axios from "axios";
export default {
   props: {
      order: {
         type: Object
      }
   },
   methods: {
      printRequest: function(orderToPrint, destination, type = null) {
         let order = { ...orderToPrint };
         if (type) {
            order.dishes = order.dishes.filter(dish => dish.dish.type === type);
         }
         console.log(order);

         order.destination = destination;
         const data = {
            order
         };
         const config = {
            responseType: "text"
         };
         axios
            .post("/print/example/interface/ethernet.php", data, config)
            .then(response => {
               console.log(response);
               console.log("Responce was handled.");
            })
            .catch(error => {
               console.log(error);
            });
      },
      orderContains: function(type) {
         let contains = false;
         this.order.dishes.forEach(dish => {
            if (dish.dish.type == type) {
               contains = true;
            }
         });
         return contains;
      }
   }
};
</script>

<style scoped>
.order-info-container {
   display: flex;
   align-items: center;
   justify-content: space-between;
}
.order-info {
   font-size: 1.2rem;
   margin-bottom: 0.3rem;
   margin-top: 0.5rem;
}
.print-options {
   margin-top: 0.5rem;
   flex: 1;
   display: flex;
   justify-content: flex-end;
   flex-wrap: wrap;
}
.print-button {
   font-size: 1rem;
   margin: 0 0.5rem 0.5rem;
   border: 1px solid rgb(124, 53, 53);
   border-radius: 0.5rem;
   padding: 0 0.2rem;
   cursor: pointer;
   text-align: center;
   align-self: flex-start;
}
.print-button:hover {
   color: rgb(155, 67, 67);
}
@media (max-width: 600px) {
   .order-info {
      font-size: 1rem;
      flex-direction: column;
   }
   .print-button {
      font-size: 0.8rem;
   }
}
@media (max-width: 400px) {
   .print-button {
      margin: 0 0.2rem 0.5rem;
      font-size: 0.7rem;
   }
}
</style>
