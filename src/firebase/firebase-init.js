import firebase from "firebase";
import "firebase/firestore";
import firebaseConfig from "./firebase-config";
const firebaseApp = firebase.initializeApp(firebaseConfig);
firebase
  .firestore()
  .enablePersistence()
  .catch(function(err) {
    if (err.code == "failed-precondition") {
      console.log("Only one tab");
      // Multiple tabs open, persistence can only be enabled
      // in one tab at a a time.
      // ...
    } else if (err.code == "unimplemented") {
      // The current browser does not support all of the
      // features required to enable persistence
      // ...
    }
  });
export default firebaseApp.firestore();
