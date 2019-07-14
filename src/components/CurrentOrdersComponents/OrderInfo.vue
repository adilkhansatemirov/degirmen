<template>
   <div>
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
         <div class="print-options">
            <span class="print-button" @click="printRequest(order, 'KITCHEN')">
               <span>На кухню</span>
               <font-awesome-icon icon="print" />
            </span>
            <span
               class="print-button"
               @click="printRequest(order, 'CASHIER_TABLE')"
            >
               <span>На кассу</span>
               <font-awesome-icon icon="print" />
            </span>
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
      printRequest: function(order, destination) {
         order.destination = destination;
         const data = {
            order
         };
         const config = {
            responseType: "text"
         };
         axios
            // .post("/test/index.php", data, config)
            .post("/print/example/interface/ethernet.php", data, config)
            .then(response => {
               console.log(response);
               console.log("Responce was handled.");
            })
            .catch(error => {
               console.log(error);
            });
      }
   }
};
</script>

<style scoped>
.order-info {
   font-size: 1.2rem;
   margin-bottom: 0.3rem;
   display: flex;
   justify-content: space-between;
   align-items: center;
   margin-top: 0.5rem;
}
.print-options {
   display: grid;
   grid-template-columns: 1fr 1fr;
   grid-gap: 1rem;
   justify-content: space-between;
}
.print-button {
   font-size: 1rem;
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
</style>
