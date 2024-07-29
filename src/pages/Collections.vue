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

const collections = ref(localStorage.collections !== undefined ? JSON.parse(localStorage.collections) : [])
const isEmpty = collections.value.length === 0
console.log(isEmpty)
const newCollectionDlg = ref(false)
const newCollectionMdl = ref("")
const openCollection = ref()
const showCollectionDlg = ref(false)
const reversedCollections = collections.value.reverse()
function newCollection() {
    collections.value.push({
        title: newCollectionMdl.value,
        content: []
    })
    localStorage.collections = JSON.stringify(collections.value)
    newCollectionMdl.value = ""
    newCollectionDlg.value = false
}


</script>

<template>

<v-app>
    <v-dialog v-model="showCollectionDlg" fullscreen :scrim="false" transition="dialog-bottom-transition">
        <v-toolbar color="black">
            <v-btn icon @click.stop="showCollectionDlg = false" variant="text"><v-icon>mdi-close</v-icon></v-btn>
            <v-toolbar-title>{{ openCollection.title }}</v-toolbar-title>
        </v-toolbar>
        <div class="full-height bg-black overflow-x-auto">
            <v-expansion-panels color="black" class="full-height">
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="6" md="6" lg="3" v-for="movie of openCollection.content.reverse()">
                            <movie-card :movie="movie"></movie-card>
                        </v-col>
                    </v-row>
                </v-container>
            </v-expansion-panels>
        </div>
    </v-dialog>
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
    <v-list style="border-radius: 10px; border: solid 2px #333">
        <v-list-item @click="router.push('/bookmarks')">
            نشان ها
            <v-icon style="float: left">mdi-arrow-left</v-icon>
        </v-list-item>
    </v-list>

        <v-row>
            <v-col cols="12" sm="6" md="6" lg="3" v-for="(collection, i) of reversedCollections" @click="openCollection = collection; showCollectionDlg=true">
                <collection-card :collection="collection" :id="i"></collection-card>
            </v-col>
        </v-row>
        <p v-if="isEmpty" class="mt-4 d-flex justify-center align-center h-100 text-center">
            مجموعه ای وجود ندارد!
            <br>
            اولین مجموعه خودرا با دکمه پایین سمت چپ بسازید:
        </p>

    </v-container>
    <v-col cols="auto">
        <v-btn icon="mdi-plus" class="fixed" color="indigo-accent-2" size="large" @click="newCollectionDlg = true"></v-btn>
    </v-col>
    <br><br><br>
</v-app>

</template>

<style scoped>
.letter {
    letter-spacing: 0;
}
.full-height {
    height: 100vh;
}
.fixed {
    position: fixed;
    left: 20px;
    bottom: 80px;
}
</style>