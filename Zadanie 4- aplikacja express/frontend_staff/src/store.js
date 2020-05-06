import Vue from 'vue';
import Vuex from 'vuex';
const axios = require('axios').default;

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        Products: [],
        Categories: [],
        Orders: [],
        OrderStatuses: []
    },
    getters: {
        getProducts(state) {
            return state.Products;
        },
        getCategories(state) {
            return state.Categories;
        },
        getCategory(state) {
            return index => state.Categories[index];
        },
        getOrders(state) {
            return state.Orders;
        },
        getOrderStatuses(state) {
            return state.OrderStatuses;
        },
        getOrderStatus(state) {
            return index => state.OrderStatuses[index];
        },


    },
    mutations: {
        loadProducts(state) {
            axios
                .get('http://localhost:8081/products')
                .then(response => {
                    // eslint-disable-next-line no-console
                    console.log(state.Products);
                    // eslint-disable-next-line no-console
                    console.log(response);
                    state.Products = response['data']['products'];
                    // eslint-disable-next-line no-console
                    console.log(state.Products);
                })
                // eslint-disable-next-line no-console
                .catch(error => console.log(error));
        },
        loadCategories(state) {
            axios
                .get('http://localhost:8081/categories')
                .then(response => {
                    // eslint-disable-next-line no-console
                    console.log(state.Categories);
                    // eslint-disable-next-line no-console
                    console.log(response);
                    state.Categories = response['data']['categories'];
                    // eslint-disable-next-line no-console
                    console.log(state.Categories);
                })
                // eslint-disable-next-line no-console
                .catch(error => console.log(error));
        },
        loadOrders(state) {
            axios
                .get('http://localhost:8081/orders')
                .then(response => {
                    // eslint-disable-next-line no-console
                    console.log(state.Orders);
                    // eslint-disable-next-line no-console
                    console.log(response);
                    state.Orders = response['data']['orders'];
                    // eslint-disable-next-line no-console
                    console.log(state.Orders);
                })
                // eslint-disable-next-line no-console
                .catch(error => console.log(error));
        },
        loadOrderStatuses(state) {
            axios
                .get('http://localhost:8081/status')
                .then(response => {
                    // eslint-disable-next-line no-console
                    console.log(state.Orders);
                    // eslint-disable-next-line no-console
                    console.log(response);
                    state.OrderStatuses = response['data']['orderStatuses'];
                    // eslint-disable-next-line no-console
                    console.log(state.Orders);
                })
                // eslint-disable-next-line no-console
                .catch(error => console.log(error));
        },
    },
    actions: {
    }
});