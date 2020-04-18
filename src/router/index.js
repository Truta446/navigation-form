import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import initialInformation from '../views/InitialInformation.vue';
import Company from '../views/Company.vue';
import LineOfBusiness from '../views/LineOfBusiness.vue';
import Address from '../views/Address.vue';
import Congrats from '../views/Congrats.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/2',
    name: 'InitialInformation',
    component: initialInformation,
  },
  {
    path: '/3',
    name: 'Company',
    component: Company,
  },
  {
    path: '/4',
    name: 'LineOfBusiness',
    component: LineOfBusiness,
  },
  {
    path: '/5',
    name: 'Address',
    component: Address,
  },
  {
    path: '/6',
    name: 'Congrats',
    component: Congrats,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
