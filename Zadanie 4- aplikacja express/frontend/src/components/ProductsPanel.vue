<template>
    <div id="productsPanel">
        <div class = "container">
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
                    <select id="categorySelect" class="custom-select custom-select-lg" @change="changeCategoryFilter($event)">
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
                    <col class="Price"/>
                    <col class="AddToCart"/>
                </colgroup>
                <thead>
                <tr>
                    <th>Lp</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Add to cart</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="i in products" :key="i._id">
                    <td id="lp"/>
                    <td>{{i.name}}</td>
                    <td>{{i.description}}</td>
                    <td>{{i.unitPrice}}</td>
                    <td><button type="button" class="btn btn-info" v-on:click="addProduct(i)">Add</button></td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>


<script>
    export default {
        name: 'productsPanel',
        components: {
        },
        data: function() {
            return {
                nameFilter: "",
                categoryFilter: "",
            }
        },
        methods: {
            changeCategoryFilter(){
                let category = document.getElementById("categorySelect");
                if(category.options.selectedIndex == 0)
                    this.categoryFilter = "";
                else
                    this.categoryFilter = this.$store.getters.getCategory(category.options.selectedIndex - 1)._id;
                // this.categoryFilter = this.$store.getters.getCategoryOfIndex()
                // eslint-disable-next-line no-console
                console.log(category);
                // this.categoryFilter = obj;
            },
            addProduct(event) {
                this.$store.commit('addProductToCart', event);
                // eslint-disable-next-line no-console
                console.log(event);
            }

        },
        computed: {
            products() {
                return this.$store.getters.getProducts.filter(elem => elem['name'].includes(this.nameFilter)).filter(elem => elem['productCategory'].includes(this.categoryFilter));
            },
            categories() {
                return this.$store.getters.getCategories;
            }
        },
        mounted: {

        },
        watch: {
            // nameFilter: "",
        }

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

    .input-group-prepend{
        min-width: 10%;
    }

    .input-group-prepend > label{
        width: 100%;
    }

    table {
        counter-reset: rowNumber + 1;
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
