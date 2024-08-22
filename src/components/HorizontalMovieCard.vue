<script setup>
import {VCard, VImg, VCardItem, VCardTitle} from "vuetify/components";
import router from "@/router";

const props = defineProps(["movie"])

function openMovie(movie) {
    localStorage.movie = JSON.stringify(movie);
    router.push("/movie");
}
</script>

<template>
    <v-card class="mt-3 h-100" @click="openMovie(movie)" dir="ltr">
        <v-img :src="movie.image" class="d-block"></v-img>
        <v-card-item>
            <v-card-title width="50">{{ movie.title }}</v-card-title>
        </v-card-item>
    </v-card>
</template>

<style scoped></style>