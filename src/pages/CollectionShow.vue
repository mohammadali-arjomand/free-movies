<script setup>

import {VCol, VContainer, VRow} from "vuetify/components";
import MovieCard from "@/components/MovieCard.vue";
import AppBar from "@/components/AppBar.vue";

const collection = localStorage.collection !== undefined ? JSON.parse(localStorage.collection) : null

</script>

<template>

    <v-app>
        <app-bar></app-bar>
        <v-container class="mt-14 h-100 bg-black">
            <h2 class="text-center my-5 py-6 rounded bg-grey-darken-4">{{ collection.title }}</h2>
            <v-row>
                <v-col cols="12" sm="6" md="6" lg="3" v-for="movie of collection.content.reverse()">
                    <movie-card :movie="movie"></movie-card>
                </v-col>
            </v-row>
            <p class="msg" v-if="collection.content.length === 0">
                این مجموعه خالی است!
                <br>
                <i>
                    برای اضافه کردن فیلم به این مجموعه، وارد صفحه یک فیلم شوید و از بخش بالا روی گزینه
                    <v-icon>mdi-bookmark-box-multiple-outline</v-icon>
                    ضربه بزنید و تیک
                    «{{ collection.title }}»
                    را فعال کنید
                </i>
            </p>
        </v-container>
        <br><br><br>
    </v-app>

</template>

<style scoped>
.msg {
    text-align: center;
    margin-top: 150px;
}
</style>