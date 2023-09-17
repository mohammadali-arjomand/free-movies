<script setup>
import {VApp, VAppBar, VAppBarTitle, VAppBarNavIcon, VIcon, VListItemSubtitle, VList, VListItem, VSwitch} from "vuetify/components";
import router from "@/router";
import {ref, watch} from "vue";

const autoEnter = ref(localStorage.settingsAutoEnter === undefined ? false : eval(localStorage.settingsAutoEnter))

watch(autoEnter, () => {
    localStorage.settingsAutoEnter = autoEnter.value;
})
</script>

<template>
    <v-app>
        <v-app-bar color="blue-darken-2">
            <v-app-bar-nav-icon @click="router.back()"><v-icon>mdi-arrow-right</v-icon></v-app-bar-nav-icon>
            <v-app-bar-title>تنظیمات</v-app-bar-title>
        </v-app-bar>


        <v-list class="mt-14 pt-4" lines="three">
            <v-list-item>
                <span>
                    ورود خودکار
                    <v-switch v-model="autoEnter" class="float-left ml-3" color="blue-darken-2" />
                </span>
                <v-list-item-subtitle>
                    در صورتی که جستجو فقط یک نتیجه داشت، به صورت خودکار وارد آن شود.
                </v-list-item-subtitle>
            </v-list-item>
        </v-list>
    </v-app>
</template>

<style scoped>

</style>