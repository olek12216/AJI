<template>
    <div class="castMoviesList">
        <div class="container">
            <h1>Movies by cast</h1>
            <div class="container" id="movieList" v-for="actor in moviesJson" v-bind:key="actor.key">
                <h4>{{actor.key}}</h4>
                <ol>
                    <span v-for="movie in actor.value" v-bind:key="movie.title">
                        <li>{{movie.title}} {{movie.year}}</li>
                    </span>

                </ol>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CastMovieList",
        props: {
            moviesJson: {}
        }
    }
</script>

<style scoped>
    .container {
        text-align: left;
    }

    .castMoviesList {
        padding-top: 1%;
    }

    #movieList {
        margin-left: 2%;
    }
</style>