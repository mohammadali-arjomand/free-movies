<script setup>
    import {VAppBar, VIcon} from "vuetify/components";
    import {ref} from "vue";
    import router from "@/router";

    const nav = ref(setNav())

    function setNav() {
        switch (router.currentRoute._value.fullPath) {
            case "/": return 0
            case "/search": return 1
            case "/collections":
            case "/bookmarks": return 2
            case "/settings": return 3
        }
    }
</script>

<template>

    <v-app-bar :elevation="2" class="" color="black">
        <img src="@/assets/typo.png" class="typo" alt="Typography">
    </v-app-bar>

    <v-bottom-navigation v-model="nav" bg-color="black" color="indigo-accent-2" grow active>
        <v-btn @click.stop="router.push('/'); nav =0">
            <v-icon>mdi-home-outline</v-icon>

            <span class="navigation-item">خانه</span>
        </v-btn>

        <v-btn @click.stop="router.push('/search'); nav =1">
            <v-icon>mdi-magnify</v-icon>

            <span class="navigation-item">جستجو</span>
        </v-btn>

        <v-btn @click.stop="router.push('/collections'); nav =2">
            <v-icon>mdi-bookmark-box-multiple-outline</v-icon>

            <span class="navigation-item">مجموعه ها</span>
        </v-btn>

        <v-btn @click.stop="router.push('/settings'); nav =3">
            <v-icon>mdi-cog-outline</v-icon>

            <span class="navigation-item">تنظیمات</span>
        </v-btn>
    </v-bottom-navigation>
</template>

<style scoped>
.navigation-item {
    letter-spacing: 0;
}
a {
    text-decoration: none;
    color: black;
}
.typo {
    height: 80%;
    margin: auto;
}
</style>