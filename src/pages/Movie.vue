<script setup>
import {
    VApp,
    VContainer,
    VToolbar,
    VImg,
    VRow,
    VCol,
    VBtn,
    VDialog,
    VToolbarTitle,
    VList,
    VListItem,
    VListSubheader,
    VIcon,
    VSnackbar
} from "vuetify/components";
import {ref} from "vue";
import router from "@/router";

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

    function shareMovie() {
        const shareUrlData = {
            name: movie.title.replace("’", "'"),
            year: movie.year,
            id: movie.id
        }

        const shareData = {
            text : `فیلم «${movie.title}» رو از فری مووی ببین:`,
            url : location.protocol +"//"+ location.hostname + "/s/" + btoa(JSON.stringify(shareUrlData))
        }
        navigator.share(shareData)
    }

    const showImage = ref(false)
    const offline = ref(false)

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
            )
            .catch(error => {
                offline.value = true
            })
    }

    function refresh() {
        location.reload()
    }
</script>

<template>
    <v-app>
        <v-snackbar v-model="copySuccessSnk" :timeout="1000" color="indigo-accent-2">لینک کپی شد!</v-snackbar>
        <v-snackbar v-model="addBookmarkSnk" :timeout="1000" color="indigo-accent-2">به لیست «نشان ها» اضافه شد!</v-snackbar>
        <v-snackbar v-model="rmBookmarkSnk" :timeout="1000" color="indigo-accent-2">از لیست «نشان ها» حذف شد!</v-snackbar>
        <v-dialog v-model="showImage">
            <VImg :src="movie.image" class="rounded" />
        </v-dialog>
        <v-dialog v-model="downloadDlg" fullscreen :scrim="false" transition="dialog-bottom-transition">
            <v-toolbar color="black">
                <v-btn icon @click.stop="downloadDlg = false" variant="text"><v-icon>mdi-close</v-icon></v-btn>
                <v-toolbar-title>دانلود</v-toolbar-title>
            </v-toolbar>
            <div v-if="loaded" class="download-box overflow-x-auto bg-black">
                <v-expansion-panels color="black">
                    <v-expansion-panel v-for="season of seasons" :title="season.title">
                        <v-expansion-panel-text class="bg-black">

                            <v-list v-for="episode of season.episodes" class="bg-black">
                                <v-list-subheader class="text-indigo-accent-1 text-center">{{ episode.title }}</v-list-subheader>
                                <v-list-item v-for="source of episode.sources">
                                    <div class="source-title">{{ source.quality === null || source.quality === "" ? "کیفیت عادی" : source.quality }}</div>
                                    <div class="float-left d-flex gap-4">
                                        <v-btn-toggle rounded="lg">
                                            <v-btn class="bg-indigo-accent-2">
                                                <a :href="source.url" target="_blank">
                                                    <v-icon>mdi-download</v-icon>
                                                </a>
                                            </v-btn>
                                            <v-btn class="bg-indigo-accent-2">
                                                <v-icon>mdi-dots-vertical</v-icon>
                                                <v-menu activator="parent">
                                                    <v-list>
                                                        <v-list-item>
                                                            <v-list-item-title class="py-2">
                                                                <a :href="'vlc://' + source.url">
                                                                    <v-icon size="small">mdi-vlc</v-icon>
                                                                    مشاهده با VLC
                                                                </a>
                                                            </v-list-item-title>
                                                            <v-list-item-title class="py-2" @click="copyUrlBtn(source.url)">
                                                                    <v-icon size="small">mdi-content-copy</v-icon>
                                                                    کپی لینک
                                                            </v-list-item-title>
                                                        </v-list-item>
                                                    </v-list>
                                                </v-menu>
                                            </v-btn>
                                        </v-btn-toggle>
                                    </div>
                                </v-list-item>
                            </v-list>

                        </v-expansion-panel-text>
                    </v-expansion-panel>
                </v-expansion-panels>
            </div>
            <div v-else class="download-box overflow-x-auto">
                <div v-if="!offline" class="text-center h-100 d-flex justify-center align-center bg-black">
                    <v-progress-circular color="indigo-accent-2" indeterminate></v-progress-circular>
                </div>
                <div v-else class="text-center h-100 flex-column d-flex justify-center align-center bg-black">
                    <p>خطا در اتصال به سرور</p>
                    <v-btn class="letter rounded-pill mt-3" color="indigo-accent-2" @click.stop="refresh">
                        <v-icon class="ml-1">mdi-reload</v-icon>
                        تلاش مجدد
                    </v-btn>
                </div>
            </div>
        </v-dialog>
        <div class="fix-top pa-3">
            <v-btn density="comfortable" icon="mdi-arrow-right" class="bg-indigo-accent-2" @click.stop="router.back()"></v-btn>
            <v-btn density="comfortable" icon="mdi-share-variant-outline" class="bg-indigo-accent-2 mr-3" @click.stop="shareMovie"></v-btn>
            <v-btn density="comfortable" :icon="isBookmark ? 'mdi-bookmark' : 'mdi-bookmark-outline'" class="bg-indigo-accent-2 mr-3" @click.stop="bookmark"></v-btn>
        </div>
        <div class="cover">
            <v-img :src="movie.cover" @click="showImage = true"></v-img>
            <div class="content">
                <v-row>
                    <v-col cols="5" md="3" lg="2">
                        <v-img :src="movie.image" class="rounded" @click="showImage = true"></v-img>
                    </v-col>
                    <v-col cols="7" md="9" lg="10">
                        <h1>{{ movie.title }}</h1>
                        <p>{{ movie.title }}</p>
                        <div class="icon"><v-icon color="indigo-accent-2">mdi-star</v-icon> {{ movie.imdb }}</div>
                        <div class="star"><v-icon color="indigo-accent-2">mdi-calendar-month</v-icon> {{ movie.year }}</div>
                        <div class="genres">
                            <div v-for="genre of movie.genres">{{ genre.title }}</div>
                        </div>

                    </v-col>
                </v-row>
            </div>
        </div>
        <v-container class="bg-black">
            <p v-if="movie === null" class="msg">
                ویدیوی موردنظر شما پیدا نشد
            </p>
            <div v-else>
                <v-btn class="download-btn mb-5" color="indigo-accent-2" @click="downloadDlg = true">
                    <v-icon>mdi-download</v-icon>
                    <span>لینک های دانلود</span>
                </v-btn>
                <pre>{{ movie.description }}</pre>
            </div>
        </v-container>
    </v-app>
</template>

<style scoped>
    .fix-top {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        z-index: 100;
    }
    .source-title {
        display: inline-block;
        margin: 12px 0;
    }
    .download-btn {
        margin: 0.5rem 0;
        width: 100%;
        letter-spacing: 0;
        height: 50px;
        border-radius: 500px;
    }
    .cover {
        position: relative;
        .content {
            color: white;
            position: absolute;
            right: 0;
            bottom: 0;
            left: 0;
            background: linear-gradient(to top, #000, transparent);
            padding: 1rem;
        }
    }
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
        color: white;
        text-decoration: none;
        letter-spacing: 0;
    }
    .download-box {
        height: 100%;
        background-color: white;
    }
    .gap-4 {
        gap: 4px;
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