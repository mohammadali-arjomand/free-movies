<script setup>
    import router from "@/router";
    const props = defineProps(["value", "focus", "refresh", "closeBtn", "filterSearchHistory"])

    function search() {
        router.push(`/search/${document.getElementById("searchText").value}`)
            .then(() => {
                props.refresh === true ? location.reload() : null
            })
    }
    function searchFieldKeyEvent(filterSearchHistory) {
        filterSearchHistory ? filterSearchHistory(document.getElementById('searchText').value) : null
    }

    function close() {
        let searchField = document.getElementById("searchText")
        if (searchField.value.length < 1) {
            router.push("/search")
        }
        else {
            searchField.value = ""
            searchField.focus()
        }
    }
</script>

<template>
    <v-row>
        <v-col>
            <form @submit.prevent="search">
                <input id="searchText" :value="value" @keyup="searchFieldKeyEvent(filterSearchHistory)" placeholder="جستجو میان هزاران فیلم و سریال" :autofocus="focus" autocomplete="off">
            </form>
        </v-col>
        <v-col v-if="closeBtn" cols="2" class="d-flex justify-center align-center">
            <v-btn @click="close" color="black" class="pa-0 h-100"><v-icon>mdi-close</v-icon></v-btn>
        </v-col>
    </v-row>
</template>

<style scoped>
input {
    font-size: 16px;
    width: 100%;
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