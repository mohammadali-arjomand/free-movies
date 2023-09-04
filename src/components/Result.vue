<script setup>
import {reactive, ref} from "vue";
import {useRoute} from "vue-router";

const query = useRoute().params.query;

let found = ref(false);
let posters = reactive([]);

const headers = {
    "x-cors-api-key": "temp_aa3c5ec12fc4d264fe5d68720b3cf0ef"
}

fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://winbedrives.com/api/search/${query}/4F5A9C3D9A86FA54EACEDDD635185`)}`)
    .then(response => {
        if (response.ok) return response.json()
        throw new Error('Network response was not ok.')
    })
    .then(data => {
            posters = JSON.parse(data.contents).posters;
            found.value = true;
        }
    );

</script>

<template>

    <div v-if="found">
        <p v-if="posters.length === 0" class="msg">
            همچین عنوانی پیدا نشد!
            <br>
            <small>اگه فارسی جستجو کردی انگلیسی جستجو کن</small>
        </p>
    </div>
    <p v-else class="msg">در حال جستجو ...</p>

</template>

<style scoped>
    p.msg {
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>