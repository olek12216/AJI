<template>
    <div id="appNavbar">
        <div class="jumbotron" id="websiteHeader">
            <h1 id="websiteTitle">myShop staff app</h1>
            <b-button variant="info" size="lg" name="navButton" @click="goHome">Home</b-button>
            <b-button variant="info" size="lg" name="navButton" @click="goProducts">Products</b-button>
            <b-button variant="info" size="lg" name="navButton" @click="goOrders">Orders</b-button>
            <b-button variant="info" size="lg" name="navButton" @click="goUnapprovedOrders">Orders management</b-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AppNavbar.vue",
        methods: {
            goHome() {
                this.$router.push('/');
            },
            goProducts() {
                this.$router.push('/products');
            },
            goOrders() {
                this.$router.push('/orders');
            },
            goUnapprovedOrders() {
                this.$router.push('/ordersmanagement');
            },
        }
    }
</script>

<style scoped>
    #appNavbar {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        /*margin-top: 60px;*/
    }

    #websiteHeader {
        padding-bottom: 2rem;
    }

    #websiteTitle {
        font-size: 3rem;
        font-family: 'Pacifico', cursive;
        padding-bottom: 1vh;
    }

    button[name='navButton'] {
        margin: 4vh 1% 0 1%;
    }

</style>