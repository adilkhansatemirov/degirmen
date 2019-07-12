import db from "../firebase/firebase-init";
export default {
  state: {
    modalIsOpen: false,
    newDishModalIsOpen: false,
    dishToUpdate: null,
    updating: false,
    counter: 0
  },
  mutations: {
    OPEN_UPDATE_DISHES_MODAL: (state, dish) => {
      state.modalIsOpen = true;
      state.dishToUpdate = dish;
    },
    OPEN_NEW_DISH_MODAL: state => {
      state.newDishModalIsOpen = true;
    },
    CLOSE_NEW_DISH_MODAL: state => {
      state.newDishModalIsOpen = false;
    },
    CLOSE_UPDATE_DISHES_MODAL: state => {
      state.modalIsOpen = false;
    },
    SET_UPDATING: (state, value) => {
      state.updating = value;
    }
  },
  actions: {
    openUpdateDishModal: (context, dish) => {
      context.commit("OPEN_UPDATE_DISHES_MODAL", dish);
    },
    closeUpdateDishModal: context => {
      context.commit("CLOSE_UPDATE_DISHES_MODAL");
    },
    openNewDishModal: context => {
      context.commit("OPEN_NEW_DISH_MODAL");
    },
    closeNewDishModal: context => {
      context.commit("CLOSE_NEW_DISH_MODAL");
    },
    createDish: (context, newDish) => {
      context.commit("CLOSE_NEW_DISH_MODAL");

      // CREATE IN DISHES COLLECTION
      db.collection("dishes")
        .doc(newDish.type)
        .get()
        .then(doc => {
          const docDishes = [...doc.data()[newDish.type]];
          docDishes.push(newDish);

          db.collection("dishes")
            .doc(newDish.type)
            .update({
              [newDish.type]: docDishes
            })
            .then(() => {
              let counter = 0;
              // CREATE IN HISTORY COLLECTION
              db.collection("history")
                .get()
                .then(snapshot => {
                  snapshot.forEach(doc => {
                    const docDishes = { ...doc.data().dishes };
                    docDishes[newDish.type].push({
                      costSmall: newDish.costSmall,
                      costStand: newDish.costStand,
                      name: newDish.name,
                      counterSmall: 0,
                      counterStand: 0,
                      counterMoney: 0
                    });

                    db.collection("history")
                      .doc(doc.id)
                      .update({
                        dishes: docDishes
                      })
                      .then(() => {
                        counter++;
                        if (counter === 13) {
                          console.log("Success");
                        }
                      })
                      .catch(() => {
                        alert(
                          "Возникла проблема. Проверьте интернет соединение.."
                        );
                      });
                  });
                });
            });
        });
    },
    updateDish: (context, updatedDish) => {
      context.commit("SET_UPDATING", true);
      context.commit("CLOSE_UPDATE_DISHES_MODAL");
      let oldName;
      // UPDATE DISHES COLLECTION
      db.collection("dishes")
        .doc(updatedDish.type)
        .get()
        .then(doc => {
          const updatedDishesType = doc.data()[updatedDish.type].map(dish => {
            if (dish.name === updatedDish.oldName) {
              oldName = updatedDish.oldName;
              delete updatedDish.oldName;
              return {
                ...dish,
                name: updatedDish.name,
                costSmall: parseInt(updatedDish.costSmall),
                costStand: parseInt(updatedDish.costStand),
                portionSmall: updatedDish.portionSmall,
                portionStand: updatedDish.portionStand
              };
            }
            return dish;
          });

          db.collection("dishes")
            .doc(updatedDish.type)
            .update({
              [updatedDish.type]: updatedDishesType
            })
            .then(() => {
              // context.commit("CLOSE_UPDATE_DISHES_MODAL");
              let counter = 0;
              // UPDATE HISTORY COLLECTION
              db.collection("history")
                .get()
                .then(snapshot => {
                  snapshot.forEach(doc => {
                    const updatedDishesType = doc
                      .data()
                      .dishes[updatedDish.type].map(dish => {
                        if (dish.name === oldName) {
                          delete updatedDish.oldName;
                          return {
                            ...dish,
                            name: updatedDish.name,
                            costSmall: parseInt(updatedDish.costSmall),
                            costStand: parseInt(updatedDish.costStand)
                          };
                        }
                        return dish;
                      });
                    const updatedDishes = {
                      ...doc.data().dishes,
                      [updatedDish.type]: updatedDishesType
                    };

                    db.collection("history")
                      .doc(doc.id)
                      .update({
                        dishes: updatedDishes
                      })
                      .then(() => {
                        counter++;
                        if (counter === 13) {
                          context.commit("SET_UPDATING", false);
                          console.log("success");
                        }
                      })
                      .catch(() => {
                        alert(
                          "Возникла проблема. Проверьте интернет соединение.."
                        );
                      });
                  });
                });
            });
        });
    },
    deleteDish: (context, dish) => {
      db.collection("dishes")
        .doc(dish.type)
        .get()
        .then(doc => {
          let updatedDishes = doc.data()[dish.type];
          for (let i = 0; i < updatedDishes.length; i++) {
            if (updatedDishes[i].name === dish.name) {
              updatedDishes.splice(i, 1);
              break;
            }
          }

          db.collection("dishes")
            .doc(dish.type)
            .update({
              [dish.type]: updatedDishes
            })
            .then(() => {
              let counter = 0;
              db.collection("history")
                .get()
                .then(snapshot => {
                  snapshot.forEach(doc => {
                    let updatedDishesHistory = doc.data().dishes;
                    for (
                      let i = 0;
                      i < updatedDishesHistory[dish.type].length;
                      i++
                    ) {
                      if (
                        updatedDishesHistory[dish.type][i].name === dish.name
                      ) {
                        updatedDishesHistory[dish.type].splice(i, 1);
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
            });
        });
    }
  },
  getters: {}
};
