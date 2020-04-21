import Vue from 'vue';
import VueTheMask from 'vue-the-mask';
import App from './App.vue';
import store from './store';
import router from './router';
import vuetify from './plugins/vuetify';

Vue.use(VueTheMask);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
