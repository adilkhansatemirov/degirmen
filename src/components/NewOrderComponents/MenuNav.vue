<template>
   <div>
      <nav>
         <span class="menu-icon" @click="openSlideMenu()">
            <a>
               <font-awesome-icon icon="bars" />
            </a>
         </span>

         <div class="logo" @click="scroll()">Cafe</div>

         <div ref="slideMenu" class="side-nav">
            <a class="btn-close" @click="closeSlideMenu()">
               <font-awesome-icon icon="times" />
            </a>
            <a href="#soups" @click="jumpTo('#soups')" class="link">Супы</a>
            <a href="#mainDishes" @click="jumpTo('#mainDishes')" class="link">
               Горячие
               <br />блюда
            </a>
            <a href="#doners" @click="jumpTo('#doners')" class="link">Донер</a>
            <a href="#pizzas" @click="jumpTo('#pizzas')" class="link">Пицца</a>
            <a href="#drinks" @click="jumpTo('#drinks')" class="link"
               >Напитки</a
            >
            <a href="#hotDrinks" @click="jumpTo('#hotDrinks')" class="link">
               Горячие
               <br />напитки
            </a>
            <a href="#garnirs" @click="jumpTo('#garnirs')" class="link"
               >Гарниры</a
            >
            <a href="#salats" @click="jumpTo('#salats')" class="link">Салаты</a>
            <a href="#shashlyks" @click="jumpTo('#shashlyks')" class="link"
               >Шашлыки</a
            >
            <a href="#breakfasts" @click="jumpTo('#breakfasts')" class="link"
               >Завтраки</a
            >
            <a href="#tandyrs" @click="jumpTo('#tandyrs')" class="link"
               >Тандыр</a
            >
            <a href="#cakes" @click="jumpTo('#cakes')" class="link"
               >Пироженые</a
            >
            <a href="#baklavas" @click="jumpTo('#baklavas')" class="link"
               >Баклава</a
            >
            <a href="#coockies" @click="jumpTo('#coockies')" class="link"
               >Печенье</a
            >
            <a href="#breads" @click="jumpTo('#breads')" class="link">Хлеб</a>
            <a href="#bakerys" @click="jumpTo('#bakerys')" class="link"
               >Выпечка</a
            >
            <a href="#pies" @click="jumpTo('#pies')" class="link">Торты</a>
            <a href="#iceCreams" @click="jumpTo('#iceCreams')" class="link"
               >Мороженое</a
            >
            <a href="#cocktails" @click="jumpTo('#cocktails')" class="link"
               >Коктейли</a
            >
         </div>
      </nav>
   </div>
</template>

<script>
import firebase from "firebase/app";
import jump from "jump.js";

export default {
   data() {
      return {
         menuClose: true,
         isLoggedIn: false,
         currentUser: false
      };
   },
   methods: {
      openSlideMenu: function() {
         this.$refs.slideMenu.style.width = "200px";
         this.menuClosed = false;
      },
      closeSlideMenu: function() {
         this.$refs.slideMenu.style.width = "0px";
         this.menuClosed = true;
      },
      jumpTo: function(target) {
         // jump(target, {
         //   duration: 300
         // });
         this.closeSlideMenu();
      }
   }
};
</script>

<style scoped>
nav {
   background-color: #d23837;
   display: flex;
   position: fixed;
   width: 100%;
   padding: 1rem 0 0.5rem 0;
   border-bottom: 0.3rem solid #9a2928;
   z-index: 2;
}
nav a {
   /* all the links are pale red
  menubar icon, супы, горячие блюда, донер... */
   color: #ffdbc9;
}
nav .menu-icon {
   margin-left: 1rem;
   font-size: 2rem;
   height: 2rem;
   display: flex;
   align-items: center;
   cursor: pointer;
}
nav .logo {
   font-family: "Allura", cursive;
   top: 0.5rem;
   left: 5rem;
   position: absolute;
   background-color: #d23837;
   color: #ffdbc9;
   font-size: 2.2rem;
   text-align: center;
   padding: 0.5rem 2rem;
   border: 0.3rem solid #9a2928;
   z-index: 1;
   word-spacing: 0.5rem;
}
.side-nav {
   /* side sliding menu (hidden initially)*/
   height: 100%;
   width: 0;
   position: fixed;
   z-index: 3;
   top: 0;
   left: 0;
   background-color: #9a2928;
   opacity: 0.95;
   overflow-x: hidden;
   transition: 0.3s;
}
.side-nav .link,
.side-nav a:last-child {
   /* links in the side menu */
   color: #ffdbc9;
   margin-top: 0.9rem;
   font-size: 1rem;
   border-bottom: 1px solid #ffdbc9;
   padding-bottom: 0.9rem;
   padding-left: 4.75rem;
   cursor: pointer;
}
.side-nav .btn-close {
   /* close button  */
   color: #ffdbc9;
   border-bottom: none;
   position: absolute;
   top: 0.9rem;
   left: 1rem;
   cursor: pointer;
}

/* ****************************** */
/* *********RESPONSIVE*********** */
/* ****************************** */
@media (max-width: 1500px) {
   nav .logo {
      left: 50%;
      padding: 0.4rem 4rem;
      transform: translateX(-50%);
   }
   .navbar-nav {
      display: none;
   }
}
@media (max-width: 850px) {
   nav {
      padding: 0.75rem 0 0.5rem 0;
      border-bottom: 0.2rem solid #9a2928;
   }
   nav .logo {
      top: 0.6rem;
      padding: 0.2rem 2rem;
      font-size: 2rem;
   }
}
@media (max-width: 675px) {
   nav {
      padding: 0.5rem 0 0.5rem 0;
   }
   nav .logo {
      font-size: 1.75rem;
      width: 19rem;
   }
   nav .menu-icon {
      font-size: 1.75rem;
   }
}
@media (max-width: 530px) {
   nav .logo {
      padding: 0.5rem 0.75rem;
      font-size: 1.5rem;
      height: 3.5rem;
   }
   nav .menu-icon {
      font-size: 1.5rem;
   }
}
@media (max-width: 500px) {
   nav .logo {
      width: 17rem;
   }
}
@media (max-width: 450px) {
   nav .logo {
      top: 0.7rem;
      padding: 0.5rem 0rem;
      font-size: 1.5rem;
      height: 3rem;
      width: 15rem;
      border: 0.2rem solid #9a2928;
   }
}
@media (max-width: 375px) {
   nav {
      padding-top: 0rem;
   }
   nav .menu-icon {
      position: relative;
      top: 0.3rem;
      font-size: 1.25rem;
   }
   nav .logo {
      top: 0.5rem;
      padding: 0.5rem 0rem;
      width: 12rem;
      height: 2.85rem;
      font-size: 1.35rem;
   }
}
</style>



