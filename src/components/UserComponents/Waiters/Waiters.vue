<template>
   <div class="container">
      <h1 class="Waiters__header">Офицанты</h1>
      <ul class="Waiters__list">
         <li class="Waiters__item" v-for="waiter in waiters" :key="waiter.uid">
            <p class="Waiters__item-name">
               {{ waiter.name }}
            </p>
            <p class="Waiters__item-email">
               {{ waiter.email }}
            </p>
            <div class="Witers__delete-waiter" @click="deleteWaiter(waiter)">
               <font-awesome-icon icon="times"></font-awesome-icon>
            </div>
         </li>
      </ul>
      <div class="Waiters__add-waiter-button" @click="openNewWaiterModal()">
         <font-awesome-icon icon="plus"></font-awesome-icon>
      </div>
      <v-new-waiter-modal v-if="newWaiterModalOpen"></v-new-waiter-modal>
   </div>
</template>

<script>
import { mapState } from "vuex";
import NewWaiterModal from "./NewWaiterModal";
import db from "../../../firebase/firebase-init";
export default {
   components: {
      "v-new-waiter-modal": NewWaiterModal
   },
   computed: mapState({
      waiters: state => state.waiters.waitersList,
      newWaiterModalOpen: state => state.waiters.newWaiterModalOpen
   }),
   methods: {
      openNewWaiterModal: function() {
         this.$store.dispatch("openNewWaiterModal");
      },
      deleteWaiter: function(waiter) {
         this.$store.dispatch("deleteWaiter", waiter);
      }
   },
   created() {
      this.$store.dispatch("getWaitersList");
   }
};
</script>

<style scoped>
.Waiters__item {
   display: flex;
   justify-content: space-between;
}
.Waiters__add-waiter-button {
   position: fixed;
   bottom: 4rem;
   right: 2rem;
   cursor: pointer;
   background: #ffcfcf;
   width: 4rem;
   height: 4rem;
   border-radius: 50%;
   font-size: 2rem;
   color: #740000;
   display: flex;
   align-items: center;
   justify-content: center;
   border: 1px solid rgba(225, 74, 74, 0.3);
}
.Waiters__add-waiter-button:hover {
   background: #ffe0e0;
   -webkit-box-shadow: 4px 4px 9px 0px rgba(179, 172, 179, 1);
   -moz-box-shadow: 4px 4px 9px 0px rgba(179, 172, 179, 1);
   box-shadow: 4px 4px 9px 0px rgba(179, 172, 179, 1);
}
</style>
