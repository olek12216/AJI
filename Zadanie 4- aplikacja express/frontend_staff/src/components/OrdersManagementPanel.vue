<template>
    <div id="ordersManagementPanel">
        <div class="container">
            <table class="table-condensed table hover" ref="table">
                <colgroup>
                    <col class="Lp"/>
                    <col class="userName"/>
                    <col class="email"/>
                    <col class="phoneNumber"/>
                    <col class="orderStatus"/>
                    <col class="approvalDate"/>
                    <col class="products"/>
                    <col class="cost"/>
                    <!--                    <col class="Price"/>-->
                    <!--                    <col class="Weight"/>-->
                    <!--                    <col class="ChangeProperties"/>-->
                </colgroup>
                <thead>
                <tr>
                    <th>Lp</th>
                    <th>userName</th>
                    <th>email</th>
                    <th>phoneNumber</th>
                    <th>orderStatus</th>
                    <th>approvalDate</th>
                    <th>products</th>
                    <th>cost</th>
                    <th>Update </th>
                    <!--                    <th>Price</th>-->
                    <!--                    <th>Weight</th>-->
                    <!--                    <th>Change properties</th>-->
                </tr>
                </thead>
                <tbody>
                <tr v-for="i in orders" :key="i._id">
                    <td id="lp"/>
                    <td>{{i.userName}}</td>
                    <td>{{i.email}}</td>
                    <td>{{i.phoneNumber}}</td>
                    <!--                    <td>{{i.orderStatus}}</td>-->
<!--                    <td>{{orderStatuses.filter(stat => stat._id == i.orderStatus)[0]['name']}}</td>-->
                    <td>
                        <select id="orderStatusSelect" class="custom-select custom-select-md" @change="chng($event, i)">
                            <!--                            <option selected value=0>{{categories.filter(cat => cat._id == i.productCategory)[0]['name']}}</option>-->
                            <option v-for="j in orderStatuses" :key="j._id" :value=j.name
                                    :selected="j._id == i.orderStatus">
                                {{j.name}}
                            </option>
                        </select>
                    </td>
                    <td>{{i.approvalDate}}-</td>
                    <td>
                        <ol>
                            <!--                            <li v-for="prod in i.productList" v-bind:key="prod._id">{{prod}}</li>-->
                            <li v-for="prod in i.productList" v-bind:key="prod._id">{{products.filter(pr => pr._id == prod.product)[0].name}} <b>x{{prod.amount}}</b></li>
                        </ol>
                    </td>
                    <td>{{countOrderCost(i)}}</td>
                    <td>
                        <button type="button" class="btn btn-info" v-on:click="sendUpdateRequest(i)">Submit</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    const axios = require('axios').default;

    export default {
        name: "OrdersManagementPanel.vue",
        data: function () {
            return {
                statusCompletedFilter: "",
            }
        },
        methods: {
            countOrderCost(order) {
                let summary = 0;

                order.productList.forEach(prod => {
                    summary += Number(prod.amount) * Number(this.products.filter(pr => pr._id == prod.product)[0].unitPrice);
                });

                return summary;
            },
            setStatusCompletedFilter() {
                this.statusCompletedFilter = this.orderStatuses.filter(status => status.name == 'Completed')[0]._id;
            },
            chng(event, order) {
                // let cat = document.getElementById("categoryProductSelect");
                order.orderStatus = this.orderStatuses.filter(stat => stat.name == event.target.value)[0]._id;

                // // eslint-disable-next-line no-console
                // console.log(event);
                // // eslint-disable-next-line no-console
                // console.log(product);
                // // eslint-disable-next-line no-console
                // console.log(event.target.value);
            },
            sendUpdateRequest(order) {

                // let orderStatusId =

                // eslint-disable-next-line no-console
                console.log(order);


                axios.put('http://localhost:8081/orders/' + order._id, {
                        orderStatus: order.orderStatus
                    }
                )
                    .then(function (response) {
                        alert('Order update has been sent');

                        // eslint-disable-next-line no-console
                        console.log(response);
                    })
                    .catch(err => {
                        alert(err);
                        // eslint-disable-next-line no-console
                        console.log(err);
                    });
            },
        },
        computed: {
            products() {
                // eslint-disable-next-line no-console
                console.log(this.$store.getters.getProducts);
                return this.$store.getters.getProducts;
            },
            orders() {
                this.setStatusCompletedFilter();
                // eslint-disable-next-line no-console
                console.log(this.$store.getters.getOrders);
                // return this.$store.getters.getProducts.filter(elem => elem['name'].includes(this.nameFilter)).filter(elem => elem['productCategory'].includes(this.categoryFilter));

                return this.$store.getters.getOrders;
                // return this.$store.getters.getOrders.filter(order => !order['orderStatus'].includes(this.statusCompletedFilter));
            },
            orderStatuses() {
                // eslint-disable-next-line no-console
                console.log(this.$store.getters.getOrderStatuses);
                return this.$store.getters.getOrderStatuses;
            },
        }
    }
</script>

<style scoped>
    #ordersManagementPanel {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

    .input-group-prepend > label {
        width: 100%;
    }

    table {
        counter-reset: rowNumber -1;
    }

    table tr {
        counter-increment: rowNumber;
    }

    table tr td:first-child::before {
        content: counter(rowNumber);
        min-width: 1em;
        margin-right: 0.5em;
    }

</style>