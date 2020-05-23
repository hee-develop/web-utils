import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import * as Pages from './pages';
// mixins
import TitleMixin from './mixin/title';

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.mixin(TitleMixin);

const router = new VueRouter({
  mode: 'hash',
  routes: [
    { path: '/', component: Pages.Main },
    { path: '/timer', component: Pages.Timer },
    { path: '/todo',  component: Pages.Todo },
  ]
});

new Vue({
  render: h => h(App),
  router: router,
}).$mount('#app');