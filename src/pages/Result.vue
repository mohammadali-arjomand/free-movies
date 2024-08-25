<script setup>
import {reactive, ref, watch} from "vue";
import {useRoute} from "vue-router";
import {VApp, VContainer, VRow, VCol, VCard, VBtn, VDialog} from "vuetify/components";
import SearchBar from "@/components/SearchBar.vue";
import MovieCard from "@/components/MovieCard.vue";
import router from "@/router";

const cancelDlg = ref(false)

const date = new Date;
if (+(localStorage.cacheSearchExpires) < date.getTime()) {
    localStorage.removeItem("cacheSearch");
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

if (localStorage.cacheSearch === undefined || JSON.parse(localStorage.cacheSearch).text !== query)
    fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://winbedrives.com/api/search/${query}/4F5A9C3D9A86FA54EACEDDD635185`)}`)
        .then(response => {
            if (response.ok) return response.json()
        })
        .then(data => {
                movies = JSON.parse(data.contents).posters;
                found.value = true;

                const date = new Date;
                localStorage.setItem("cacheSearch", JSON.stringify( { text: query, result: movies } ))
                localStorage.setItem("cacheSearchExpires", (date.getTime() + 30 * 60 * 1000).toString())
            }
        )
        .catch(error => {
            offline.value = true
            // localStorage.removeItem("catchSearch")
        })
else {
    movies = JSON.parse(localStorage.cacheSearch).result
    found.value = true
}

function refresh() {
    location.reload()
}

</script>

<template>

    <v-app>
        <v-dialog v-model="cancelDlg">
            <v-card title="فری مووی">
                <v-card-text>
                    آیا میخواهید جستجو را لغو کنید؟
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text="بله" class="letter" color="red" @click="router.push('/search')"></v-btn>
                    <v-btn text="خیر" class="letter" @click="cancelDlg = false"></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-container class="h-100 bg-black">
        <div v-if="found" class="h-100">
            <div v-if="movies.length === 0" class="text-center h-100 flex-column d-flex justify-center align-center">
                <p>همچین عنوانی پیدا نشد!</p>
                <v-btn class="letter rounded-pill mt-3" color="indigo-accent-2" @click.stop="router.back()">
                    <v-icon class="ml-1">mdi-arrow-right</v-icon>
                    بازگشت
                </v-btn>
            </div>
            <div v-else class="bg-black">
                <search-bar :value="query" :close-btn="true" :refresh="true"></search-bar>
                <v-row>
                    <v-col cols="12" sm="6" md="6" lg="3" v-for="movie of movies">
                        <movie-card :movie="movie"></movie-card>
                    </v-col>
                </v-row>
                <br>
            </div>
        </div>
        <div v-else class="h-100">
                <div v-if="!offline" class="text-center h-100 d-flex justify-center align-center">
                    <v-progress-circular @click="cancelDlg = true" color="indigo-accent-2" indeterminate></v-progress-circular>
                </div>
                <div v-else class="text-center h-100 flex-column d-flex justify-center align-center">
                    <p>خطا در اتصال به سرور</p>
                    <v-btn class="letter rounded-pill mt-3" color="indigo-accent-2" @click.stop="refresh">
                        <v-icon class="ml-1">mdi-reload</v-icon>
                        تلاش مجدد
                    </v-btn>
                </div>
        </div>
        </v-container>
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

a {
    text-decoration: none;
    color: royalblue;
}

.letter {
    letter-spacing: 0;
}
</style>