<template>
    <div id="appNavbar">
        <div class="jumbotron" id="websiteHeader">
            <h1 id="websiteTitle">myShop client app</h1>
            <button type="button" class="btn btn-lg btn-info" name="navButton" @click="goHome">Home</button>
            <button type="button" class="btn btn-lg btn-info" name="navButton" @click="goProducts">Products</button>
            <button type="button" class="btn btn-lg btn-info" name="navButton" @click="goCart">Cart</button>
        </div>

    </div>
</template>

<script>

    export default {
        name: 'appNavbar',
        components: {
            // AppShop
        },
        methods: {
            goHome() {
                this.$router.push('/');
            },
            goProducts() {
                this.$router.push('/products');
            },
            goCart() {
                this.$router.push('/cart');
            }
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
