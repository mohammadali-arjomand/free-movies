<script setup>
    import {VApp, VList, VListItem, VIcon} from "vuetify/components";
    import SearchBar from "@/components/SearchBar.vue";
    import router from "@/router";

    let searchHistory = localStorage.search === undefined ? [] : JSON.parse(localStorage.search).reverse()
</script>

<template>
    <v-app>
        <search-bar :focus="true"></search-bar>
        <v-list class="mt-14 pt-4">
            <v-list-item v-for="searchText in searchHistory" prepend-icon="mdi-history" @click="router.push(`/search/${encodeURIComponent(searchText)}`)">
                <span>{{ searchText }}</span>
            </v-list-item>
        </v-list>
    </v-app>
</template>

<style scoped></style>