<script setup>
    import router from "@/router";
    const props = defineProps(["text", "refresh"])
    function search(e) {
        if (e.code === "Enter") {
            router.push(`/search/${e.target.value}`)
                .then(() => { if (props.refresh) location.reload() })
        }
    }
</script>

<template>
    <div>
        <input type="text" @keydown="search" placeholder="چی میخوای ببینی؟" :value="props.text">
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