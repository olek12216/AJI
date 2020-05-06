<template>
    <div class="genreMoviesList">
        <div class="container">
            <h1>Movies by genre</h1>
            <div class="container" id="moviesList" v-for="genre in moviesJson" v-bind:key="genre.key">
                <h3>{{genre.key}}</h3>
                <ol>
                    <span v-for="movie in genre.value" v-bind:key="movie.title">
                        <li>{{movie.title}} {{movie.year}}</li>
                    </span>

                </ol>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "GenreMovieList",
        props: {
            moviesJson: {}
        },
        methods: {}
    }
</script>

<style scoped>
    .container {
        text-align: left;
    }

    #moviesList {
        margin-left: 2%;
    }
</style>