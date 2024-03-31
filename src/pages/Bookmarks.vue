<script setup>
import {VApp, VAppBar, VAppBarTitle, VAppBarNavIcon, VContainer, VRow, VCol} from "vuetify/components";
import MovieCard from "@/components/MovieCard.vue";
import router from "@/router";
import AppBar from "@/components/AppBar.vue";

const bookmarks = localStorage.bookmarks !== undefined ? JSON.parse(localStorage.bookmarks).reverse() : []

</script>

<template>
    <v-app>
        <app-bar></app-bar>
        <p class="msg" v-if="bookmarks.length < 1">هیچ موردی نشان نشده است</p>
        <v-container v-else class="bg-black mt-14 h-100">
            <v-row>
                <v-col cols="12" sm="6" md="6" lg="3" v-for="movie of bookmarks">
                    <movie-card :movie="movie"></movie-card>
                </v-col>
            </v-row>
        </v-container>
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