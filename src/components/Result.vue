<script setup>
import {useRoute} from "vue-router";

const query = useRoute().params.query;

let posters = [];

const headers = {
    "x-cors-api-key": "temp_aa3c5ec12fc4d264fe5d68720b3cf0ef"
}

fetch(`https://proxy.cors.sh/https://winbedrives.com/api/search/${query}/4F5A9C3D9A86FA54EACEDDD635185`, {mode: "no-cors", headers})
    .then(response => response.json())
    .then(json => {
        console.log(json);
    })
</script>

<template>

</template>

<style scoped>

</style>