<template>
    <div id="app">
        <appNavbar/>
        <router-view></router-view>
    </div>
</template>

<script>
    import AppNavbar from "@/components/AppNavbar";

    export default {
        name: 'app',
        components: {
            AppNavbar
        },
        mounted() {
            this.$store.commit('loadCategories');
            this.$store.commit('loadProducts');
            this.$store.commit('loadOrders');
            this.$store.commit('loadOrderStatuses');
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        /*margin-top: 60px;*/
    }
</style>
