import db from "../firebase/firebase-init";
import firebase from "firebase";

export default {
  state: {
    waitersList: [],
    newWaiterModalOpen: false
  },
  mutations: {
    FILL_WAITERS_LIST: (state, waitersList) => {
      state.waitersList = waitersList;
    },
    OPEN_NEW_WAITER_MODAL: state => {
      state.newWaiterModalOpen = true;
    },
    CLOSE_NEW_WAITER_MODAL: state => {
      state.newWaiterModalOpen = false;
    }
  },
  actions: {
    getWaitersList: context => {
      const waitersList = [];
      db.collection("users")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            if (doc.data().status === "Офицант") {
              waitersList.push(doc.data());
            }
          });
          context.commit("FILL_WAITERS_LIST", waitersList);
        });
    },
    deleteWaiter: (context, waiter) => {
      console.log(waiter.uid.trim());
      db.collection("users")
        .doc(waiter.uid.trim())
        .delete()
        .then(() => {
          console.log("deleted");
        })
        .catch(err => {
          console.log(err);
        });

      db.collection("history")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            const updatedWaitersStats = doc.data().waitersStats;
            for (let i = 0; i < updatedWaitersStats.length; i++) {
              if (updatedWaitersStats[i].name === waiter.name) {
                updatedWaitersStats.splice(i, 1);
              }
            }

            db.collection("history")
              .doc(doc.id)
              .update({
                waitersStats: updatedWaitersStats
              });
          });
        });
    },
    createNewWaiter: (context, waiter) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(waiter.email, waiter.password)
        .then(newWaiter => {
          // create in users colection
          db.collection("users")
            .doc(newWaiter.user.uid)
            .set({
              email: waiter.email,
              name: waiter.name,
              status: "Офицант",
              uid: newWaiter.user.uid
            });

          //create inside history
          db.collection("history")
            .get()
            .then(snapshot => {
              snapshot.forEach(doc => {
                let updatedWaitersStats = doc.data().waitersStats;
                updatedWaitersStats.push({
                  counterMoney: 0,
                  counterOrders: 0,
                  name: waiter.name
                });

                db.collection("history")
                  .doc(doc.id)
                  .update({
                    waitersStats: updatedWaitersStats
                  });
              });
            });
        });
    },
    openNewWaiterModal: context => {
      context.commit("OPEN_NEW_WAITER_MODAL");
    },
    closeNewWaiterModal: context => {
      context.commit("CLOSE_NEW_WAITER_MODAL");
    }
  },
  getters: {}
};
