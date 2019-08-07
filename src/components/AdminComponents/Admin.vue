<template>
   <div>
      <!-- <input v-model="ip" type="text" placeholder="ip"> -->
      <!-- <input v-model="text" type="text" placeholder="text"> -->
      <!-- <button @click.prevent="postRequest()">post data</button> -->
      <!-- <button @click="fillHistory()">Fill history</button> -->
      <button @click="countAndFix()">BUTTON</button>
   </div>
</template>

<script>
import db from "../../firebase/firebase-init";
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
      deleteDish: function() {
         // db.collection("dishes")
         //    .doc(dish.type)
         //    .get()
         //    .then(doc => {
         // let updatedDishes = doc.data()[dish.type];
         // for (let i = 0; i < updatedDishes.length; i++) {
         //    if (updatedDishes[i].name === dish.name) {
         //       updatedDishes.splice(i, 1);
         //       break;
         //    }
         // }

         // db.collection("dishes")
         //    .doc(dish.type)
         //    .update({
         //       [dish.type]: updatedDishes
         //    })
         //    .then(() => {});

         let counter = 0;
         db.collection("history")
            .get()
            .then(snapshot => {
               snapshot.forEach(doc => {
                  let updatedDishesHistory = doc.data().dishes;
                  for (
                     let i = 0;
                     i < updatedDishesHistory["cakes"].length;
                     i++
                  ) {
                     if (
                        updatedDishesHistory["cakes"][i].name === "Брауни кусок"
                     ) {
                        updatedDishesHistory["cakes"].splice(i, 1);
                        break;
                     }
                  }

                  db.collection("history")
                     .doc(doc.id)
                     .update({
                        dishes: updatedDishesHistory
                     })
                     .then(() => {
                        counter++;
                        if (counter === 13) {
                           console.log("Deleted");
                        }
                     });
               });
            });
         // });
      },
      fillHistoryTemplate: function() {
         // const dishSets = [];
         // db.collection("dishes")
         //    .get()
         //    .then(querySnapshot => {
         //       querySnapshot.forEach(doc => {
         //          dishSets.push(doc.data());
         //       });
         //    })
         //    .then(() => {
         //       const dishes = {};
         //       const names = [
         //          "baklavas",
         //          "breakfasts",
         //          "cakes",
         //          "cocktails",
         //          "doners",
         //          "drinks",
         //          "garnirs",
         //          "hotDrinks",
         //          "iceCreams",
         //          "mainDishes",
         //          "pizzas",
         //          "salats",
         //          "shashlyks",
         //          "soups",
         //          "tandyrs"
         //       ];
         //       dishSets.forEach((dishSet, i) => {
         //          dishes[names[i]] = [];
         //          const arrayOfDishes = dishSet[names[i]];
         //          arrayOfDishes.forEach(dish => {
         //             dishes[names[i]].push({
         //                name: dish.name,
         //                costSmall: dish.costSmall,
         //                costStand: dish.costStand,
         //                counterSmall: 0,
         //                counterStand: 0
         //             });
         //          });
         //       });

         db.collection("dishes")
            .get()
            .then(snapshot => {
               let dishes = {};
               snapshot.forEach(doc => {
                  dishes[doc.id] = doc.data()[doc.id];
               });
               for (const dishSet in dishes) {
                  dishes[dishSet] = dishes[dishSet].map(dish => {
                     return {
                        name: dish.name,
                        costSmall: dish.costSmall,
                        costStand: dish.costStand,
                        counterSmall: 0,
                        counterStand: 0,
                        counterMoney: 0
                     };
                  });
               }
               console.log(dishes);

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
         // });
      },
      correctHistory() {
         db.collection("dishes")
            .doc("mainDishes")
            .get()
            .then(doc => {
               let mainDishes = doc.data().mainDishes;
               mainDishes = mainDishes.map(dish => {
                  return {
                     ...dish,
                     costSmall: dish.costStand / 2,
                     portionSmall: "Половина",
                     portionStand: "Порция"
                  };
               });
               db.collection("dishes")
                  .doc("mainDishes")
                  .set({
                     ...doc.data(),
                     mainDishes
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

               // this.months.forEach(month => {
               //    db.collection("history")
               //       .doc(month)
               //       .set({
               //          counterMoney,
               //          deliveryMoney,
               //          discountMoney,
               //          dishes,
               //          waitersStats
               //       })
               //       .then(() => {
               //          console.log("Document successfully written!");
               //       })
               //       .catch(error => {
               //          console.error("Error writing document: ", error);
               //       });
               // });
               db.collection("history")
                  .doc("Yesterday")
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
      createDocument: function() {
         db.collection("dishes")
            .doc("others")
            .set({
               others: [
                  {
                     costSmall: 200,
                     costStand: 300,
                     name: "Свечи",
                     portionSmall: "10 шт",
                     portionStand: "20 шт"
                  },
                  {
                     costSmall: 0,
                     costStand: 100,
                     name: "Леденец",
                     portionSmall: "(нет)",
                     portionStand: "Штука"
                  }
               ],
               sectionName: "Другое"
            });
      },
      createDocument2: function() {
         let counter = 0;
         db.collection("history")
            .get()
            .then(snapshot => {
               snapshot.forEach(doc => {
                  const updatedHistory = {
                     ...doc.data().dishes,
                     others: [
                        {
                           costSmall: 200,
                           costStand: 300,
                           name: "Свечи",
                           portionSmall: "10 шт",
                           portionStand: "20 шт"
                        },
                        {
                           costSmall: 0,
                           costStand: 100,
                           name: "Леденец",
                           portionSmall: "(нет)",
                           portionStand: "Штука"
                        }
                     ]
                  };

                  db.collection("history")
                     .doc(doc.id)
                     .update({
                        dishes: updatedHistory
                     })
                     .then(() => {
                        console.log(counter++);
                     });
               });
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
      },
      countAndFix: function() {
         let aigerimOrders = 0;
         let aigerimMoney = 0;

         let edaOrders = 0;
         let edaMoney = 0;

         db.collection("historyChecks")
            .get()
            .then(snapshot => {
               snapshot.forEach(doc => {
                  if (
                     doc.data().waiterName &&
                     doc.data().waiterName == "Айгерим"
                  ) {
                     aigerimOrders++;
                     aigerimMoney += doc.data().total / 20;
                  }
                  if (doc.data().waiterName && doc.data().waiterName == "Эда") {
                     edaOrders++;
                     edaMoney += doc.data().total / 20;
                  }
                  console.log(edaOrders, edaMoney);
                  console.log(aigerimOrders, aigerimMoney);
               });
            });
      }
   }
};
</script>

<style>
</style>
