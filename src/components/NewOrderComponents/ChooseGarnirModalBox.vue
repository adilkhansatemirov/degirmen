<template>
   <div>
      <div
         class="background"
         ref="garnirsBackground"
         @click="closeGarnirs($event)"
      >
         <div class="modal-box">
            <h4 class="garnir-name">Гарнир: {{ garnirName }}</h4>
            <h4 class="garnir-name">Цена: {{ garnirCost }}₸</h4>
            <ul>
               <li
                  v-for="garnir in garnirs"
                  :key="garnir.key"
                  @click="setGarnir(garnir)"
               >
                  <p>{{ returnName(garnir) }} (100гр)</p>
                  <p class="garnir-cost">+ {{ garnir.costStand / 2 }}₸</p>
               </li>
            </ul>
            <div class="button-group">
               <button @click="clearGarnir()">Сброс</button>
               <button @click="chooseGarnir()">Готово</button>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import db from "../../firebase/firebase-init";
export default {
   data() {
      return {
         garnirsSelected: [],
         garnirName: "(без гарнира)",
         garnirCost: 0,
         garnirs: []
      };
   },
   methods: {
      setGarnir: function(garnir) {
         //return if two chosen
         if (
            this.garnirName.includes("200гр") ||
            this.garnirName.includes("+")
         ) {
            return;
         }

         //if first time
         if (this.garnirName === "(без гарнира)") {
            this.garnirName = `${this.returnName(garnir)}(100гр)`;
            this.garnirsSelected.push({
               name: garnir.name,
               cost: garnir.costStand / 2
            });
         } else if (
            //if the same chosen second time
            this.garnirName.includes(`${this.returnName(garnir)}(100гр)`)
         ) {
            this.garnirName = `${this.returnName(garnir)}(200гр)`;
            this.garnirsSelected[0].cost *= 2;
         } else {
            //if different is selected
            this.garnirName += ` + ${this.returnName(garnir)}(100гр)`;
            this.garnirsSelected.push({
               name: garnir.name,
               cost: garnir.costStand / 2
            });
         }
         this.garnirCost += garnir.costStand / 2;
      },
      closeGarnirs: function(event) {
         if (event.target == this.$refs.garnirsBackground) {
            this.clearGarnir();
            this.$emit("closeGarnirs");
         }
      },
      returnName: function(garnir) {
         return garnir.name.split(" ")[1];
      },
      chooseGarnir: function() {
         let garnirToSend = {
            name: this.garnirName,
            cost: this.garnirCost,
            selected: this.garnirsSelected
         };
         //emit the object to mainDishes component
         this.clearGarnir();
         this.$emit("chooseGarnir", garnirToSend);
      },
      clearGarnir: function() {
         this.garnirsSelected = [];
         this.garnirName = "(без гарнира)";
         this.garnirCost = 0;
      }
   },
   created() {
      db.collection("dishes")
         .doc("garnirs")
         .get()
         .then(doc => {
            const garnirs = doc.data().garnirs;
            for (let i = 0; i < garnirs.length; i++) {
               this.garnirs.push(garnirs[i]);
            }
         });
   }
};
</script>

<style scoped>
.background {
   width: 100%;
   height: 100%;
   position: fixed;
   left: 0;
   top: 0;
   z-index: 3;
   background: rgba(0, 0, 0, 0.5);
   display: flex;
   align-items: center;
   justify-content: center;
}
.modal-box {
   width: 70%;
   border: 3px solid #4d0a0a;
   background: #fff;
   color: #4d0a0a;
   overflow: hidden;
   background: #ffe3e3;
}
.garnir-name {
   text-align: center;
}
ul {
   display: flex;
   justify-content: space-around;
   flex-wrap: wrap;
   padding: 0.5rem;
}
li {
   border: 1px solid black;
   border-radius: 0.2rem;
   padding: 0.1rem 0.2rem;
   flex-basis: 8rem;
   margin: 1rem 0.2rem;
   text-align: center;
   background: #ffd2d2;
   cursor: pointer;
}
.garnir-cost {
   font-size: 0.9rem;
}
.button-group {
   text-align: center;
}
</style>
