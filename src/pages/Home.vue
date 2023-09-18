<script setup>
import {VApp, VContainer, VCarousel, VCarouselItem, VImg, VCol, VRow} from "vuetify/components";
    import AppBar from "@/components/AppBar.vue";
    import LoadingCarousel from "@/components/LoadingCarousel.vue";
    import {ref} from "vue";
    import router from "@/router";
    import MovieCard from "@/components/MovieCard.vue";
import LoadingCard from "@/components/LoadingCard.vue";

    function openMovie(movie) {
        localStorage.movie = JSON.stringify(movie);
        router.push("/movie");
    }

    const loaded = ref(false)
    let movies = []
    fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('http://winbedrives.com/api/movie/by/filtres/0/created/0/4F5A9C3D9A86FA54EACEDDD635185')}`)
        .then(response => {
            if (response.ok) return response.json()
            window.location.reload()
        })
        .then(data => {
                movies = JSON.parse(data.contents);
                loaded.value = true;
            }
        );
</script>

<template>
    <v-app>
        <app-bar></app-bar>
        <v-container class="mt-14 mb-4">
            <div v-if="!loaded" class="w-100">
                <LoadingCarousel/>
                <v-row class="mt-4">
                    <v-col cols="6" sm="4" md="3" lg="2" v-for="n in 24">
                        <loading-card></loading-card>
                    </v-col>
                </v-row>
            </div>
            <div v-else>
                <div class="ltr">
                    <v-carousel :cycle="true" height="400" class="rounded mt-4" hide-delimiter-background show-arrows="hover">
                        <v-carousel-item v-for="movie in movies.slice(0, 5)">
                            <div class="overflow-hidden" @click="openMovie(movie)">
                                <p class="position-absolute z-index-200 text-white w-100 h-100 d-flex justify-center align-end pb-10 text-h6 text-shadow">{{ movie.title }}</p>
                                <img :src="movie.image" :alt="movie.title" class="centered-image rounded"/>
                            </div>
                        </v-carousel-item>
                    </v-carousel>
                </div>
                <h2 class="mt-4">فیلم های جدید</h2>
                <v-row>
                    <v-col cols="6" sm="4" md="3" lg="2" v-for="movie of movies.slice(0, 24)">
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
