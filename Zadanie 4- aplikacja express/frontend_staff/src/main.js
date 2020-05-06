import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'
import {store} from './store'
import Products from './components/ProductsPanel.vue'
import Orders from './components/OrdersPanel.vue'
import UnapprovedOrders from './components/OrdersManagementPanel'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

Vue.use(VueRouter);
Vue.use(BootstrapVue);


const routes = [
  {path: '/products', component: Products},
  {path: '/orders', component: Orders},
  {path: '/ordersmanagement', component: UnapprovedOrders},
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

new Vue({
  router,
  store: store,
  render: h => h(App),
}).$mount('#app')
