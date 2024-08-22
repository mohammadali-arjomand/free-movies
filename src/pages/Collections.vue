<script setup>

import AppBar from "@/components/AppBar.vue";
import {
    VBtn,
    VCol,
    VContainer,
    VDialog,
    VIcon,
    VRow,
    VToolbar, VToolbarTitle
} from "vuetify/components";
import CollectionCard from "@/components/CollectionCard.vue";
import {ref} from "vue";
import MovieCard from "@/components/MovieCard.vue";
import router from "@/router";
import HorizontalMovieCard from "@/components/HorizontalMovieCard.vue";

const bottomSpace = ref(localStorage.settingsBottomSpace === undefined ? false : eval(localStorage.settingsBottomSpace))

const collections = ref(localStorage.collections !== undefined ? JSON.parse(localStorage.collections) : [])
const showPinnedBookmarks = ref(localStorage.settingsShowPinnedBookmarks === undefined ? true : eval(localStorage.settingsShowPinnedBookmarks))
const bookmarks = localStorage.bookmarks !== undefined ? JSON.parse(localStorage.bookmarks).reverse() : []
const pinnedBookmarks = ref(localStorage.pinnedBookmarks !== undefined ? JSON.parse(localStorage.pinnedBookmarks).reverse() : [])
const pinnedBookmarkMovies = ref([])
for (let movie of bookmarks) {
    if (pinnedBookmarks.value.includes(movie.id))
        pinnedBookmarkMovies.value.push(movie)
}

function didPin() {
    let isPin = false
    JSON.parse(localStorage.collections).forEach(i => isPin = isPin ? true : i.pinned === true)
    return isPin
}

const isEmpty = collections.value.length === 0
const newCollectionDlg = ref(false)
const newCollectionMdl = ref("")
const reversedCollections = collections.value.reverse()
function newCollection() {
    collections.value.push({
        title: newCollectionMdl.value,
        content: []
    })
    localStorage.collections = JSON.stringify(collections.value)
    location.reload()
}

function openCollectionEvent(collection) {
    localStorage.collection = JSON.stringify(collection)
    router.push('/collections/show')
}

</script>

<template>

<v-app>
    <v-dialog v-model="newCollectionDlg">
        <v-card title="مجموعه جدید">
            <v-card-text>
                نام مجموعه جدید را وارد کنید
            </v-card-text>
            <v-card-item>
                <v-text-field
                        hide-details="auto"
                        label="مثال: موردعلاقه ها"
                        v-model="newCollectionMdl"
                ></v-text-field>
            </v-card-item>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text="لغو" class="letter" @click="newCollectionDlg = false"></v-btn>
                <v-btn text="تایید" class="letter" color="indigo-accent-2" @click="newCollection"></v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <app-bar></app-bar>
    <v-container class="bg-black mt-14 h-100">
    <v-list v-if="bookmarks.length > 0" style="border-radius: 10px; border: solid 2px #333">
        <v-list-item @click="router.push('/bookmarks')">
            نشان ها
            <v-icon style="float: left">mdi-arrow-left</v-icon>
        </v-list-item>
        <v-list-item v-if="showPinnedBookmarks && pinnedBookmarks.length > 0">
            <v-row class="flex-nowrap overflow-x-auto">
                <v-col cols="5" sm="6" md="6" lg="3" v-for="movie of pinnedBookmarkMovies">
                    <horizontal-movie-card :movie="movie"></horizontal-movie-card>
                </v-col>
            </v-row>
        </v-list-item>
    </v-list>

        <v-row>
            <v-col v-if="didPin()" cols="12" sm="6" md="6" lg="3" v-for="(collection, i) of reversedCollections" @click="openCollectionEvent(collection)">
                <collection-card v-if="collection.pinned === true" :collection="collection" :id="reversedCollections.length - 1 - i"></collection-card>
            </v-col>
            <v-divider v-if="didPin()"></v-divider>
            <v-col cols="12" sm="6" md="6" lg="3" v-for="(collection, i) of reversedCollections" @click="openCollectionEvent(collection)">
                <collection-card v-if="collection.pinned !== true" :collection="collection" :id="reversedCollections.length - 1 - i"></collection-card>
            </v-col>
        </v-row>
        <p v-if="isEmpty" class="mt-4 d-flex justify-center align-center h-100 text-center">
            مجموعه ای وجود ندارد!
            <br>
            اولین مجموعه خودرا با دکمه پایین سمت چپ بسازید:
        </p>

    </v-container>
    <v-col cols="auto">
        <v-btn icon="mdi-plus" class="fixed" :style="bottomSpace ? 'bottom: 104px;' : 'bottom: 80px;'" color="indigo-accent-2" size="large" @click="newCollectionDlg = true"></v-btn>
    </v-col>
    <br><br><br>
</v-app>

</template>

<style scoped>
.letter {
    letter-spacing: 0;
}
.full-height {
    height: 100%;
}
.fixed {
    position: fixed;
    left: 20px;
}
p.msg {
    width: 100vw;
    height: 85vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>