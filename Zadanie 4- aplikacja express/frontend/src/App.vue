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
        data () {
            return {
                info: null
            }
        },
        mounted () {
            this.$store.commit('loadProducts');
            this.$store.commit('loadCategories');
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
