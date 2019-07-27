<template>
   <div class="root">
      <div
         class="background"
         ref="basketBackground"
         @click="closeBasket($event)"
      >
         <div class="modal-box">
            <div class="slide-container" ref="slideContainer">
               <!-- DELIVERY SLIDE -->
               <div class="slide-item">
                  <h3>Доставка</h3>
                  <form @submit.prevent="saveOrder()">
                     <div class="address-input">
                        <label for="address">Адрес</label>
                        <input
                           type="text"
                           ref="address"
                           name="address"
                           id="address"
                           required
                        />
                     </div>
                     <div class="address-input">
                        <label for="phoneNumber">Номер телефона</label>
                        <input
                           type="tel"
                           ref="phoneNumber"
                           name="phoneNumber"
                           id="phoneNumber"
                           required
                        />
                     </div>
                     <div class="button-group">
                        <button class="button" type="submit">
                           Принять заказ
                           <font-awesome-icon icon="utensils" />
                        </button>
                        <a class="button" @click="returnToOrders()">
                           Назад
                           <font-awesome-icon icon="arrow-right" />
                        </a>
                     </div>
                  </form>
               </div>

               <!-- DISHES SLIDE -->
               <div class="slide-item">
                  <div class="basket-empty" v-if="basket.length == 0">
                     Корзина пуста
                  </div>
                  <h3>Заказ</h3>
                  <div v-if="basket.length != 0" class="button-group">
                     <a class="button" @click="moveToDelivery()">
                        Доставка
                        <font-awesome-icon icon="car-side" />
                     </a>
                     <a class="button" @click="moveToCafe()">
                        Кафе
                        <font-awesome-icon icon="store-alt" />
                     </a>
                  </div>
                  <ul class="dish-list">
                     <div
                        class="dish-item opacity-half"
                        v-if="basket.length !== 0"
                     >
                        <p class="dish-name">Блюдо</p>
                        <p class="dish-cost">Цена</p>
                        <p class="dish-amount">Количество</p>
                        <p class="dish-total">Стоимость</p>
                     </div>
                     <li
                        class="dish-item"
                        v-for="dish in basket"
                        :key="dish.key"
                     >
                        <p class="dish-name">{{ dish.dish.name }}</p>
                        <p class="dish-cost">{{ dish.dish.cost }}</p>
                        <p class="dish-amount">
                           <span
                              @click="amountChange(dish, -1)"
                              v-if="isInt(dish.amount)"
                           >
                              <font-awesome-icon icon="minus" />
                           </span>
                           {{ dish.amount }}
                           <span
                              @click="amountChange(dish, 1)"
                              v-if="isInt(dish.amount)"
                           >
                              <font-awesome-icon icon="plus" />
                           </span>
                        </p>
                        <p class="dish-total">
                           {{ dish.amount * dish.dish.cost }}
                        </p>
                     </li>
                     <div class="dish-total" v-if="basket.length !== 0">
                        Итого: {{ countTotal() }}
                     </div>
                  </ul>
                  <div class="change-order-container" v-if="!newOrder()">
                     <h4 class="change-order__header">
                        Дозаказ
                        <button class="button change-order__print-button" v-if="secondBasket.length !== 0" @click="printRequest()">
                           На кухню<font-awesome-icon
                              icon="print"
                           ></font-awesome-icon>
                        </button>
                     </h4>
                     <ul>
                        <li
                           class="dish-item"
                           v-for="dish in secondBasket"
                           :key="dish.key"
                        >
                           <p class="dish-name">{{ dish.dish.name }}</p>
                           <p class="dish-cost">{{ dish.dish.cost }}</p>
                           <p class="dish-amount">
                              <span
                                 @click="amountChange(dish, -1)"
                                 v-if="isInt(dish.amount)"
                              >
                                 <font-awesome-icon icon="minus" />
                              </span>
                              {{ dish.amount }}
                              <span
                                 @click="amountChange(dish, 1)"
                                 v-if="isInt(dish.amount)"
                              >
                                 <font-awesome-icon icon="plus" />
                              </span>
                           </p>
                           <p class="dish-total">
                              {{ dish.amount * dish.dish.cost }}
                           </p>
                        </li>
                     </ul>
                  </div>
                  <button
                     v-if="basket.length !== 0"
                     class="button clear-basket"
                     @click="clearBasket()"
                  >
                     Очистить корзину
                  </button>
               </div>

               <!-- CAFE SLIDE -->
               <div class="slide-item">
                  <h3>Кафе</h3>
                  <div class="takeaway-holder">
                     <input
                        type="checkbox"
                        name="takeaway"
                        v-model="takeaway"
                        id="takeaway"
                     />
                     <label class="takeaway-check" for="takeaway"
                        >С собой</label
                     >
                  </div>
                  <form @submit.prevent="saveOrder()" class="cafe-form">
                     <div v-if="!takeaway">
                        <div class="waiter-name">
                           <label for="waiter-name">Имя официанта</label>
                           <select
                              v-if="adminMode"
                              v-model="waiterName"
                              name="waiterName"
                              id="waiterName"
                              required
                           >
                              <option
                                 v-for="waiter in waitersList"
                                 :key="waiter.uid"
                                 >{{ waiter.name }}</option
                              >
                           </select>
                           <input
                              id="waiterName"
                              v-else
                              type="text"
                              :value="waiterName"
                              readonly
                           />
                        </div>
                        <div class="table">
                           <label for="table">Столик</label>
                           <input
                              type="number"
                              min="1"
                              max="25"
                              ref="table"
                              name="table"
                              id="table"
                              required
                           />
                        </div>
                     </div>
                     <label for="discount">Скидка</label>
                     <input
                        type="number"
                        min="0"
                        max="50"
                        ref="discount"
                        name="discount"
                        id="discount"
                        value="0"
                        required
                     />
                     <div class="button-group">
                        <a class="button" @click="returnToOrders()">
                           <font-awesome-icon icon="arrow-left" />К заказам
                        </a>
                        <button class="button" type="submit">
                           Принять заказ
                           <font-awesome-icon icon="utensils" />
                        </button>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import db from "../../../firebase/firebase-init";
import firebase, { functions } from "firebase/app";
const axios = require("axios");

export default {
   data() {
      return {
         slideContainer: null,
         width: null,
         position: null,
         takeaway: false,
         waiterName: null
      };
   },
   computed: {
      user() {
         return this.$store.getters.getCurrentUser;
      },
      adminMode() {
         return this.user.status === "Администратор";
      },
      waitersList() {
         return this.$store.state.waiters.waitersList;
      },
      basket() {
         return this.$store.state.basket.basket;
      },
      secondBasket() {
         return this.$store.state.basket.secondBasket;
      }
   },
   methods: {
      isHalf: function(dish) {
         if (dish.cost == dish.costSmall) {
            return true;
         }
         return false;
      },
      isInt: function(amount) {
         return Number.isInteger(amount);
      },
      newOrder: function() {
         return Object.keys(this.$route.params).length === 0;
      },
      amountChange: function(dish, number) {
         //if plus is pressed
         if (number === 1) {
            this.$store.dispatch("addToBasket", dish.dish);
            if (!this.newOrder()) {
               this.$store.dispatch("addToSecondBasket", dish.dish);
            }
         } else {
            //delete dish in basket
            this.$store.dispatch("decreaseAmount", dish.dish);
         }
      },
      closeBasket: function(event) {
         if (event.target == this.$refs.basketBackground) {
            this.$store.dispatch("closeBasket");
         }
      },
      moveToDelivery: function() {
         this.slideContainer.style.transition = "transform 0.4s ease-in-out";
         this.slideContainer.style.transform = `translateX(${0}px)`;
         this.position = "delivery";
      },
      moveToCafe: function() {
         this.slideContainer.style.transition = "transform 0.4s ease-in-out";
         this.slideContainer.style.transform = `translateX(${-2 *
            this.width}px)`;
         this.position = "cafe";
      },
      returnToOrders: function() {
         this.slideContainer.style.transition = "transform 0.4s ease-in-out";
         this.slideContainer.style.transform = `translateX(${-this.width}px)`;
         this.position = null;
      },
      saveOrder: function() {
         const orderToPost = compileOrder();
         if (this.newOrder()) {
            //if new order
            db.collection("currentOrders")
               .add(orderToPost)
               .then(docRef => {
                  console.log(docRef);
               });
         } else {
            //if update order
            db.collection("currentOrders")
               .doc(this.$route.params.orderId)
               .set(orderToPost)
               .then(docRef => {
                  console.log("written");
               });
         }
         // this.printRequest(orderToPost);
         this.$store.dispatch("setBasket", []);
         this.$store.dispatch("setSecondBasket", []);
         this.$router.push("/orders");
      },
      compileOrder: function() {
         const order = {
            time: new Date(),
            total: this.countTotal(),
            dishes: this.basket
         };
         if (this.position == "delivery") {
            order.address = this.$refs.address.value;
            order.phoneNumber = this.$refs.phoneNumber.value;
            order.type = "Доставка";
         } else if (this.position == "cafe") {
            if (!this.takeaway) {
               order.waiterName = this.waiterName;
               order.table = this.$refs.table.value;
            }
            order.discount = this.$refs.discount.value;
            order.type = "Кафе";
         }
         order.takeaway = this.takeaway;

         return order;
      },
      printRequest: function() {
         const order = compileOrder();
         order.dishes = this.secondBasket;
         const data = {
            order
         };
         const config = {
            responseType: "text"
         };
         axios
            // .post("/test/index.php", data, config)
            .post("/print/example/interface/ethernet.php", data, config)
            .then(function(response) {
               console.log(response);
               console.log("Responce was handled.");
            })
            .catch(function(error) {
               console.log(error);
            });
      },
      countTotal: function() {
         let total = 0;
         this.basket.forEach(dish => {
            total += dish.dish.cost * dish.amount;
         });
         return total;
      },
      clearBasket: function() {
         this.$store.dispatch("setBasket", []);
         this.$store.dispatch("setSecondBasket", []);
      },
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
   },
   mounted() {
      //adjusting slider
      this.slideContainer = this.$refs.slideContainer;
      this.width = this.slideContainer.offsetWidth;
      this.slideContainer.style.transform = `translateX(${-this.width}px)`;

      //if entered in update order
      if (!this.newOrder()) {
         db.collection("currentOrders")
            .doc(this.$route.params.orderId)
            .get()
            .then(doc => {
               if (doc.data().type == "Доставка") {
                  this.$refs.address.value = doc.data().address;
               } else {
                  if (doc.data().takeaway) {
                     this.takeaway = doc.data().takeaway;
                  } else {
                     this.waiterName = doc.data().waiterName;
                     this.$refs.table.value = doc.data().table;
                  }
                  this.$refs.discount.value = doc.data().discount;
               }
            });
      }
   },
   created() {
      //setting adminMode
      if (this.adminMode) {
         this.$store.dispatch("getWaitersList");
      } else {
         this.waiterName = this.user.name;
      }
   }
};
</script>

<style scoped>
.background {
   width: 100%;
   height: 100%;
   position: fixed;
   left: 0;
   top: 0;
   z-index: 3;
   background: rgba(0, 0, 0, 0.5);
   display: flex;
   align-items: center;
   justify-content: center;
}
.modal-box {
   width: 70%;
   height: 50%;
   border: 3px solid #4d0a0a;
   color: #4d0a0a;
   overflow: hidden;
}
.slide-container {
   display: flex;
   width: 100%;
   height: 100%;
}
.slide-item {
   min-width: 100%;
   position: relative;
   background: #ffaeae;
   overflow: auto;
   padding-bottom: 3rem;
}
form {
   position: relative;
}
.button-group {
   display: flex;
   justify-content: space-around;
   width: 100%;
   margin: 1rem 0;
   z-index: 5;
}
button {
   font-family: "Oswald", sans-serif;
   font-size: 1rem;
   color: #4d0a0a;
}
.button {
   border: 1px solid #680a0a3b;
   border-radius: 0.2rem;
   padding: 0.3rem 0.8rem;
   cursor: pointer;
   flex: 1;
   text-align: center;
   margin: 0 0.2rem;
   background: #fdc7c7;
   user-select: none;
}
.button:hover {
   background: #ffd8d8;
   -webkit-box-shadow: 2px 2px 3px 0 rgba(42, 42, 42, 0.6);
   -moz-box-shadow: 2px 2px 3px 0 rgba(42, 42, 42, 0.6);
   box-shadow: 2px 2px 3px 0 rgba(42, 42, 42, 0.6);
}
.button:active {
   background: #ffbbbb;
}
/* Main slide */
.clear-basket {
   padding: 0 0.3rem;
   position: fixed;
   bottom: 1rem;
   left: 150%;
   width: 10rem;
   transform: translateX(-50%);
}
.basket-empty {
   position: absolute;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   font-size: 1.4rem;
   opacity: 0.5;
}
h3 {
   font-size: 1.5rem;
   text-align: center;
   font-weight: lighter;
}
.dish-list,
.change-order-container {
   padding: 0 0.5rem;
}
.dish-item {
   display: flex;
   justify-content: space-between;
   border-bottom: 1px solid #b8676744;
   margin-bottom: 0.3rem;
}
.dish-name {
   flex: 3;
}
.dish-cost {
   flex: 1;
   text-align: right;
}
.dish-amount {
   flex: 1;
   text-align: right;
}
.dish-amount span {
   font-size: 1.1rem;
   margin: 0 0.2rem;
}
.dish-amount span:hover {
   color: #db0404;
}
.dish-total {
   flex: 1;
   text-align: right;
}
.dish-total,
.dish-amount,
.dish-cost {
   display: flex;
   align-items: center;
   justify-content: flex-end;
}
/* Delivery slide*/
.address-input {
   margin-top: 1rem;
   display: flex;
}
.address-input label {
   margin-left: 0.5rem;
   font-size: 1.2rem;
   text-align: center;
   display: block;
}
.address-input input {
   margin: 0 0.5rem;
   padding: 0.2rem;
   flex: 1;
   border: none;
   font-family: "Oswald", sans-serif;
   letter-spacing: 1px;
   font-size: 1rem;
   border-radius: 0.2rem;
}
/* Cafe slide */
input[type="checkbox"] {
   display: none;
}
.takeaway-holder {
   margin: 1rem 0;
   text-align: center;
}
.takeaway-check {
   width: 100%;
   text-align: center;
   padding: 0.5rem 0;
   font-size: 1.3rem;
}
.takeaway-check:before {
   content: "";
   width: 1.3rem;
   height: 1.3rem;
   display: inline-block;
   border: 1px solid #df6363;
   vertical-align: middle;
   margin-right: 0.4rem;
   margin-bottom: 0.3rem;
   border-radius: 0.2rem;
}
.takeaway-check:hover:before {
   background: #ffe9e9;
}
input[type="checkbox"]:checked + .takeaway-check:before {
   content: "\2713";
   font-size: 1rem;
   font-weight: bold;
   color: #9a2928;
   text-align: center;
}
.cafe-form {
   text-align: center;
}
select {
   display: block;
}
.cafe-form input,
select {
   margin: 0 auto;
   width: 30%;
   padding: 0.2rem;
   border-radius: 0.2rem;
   border: none;
   margin-bottom: 0.5rem;
}
.cafe-form label {
   font-size: 1.2rem;
}
.change-order-container {
   margin-top: 1rem;
}
.change-order__header {
   display: flex;
   justify-content: space-between;
}
.change-order__print-button {
   flex: none;
   padding: 0 0.5rem;
}
@media (max-width: 900px) {
   .modal-box {
      width: 80%;
   }
}
@media (max-width: 800px) {
   .modal-box {
      width: 90%;
      height: 75%;
   }
   .dish-name {
      flex: 2;
   }
}
</style>