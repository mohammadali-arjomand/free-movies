<script setup>
    import {VAppBar, VAppBarTitle, VAppBarNavIcon, VIcon} from "vuetify/components";
    import router from "@/router";
    const props = defineProps(["value", "focus", "refresh"])

    function search() {
        router.push(`/search/${document.getElementById("searchText").value}`)
            .then(() => {
                props.refresh === true ? location.reload() : null
            })
    }

    function close() {
        let searchField = document.getElementById("searchText")
        if (searchField.value.length < 1) {
            router.push("/")
        }
        else {
            searchField.value = ""
            searchField.focus()
        }
    }
</script>

<template>
    <v-app-bar :elevation="2" color="blue-darken-2">
        <v-app-bar-title>
            <form @submit.prevent="search">
                <input id="searchText" :value="value" placeholder="جستجو میان هزاران فیلم و سریال" :autofocus="focus" autocomplete="off">
            </form>
        </v-app-bar-title>
        <v-app-bar-nav-icon @click="close"><v-icon>mdi-close</v-icon></v-app-bar-nav-icon>
    </v-app-bar>
</template>

<style scoped>
input {
    font-size: 16px;
    width: 100vw;
    outline: none;
    padding: 15px;
    color: white;
    background-color: transparent !important;
}
::placeholder {
    color: white;
    opacity: 80%;
}
</style>