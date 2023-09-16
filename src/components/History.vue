<script setup>

import {
    VApp,
    VCol,
    VRow,
    VAppBar,
    VAppBarTitle,
    VAppBarNavIcon,
    VIcon,
    VDialog
} from "vuetify/components";
import MovieCard from "@/components/MovieCard.vue";
import {ref} from "vue";
import router from "@/router";

const history = localStorage.history !== undefined ? JSON.parse(localStorage.history).reverse() : null

const clearConfirmDlg = ref(false)

function clearHistory() {
    localStorage.removeItem("history");
    location.reload()
}

</script>

<template>
    <v-app>
        <v-dialog v-model="clearConfirmDlg">
            <v-card title="فری مووی">
                <v-card-text>
                    آیا میخواهید سابقه خود را پاک کنید؟
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text="بله" color="red" @click="clearHistory"></v-btn>
                    <v-btn text="خیر" @click="clearConfirmDlg = false"></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-app-bar color="blue-darken-2">
            <v-app-bar-nav-icon @click.stop="router.back()" variant="text"><v-icon>mdi-arrow-right</v-icon></v-app-bar-nav-icon>
            <v-app-bar-title>سابقه</v-app-bar-title>
            <v-app-bar-nav-icon v-if="history !== null" @click.stop="clearConfirmDlg = true"><v-icon>mdi-delete</v-icon></v-app-bar-nav-icon>
        </v-app-bar>
        <p class="msg" v-if="history === null">سابقه شما خالی است</p>
        <v-container v-else class="mt-14">
            <v-row>
                <v-col cols="6" sm="4" md="3" lg="2" v-for="movie of history">
                    <movie-card :movie="movie"></movie-card>
                </v-col>
            </v-row>
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
</style>