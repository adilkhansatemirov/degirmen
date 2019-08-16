import db from "../firebase/firebase-init";
export default {
  state: {},
  mutations: {},
  actions: {
    saveOrderToCheckHistory: (context, order) => {
      db.collection("historyChecks")
        .doc(order.id)
        .set(order)
        .then(() => {
          console.log("saveOrderToCheckHistory complete");
        })
        .catch(err => {
          console.log(err);
        });
    },
    clearHistoryChecks: context => {
      db.collection("historyChecks")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            db.collection("historyChecks")
              .doc(doc.id)
              .delete()
              .then(() => {
                console.log("Deleted");
              })
              .catch(err => {
                console.log(err);
              });
          });
        });
    }
  },
  getters: {}
};
