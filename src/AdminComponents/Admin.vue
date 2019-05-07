<template>
  <div>
    <!-- <input v-model="ip" type="text" placeholder="ip"> -->
    <!-- <input v-model="text" type="text" placeholder="text"> -->
    <!-- <button @click.prevent="postRequest()">post data</button> -->
    <!-- <button @click="fillHistory()">Fill history</button> -->
    <button @click="fillDishes()">Fill dishes</button>
    <!-- <button @click="clearHistory()">Clear history</button> -->
  </div>
</template>

<script>
import db from "../firebase/firebase-init";
const axios = require("axios");

export default {
  data() {
    return {
      ip: "",
      text: "",
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
      ]
    };
  },
  methods: {
    fillHistory: function() {
      db.collection("history")
        .doc("Today")
        .get()
        .then(doc => {
          let waitersMoney = doc.data().waitersMoney;

          let deliveryMoney = doc.data().deliveryMoney;
          let discountMoney = doc.data().discountMoney;
          let counterTotal = doc.data().counterTotal;
          let dishes = doc.data().dishes;

          let dishes1 = dishes.slice(0, 29);
          let dishes2 = dishes.slice(38);
          dishes = [];

          //continue with other dishes
          db.collection("dishes")
            .doc("cakes")
            .get()
            .then(doc => {
              let cakes = doc.data().cakes;
              for (let i = 0; i < cakes.length; i++) {
                let dish = {
                  costSmall: cakes[i].costSmall,
                  costStand: cakes[i].costStand,
                  counterMoney: 0,
                  counterSmall: 0,
                  counterStand: 0,
                  name: cakes[i].name,
                  type: "Донеры"
                };
                let dish1 = {
                  costSmall: cakes[i].costSmall,
                  costStand: cakes[i].costStand,
                  counterMoney: 0,
                  counterSmall: 0,
                  counterStand: 0,
                  name: cakes[i].name + " (с сыром)",
                  type: "Донеры"
                };
                dishes1.push(dish);
                dishes1.push(dish1);
              }

              for (let i = 0; i < dishes1.length; i++) {
                dishes.push(dishes1[i]);
              }
              for (let i = 0; i < dishes2.length; i++) {
                dishes.push(dishes2[i]);
              }

              db.collection("history")
                .doc("Today")
                .set({
                  dishes,
                  waitersMoney,
                  deliveryMoney,
                  discountMoney,
                  counterTotal
                });
            });

          // db.collection("history")
          //   .doc("Yesterday")
          //   .set({
          //     dishes,
          //     waitersMoney,
          //     deliveryMoney,
          //     discountMoney,
          //     counterTotal
          //   });

          // for (let i = 0; i < this.months.length; i++) {
          //   db.collection("history")
          //     .doc(this.months[i])
          //     .set({
          //       dishes,
          //       waitersMoney,
          //       deliveryMoney,
          //       discountMoney,
          //       counterTotal
          //     });
          // }
        });
    },
    fillDishes: function() {
      db.collection("dishes")
        .doc("cakes")
        .get()
        .then(doc => {
          let cakes = doc.data().cakes;
          let names = [
            "Серце твое",
            "Трио",
            "Биттер",
            "Пончик",
            "Траличе",
            "Пирамида",
            "Фисташковый спанч",
            "Чизкейк",
            "Профитроли",
            "Тирамису",
            "Суфле фруктовое",
            "Темный лес",
            "Блондинка",
            "Сникерс",
            "Макаронс"
          ];

          console.log(doc.data());

          // let cakes = [];
          names.forEach((name, index) => {
            console.log(cakes);

            cakes.push({
              name,
              costSmall: 550,
              costStand: 800,
              portionSmall: "200г",
              portionStand: "500г",
              type: "Пироженое"
            });
            // cakes[index] = {
            //   name,
            //   costSmall: 550,
            //   costStand: 800,
            //   portionSmall: "200г",
            //   portionStand: "500г",
            //   type: "Пироженое"
            // };
          });

          db.collection("dishes")
            .doc("cakes")
            .set({
              cakes
            })
            .then(() => {
              console.log("Written");
            })
            .catch(error => {
              console.log(error.response);
            });
        });
    },
    clearHistory: function() {
      db.collection("history")
        .doc("Today")
        .get()
        .then(doc => {
          let dishes = doc.data().dishes;
          let waitersMoney = doc.data().waitersMoney;
          let deliveryMoney = doc.data().deliveryMoney;
          let discountMoney = doc.data().discountMoney;
          let counterTotal = doc.data().counterTotal;

          for (let i = 0; i < dishes.length; i++) {
            dishes[i].counterSmall = 0;
            dishes[i].counterStand = 0;
            dishes[i].counterMoney = 0;
          }
          for (let i = 0; i < waitersMoney.length; i++) {
            waitersMoney[i].numberOfOrders = 0;
            waitersMoney[i].counterMoney = 0;
          }

          deliveryMoney = 0;
          discountMoney = 0;
          counterTotal = 0;

          db.collection("history")
            .doc("Today")
            .set({
              dishes,
              waitersMoney,
              deliveryMoney,
              discountMoney,
              counterTotal
            });
          db.collection("history")
            .doc("Yesterday")
            .set({
              dishes,
              waitersMoney,
              deliveryMoney,
              discountMoney,
              counterTotal
            });

          // for (let i = 0; i < this.months.length; i++) {
          //   db.collection("history")
          //     .doc(this.months[i])
          //     .set({
          //       dishes,
          //       waitersMoney,
          //       deliveryMoney,
          //       discountMoney,
          //       counterTotal
          //     });
          // }
        });
    },
    postRequest: function() {
      const data = {
        ip: this.ip,
        text: this.text
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
    }
  }
};
</script>

<style>
</style>
