<template>
    <div id="productsPanel">
        <div class="container">
            <form>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <label for="productNameInput" class="input-group-text">Name</label>
                    </div>
                    <input id="productNameInput" class="form-control form-control-lg" v-model="nameFilter" type="text"
                           placeholder="Pass the name or part of the name"/>
                </div>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <label for="categorySelect" class="input-group-text">Category</label>
                    </div>
                    <select id="categorySelect" class="custom-select custom-select-lg"
                            @change="changeCategoryFilter($event)">
                        <option selected value=0>Select one</option>
                        <option v-for="i in categories" :key="i._id" value="i._id">{{i.name}}</option>
                    </select>
                </div>
            </form>
            <h1>Products</h1>
            <table class="table-condensed table hover" ref="table">
                <colgroup>
                    <col class="Lp"/>
                    <col class="Name"/>
                    <col class="Description"/>
                    <col class="Category"/>
                    <col class="Price"/>
                    <col class="Weight"/>
                    <col class="ChangeProperties"/>
                </colgroup>
                <thead>
                <tr>
                    <th>Lp</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Weight</th>
                    <th>Change properties</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="i in products" :key="i._id">
                    <td id="lp"/>
                    <td>{{i.name}}</td>
                    <td>{{i.description}}</td>
                    <!--                    <td>{{categories.filter(cat => cat._id == i.productCategory)[0]['name']}}</td>-->
                    <td>
                        <select id="categoryProductSelect" class="custom-select custom-select-md"
                                @change="chng($event, i)">
                            <!--                            <option selected value=0>{{categories.filter(cat => cat._id == i.productCategory)[0]['name']}}</option>-->
                            <option v-for="j in categories" :key="j._id" :value=j.name
                                    :selected="j.name == categories.filter(cat => cat._id == i.productCategory)[0]['name']">
                                {{j.name}}
                            </option>
                        </select>
                    </td>
                    <!--                    <td>{{i.unitPrice}}</td>-->
                    <td>
                        <input class="form-control-sm" aria-disabled="true" required type="number"
                               v-model="i.unitPrice"
                               min="1" step="1"/>
                    </td>
                    <!--                    <td>{{i.unitWeight}}</td>-->
                    <td>
                        <input class="form-control-sm" aria-disabled="true" required type="number"
                               v-model="i.unitWeight"
                               min="0.1" step="0.1"/>
                    </td>
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
        name: "ProductsPanel.vue",
        components: {},
        data: function () {
            return {
                nameFilter: "",
                categoryFilter: "",
            }
        },
        methods: {
            changeCategoryFilter() {
                let category = document.getElementById("categorySelect");
                if (category.options.selectedIndex == 0)
                    this.categoryFilter = "";
                else
                    this.categoryFilter = this.$store.getters.getCategory(category.options.selectedIndex - 1)._id;
                // this.categoryFilter = this.$store.getters.getCategoryOfIndex()
                // eslint-disable-next-line no-console
                console.log(category);
                // this.categoryFilter = obj;
            },
            chng(event, product) {
                // let cat = document.getElementById("categoryProductSelect");
                product.productCategory = this.categories.filter(cat => cat.name == event.target.value)[0]._id;

                // // eslint-disable-next-line no-console
                // console.log(event);
                // // eslint-disable-next-line no-console
                // console.log(product);
                // // eslint-disable-next-line no-console
                // console.log(event.target.value);
            },
            sendUpdateRequest(product) {

                // eslint-disable-next-line no-console
                console.log(product);


                axios.put('http://localhost:8081/products/' + product._id, {
                        unitPrice: product.unitPrice,
                        unitWeight: product.unitWeight,
                        productCategory: product.productCategory
                    }
                )
                    .then(function (response) {
                        alert('Product update has been sent');

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
                // console.log(this.$store.getters.getProducts.filter(elem => elem['name'].includes(this.nameFilter)).filter(elem => elem['productCategory'].includes(this.categoryFilter)));
                return this.$store.getters.getProducts.filter(elem => elem['name'].includes(this.nameFilter)).filter(elem => elem['productCategory'].includes(this.categoryFilter));
            },
            categories() {
                // eslint-disable-next-line no-console
                console.log(this.$store.getters.getCategories);
                return this.$store.getters.getCategories;
            }
        },
    }
</script>

<style scoped>
    #productsPanel {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

    .input-group-prepend {
        min-width: 10%;
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