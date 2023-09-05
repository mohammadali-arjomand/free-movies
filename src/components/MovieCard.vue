<script setup>
    import TheButton from "@/components/TheButton.vue";

    const props = defineProps(["title", "image", "imdb", "year", "countries", "sources", "type"])
</script>

<template>
    <section>
        <img :src="image" :alt="title">
        <div>
            <h2>{{ title }}</h2>
            <p>امتیاز: {{ imdb }}</p>
            <p>سال ساخت: {{ year }}</p>
            <p>
                کشور سازنده:
                <span v-for="country in countries">{{ country.title }}</span>
            </p>
            <p>{{ type === "movie" ? "فیلم" : "سریال" }}</p>
            <div v-if="sources.length > 0" class="buttons">
                <the-button v-for="source of sources"
                            :url="source.url"
                >{{ source.quality === '' ? "دانلود" : source.quality }}</the-button>
            </div>
            <p v-else class="blue">به زودی ...</p>
        </div>
    </section>
</template>

<style scoped>
    section {
        box-shadow: #ddd 0 0 4px 1px;
        margin-top: 20px;
        width: 80vw;
        padding: 12px;
        display: flex;
        border-radius: 10px;
        overflow: hidden;
    }

    section img {
        height: 30vh;
        border-radius: 10px;
    }

    section div {
        display: flex;
        flex-direction: column;
        margin: 20px 10px;
    }

    section div h2 {
        margin-bottom: 20px;
    }

    .buttons {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }

    .blue {
        color: royalblue;
    }
</style>