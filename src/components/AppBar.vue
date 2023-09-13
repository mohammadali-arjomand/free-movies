<script setup>
    import {VAppBar, VAppBarTitle, VIcon, VNavigationDrawer, VList, VListItem, VDialog, VToolbar, VToolbarTitle, VBtn} from "vuetify/components";
    import {ref} from "vue";

    const drawer = ref(false)
    const dialogDev = ref(false)
</script>

<template>
    <v-dialog v-model="dialogDev" fullscreen :scrim="false" transition="dialog-bottom-transition">
        <v-toolbar color="blue-darken-2">
            <v-btn icon @click.stop="dialogDev = false"><v-icon>mdi-close</v-icon></v-btn>
            <v-toolbar-title>توسعه دهنده</v-toolbar-title>
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
            <small>موتورجستجوی فیلم و سریال</small>
        </div>
        <v-list>
            <router-link to="/" style="color: #222; text-decoration: none"><v-list-item prepend-icon="mdi-home">صفحه اصلی</v-list-item></router-link>
            <v-list-item prepend-icon="mdi-xml" @click.stop="dialogDev = true">توسعه دهنده</v-list-item>
        </v-list>
    </v-navigation-drawer>
    <v-app-bar :elevation="2" color="blue-darken-2">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" variant="text"><v-icon>mdi-menu</v-icon></v-app-bar-nav-icon>
        <v-app-bar-title>فری مووی</v-app-bar-title>
        <router-link to="/search" style="color: white"><v-app-bar-nav-icon><v-icon>mdi-magnify</v-icon></v-app-bar-nav-icon></router-link>
    </v-app-bar>
</template>

<style scoped>
a {
    text-decoration: none;
    color: black;
}
</style>