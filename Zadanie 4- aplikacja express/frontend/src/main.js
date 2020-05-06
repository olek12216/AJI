import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'
import {store} from './store'
import Products from './components/ProductsPanel.vue'
import Cart from './components/CartPanel.vue'

import Vuelidate from 'vuelidate'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(Vuelidate);


const routes = [
    {path: '/products', component: Products},
    {path: '/cart', component: Cart}
];

const router = new VueRouter({
    routes,
    mode: 'history'
});


Vue.config.productionTip = false

new Vue({
    router,
    store: store,
    render: h => h(App),
}).$mount('#app')
