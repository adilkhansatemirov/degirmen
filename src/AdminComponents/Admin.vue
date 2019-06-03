<template>
  <div>
    <!-- <input v-model="ip" type="text" placeholder="ip"> -->
    <!-- <input v-model="text" type="text" placeholder="text"> -->
    <!-- <button @click.prevent="postRequest()">post data</button> -->
    <!-- <button @click="fillHistory()">Fill history</button> -->
    <button @click="correctHistory()">Fill dishes</button>
    <button @click="fillHistory()">Fill history</button>
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
      ],
      names: [
        "baklavas",
        "breakfasts",
        "cakes",
        "cocktails",
        "doners",
        "drinks",
        "garnirs",
        "hotDrinks",
        "iceCreams",
        "mainDishes",
        "pizzas",
        "salats",
        "shashlyks",
        "soups",
        "tandyrs"
      ]
    };
  },
  methods: {
    fillHistoryTemplate: function() {
      const dishSets = [];
      db.collection("dishes")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            dishSets.push(doc.data());
          });
        })
        .then(() => {
          const dishes = {};
          const names = [
            "baklavas",
            "breakfasts",
            "cakes",
            "cocktails",
            "doners",
            "drinks",
            "garnirs",
            "hotDrinks",
            "iceCreams",
            "mainDishes",
            "pizzas",
            "salats",
            "shashlyks",
            "soups",
            "tandyrs"
          ];
          dishSets.forEach((dishSet, i) => {
            dishes[names[i]] = [];
            const arrayOfDishes = dishSet[names[i]];
            arrayOfDishes.forEach(dish => {
              dishes[names[i]].push({
                name: dish.name,
                costSmall: dish.costSmall,
                costStand: dish.costStand,
                counterSmall: 0,
                counterStand: 0
              });
            });
          });

          const waitersStats = [
            {
              counterMoney: 0,
              counterOrders: 0,
              name: "Арман"
            },
            {
              counterMoney: 0,
              counterOrders: 0,
              name: "Бекзат"
            }
          ];
          const counterMoney = 0;
          const deliveryMoney = 0;
          const discountMoney = 0;
          db.collection("history")
            .doc("Today")
            .set({
              dishes,
              waitersStats,
              counterMoney,
              deliveryMoney,
              discountMoney
            })
            .then(docRef => {
              console.log(docRef);
              console.log("success");
            });
        });
    },
    correctHistory() {
      db.collection("history")
        .doc("Today")
        .get()
        .then(doc => {
          let {
            dishes,
            waitersStats,
            counterMoney,
            deliveryMoney,
            discountMoney
          } = doc.data();
          console.log(dishes);
          this.names.forEach(sectionName => {
            dishes[sectionName] = dishes[sectionName].map(dish => {
              let newDish = { ...dish };
              newDish.counterMoney = 0;
              return newDish;
            });
          });
          console.log(dishes);
          db.collection("history")
            .doc("Today")
            .set({
              dishes,
              waitersStats,
              counterMoney,
              deliveryMoney,
              discountMoney
            })
            .then(docRef => {
              console.log(docRef);
              console.log("success");
            });
        });
    },
    fillHistory: function() {
      db.collection("history")
        .doc("Today")
        .get()
        .then(doc => {
          const {
            counterMoney,
            deliveryMoney,
            discountMoney,
            dishes,
            waitersStats
          } = doc.data();

          this.months.forEach(month => {
            db.collection("history")
              .doc(month)
              .set({
                counterMoney,
                deliveryMoney,
                discountMoney,
                dishes,
                waitersStats
              })
              .then(() => {
                console.log("Document successfully written!");
              })
              .catch(error => {
                console.error("Error writing document: ", error);
              });
          });
        });
    },
    fillDishes: function() {
      db.collection("dishes")
        .doc("iceCreams")
        .get()
        .then(doc => {
          let names = [
            "Сливочное",
            "Клубничное",
            "Вишневое",
            "Шоколадное",
            "Киви",
            "Банановое",
            "Фисташковое",
            "Сливочное мараш"
          ];

          let iceCreams = [];
          names.forEach(name => {
            iceCreams.push({
              name,
              costSmall: 0,
              costStand: 200,
              portionSmall: "Половина",
              portionStand: "Порция",
              type: "Мороженое"
            });
          });
          console.log(iceCreams);

          db.collection("dishes")
            .doc("iceCreams")
            .set({
              iceCreams
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
