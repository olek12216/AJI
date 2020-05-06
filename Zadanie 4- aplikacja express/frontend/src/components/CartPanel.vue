<template>
    <div id="cartPanel">
        <div class="container">
            <div class="container" id="tableContainer">
                <h1>Your products</h1>
                <table class="table-condensed table hover" ref="table">
                    <colgroup>
                        <col class="Lp"/>
                        <col class="Name"/>
                        <col class="Description"/>
                        <col class="UnitPrice"/>
                        <col class="Amount"/>
                        <col class="AmountProductsPrice"/>
                        <col class="Remove"/>
                    </colgroup>
                    <thead>
                    <tr>
                        <th>Lp</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Unit price</th>
                        <th>Amount</th>
                        <th>Price</th>
                        <th>Remove</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="i in cartProducts" :key="i._id">
                        <td id="lp"/>
                        <td>{{i.product.name}}</td>
                        <td>{{i.product.description}}</td>
                        <td>{{i.product.unitPrice}}</td>
                        <td><input class="form-control-sm" aria-disabled="true" required type="number"
                                   v-model="i.amount"
                                   min="1" step="1"/></td>
                        <td>{{i.amount * i.product.unitPrice}}</td>
                        <td>
                            <button type="button" class="btn btn-danger" @click="removeProductFromCart(i)">Remove
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <h3 style="float: left">Summary price: {{getSummaryCost}}</h3>
            </div>
            <div class="container" id="formContainer">
                <form id="orderForm" @submit="makeAnOrder">
                    <div class="input-group mt-3 mb-3" :class="{ 'hasError': $v.form.orderName.$error }">
                        <div class="input-group-prepend">
                            <label for="orderNameInput" class="input-group-text">Name</label>
                        </div>
                        <input id="orderNameInput" class="form-control form-control-lg" v-model="form.orderName"
                               type="text"
                               placeholder="Pass the name"/>
                    </div>
                    <div class="text-sm mt-2 text-red" name="errorMessage" v-if="$v.form.orderName.$error">
                        <div v-if="!$v.form.orderName.required">Name required!</div>
                        <div v-if="!$v.form.orderName.nameRegex">Name must contain alphabet characters and start with capital letter!</div>
                    </div>

                    <div class="input-group mt-3 mb-3" :class="{ 'hasError': $v.form.orderEmail.$error }">
                        <div class="input-group-prepend">
                            <label for="orderEmailInput" class="input-group-text">Email</label>
                        </div>
                        <input id="orderEmailInput" class="form-control form-control-lg" v-model="form.orderEmail"
                               type="text"
                               placeholder="Pass the email"/>
                    </div>
                    <div class="text-sm mt-2 text-red" name="errorMessage" v-if="$v.form.orderEmail.$error">
                        <div v-if="!$v.form.orderEmail.required">Email required!</div>
                        <div v-if="!$v.form.orderEmail.email">Email must have an email format!</div>
                    </div>

                    <div class="input-group mt-3 mb-3" :class="{ 'hasError': $v.form.orderPhone.$error }">
                        <div class="input-group-prepend">
                            <label for="orderPhoneInput" class="input-group-text">Phone</label>
                        </div>
                        <input id="orderPhoneInput" class="form-control form-control-lg" v-model="form.orderPhone"
                               type="text"
                               placeholder="Pass the phone number"/>
                    </div>
                    <div class="text-sm mt-2 text-red" name="errorMessage" v-if="$v.form.orderPhone.$error">
                        <div v-if="!$v.form.orderPhone.required">Phone required!</div>
                        <div v-if="!$v.form.orderPhone.numeric">Phone must contain only numbers!</div>
                        <div v-if="!$v.form.orderPhone.minLength">Phone must contain 9-digits!</div>
                        <div v-if="!$v.form.orderPhone.maxLength">Phone must contain 9-digits!</div>
                    </div>
                </form>
            </div>
        </div>
        <button type="button" class="btn btn-info mt-3" @click="makeAnOrder">Make an order</button>
    </div>
</template>


<script>
    //TODO:  Change orderName to work with space
    const axios = require('axios').default;
    const {required, email, numeric, minLength, maxLength, helpers} = require('vuelidate/lib/validators');

    const nameRegex = helpers.regex('alpha', /^[A-Z][A-za-z\s]*$/);

    export default {
        name: 'cartPanel',
        components: {},
        data() {
            return {
                form: {
                    orderName: "",
                    orderEmail: "",
                    orderPhone: ""
                }
            }
        },
        validations: {
            form: {
                orderName: {required, nameRegex},
                orderEmail: {required, email},
                orderPhone: {required, numeric, minLength: minLength(9), maxLength: maxLength(9)}
            }
        },
        computed: {
            cartProducts() {
                // eslint-disable-next-line no-console
                console.log(this.$store.getters.getCart);
                return this.$store.getters.getCart;
            },
            getSummaryCost() {
                let summary = 0;
                let cart = this.$store.getters.getCart;
                cart.forEach(i => summary += i.amount * i.product.unitPrice);

                return summary;
            }
        },
        methods: {
            removeProductFromCart(smth) {
                // eslint-disable-next-line no-console
                console.log(smth);
                this.$store.commit('removeProductFromCart', smth);
            },
            validateOrder(cart) {
                this.$v.form.$touch();
                if (this.$v.form.$error) {
                    // eslint-disable-next-line no-console
                    console.log(this.$v);
                    return false;
                }

                if (cart.length < 1) {
                    alert('Cannot make an empty order');
                    return false;
                }

                if (cart.some(product => product.amount < 1)) {
                    alert('Cannot make an order with amount less than 1');
                     return false;
                }

                return true;
            },
            makeAnOrder() {

                let cart = this.cartProducts;

                if(!this.validateOrder(cart))
                    return;


                let mappedCart = cart.map(cartProduct => ({
                    product: cartProduct.product._id,
                    amount: cartProduct.amount
                }));

                axios.post('http://localhost:8081/orders', {
                    userName: this.form.orderName,
                    email: this.form.orderEmail,
                    phoneNumber: this.form.orderPhone,
                    productList: mappedCart
                })
                    .then(function (response) {
                        alert('Order has been sent');

                        // eslint-disable-next-line no-console
                        console.log(response);
                    }).then(_ => {
                    // eslint-disable-next-line no-console
                    console.log(_);
                    this.form.orderName = "";
                    this.form.orderEmail = "";
                    this.form.orderPhone = "";

                    this.$store.commit('removeAllProductsFromCart');

                    this.$v.form.$reset();
                })
                    .catch(function (error) {
                        // eslint-disable-next-line no-console
                        console.log(error);
                    });
            }
        }
    }
</script>

<style scoped>
    #cartPanel {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

    #tableContainer {
        margin-bottom: 7%;
    }

    .hasError input {
        border-color: red;
    }

    .hasError label {
        color: red;
    }

    div[name="errorMessage"] {
        color: red;
        font-weight: bold;
    }
</style>
