<script setup>
import {VApp, VContainer, VRow, VCol, VListItem, VIcon, VList, VBtn} from "vuetify/components";
import MovieCard from "@/components/MovieCard.vue";
import AppBar from "@/components/AppBar.vue";
import {ref} from "vue";

const bookmarks = localStorage.bookmarks !== undefined ? JSON.parse(localStorage.bookmarks).reverse() : []
const pinnedBookmarks = ref(localStorage.pinnedBookmarks !== undefined ? JSON.parse(localStorage.pinnedBookmarks).reverse() : [])

const pinnedMovies = ref([])
const unpinnedMovies = ref([])
for (let movie of bookmarks) {
    if (pinnedBookmarks.value.includes(movie.id))
        pinnedMovies.value.push(movie)
    else
        unpinnedMovies.value.push(movie)
}

function pinMovie(movieId) {
    pinnedBookmarks.value.push(movieId)
    localStorage.pinnedBookmarks = JSON.stringify(pinnedBookmarks.value)
    location.reload()
}
function unpinMovie(movieId) {
    pinnedBookmarks.value.splice(pinnedBookmarks.value.indexOf(movieId), 1)
    localStorage.pinnedBookmarks = JSON.stringify(pinnedBookmarks.value)
    location.reload()
}
</script>

<template>
    <v-app>
        <app-bar></app-bar>
        <p class="msg" v-if="bookmarks.length < 1">هیچ موردی نشان نشده است</p>
        <v-container v-else class="bg-black mt-14 h-100">
            <v-row>
                <v-col cols="12" sm="6" md="6" lg="3" v-for="movie of pinnedMovies">
                    <v-row>
                        <v-col cols="10">
                            <movie-card :movie="movie"></movie-card>
                        </v-col>
                        <v-col cols="2">
                            <v-btn @click="unpinMovie(movie.id)" class="bg-transparent fix-menu" size="small" style="height: 50px; border-radius: 50px">
                                <v-icon>mdi-pin</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="12" sm="6" md="6" lg="3" v-for="movie of unpinnedMovies">
                    <v-row>
                        <v-col cols="10">
                            <movie-card :movie="movie"></movie-card>
                        </v-col>
                        <v-col cols="2">
                            <v-btn @click="pinMovie(movie.id)" class="bg-transparent fix-menu" size="small" style="height: 50px; border-radius: 50px">
                                <v-icon>mdi-pin-outline</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
        <br><br><br>
    </v-app>
</template>

<style scoped>
.msg {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>