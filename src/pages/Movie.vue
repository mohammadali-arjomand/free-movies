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
    VIcon,
    VSnackbar
} from "vuetify/components";
import {ref} from "vue";
import LoadingList from "@/components/LoadingList.vue";
import router from "@/router";

    const copyLink = ref(localStorage.settingsCopyLink === undefined ? false : eval(localStorage.settingsCopyLink))
    const openWithVlc = ref(localStorage.settingsOpenWithVlc === undefined ? false : eval(localStorage.settingsOpenWithVlc))

    const downloadDlg = ref(false)
    const copySuccessSnk = ref(false)
    const movie = localStorage.movie !== undefined ? JSON.parse(localStorage.movie) : null
    if (localStorage.settingsSaveHistory !== "false" && movie !== null) {
        if (localStorage.history === undefined) {
            localStorage.history = JSON.stringify([movie])
        }
        else {
            let history = JSON.parse(localStorage.history)
            for (let n in history) {
                if (history[n].id === movie.id) {
                    history.splice(n, 1)
                }
            }
            history.push(movie)
            localStorage.history = JSON.stringify(history)
        }
    }

    function copyUrlBtn(url) {
        navigator.clipboard.writeText(url)
        copySuccessSnk.value = true
    }

    const addBookmarkSnk = ref(false)
    const rmBookmarkSnk = ref(false)
    const checkBookmark = () => {
        let isExists = false
        JSON.parse(localStorage.bookmarks).forEach(i => isExists = i.id === movie.id)
        return isExists
    }
    const isBookmark = ref(localStorage.bookmarks === undefined || movie === null ? false : checkBookmark())
    function bookmark() {
        if (isBookmark.value) {
            let bookmarks = JSON.parse(localStorage.bookmarks)
            bookmarks = bookmarks.filter(value => value.id !== movie.id)
            localStorage.bookmarks = JSON.stringify(bookmarks)
            rmBookmarkSnk.value = true
        }
        else {
            let bookmarks = localStorage.bookmarks === undefined ? [] : JSON.parse(localStorage.bookmarks)
            bookmarks.push(movie)
            localStorage.bookmarks = JSON.stringify(bookmarks)
            addBookmarkSnk.value = true
        }
        isBookmark.value = !isBookmark.value
    }

    const showImage = ref(false)

    const loaded = ref(true)
    const seasons = ref([])
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
        <v-snackbar v-model="copySuccessSnk" :timeout="1000" color="snack">لینک کپی شد!</v-snackbar>
        <v-snackbar v-model="addBookmarkSnk" :timeout="1000" color="snack">به لیست «نشان ها» اضافه شد!</v-snackbar>
        <v-snackbar v-model="rmBookmarkSnk" :timeout="1000" color="snack">از لیست «نشان ها» حذف شد!</v-snackbar>
        <v-dialog v-model="showImage">
            <VImg :src="movie.image" class="rounded" />
        </v-dialog>
        <v-dialog v-model="downloadDlg" fullscreen :scrim="false" transition="dialog-bottom-transition">
            <v-toolbar color="blue-darken-2">
                <v-btn icon @click.stop="downloadDlg = false" variant="text"><v-icon>mdi-close</v-icon></v-btn>
                <v-toolbar-title>دانلود</v-toolbar-title>
            </v-toolbar>
            <div v-if="loaded" class="download-box overflow-x-auto">
                <v-list v-for="season of seasons" class="h-100">
                        <h2 class="px-3">{{ season.title }}</h2>
                        <div v-for="episode of season.episodes">
                            <v-list-subheader>{{ episode.title }}</v-list-subheader>
                            <v-list-item v-for="source of episode.sources">
                                <span>{{ source.quality === null || source.quality === "" ? "کیفیت عادی" : source.quality }}</span>
                                <div class="float-left d-flex gap-4">
                                    <a :href="source.url" target="_blank"><v-btn color="button"><v-icon>mdi-download</v-icon></v-btn></a>
                                    <a v-if="openWithVlc" :href="'vlc://' + source.url"><v-btn color="orange-darken-2"><v-icon>mdi-vlc</v-icon></v-btn></a>
                                    <v-btn v-if="copyLink" color="button-light" @click="copyUrlBtn(source.url)"><v-icon>mdi-content-copy</v-icon></v-btn>
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
            <v-app-bar-nav-icon @click="bookmark">
                <v-icon v-if="!isBookmark">mdi-bookmark-outline</v-icon>
                <v-icon v-else>mdi-bookmark</v-icon>
            </v-app-bar-nav-icon>
        </v-app-bar>
        <v-container class="mt-14">
            <p v-if="movie === null" class="msg">
                ویدیوی موردنظر شما پیدا نشد
            </p>
            <div v-else class="mt-3">
                <v-row>
                    <v-col cols="5" md="3" lg="2">
                        <v-img :src="movie.image" @click="showImage = true" class="rounded"></v-img>
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
                        <v-btn color="button" @click="downloadDlg = true">
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
    .gap-4 {
        gap: 4px;
    }
</style>