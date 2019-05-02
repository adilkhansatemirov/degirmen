<template>
  <div id="app">
    <router-view></router-view>
    <v-navigation @closeUserPannel="closeUserPannel($event)"></v-navigation>
  </div>
</template>

<script>
import Navigation from "./Navigation.vue";
import EventBus from "./eventBus";

export default {
  name: "App",
  components: {
    "v-navigation": Navigation
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Allura|Oswald|Lobster");
html,
body {
  height: 100%;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
}
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section,
a,
img,
input {
  display: block;
}
input[type="checkbox"] {
  display: inline;
}
ol,
ul {
  list-style: none;
}
a {
  text-decoration: none;
}
body {
  font-family: "Oswald", sans-serif;
  background: #ffe2dd;
}
.container {
  min-height: 100%;
  margin: 0 auto;
  width: 70%;
}
.pale-red {
  background: #ffd5c9;
}
.color-dark-red {
  color: #740000;
}
.basket-purchases {
  position: fixed;
  z-index: 2;
  width: 6rem;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 1.5rem;
  bottom: 1.5rem;
  cursor: pointer;
  border-radius: 1rem;
  background: rgb(255, 216, 216);
  border: 1px solid rgba(225, 74, 74, 0.3);
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.5);
}
.basket-purchases-inner .basket {
  color: #7e1412;
}
.basket-purchases span {
  margin-left: 0.5rem;
  color: #7e1412;
}
@keyframes spin {
  0% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(360deg);
  }
}
h4 {
  font-weight: lighter;
}
[v-cloak] {
  display: none;
}
.section-meals {
  margin-top: 4rem;
}
.section__title {
  text-align: center;
  font-weight: bold;
  font-size: 3.5rem;
  padding: 1rem 0;
}
.meal-group {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 0 1rem;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -o-user-select: none;
}
.meal-item {
  font-family: "Lobster";
  width: 100%;
  padding: 0.4rem 0.2rem 0.4rem 1rem;
  background: #ffdfdf;
  border: 0.1rem solid #fcb6a3;
  margin: 1rem 0.7rem;
  display: flex;
  align-items: center;
  border-radius: 0.5rem;
}
.meal-item h4 {
  font-size: 1.3rem;
  font-weight: lighter;
}
.portion-size-choise-box {
  width: 40%;
  margin-left: auto;
  margin-right: 0;
  display: flex;
  justify-content: space-between;
}
.portion__option {
  margin: 0 0.2rem;
  flex: 1;
  display: flex;
  align-items: center;
  padding: 0.1rem;
  background: #ffcdcd;
  cursor: pointer;
  border-radius: 0.3rem;
  border: 1px solid #f7a5a5;
}
.portion__option:hover {
  background: #ffadad;
}
.portion__option:active {
  background: #f16969;
}
.portion__size,
.portion__price {
  text-align: right;
}
.portion__size-price {
  flex: 2;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -o-user-select: none;
}
.basket-icon {
  font-size: 1.4rem;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -o-user-select: none;
}
@media (max-width: 900px) {
  .container {
    width: 80%;
  }
}
@media (max-width: 800px) {
  .container {
    width: 90%;
  }
  .portion-size-choise-box {
    width: 60%;
  }
  .meal-item h4 {
    font-size: 1rem;
    font-weight: lighter;
  }
  .portion__option {
    font-size: 0.9rem;
  }
  .basket-icon {
    font-size: 1.2rem;
  }
  .meal-item {
    flex-direction: column;
  }
  .portion-size-choise-box {
    width: 100%;
  }
}
</style>
