<template>
   <div>
      <div class="container">
         <h2 class="title">История чеков</h2>

         <ul class="orders-list">
            <li class="order-item" v-for="order in orders" :key="order.id">
               <div class="order-header">
                  <p class="order-type">{{ order.type }}</p>
                  <p class="order-time">{{ getTime(order) }}</p>
               </div>
               <div class="order-body">
                  <v-order-info :order="order"></v-order-info>

                  <ul>
                     <v-dish-item
                        :dish="dish"
                        v-for="dish in order.dishes"
                        :key="dish.key"
                     ></v-dish-item>
                  </ul>

                  <v-order-count-money
                     :order="order"
                     :adminMode="adminMode"
                  ></v-order-count-money>
               </div>
            </li>
         </ul>
      </div>
   </div>
</template>

<script>
import db from "../../firebase/firebase-init";
import firebase from "firebase/app";
import DishItem from "./DishItem.vue";
import OrderInfo from "./OrderInfo.vue";
import OrderCountMoney from "./OrderCountMoney.vue";
import { countDiscount, service } from "../Shared/countMoneyMixin";

export default {
   components: {
      "v-order-info": OrderInfo,
      "v-dish-item": DishItem,
      "v-order-count-money": OrderCountMoney
   },
   data() {
      return {
         orders: [],
         months: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
         ],
         passwordInput: "",
         passwordCorrect: "hello",
         loading: false
      };
   },
   methods: {
      getTime: function(order) {
         let time = order.time.toString().split(" ")[4];
         time = time.substring(0, time.lastIndexOf(":"));
         return time;
      },
      getMonth: function(order) {
         return this.months[order.time.getMonth()];
      }
   },
   created() {
      db.collection("historyChecks")
         .orderBy("time", "desc")
         .onSnapshot({ includeMetadataChanges: true }, querySnapshot => {
            var source = querySnapshot.metadata.fromCache
               ? "local cache"
               : "server";

            this.orders = [];
            querySnapshot.forEach(doc => {
               let order = {
                  ...doc.data(),
                  id: doc.id,
                  time: doc.data().time.toDate()
               };

               this.orders.push(order);
            });
         });
   },
   computed: {
      adminMode() {
         if (this.$store.state.auth.user) {
            return this.$store.state.auth.user.status !== "Официант";
         } else return false;
      },
      waiterName() {
         if (!this.adminMode && this.$store.state.auth.user) {
            return this.$store.state.auth.user.name;
         }
         return null;
      }
   }
};
</script>

<style scoped>
.container {
   padding-bottom: 4rem;
}
.title {
   text-align: center;
   color: #4e0000;
   font-weight: lighter;
   font-size: 1.7rem;
   margin: 0.5rem 0;
}
.order-item {
   color: #6b0606;
   border: 2px solid #af3d3d;
   background: #ffd5d5;
   border-radius: 0.2rem;
   margin-bottom: 1.5rem;
   position: relative;
   padding-bottom: 0.3rem;
}
.order-header {
   display: flex;
   justify-content: space-between;
   background: #a02a2a;
   color: #ffffff;
   padding: 0 0.4rem;
   align-items: center;
}
.order-info {
   font-size: 1.2rem;
   margin-bottom: 0.3rem;
}
.order-body {
   padding: 0 0.4rem;
}
.order-type {
   font-size: 1.5rem;
}
.button-group {
   margin-top: 0.5rem;
   display: flex;
   justify-content: space-around;
}
.button {
   border: 1.1px solid #6d00002c;
   border-radius: 0.2rem;
   padding: 0 0.8rem;
   cursor: pointer;
   flex: 1;
   text-align: center;
   margin: 0 0.2rem;
   background: #ffc0c0;
   user-select: none;
}
.button:hover {
   background: #ff9a9a;
   color: #380000;
}
.button:active {
   background: #ff6767;
}
</style>