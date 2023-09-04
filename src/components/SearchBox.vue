<script setup>
    import router from "@/router";
    function search(e) {
        if (e.code === "Enter") {
            router.push(`/search/${e.target.value}`)
        }
    }
</script>

<template>
    <div>
        <input type="text" @keydown="search" placeholder="چی میخوای ببینی؟">
    </div>
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