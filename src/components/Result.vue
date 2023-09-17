<script setup>
import {reactive, ref, watch} from "vue";
import {useRoute} from "vue-router";
import {VApp, VContainer, VRow, VCol} from "vuetify/components";
import SearchBar from "@/components/SearchBar.vue";
import MovieCard from "@/components/MovieCard.vue";
import LoadingCard from "@/components/LoadingCard.vue";
import router from "@/router";

const query = useRoute().params.query;

let found = ref(false);
let movies = reactive([]);

watch(found, () => {
    if (found && movies.length === 1 && localStorage.settingsAutoEnter === "true") {
        localStorage.movie = JSON.stringify(movies[0]);
        router.push("/movie");
    }
})

fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://winbedrives.com/api/search/${query}/4F5A9C3D9A86FA54EACEDDD635185`)}`)
    .then(response => {
        if (response.ok) return response.json()
        window.location.reload()
    })
    .then(data => {
            movies = JSON.parse(data.contents).posters;
            found.value = true;
        }
    );

</script>

<template>

    <v-app>
        <search-bar :value="query" :refresh="true"></search-bar>
        <div v-if="found">
            <p v-if="movies.length === 0" class="msg">
                همچین عنوانی پیدا نشد!
            </p>
            <v-container v-else class="mt-14">
                <v-row>
                    <v-col cols="6" sm="4" md="3" lg="2" v-for="movie of movies">
                        <movie-card :movie="movie"></movie-card>
                    </v-col>
                </v-row>
                <br>
            </v-container>
        </div>
        <div v-else>
            <v-container class="mt-14">
                <v-row>
                    <v-col cols="6" sm="4" md="3" lg="2" v-for="n in 24">
                        <loading-card></loading-card>
                    </v-col>
                </v-row>
            </v-container>
        </div>
    </v-app>

</template>

<style scoped>
h1 {
    margin-bottom: 10px;
}

p.msg {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.container {
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
}

a {
    text-decoration: none;
    color: royalblue;
}
</style>