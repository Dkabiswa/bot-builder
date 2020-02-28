import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '../home/HomePage.vue';
import RobotBuilder from '../builder/RobotBuilder.vue';
import PartsInfo from '../parts/PartsInfo.vue';
import BrowseParts from '../parts/BrowseParts.vue';
import RobotHeads from '../parts/RobotHeads.vue';
import RobotArms from '../parts/RobotArms.vue';
import RobotTorsos from '../parts/RobotTorsos.vue';
import RobotBases from '../parts/RobotBases.vue';
import Build from '../sidebar/SideBarBuild.vue';
import Standard from '../sidebar/SideStandard.vue';
import ShoppingCart from '../cart/ShoppingCart.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'Home',
    components: {
      default: HomePage,
      sidebar: Standard,
    },
  },
  {
    path: '/build',
    name: 'Build',
    components: {
      default: RobotBuilder,
      sidebar: Build,
    },
  },
  {
    path: '/parts/browse',
    name: 'BrowseParts',
    component: BrowseParts,
    children: [
      {
        path: 'heads',
        name: 'BrowseHeads',
        component: RobotHeads,
      },
      {
        path: 'arms',
        name: 'BrowseArms',
        component: RobotArms,
      },
      {
        path: 'torsos',
        name: 'BrowseTorsos',
        component: RobotTorsos,
      },
      {
        path: 'bases',
        name: 'BrowseBases',
        component: RobotBases,
      },
    ],
  },
  {
    path: '/parts/:partType/:id',
    name: 'Parts',
    component: PartsInfo,
    props: true,
    beforeEnter(to, from, next) {
      next(Number.isInteger(Number(to.params.id)));
    },
  },
  {
    path: '/cart',
    name: 'ShoppingCart',
    component: ShoppingCart,
  }],
});
