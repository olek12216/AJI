<template>
    <div class="moviesTable">
        <div class="container">
            <h2>All movies:</h2>
            <table class="table-condensed table-hover" ref="table">
                <colgroup>      <!--can make it different with bootstrap-->
                    <col class="Titles"/>
                    <col class="Years"/>
                    <col class="Casts"/>
                    <col class="Genres"/>
                </colgroup>
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Production year</th>
                    <th>Cast</th>
                    <th>Genres</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="i in lines" :key="i">
                    <td>{{moviesJson[i - 1].title}}</td>
                    <td>{{moviesJson[i - 1].year}}</td>
                    <td>
                        <span v-for="actor in moviesJson[i - 1].cast" v-bind:key="actor"> {{actor}}</span>
                    </td>
                    <td>
                        <span v-for="genre in moviesJson[i - 1].genres" v-bind:key="genre">{{genre}} </span>
                    </td>
                </tr>
                </tbody>
            </table>
            <input type="button" @click="showMoreMovies()" value="Pokaż więcej" class="btn btn-info col-sm-12">
        </div>
    </div>
</template>

<script>
    export default {
        name: "MovieTable",
        props: {
            moviesJson: {}
        },
        data: function () {
            return {
                lines: 10
            }
        },
        methods: {
            showMoreMovies: function () {
                // eslint-disable-next-line no-console
                console.log('cjik')
                if (this.lines + 10 <= this.moviesJson.length)
                    this.lines += 10;
                else
                    this.lines = this.moviesJson.length;
            },
        },
        watch: {
            moviesJson: {
                handler() {
                    if (this.lines <= this.moviesJson.length)
                        this.lines = 10;
                    else
                        this.lines = this.moviesJson.length;
                }, deep: true
            },
            lines: {
                handler() {
                    this.$emit('linesNumber', this.lines);
                }, deep: true
            }
        }
    }
</script>

<style scoped>
    table {
        margin: auto;
        width: 100%;
    }

    .Titles {
        width: 60%;
    }

    .Years {
        width: 10%;
    }

    .Casts {
        width: 15%;
    }

    .Genres {
        width: 10%;
    }
</style>