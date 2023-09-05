<script setup>
import router from "@/router";

const props = defineProps(["text", "refresh"])

function search() {
    router.push(`/search/${document.getElementById("searchText").value}`)
        .then(() => {
            if (props.refresh) location.reload()
        })
}
</script>

<template>
    <form @submit.prevent="search">
        <div>
            <input type="text" id="searchText" placeholder="چی میخوای ببینی؟" :value="props.text">
        </div>
    </form>
</template>

<style scoped>
div {
    width: 80vw;
    background: white;
    box-shadow: #ddd 0 0 4px 1px;
    border-radius: 10px;
    padding: 12px;
}

input {
    width: 100%;
    background: transparent;
    border: none;
    outline: none;
}
</style>