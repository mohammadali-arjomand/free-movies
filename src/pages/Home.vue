<script setup>
import {VApp, VContainer, VCol, VRow} from "vuetify/components";
    import AppBar from "@/components/AppBar.vue";
    import {ref} from "vue";
    import router from "@/router";
    import MovieCard from "@/components/MovieCard.vue";

    const date = new Date;
    if (+(localStorage.catchExpires) < date.getTime()) {
        localStorage.removeItem("catch");
    }

    function openMovie(movie) {
        localStorage.movie = JSON.stringify(movie);
        router.push("/movie");
    }

    const loaded = ref(false)

    let movies = []
    if (localStorage.catch === undefined) {

        fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('http://winbedrives.com/api/movie/by/filtres/0/created/0/4F5A9C3D9A86FA54EACEDDD635185')}`)
            .then(response => {
                if (response.ok) return response.json()
                window.location.reload()
            })
            .then(data => {
                    movies = JSON.parse(data.contents);
                    loaded.value = true;

                    const date = new Date;
                    localStorage.setItem("catch", JSON.stringify(movies))
                    localStorage.setItem("catchExpires", (date.getTime() + 24 * 60 * 60 * 1000).toString())
                }
            );
    }
    else {
        movies = JSON.parse(localStorage.catch)
        loaded.value = true
    }
</script>

<template>
    <v-app>
        <app-bar></app-bar>
        <v-container class="mt-14 h-100 bg-black">

            <div v-if="!loaded" class="w-100 h-100">
                <div class="text-center h-100 d-flex justify-center align-center">
                    <v-progress-circular color="indigo-accent-2" indeterminate></v-progress-circular>
                </div>
            </div>
            <div v-else>
                <v-row>
                    <v-col cols="12" sm="6" md="6" lg="3" v-for="movie of movies">
                        <movie-card :movie="movie"></movie-card>
                    </v-col>
                </v-row>
            </div>
        </v-container>
    </v-app>
</template>

<style scoped>
.z-index-200 {
    z-index: 200;
}
.text-shadow {
    text-shadow: 2px 2px 4px black;
}
.h-100px {
    min-height: 500px !important;
    max-height: 500px !important;
}
.centered-image {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 100%;
}

</style>
