<template>
    <div class="filter">
        <div class="container">
            <h1>Movies database</h1>
            <form>
                <div class="form-group">
                    <label>Title</label>
                    <input class="form-control" v-model="titleFilter" type="text"
                           placeholder="Pass title or part of the title"/>
                </div>
                <div class="form-group row">
                    <label for="inputProductionFrom" class="col-sm-4 col-form-label">Production year since:</label>
                    <div class="col-sm-8">
                        <input class="form-control" v-model="yearFromFilter" type="text" id="inputProductionFrom"
                               placeholder="Integer in the range 1900-2019">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputProductionFrom" class="col-sm-4 col-form-label">Production year to:</label>
                    <div class="col-sm-8">
                        <input class="form-control" v-model="yearToFilter" type="text" id="inputProductionTo"
                               placeholder="Integer in the range of 1900-2019">
                    </div>
                </div>
                <div class="form-group row">
                    <label>Cast</label>
                    <input class="form-control" v-model="castFilter" type="text" placeholder="First and last name"/>
                </div>
                <!--                <button>send</button>-->
                <input type="button" value="Szukaj" class="btn btn-info col-sm-12" @click="onClickButton">
            </form>
        </div>

    </div>
</template>

<script>
    export default {
        name: "Filter",
        props: {},
        data: function () {
            return {
                titleFilter: "",
                yearFromFilter: "",
                yearToFilter: "",
                castFilter: ""
            }
        },
        methods: {
            onClickButton() {
                let yearFrom, yearTo;
                if (this.yearFromFilter == ""/*isNaN(this.yearFromFilter)*/)
                    yearFrom = 0;
                else
                    yearFrom = parseInt(this.yearFromFilter)

                if (this.yearToFilter == ""/*isNaN(this.yearToFilter)*/)
                    yearTo = 2200;
                else
                    yearTo = parseInt(this.yearToFilter)


                this.$emit('clicked', this.titleFilter, yearFrom, yearTo, this.castFilter)
            }
        }
    }
</script>

<style scoped>
    .form-group {
        margin-left: 0;
        margin-right: 0;
    }

    label {
        padding-left: 0;
        float: left;
        text-align: left;
    }
</style>