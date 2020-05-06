<template>
    <div id="app">
        <img alt="Vue logo" src="./assets/video_library-24px.svg">
        <FilterPanel id="filterpanel" @clicked="FilterPropertiesChanged"/>
        <MovieTable id="movietable" :moviesJson="filteredMovies" @linesNumber="LinesNumberChanged"/>
        <GenreMovieList id="genremovielist" :movies-json="genreGroupedMovies"/>
        <CastMovieList id="castmovielist" :movies-json="castGroupedMovies"/>
    </div>
</template>


<script>
    import json from './Movies.json'
    import FilterPanel from "@/components/FilterPanel";
    import MovieTable from "@/components/MovieTable";
    import GenreMovieList from "@/components/GenreMovieList";
    import CastMovieList from "@/components/CastMovieList";
    import _ from 'lodash';


    export default {
        name: 'app',
        components: {
            CastMovieList,
            GenreMovieList,
            FilterPanel,
            MovieTable
        },
        data() {
            return {
                moviesJson: json,
                filteredMovies: json,
                genreGroupedMovies: [],
                castGroupedMovies: [],
                lines: 10,
                titleFilter: "",
                yearFromFilter: 0,
                yearToFilter: 0,
                castFilter: ""
            }
        },
        methods: {
            FilterPropertiesChanged: function (titleFilter, yearFromFilter, yearToFilter, castFilter) {
                this.titleFilter = titleFilter;
                this.yearFromFilter = yearFromFilter;
                this.yearToFilter = yearToFilter;
                this.castFilter = castFilter;


                this.FilterTable();
                this.GroupByGenre();
                this.GroupByCast();
            },
            LinesNumberChanged: function (linesNumber) {
                // eslint-disable-next-line no-console
                this.lines = linesNumber;


                this.GroupByGenre();
                this.GroupByCast();
            },
            FilterTable: function () {
                let titleFilter = this.titleFilter;
                let yearFromFilter = this.yearFromFilter;
                let yearToFilter = this.yearToFilter;
                let castFilter = this.castFilter;

                this.filteredMovies = _.filter(this.moviesJson, function (movie) {
                    if (movie.title.includes(titleFilter) &&
                        parseInt(movie.year) >= yearFromFilter &&
                        parseInt(movie.year) <= yearToFilter &&
                        (castFilter == "" ? true : _.includes(movie.cast, castFilter) /*(_.find(movie.cast, castFilter) >= 0)*/))
                        return true;

                    else
                        return false;
                });
            },
            GroupByGenre: function () {
                let genreSet = new Set();
                let arr = [];


                for (let i = 0; i < this.lines; i++) {
                    for (let genre of this.filteredMovies[i].genres) {
                        genreSet.add(genre);
                    }
                }

                for (let genre of genreSet) {
                    let genreMovies = [];
                    for (let i = 0; i < this.lines; i++) {
                        if (_.includes(this.filteredMovies[i].genres, genre)) {
                            genreMovies.push(this.filteredMovies[i]);
                        }
                    }
                    arr.push({key: genre, value: genreMovies});
                }

                this.genreGroupedMovies = arr;
            },
            GroupByCast: function () {
                let castSet = new Set();
                let arr = [];


                for (let i = 0; i < this.lines; i++) {
                    for (let actor of this.filteredMovies[i].cast) {
                        castSet.add(actor);
                    }
                }


                for (let actor of castSet) {
                    let actorMovies = [];
                    for (let i = 0; i < this.lines; i++) {
                        if (_.includes(this.filteredMovies[i].cast, actor)) {
                            actorMovies.push(this.filteredMovies[i]);
                        }
                    }
                    arr.push({key: actor, value: actorMovies});
                }

                this.castGroupedMovies = arr;
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                this.GroupByGenre();
                this.GroupByCast();
            })
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
        margin-top: 60px;
    }

    #filterpanel {
        padding-top: 2%;
        padding-bottom: 2%;
    }

    #movietable {
        padding-top: 2%;
        padding-bottom: 2%;
    }

    img {
        width: 10rem;
    }
</style>
