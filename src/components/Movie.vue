<script setup>
import {
    VApp,
    VContainer,
    VToolbar,
    VImg,
    VRow,
    VCol,
    VBtn,
    VCard,
    VDialog,
    VToolbarTitle,
    VList,
    VListItem,
    VListSubheader,
    VAppBar,
    VAppBarTitle,
    VAppBarNavIcon,
    VIcon
} from "vuetify/components";
import {ref} from "vue";
import {VideoPlayer} from "@videojs-player/vue";
import LoadingList from "@/components/LoadingList.vue";
import router from "@/router";

    const downloadDlg = ref(false)
    const watchDlg = ref(false)
    const watchUrl = ref("")
    const movie = localStorage.movie !== undefined ? JSON.parse(localStorage.movie) : null

    function watchBtn(url) {
        watchUrl.value = url
        watchDlg.value = true
    }

    const loaded = ref(true)
    const seasons = ref([]);
    if (movie.type === "movie") {
        seasons.value = [
            {
                title: movie.title,
                episodes: [
                    {
                        title: "دانلود",
                        sources: movie.sources
                    }
                ]
            }
        ]
    }
    else {
        loaded.value = false
        fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`http://winbedrives.com/api/season/by/serie/${movie.id}/4F5A9C3D9A86FA54EACEDDD63518`)}`)
            .then(response => {
                if (response.ok) return response.json()
                throw new Error('Network response was not ok.')
            })
            .then(data => {
                    seasons.value = JSON.parse(data.contents)
                    loaded.value = true
                }
            );
    }
</script>

<template>
    <v-app>
        <v-dialog v-model="watchDlg">
            <div dir="ltr" class="text-center">
                <video-player :src="watchUrl" :poster="movie.cover" type="video/x-matroska" controls autoplay></video-player>
            </div>
        </v-dialog>
        <v-dialog v-model="downloadDlg" fullscreen :scrim="false" transition="dialog-bottom-transition">
            <v-toolbar color="blue-darken-2">
                <v-btn icon @click.stop="downloadDlg = false" variant="text"><v-icon>mdi-close</v-icon></v-btn>
                <v-toolbar-title>دانلود</v-toolbar-title>
            </v-toolbar>
            <div v-if="loaded" class="download-box overflow-x-auto">
                <v-list v-for="season of seasons">
                        <h2 class="px-3">{{ season.title }}</h2>
                        <div v-for="episode of season.episodes">
                            <v-list-subheader>{{ episode.title }}</v-list-subheader>
                            <v-list-item v-for="source of episode.sources">
                                <span>{{ source.quality === null || source.quality === "" ? "کیفیت عادی" : source.quality }}</span>
                                <div class="float-left">
                                    <a :href="source.url"><v-btn color="blue-darken-2" class="ml-1"><v-icon>mdi-download</v-icon></v-btn></a>
                                    <v-btn color="blue-darken-2" @click="watchBtn(source.url)"><v-icon>mdi-eye</v-icon></v-btn>
                                </div>
                            </v-list-item>
                        </div>
                </v-list>
            </div>
            <div v-else class="download-box overflow-x-auto">
                <loading-list v-for="n in 10"></loading-list>
            </div>
        </v-dialog>
        <v-app-bar :elevation="2" color="blue-darken-2">
            <v-app-bar-nav-icon @click="router.back()"><v-icon>mdi-arrow-right</v-icon></v-app-bar-nav-icon>
            <v-app-bar-title v-if="movie.type === 'movie'">فیلم</v-app-bar-title>
            <v-app-bar-title v-else>سریال</v-app-bar-title>
        </v-app-bar>
        <v-container class="mt-14">
            <p v-if="movie === null" class="msg">
                ویدیوی موردنظر شما پیدا نشد
            </p>
            <div v-else class="mt-3">
                <v-row>
                    <v-col cols="5" md="3" lg="2">
                        <v-img :src="movie.image" class="rounded"></v-img>
                    </v-col>
                    <v-col cols="7" md="9" lg="10">
                        <h1>{{ movie.title }}</h1>
                        <table>
                            <tr>
                                <td>سال ساخت:</td>
                                <td>{{ movie.year }}</td>
                            </tr>
                            <tr>
                                <td>کشور سازنده:</td>
                                <td>{{ movie.country[0].title }}</td>
                            </tr>
                            <tr>
                                <td>امتیاز IMDb:</td>
                                <td>{{ movie.imdb }}</td>
                            </tr>
                        </table>
                        <v-btn color="blue-darken-2" @click="downloadDlg = true">
                            <v-icon>mdi-download</v-icon>
                            <span>دانلود</span>
                        </v-btn>
                    </v-col>
                </v-row>
                <v-card class="mt-3 pa-3"><pre>{{ movie.description }}</pre></v-card>
            </div>
        </v-container>
    </v-app>
</template>

<style scoped>
    .msg {
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    pre {
        overflow: hidden;
        font-family: Vazir;
        text-align: justify;
        overflow-x: auto;
        white-space: pre-wrap;
        white-space: -moz-pre-wrap;
        white-space: -pre-wrap;
        white-space: -o-pre-wrap;
        word-wrap: break-word;
    }
    a {
        color: #222222;
        text-decoration: none;
    }
    .download-box {
        height: 100%;
        background-color: white;
    }
</style>