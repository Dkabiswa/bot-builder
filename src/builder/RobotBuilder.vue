<template lang="html">
  <div class="content ">
    <div class="preview">
      <CollapsibleSection>
      <div class="preview-content">
        <div class="top-row">
          <img :src="selectedRobot.head.src"/>
        </div>
        <div class="middle-row">
          <img :src="selectedRobot.leftArm.src" class="rotate-left"/>
          <img :src="selectedRobot.torsos.src"/>
          <img :src="selectedRobot.rightArm.src" class="rotate-right"/>
        </div>
        <div class="bottom-row">
          <img :src="selectedRobot.bases.src"/>
        </div>
      </div>
      </CollapsibleSection>
    <button class="add-to-cart" @click="addToCart">Add to cart </button>
    </div>
    <div class="top-row">
      <!--
      <div class="robot-name">
        {{selectedRobot.head.title}}
        <span v-if="selectedRobot.head.onSale" class="sale">Sale!</span>
      </div> -->
        <PartSelector :parts="availableParts.heads"
          position="top"
          @part-selected="part => selectedRobot.head=part"
         />
    </div>
    <div class="middle-row">
      <PartSelector :parts="availableParts.arms"
        position="left"
        @part-selected="part => selectedRobot.leftArm=part"
      />
      <PartSelector :parts="availableParts.torsos"
        position="center"
        @part-selected="part => selectedRobot.torsos=part"
      />
      <PartSelector :parts="availableParts.arms"
        position="right"
        @part-selected="part => selectedRobot.rightArm=part"
      />
    </div>
    <div class="bottom-row">
      <PartSelector :parts="availableParts.bases"
        position="bottom"
        @part-selected="part => selectedRobot.bases=part"
      />
    </div>
  </div>
</template>

<script lang="js">
import availableParts from '../data/parts';
import ConsoleMixin from './console-mixin';
import PartSelector from './PartSelector.vue';
import CollapsibleSection from '../shared/CollapsibleSection.vue';

export default {
  name: 'RobotBuilder',
  components: {
    PartSelector,
    CollapsibleSection,
  },
  props: [],
  mixins: [ConsoleMixin],
  beforeRouteLeave(to, from, next) {
    // eslint-disable-next-line no-unused-expressions
    this.addedToCart ? next(true)
      // eslint-disable-next-line no-restricted-globals
      : next(confirm('You have not added to cart, Are you sure you want to leave'));
  },
  mounted() {

  },
  data() {
    return {
      availableParts,
      addedToCart: false,
      cart: [],
      selectedRobot: {
        head: {},
        leftArm: {},
        rightArm: {},
        torsos: {},
        bases: {},
      },
    };
  },
  methods: {
    addToCart() {
      const robot = this.selectedRobot;
      const cost = robot.head.cost
        + robot.leftArm.cost
        + robot.rightArm.cost
        + robot.torsos.cost
        + robot.bases.cost;
      this.$store.commit('addRobotToCart', { ...robot, cost });
      this.addedToCart = true;
    },
  },
  computed: {
    saleBorderClass() {
      return this.selectedRobot.head.onSale ? 'sale-border' : '';
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
  width: 210px;
  padding: 3px;
}
.sale-border {
  border: 3px solid red;
}
.preview {
  position: absolute;
  top: -20px;
  right: 0;
  width: 210px;
  height: 210px;
  padding: 5px;
}
.preview-content {
  border: 1px solid #999;
}
.preview img {
  width: 50px;
  height: 50px;
}
.rotate-right {
  transform: rotate(90deg);
}
.rotate-left {
  transform: rotate(-90deg);
}
</style>
