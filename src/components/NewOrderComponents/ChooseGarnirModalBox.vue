<template>
  <div>
    <div class="background" ref="garnirsBackground" @click="closeGarnirs($event)">
      <div class="modal-box">
        <ul>
          <li v-for="garnir in garnirs" :key="garnir.key" @click="chooseGarnir(garnir)">
            <p>{{returnName(garnir)}}</p>
            <p class="garnir-cost">{{garnir.costStand}}₸</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import db from "../../firebase/firebase-init";
export default {
  data() {
    return {
      garnirs: []
    };
  },
  methods: {
    closeGarnirs: function(event) {
      if (event.target == this.$refs.garnirsBackground) {
        // document.querySelector(".background").style.display = "none";
        this.$emit("closeGarnirs");
      }
    },
    returnName: function(garnir) {
      return garnir.name.split(" ")[1];
    },
    chooseGarnir: function(garnir) {
      let garnirToSend = {
        name: this.returnName(garnir),
        cost: garnir.costStand
      };
      //emit the object to mainDishes component
      this.$emit("chooseGarnir", garnirToSend);
    }
  },
  created() {
    //get all garnirs from database
    //save to 'this.garnirs'
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
  height: fit-content;
  border: 3px solid #4d0a0a;
  background: #fff;
  color: #4d0a0a;
  overflow: hidden;
}
ul {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 0.5rem;
  background: #ffe3e3;
}
li {
  border: 1px solid black;
  border-radius: 0.2rem;
  padding: 0.1rem 0.2rem;
  flex-basis: 5rem;
  margin: 1rem 0;
  text-align: center;
  background: #ffd2d2;
  cursor: pointer;
}
.garnir-cost {
  font-size: 0.9rem;
}
</style>
