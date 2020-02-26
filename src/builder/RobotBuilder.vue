<template lang="html">
  <div class="content ">
    <button class="add-to-cart" @click="addToCart">Add to cart </button>
    <div class="top-row">
      <div :class="[saleBorderClass, 'top', 'part']">
      <div class="robot-name">
        {{seletedRobot.head.title}}
        <span v-if="seletedRobot.head.onSale" class="sale">Sale!</span>
      </div>
        <img :src="seletedRobot.head.src" title="head"/>
        <button @click="changePrevHead" class="prev-selector">&#9668;</button>
        <button @click="changeNextHead" class="next-selector">&#9658;</button>
      </div>
    </div>
    <div class="middle-row">
      <div class="left part">
        <img :src="seletedRobot.leftArm.src" title="left arm"/>
        <button @click="changePrevLeftArm" class="prev-selector">&#9650;</button>
        <button @click="changeNextLeftArm" class="next-selector">&#9660;</button>
      </div>
      <div class="center part">
        <img :src="seletedRobot.torsos.src" title="left arm"/>
        <button @click="changePrevTorso"  class="prev-selector">&#9668;</button>
        <button @click="changeNextTorso" class="next-selector">&#9658;</button>
      </div>
      <div class="right part">
        <img :src="seletedRobot.rightArm.src" title="left arm"/>
        <button @click="changePrevRightArm" class="prev-selector">&#9650;</button>
        <button @click="changeNextRightArm" class="next-selector">&#9660;</button>
      </div>
    </div>
    <div class="bottom-row">
      <div class="bottom part">
        <img :src="seletedRobot.bases.src" title="left arm"/>
        <button @click="changePrevBase" class="prev-selector">&#9668;</button>
        <button @click="changeNextBase" class="next-selector">&#9658;</button>
      </div>
    </div>
    <div>
      <h1>Cart</h1>
      <table>
        <thead>
          <tr>
            <th>Robot</th>
            <th class='cost'>Cost</th>
          </tr>
          <tr :key="index" v-for="(robot, index) in cart">
             <td>{{robot.head.title}}</td>
             <td class="cost">{{robot.cost}}</td>
          </tr>
        </thead>
      </table>
    </div>
  </div>
</template>

<script lang="js">
import availableParts from '../data/parts';
import ConsoleMixin from './console-mixin';

const getNextIndex = (index, length) => {
  const newIndex = index + 1;
  return index > length - 2 ? 0 : newIndex;
};

const getPrevIndex = (index, length) => {
  const newIndex = index - 1;
  return newIndex < 0 ? length - 1 : newIndex;
};

export default {
  name: 'RobotBuilder',
  props: [],
  mixins: [ConsoleMixin],
  mounted() {

  },
  data() {
    return {
      availableParts,
      cart: [],
      headIndex: 0,
      leftArmIndex: 0,
      rightArmIndex: 0,
      torsosIndex: 0,
      basesIndex: 0,
    };
  },
  methods: {
    addToCart() {
      const robot = this.seletedRobot;
      const cost = robot.head.cost
        + robot.leftArm.cost
        + robot.rightArm.cost
        + robot.torsos.cost
        + robot.bases.cost;
      this.cart.push({ ...robot, cost });
    },
    changeNextHead() {
      const { length } = availableParts.heads;
      this.headIndex = getNextIndex(this.headIndex, length);
    },
    changePrevHead() {
      const { length } = availableParts.heads;
      this.headIndex = getPrevIndex(this.headIndex, length);
    },
    changeNextLeftArm() {
      const { length } = availableParts.arms;
      this.leftArmIndex = getNextIndex(this.leftArmIndex, length);
    },
    changePrevLeftArm() {
      const { length } = availableParts.arms;
      this.leftArmIndex = getPrevIndex(this.leftArmIndex, length);
    },
    changeNextTorso() {
      const { length } = availableParts.torsos;
      this.torsosIndex = getNextIndex(this.torsosIndex, length);
    },
    changePrevTorso() {
      const { length } = availableParts.torsos;
      this.torsosIndex = getPrevIndex(this.torsosIndex, length);
    },
    changeNextRightArm() {
      const { length } = availableParts.arms;
      this.rightArmIndex = getNextIndex(this.rightArmIndex, length);
    },
    changePrevRightArm() {
      const { length } = availableParts.arms;
      this.rightArmIndex = getPrevIndex(this.rightArmIndex, length);
    },
    changeNextBase() {
      const { length } = availableParts.bases;
      this.basesIndex = getNextIndex(this.basesIndex, length);
    },
    changePrevBase() {
      const { length } = availableParts.bases;
      this.basesIndex = getPrevIndex(this.basesIndex, length);
    },
  },
  computed: {
    saleBorderClass() {
      return this.seletedRobot.head.onSale ? 'sale-border' : '';
    },
    seletedRobot() {
      return {
        head: availableParts.heads[this.headIndex],
        rightArm: availableParts.arms[this.rightArmIndex],
        leftArm: availableParts.arms[this.leftArmIndex],
        torsos: availableParts.torsos[this.torsosIndex],
        bases: availableParts.bases[this.basesIndex],
      };
    },
  },
};


</script>

<style scoped>
.part {
  position: relative;
  width:165px;
  height:165px;
  border: 3px solid #aaa;
}
.part img {
  width:165px;
}
.top-row {
  display:flex;
  justify-content: space-around;
}
.middle-row {
  display:flex;
  justify-content: center;
}
.bottom-row {
  display:flex;
  justify-content: space-around;
  border-top: none;
}
.head {
  border-bottom: none;
}
.left {
  border-right: none;
}
.right {
  border-left: none;
}
.left img {
  transform: rotate(-90deg);
}
.right img {
  transform: rotate(90deg);
}
.bottom {
  border-top: none;
}
.prev-selector {
  position: absolute;
  z-index:1;
  top: -3px;
  left: -28px;
  width: 25px;
  height: 171px;
}
.next-selector {
  position: absolute;
  z-index:1;
  top: -3px;
  right: -28px;
  width: 25px;
  height: 171px;
}
.center .prev-selector, .center .next-selector {
  opacity:0.8;
}
.left .prev-selector {
  top: -28px;
  left: -3px;
  width: 144px;
  height: 25px;
}
.left .next-selector {
  top: auto;
  bottom: -28px;
  left: -3px;
  width: 144px;
  height: 25px;
}
.right .prev-selector {
  top: -28px;
  left: 24px;
  width: 144px;
  height: 25px;
}
.right .next-selector {
  top: auto;
  bottom: -28px;
  left: 24px;
  width: 144px;
  height: 25px;
}
.right .next-selector {
  right: -3px;
}
.robot-name {
  position: absolute;
  top: -25px;
  text-align: center;
   width: 100%;
}
.sale {
  color: red;
}
.content {
  position: relative;
}
.add-to-cart {
  position: absolute;
  right: 30px;
  width: 220px;
  padding: 3px;
}
td, th {
  text-align: left;
  padding: 5px;
  padding-right: 20px;
}
.cost {
  text-align: right;
}
.sale-border {
  border: 3px solid red;
}
</style>
