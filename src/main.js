// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./components/App";

import firebase from "firebase/app";
import "./firebase/firebase-init";

// router config
import VueRouter from "vue-router";
Vue.use(VueRouter);
import Routes from "./routes";
const router = new VueRouter({
  routes: Routes,
  mode: "history"
});

router.beforeEach((to, from, next) => {
  //check for required auth
  if (to.matched.some(record => record.meta.requiresAuth)) {
    //check if not logged in
    if (!firebase.auth().currentUser) {
      next({
        path: "/login",
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    //check if logged in
    if (firebase.auth().currentUser) {
      next({
        path: "/",
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

//FONT AWESOME
import { library } from "@fortawesome/fontawesome-svg-core";

import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faStoreAlt } from "@fortawesome/free-solid-svg-icons";
import { faCarSide } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faHamburger } from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faCoffee);
library.add(faBars);
library.add(faUser);
library.add(faShoppingBasket);
library.add(faUtensils);
library.add(faCheckCircle);
library.add(faClock);
library.add(faPlus);
library.add(faMinus);
library.add(faTimes);
library.add(faStoreAlt);
library.add(faUsers);
library.add(faCarSide);
library.add(faArrowRight);
library.add(faArrowLeft);
library.add(faPrint);
library.add(faDoorOpen);
library.add(faSignInAlt);
library.add(faPencilAlt);
library.add(faHamburger);
library.add(faChevronUp);
library.add(faChevronDown);

Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.config.productionTip = false;

/* eslint-disable no-new */
import store from "./store/store";
let app;
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    store.dispatch("login", user.uid);
  }
  if (!app) {
    app = new Vue({
      el: "#app",
      components: { App },
      template: "<App/>",
      router,
      store
    });
  }
});
