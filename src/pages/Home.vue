<script setup>
import {VApp, VContainer, VCol, VRow} from "vuetify/components";
    import AppBar from "@/components/AppBar.vue";
    import {ref} from "vue";
    import router from "@/router";
    import HorizontalMovieCard from "@/components/HorizontalMovieCard.vue";

    const bookmarks = localStorage.bookmarks !== undefined ? JSON.parse(localStorage.bookmarks).reverse() : []

    const date = new Date;
    if (+(localStorage.cacheExpires) < date.getTime()) {
        localStorage.removeItem("cache");
    }

    function openMovie(movie) {
        localStorage.movie = JSON.stringify(movie);
        router.push("/movie");
    }

    const loaded = ref(false)
    const offline = ref(false)

    let movies = []
    if (localStorage.cache === undefined) {

        fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('http://winbedrives.com/api/movie/by/filtres/0/created/0/4F5A9C3D9A86FA54EACEDDD635185')}`)
            .then(response => {
                if (response.ok) return response.json()
            })
            .then(data => {
                    movies = JSON.parse(data.contents);
                    loaded.value = true;

                    const date = new Date;
                    localStorage.setItem("cache", JSON.stringify(movies))
                    localStorage.setItem("cacheExpires", (date.getTime() + 24 * 60 * 60 * 1000).toString())
                }
            )
            .catch(error => {
                offline.value = true
            })
    }
    else {
        movies = JSON.parse(localStorage.cache)
        loaded.value = true
    }

    function refresh() {
        location.reload()
    }
</script>

<template>
    <v-app>
        <app-bar></app-bar>
        <v-container class="mt-14 h-100 bg-black">

            <div v-if="!loaded" class="w-100 h-100">
                <div v-if="!offline" class="text-center h-100 d-flex justify-center align-center">
                    <v-progress-circular color="indigo-accent-2" indeterminate></v-progress-circular>
                </div>
                <div v-else class="text-center h-100 flex-column d-flex justify-center align-center">
                    <p>خطا در اتصال به سرور</p>
                    <v-btn class="letter rounded-pill mt-3" color="indigo-accent-2" @click.stop="refresh">
                        <v-icon class="ml-1">mdi-reload</v-icon>
                        تلاش مجدد
                    </v-btn>
                </div>
            </div>
            <div v-else>
                <h2>آخرین فیلم های اضافه شده</h2>
                <v-row class="flex-nowrap overflow-x-auto">
                    <v-col cols="5" sm="6" md="6" lg="3" v-for="movie of movies">
                        <horizontal-movie-card :movie="movie"></horizontal-movie-card>
                    </v-col>
                </v-row>
                <br><br>
                <h2>تازه نشان شده ها</h2>
                <v-row class="flex-nowrap overflow-x-auto">
                    <v-col cols="5" sm="6" md="6" lg="3" v-for="movie of bookmarks">
                        <horizontal-movie-card :movie="movie"></horizontal-movie-card>
                    </v-col>
                </v-row>
                <br><br>
                <h2>تازه نشان شده ها</h2>
                <v-row class="flex-nowrap overflow-x-auto">
                    <v-col cols="5" sm="6" md="6" lg="3" v-for="movie of bookmarks">
                        <horizontal-movie-card :movie="movie"></horizontal-movie-card>
                    </v-col>
                </v-row>
                <br><br>
                <p class="font-italic text-center">سایر دسته بندی ها به زودی اضافه خواهند شد...</p>
            </div>
        </v-container>
        <br><br><br>
    </v-app>
</template>

<style scoped>
.letter {
    letter-spacing: 0;
}
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
