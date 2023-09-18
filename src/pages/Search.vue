<script setup>
    import {VApp} from "vuetify/components";
    import SearchBar from "@/components/SearchBar.vue";
</script>

<template>
    <v-app>
        <search-bar :focus="true"></search-bar>
    </v-app>
</template>

<style scoped></style>