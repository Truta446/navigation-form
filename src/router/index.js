import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Payment from '../views/Payment.vue';
import initialInformation from '../views/InitialInformation.vue';
import Company from '../views/Company.vue';
import LineOfBusiness from '../views/LineOfBusiness.vue';
import Address from '../views/Address.vue';
import Congrats from '../views/Congrats.vue';
import ChoosePlan from '../views/ChoosePlan.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/2',
    name: 'Payment',
    component: Payment,
  },
  {
    path: '/3',
    name: 'InitialInformation',
    component: initialInformation,
  },
  {
    path: '/4',
    name: 'Company',
    component: Company,
  },
  {
    path: '/5',
    name: 'LineOfBusiness',
    component: LineOfBusiness,
  },
  {
    path: '/6',
    name: 'Address',
    component: Address,
  },
  {
    path: '/7',
    name: 'Congrats',
    component: Congrats,
  },
  {
    path: '/changePlan',
    name: 'ChoosePlan',
    component: ChoosePlan,
  },
];

const router = new VueRouter({
  mode: 'abstract',
  base: process.env.BASE_URL,
  routes,
});

export default router;
