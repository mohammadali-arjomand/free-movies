<script setup>
import {reactive, ref, watch} from "vue";
import {useRoute} from "vue-router";
import {VApp, VContainer, VRow, VCol} from "vuetify/components";
import SearchBar from "@/components/SearchBar.vue";
import MovieCard from "@/components/MovieCard.vue";
import router from "@/router";

const date = new Date;
if (+(localStorage.catchSearchExpires) < date.getTime()) {
    localStorage.removeItem("catchSearch");
}

const query = useRoute().params.query;
const offline = ref(false)

let searchHistory = localStorage.search === undefined ? [] : JSON.parse(localStorage.search)
searchHistory = searchHistory.filter(value => value.toLowerCase() !== query.toLowerCase())
searchHistory.push(query)
localStorage.search = JSON.stringify(searchHistory)

let found = ref(false);
let movies = reactive([]);

watch(found, () => {
    if (found && movies.length === 1 && localStorage.settingsAutoEnter === "true") {
        localStorage.movie = JSON.stringify(movies[0]);
        router.push("/movie");
    }
})

if (localStorage.catchSearch === undefined || JSON.parse(localStorage.catchSearch).text !== query)
    fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://winbedrives.com/api/search/${query}/4F5A9C3D9A86FA54EACEDDD635185`)}`)
        .then(response => {
            if (response.ok) return response.json()
        })
        .then(data => {
                movies = JSON.parse(data.contents).posters;
                found.value = true;

                const date = new Date;
                localStorage.setItem("catchSearch", JSON.stringify( { text: query, result: movies } ))
                localStorage.setItem("catchSearchExpires", (date.getTime() + 30 * 60 * 1000).toString())
            }
        )
        .catch(error => {
            offline.value = true
            // localStorage.removeItem("catchSearch")
        })
else {
    movies = JSON.parse(localStorage.catchSearch).result
    found.value = true
}

function refresh() {
    location.reload()
}

</script>

<template>

    <v-app>
        <div v-if="found">
            <p v-if="movies.length === 0" class="msg">
                همچین عنوانی پیدا نشد!
            </p>
            <v-container v-else class="bg-black">
                <search-bar :value="query" :close-btn="true" :refresh="true"></search-bar>
                <v-row>
                    <v-col cols="12" sm="6" md="6" lg="3" v-for="movie of movies">
                        <movie-card :movie="movie"></movie-card>
                    </v-col>
                </v-row>
                <br>
            </v-container>
        </div>
        <div v-else class="h-100">
            <v-container class="bg-black h-100">
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