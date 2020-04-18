import Vue from 'vue';
import VueTheMask from 'vue-the-mask';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';

Vue.use(VueTheMask);

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
