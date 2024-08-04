<script setup>
import {VCard, VImg} from "vuetify/components";
import router from "@/router";

const props = defineProps(["movie"])
const showGenres = localStorage.settingsShowGenres === undefined ? true : eval(localStorage.settingsShowGenres)

function openMovie(movie) {
    localStorage.movie = JSON.stringify(movie);
    router.push("/movie");
}
</script>

<template>
    <v-card class="mt-3 bg-black h-100" @click="openMovie(movie)" dir="ltr">
        <v-row>
            <v-col cols="4">
                <v-img :src="movie.image" class="d-block rounded"></v-img>
            </v-col>
            <v-col cols="8">
                <p>{{ movie.title }}</p>
                <div class="icon"><v-icon color="indigo-accent-2">mdi-star</v-icon> {{ movie.imdb }}</div>
                <div class="star"><v-icon color="indigo-accent-2">mdi-calendar-month</v-icon> {{ movie.year }}</div>
                <!-- TODO: Complete 'showed' or not -->
                <div class="genres" v-if="showGenres">
                    <div v-for="genre of movie.genres">{{ genre.title }}</div>
                </div>
            </v-col>
        </v-row>
    </v-card>
</template>

<style scoped>
.icon {
    margin-top: 5px;
}
.genres {
    margin-top: 5px;
    * {
        display: inline-block;
        font-size: .75rem;
        line-height: 1rem;
        margin: 2px;
        background-color: #536DFE;
        border-radius: 50px;
        padding: .25rem .5rem;
    }
}
</style>