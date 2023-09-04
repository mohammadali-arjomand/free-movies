<script setup>
    import SearchBox from "@/components/SearchBox.vue";
</script>

<template>
    <section>
        <h1>فری مووی</h1>
        <h2>موتورجستجوی فیلم و سریال</h2>
        <div class="spacer"></div>
        <search-box></search-box>
    </section>
</template>

<style scoped>
    section {
        height: 100vh;
        width: 100vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    section h1 {
        font-size: 3.2rem;
    }
    section h2 {
        font-size: 1.5rem;
    }
    .spacer {
        padding: 25px;
    }
</style>
