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
    let movieInfo = JSON.parse(atob(data).replace("'", "’"))

    fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://winbedrives.com/api/search/${movieInfo.name}/4F5A9C3D9A86FA54EACEDDD635185`)}`)
        .then(response => {
            if (response.ok) return response.json()
        })
        .then(data => {
            let movies = JSON.parse(data.contents).posters
            movies = movies.filter(value => value.year === movieInfo.year)
            movies = movies.filter(value => value.id === movieInfo.id)
            if (movies.length === 1) {
                openMovie(movies[0])
            }
            else {
                isLoading.value = false
            }
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