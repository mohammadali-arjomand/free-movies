<script setup>
    import {VAppBar, VAppBarTitle, VIcon, VNavigationDrawer, VList, VListItem, VDialog, VToolbar, VToolbarTitle, VBtn} from "vuetify/components";
    import {ref} from "vue";
    import router from "@/router";

    const drawer = ref(false)
    const dialogDev = ref(false)
</script>

<template>
    <v-dialog v-model="dialogDev" fullscreen :scrim="false" transition="dialog-bottom-transition">
        <v-toolbar color="blue-darken-2">
            <v-btn icon @click.stop="dialogDev = false"><v-icon>mdi-close</v-icon></v-btn>
            <v-toolbar-title>سازنده</v-toolbar-title>
        </v-toolbar>
        <div class="h-100 bg-white pa-5">
            <v-list>
                <v-list-item prepend-icon="mdi-account">محمدعلی ارجمند</v-list-item>
                <v-list-item prepend-icon="mdi-github"><a href="https://github.com/mohammadali-arjomand" target="_blank">گیت هاب</a></v-list-item>
                <v-list-item prepend-icon="mdi-linkedin"><a href="https://www.linkedin.com/in/mohammad-ali-arjomand-b735b5279/" target="_blank">لینکدین</a></v-list-item>
                <v-list-item prepend-icon="mdi-email-outline"><a href="mailto:arjomand.dev@gmail.com" target="_blank">ایمیل</a></v-list-item>
            </v-list>
        </div>
    </v-dialog>
    <v-navigation-drawer v-model="drawer" location="right">
        <div class="bg-blue-darken-2 w-100 h-25 d-flex justify-end align-start pa-2 flex-column">
            <p>فری مووی</p>
            <small>دانلود و تماشای فیلم و سریال</small>
        </div>
        <v-list>
            <v-list-item prepend-icon="mdi-home-outline">خانه</v-list-item>
            <v-list-item prepend-icon="mdi-bookmark-outline" @click.stop="router.push('/bookmarks')">نشان ها</v-list-item>
            <v-list-item prepend-icon="mdi-history" @click.stop="router.push('/history')">تاریخچه</v-list-item>
            <v-list-item prepend-icon="mdi-cog-outline" @click.stop="router.push('/settings')">تنظیمات</v-list-item>
            <v-list-item prepend-icon="mdi-xml" @click.stop="dialogDev = true">سازنده</v-list-item>
        </v-list>
    </v-navigation-drawer>
    <v-app-bar :elevation="2" color="blue-darken-2">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" variant="text"><v-icon>mdi-menu</v-icon></v-app-bar-nav-icon>
        <v-app-bar-title>فری مووی</v-app-bar-title>
        <v-app-bar-nav-icon @click.stop="router.push('/search')"><v-icon>mdi-magnify</v-icon></v-app-bar-nav-icon>
    </v-app-bar>
</template>

<style scoped>
a {
    text-decoration: none;
    color: black;
}
</style>