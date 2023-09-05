<script setup>
    import {defineSlots} from "vue";
    const slots = defineSlots();
    const props = defineProps(["url"])
    const slot = slots.default()[0].children
</script>

<template>
    <a :href="url">
        <button>{{ slot }}</button>
    </a>
</template>

<style scoped>
    button {
        margin: 2px;
        background: royalblue;
        border: none;
        border-radius: 5px;
        padding: 10px;
        color: white;
        cursor: pointer;
        width: auto;
    }
</style>