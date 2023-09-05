<script setup>
import {reactive, ref} from "vue";
import {useRoute} from "vue-router";
import SearchBox from "@/components/SearchBox.vue";
import MovieCard from "@/components/MovieCard.vue";

const query = useRoute().params.query;
document.title = `${query} - فری مووی`


let found = ref(false);
let movies = reactive([]);

fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://winbedrives.com/api/search/${query}/4F5A9C3D9A86FA54EACEDDD635185`)}`)
    .then(response => {
        if (response.ok) return response.json()
        throw new Error('Network response was not ok.')
    })
    .then(data => {
            movies = JSON.parse(data.contents).posters;
            found.value = true;
        }
    );

</script>

<template>

    <div v-if="found">
        <p v-if="movies.length === 0" class="msg">
            همچین عنوانی پیدا نشد!
            <br>
            <router-link to="/">جستجو مجدد</router-link>
        </p>
        <div v-else class="container">
            <h1>فری مووی</h1>

            <search-box :text="query" :refresh="true"></search-box>
            <movie-card v-for="movie of movies"
                        :title="movie.title"
                        :image="movie.image"
                        :imdb="movie.imdb"
                        :year="movie.year"
                        :countries="movie.country"
                        :sources="movie.sources"
                        :type="movie.type"
            ></movie-card>
            <br>
        </div>
    </div>
    <p v-else class="msg">در حال جستجو ...</p>

</template>

<style scoped>
h1 {
    margin-bottom: 10px;
}

p.msg {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.container {
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
}

a {
    text-decoration: none;
    color: royalblue;
}
</style>