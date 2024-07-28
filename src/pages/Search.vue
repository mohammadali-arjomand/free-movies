<script setup>
    import {VApp, VContainer, VList, VListItem} from "vuetify/components";
    import SearchBar from "@/components/SearchBar.vue";
    import router from "@/router";
    import AppBar from "@/components/AppBar.vue";
    import {ref} from "vue";

//    let searchHistory = localStorage.search === undefined ? [] : JSON.parse(localStorage.search).reverse()
    const realSearchHistory = localStorage.search === undefined ? [] : JSON.parse(localStorage.search).reverse()
    const searchHistory = ref(realSearchHistory)

    const filterSearchHistory = function (searchText) {
        let updatedHistory = [];
        for (let i = 0; i < realSearchHistory.length; i++) {
            if (realSearchHistory[i].toLowerCase().includes(searchText.toLowerCase())) {
                updatedHistory.push(realSearchHistory[i]);
            }
        }
        searchHistory.value = updatedHistory
    }
</script>

<template>
    <v-app>
        <app-bar></app-bar>
        <v-container class="mt-14 h-100 bg-black">
            <search-bar :focus="true" :filter-search-history="filterSearchHistory"></search-bar>
            <v-list class="pt-4 bg-black">
                <v-list-item v-for="searchText in searchHistory" @click="router.push(`/search/${encodeURIComponent(searchText)}`)">
                    <v-icon color="indigo-accent-2">mdi-history</v-icon>
                    {{ searchText }}
                </v-list-item>
            </v-list>
            <br><br><br>
        </v-container>
    </v-app>
</template>

<style scoped></style>