<template>
    <div id="ordersPanel">
        <div class="container">
            <form>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <label for="orderStatusSelect" class="input-group-text">Order status</label>
                    </div>
                    <select id="orderStatusSelect" class="custom-select custom-select-lg"
                            @change="changeStatusFilter($event)">
                        <option selected value=0>Select one</option>
                        <option v-for="i in orderStatuses" :key="i._id" value="i._id">{{i.name}}</option>
                    </select>
                </div>
            </form>
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
                    <td>{{orderStatuses.filter(stat => stat._id == i.orderStatus)[0]['name']}}</td>
                    <td>{{i.approvalDate}}-</td>
                    <td>
                        <ol>
<!--                            <li v-for="prod in i.productList" v-bind:key="prod._id">{{prod}}</li>-->
                            <li v-for="prod in i.productList" v-bind:key="prod._id">{{products.filter(pr => pr._id == prod.product)[0].name}} <b>x{{prod.amount}}</b></li>
                        </ol>
                    </td>
                    <td>{{countOrderCost(i)}}</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
        name: "OrdersPanel.vue",
        data: function () {
            return {
                statusFilter: "",
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
            changeStatusFilter() {
                let category = document.getElementById("orderStatusSelect");
                if (category.options.selectedIndex == 0)
                    this.statusFilter = "";
                else
                    this.statusFilter = this.$store.getters.getOrderStatus(category.options.selectedIndex - 1)._id;
                // this.categoryFilter = this.$store.getters.getCategoryOfIndex()
                // eslint-disable-next-line no-console
                console.log(category);
                // this.categoryFilter = obj;
            },
        },
        computed: {
            products() {
                // eslint-disable-next-line no-console
                console.log(this.$store.getters.getProducts);
                return this.$store.getters.getProducts;
            },
            orders() {
                // eslint-disable-next-line no-console
                console.log(this.$store.getters.getOrders);
                // return this.$store.getters.getProducts.filter(elem => elem['name'].includes(this.nameFilter)).filter(elem => elem['productCategory'].includes(this.categoryFilter));

                return this.$store.getters.getOrders.filter(order => order['orderStatus'].includes(this.statusFilter));
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
    #ordersPanel {
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