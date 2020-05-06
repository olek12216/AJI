import Vue from 'vue';
import Vuex from 'vuex';
const axios = require('axios').default;

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        Products: [],
        Categories: [],
        Cart: [],
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
        getCart(state) {
            return state.Cart;
        }
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
        addProductToCart(state, product) {
            if(state.Cart.filter(prod => prod.product == product).length == 0){
                const cartProduct = {
                    product: product,
                    amount: 1
                };
                state.Cart.push(cartProduct);
            }
        },
        changeAmountOfProduct(state, product, amount) {
            state.Cart.filter(obj => obj.product == product).amount = amount;
        },
        removeProductFromCart(state, product) {
            const index = state.Cart.indexOf(product);
            if(index > -1){
                state.Cart.splice(index, 1);
            }
            // state.Cart.find(product).remove();
        },
        removeAllProductsFromCart(state) {
            state.Cart = [];
        }
    },
    actions: {
    }
});