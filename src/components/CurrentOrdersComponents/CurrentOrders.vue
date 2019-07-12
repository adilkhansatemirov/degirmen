<template>
   <div>
      <div class="container">
         <h2 class="title">Заказы</h2>
         <!-- TEXTFIELD TO UNLOCK ADMIN PRIVILIGES -->
         <div class="unlock-save-order-holder" v-if="adminMode">
            <p class="unlock-save-order-message">
               Введите пароль чтобы сохранить заказ или закрыть кассу
            </p>
            <input
               class="unlock-save-order-input"
               ref="passwordToSaveInput"
               placeholder="пароль"
               type="password"
               v-model="passwordInput"
            />
         </div>

         <div v-if="adminMode">
            <a
               class="close-cashier-button"
               @click="clearHistory()"
               v-if="orders.length === 0 && passwordCorrect === passwordInput"
            >
               <p v-if="loading">Подождите..</p>
               <p v-else>Закрыть кассу на сегодня</p>
            </a>
            <a
               class="close-cashier-button disabled"
               v-else-if="
                  orders.length === 0 && passwordCorrect !== passwordInput
               "
               >Закрыть кассу на сегодня</a
            >
         </div>

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

                  <div class="button-group" v-if="showOrderActions(order)">
                     <a class="button" @click="updateOrder(order)">Изменить</a>
                     <a class="button" @click="cancelOrder(order)">Отменить</a>
                     <div v-if="adminMode">
                        <a
                           class="button"
                           v-if="passwordCorrect == passwordInput"
                           @click="archiveOrder(order)"
                           >Сохранить</a
                        >
                        <a class="button disabled" v-else>Сохранить</a>
                     </div>
                  </div>
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
      },
      updateOrder: function(order) {
         this.$router.push(`/update/${order.id}`);
      },
      cancelOrder: function(order) {
         console.log(order);

         db.collection("currentOrders")
            .doc(order.id)
            .delete()
            .then(() => {
               console.log("Document successfully deleted!");
            });
      },
      showOrderActions: function(order) {
         if (this.adminMode) return true;
         if (!order.hasOwnProperty("waiterName")) {
            return false;
         }
         return order.waiterName === this.waiterName;
      },
      archiveOrder: function(order) {
         this.passwordInput = "";
         this.updateHistory(order, "Today");
         // this.updateHistory(order, this.getMonth(order));
         this.cancelOrder(order);
      },
      updateHistory: function(order, time) {
         db.collection("history")
            .doc(time)
            .get()
            .then(doc => {
               //get info from database
               let dishes = doc.data().dishes;
               let waitersStats = doc.data().waitersStats;
               let deliveryMoney = doc.data().deliveryMoney;
               let discountMoney = doc.data().discountMoney;
               let counterMoney = doc.data().counterMoney;

               const updateGarnirHistory = dish => {
                  dish.dish.garnirs.forEach(garnirOrder => {
                     dishes.garnirs = dishes.garnirs.map(garnirHistory => {
                        if (garnirHistory.name === garnirOrder.name) {
                           if (garnirHistory.costSmall === garnirOrder.cost) {
                              return {
                                 ...garnirHistory,
                                 counterSmall:
                                    garnirHistory.counterSmall + dish.amount,
                                 counterMoney:
                                    garnirHistory.counterMoney +
                                    garnirOrder.cost * dish.amount
                              };
                           } else {
                              return {
                                 ...garnirHistory,
                                 counterStand:
                                    garnirHistory.counterStand + dish.amount,
                                 counterMoney:
                                    garnirHistory.counterMoney +
                                    garnirOrder.cost * dish.amount
                              };
                           }
                        }
                        return garnirHistory;
                     });
                  });
               };

               //iterate through all dishes in basket
               order.dishes.forEach(orderDish => {
                  //override dishes of this type
                  dishes[orderDish.dish.type] = dishes[orderDish.dish.type].map(
                     historyDish => {
                        if (orderDish.dish.nameDefault === historyDish.name) {
                           if (orderDish.dish.type === "mainDishes") {
                              updateGarnirHistory(orderDish);
                              if (
                                 historyDish.costSmall ===
                                 orderDish.dish.costDefault
                              ) {
                                 return {
                                    ...historyDish,
                                    counterSmall:
                                       historyDish.counterSmall +
                                       orderDish.amount,
                                    counterMoney:
                                       historyDish.counterMoney +
                                       orderDish.dish.costDefault *
                                          orderDish.amount
                                 };
                              } else {
                                 return {
                                    ...historyDish,
                                    counterStand:
                                       historyDish.counterStand +
                                       orderDish.amount,
                                    counterMoney:
                                       historyDish.counterMoney +
                                       orderDish.dish.costDefault *
                                          orderDish.amount
                                 };
                              }
                           }
                           if (
                              //if small dish (половина)
                              orderDish.dish.name.includes(
                                 orderDish.dish.portionSmall.toLowerCase()
                              )
                           ) {
                              return {
                                 ...historyDish,
                                 counterSmall:
                                    historyDish.counterSmall + orderDish.amount,
                                 counterMoney:
                                    historyDish.counterMoney +
                                    orderDish.dish.cost * orderDish.amount
                              };
                           } else {
                              //if any other dish except mainDish
                              return {
                                 ...historyDish,
                                 counterStand:
                                    historyDish.counterStand + orderDish.amount,
                                 counterMoney:
                                    historyDish.counterMoney +
                                    orderDish.dish.cost * orderDish.amount
                              };
                           }
                        }
                        return historyDish;
                     }
                  );
               });

               //count discount and delivery money
               if (order.type === "Кафе") {
                  waitersStats = waitersStats.map(waiter => {
                     if (waiter.name === order.waiterName) {
                        return {
                           ...waiter,
                           counterMoney: waiter.counterMoney + service(order),
                           counterOrders: waiter.counterOrders + 1
                        };
                     }
                     return waiter;
                  });
                  discountMoney += countDiscount(order);
               } else {
                  deliveryMoney += 300;
               }
               counterMoney += order.total;

               db.collection("history")
                  .doc(time)
                  .set({
                     dishes,
                     waitersStats,
                     deliveryMoney,
                     discountMoney,
                     counterMoney
                  });
            });
      },
      clearHistory: function() {
         //mutate state to rerender
         const self = this;
         this.$nextTick(() => {
            self.loading = true;
         });

         //prevent nervous clicks
         if (this.loading) {
            return;
         }

         db.collection("history")
            .doc("Today")
            .get()
            .then(doc => {
               //get data from Today
               let dishes = doc.data().dishes;
               let waitersStats = doc.data().waitersStats;
               let deliveryMoney = doc.data().deliveryMoney;
               let discountMoney = doc.data().discountMoney;
               let counterMoney = doc.data().counterMoney;

               //set to Yesterday
               db.collection("history")
                  .doc("Yesterday")
                  .set({
                     dishes,
                     waitersStats,
                     deliveryMoney,
                     discountMoney,
                     counterMoney
                  })
                  .then(() => {
                     //empty Today
                     for (let dishesType in dishes) {
                        dishes[dishesType] = dishes[dishesType].map(dish => {
                           return {
                              ...dish,
                              counterSmall: 0,
                              counterStand: 0,
                              counterMoney: 0
                           };
                        });
                     }

                     waitersStats = waitersStats.map(waiter => {
                        return {
                           ...waiter,
                           counterMoney: 0,
                           counterOrders: 0
                        };
                     });

                     deliveryMoney = 0;
                     discountMoney = 0;
                     counterMoney = 0;

                     db.collection("history")
                        .doc("Today")
                        .set({
                           dishes,
                           waitersStats,
                           deliveryMoney,
                           discountMoney,
                           counterMoney
                        })
                        .then(() => {
                           alert("Завершено");
                           this.passwordInput = "";
                        });
                  });
            });
         this.loading = false;
      },
      allowToSave() {
         return (
            this.$refs.passwordToSaveInput.value == this.passwordToSaveOrder
         );
      }
   },
   created() {
      db.collection("currentOrders")
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

               // console.log(doc.data());

               // const order = {
               //    id: doc.id,
               //    dishes: doc.data().dishes,
               //    time: doc.data().time.toDate(),
               //    type: doc.data().type,
               //    total: doc.data().total
               // };

               // if (doc.data().type == "Доставка") {
               //    order.address = doc.data().address;
               //    order.phoneNumber = doc.data().phoneNumber;
               // } else if (doc.data().type == "Кафе") {
               //    if (!doc.data().takeaway) {
               //       order.waiterName = doc.data().waiterName;
               //       order.table = doc.data().table;
               //    }
               //    order.takeaway = doc.data().takeaway;
               //    order.discount = doc.data().discount;
               // }

               this.orders.push(order);
            });
         });
   },
   computed: {
      adminMode() {
         if (this.$store.state.auth.user) {
            return this.$store.state.auth.user.status !== "Офицант";
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
.close-cashier-button {
   padding: 0.2rem 0.7rem;
   color: #880000;
   border: 1.2px solid #880000;
   background: #fff4f4;
   width: 100%;
   margin: 0.5rem auto 0;
   text-align: center;
   border-radius: 0.2rem;
   cursor: pointer;
}
.close-cashier-button:hover {
   background: #ffffff;
}
.disabled {
   background: #b4aaaa;
   color: #756969;
}
.disabled:hover {
   background: #b4aaaa;
   color: #756969;
}
.unlock-save-order-holder {
   display: flex;
   margin-bottom: 0.5rem;
}
.unlock-save-order-message {
   text-align: center;
   font-size: 0.9rem;
   padding: 0.3rem;
   flex: 2;
   border-radius: 0.3rem 0rem 0rem 0.3rem;
   background: #941f1f;
   color: #ffeaea;
}
.unlock-save-order-input {
   font-family: "Oswald", sans-serif;
   border: 1.5px solid #880000;
   flex: 1;
   padding: 0.3rem;
   border-radius: 0rem 0.3rem 0.3rem 0rem;
}
@media (max-width: 800px) {
   .unlock-save-order-holder {
      flex-direction: column;
   }
   .unlock-save-order-message {
      border-radius: 0.3rem 0.3rem 0rem 0rem;
   }
   .unlock-save-order-input {
      text-align: center;
      border-radius: 0rem 0rem 0.3rem 0.3rem;
   }
}
</style>