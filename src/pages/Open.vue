<script setup>

import {ref} from "vue";
import {useRoute} from "vue-router";
import router from "@/router";

const isLoading = ref(true)



let data
try {
    data = useRoute().params.data
}
catch (e) {
    data = location.pathname.split("/")[2]
}

try {
    fetch(`https://freemovie.arjomand-dev.workers.dev/movie?id=${data}`)
        .then(response => {
            if (response.ok) return response.json()
        })
        .then(data => {
            openMovie(data)
        })
        .catch(error => {
            isLoading.value = false
        })
}
catch (e) {
    isLoading.value = false
}

function openMovie(movie) {
    localStorage.movie = JSON.stringify(movie);
    router.push("/movie");
}
</script>

<template>
    <div v-if="isLoading" class="text-center full-height d-flex justify-center align-center">
        <v-progress-circular color="indigo-accent-2" indeterminate></v-progress-circular>
    </div>
    <p v-else class="msg">یافت نشد!</p>
</template>

<style scoped>
.full-height {
    height: 100vh;
}
p.msg {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>