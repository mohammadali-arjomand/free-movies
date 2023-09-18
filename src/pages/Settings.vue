<script setup>
import {VApp, VAppBar, VAppBarTitle, VAppBarNavIcon, VIcon, VListItemSubtitle, VList, VListItem, VSwitch, VDivider} from "vuetify/components";
import router from "@/router";
import {ref, watch} from "vue";
import {useTheme} from "vuetify";
const themeManager = useTheme()

const themesName = {
    Classic: "کلاسیک",
    Modern: "مدرن",
    DarkMode: "تیره"
}

const theme = ref(localStorage.settingsTheme === undefined ? "کلاسیک" : themesName[localStorage.settingsTheme])
const autoEnter = ref(localStorage.settingsAutoEnter === undefined ? false : eval(localStorage.settingsAutoEnter))
const saveHistory = ref(localStorage.settingsSaveHistory === undefined ? true : eval(localStorage.settingsSaveHistory))
const copyLink = ref(localStorage.settingsCopyLink === undefined ? false : eval(localStorage.settingsCopyLink))
const openWithVlc = ref(localStorage.settingsOpenWithVlc === undefined ? false : eval(localStorage.settingsOpenWithVlc))

watch(autoEnter, () => {
    localStorage.settingsAutoEnter = autoEnter.value;
})

watch(saveHistory, () => {
    localStorage.removeItem("history")
    localStorage.settingsSaveHistory = saveHistory.value;
})

watch(theme, () => {
    let themeName;
    for (let t in themesName) {
        if (themesName[t] === theme.value) {
            themeName = t
            break
        }
    }
    localStorage.settingsTheme = themeManager.global.name.value = themeName
})

watch(copyLink, () => {
    localStorage.settingsCopyLink = copyLink.value;
})

watch(openWithVlc, () => {
    localStorage.settingsOpenWithVlc = openWithVlc.value;
})

function goToGithub() {
    window.location.assign("https://github.com/mohammadali-arjomand")
}
</script>

<template>
    <v-app>
        <v-app-bar color="blue-darken-2">
            <v-app-bar-nav-icon @click="router.back()"><v-icon>mdi-arrow-right</v-icon></v-app-bar-nav-icon>
            <v-app-bar-title>تنظیمات</v-app-bar-title>
        </v-app-bar>


        <v-list class="mt-14 pt-6" color="surface" lines="three">
            <v-list-item class="py-0">
                    قالب
                    <v-select
                            v-model="theme"
                            :items="['کلاسیک', 'مدرن', 'تیره']"
                    ></v-select>
            </v-list-item>
            <v-list-item class="py-0">
                <span>
                    ورود خودکار
                    <v-switch v-model="autoEnter" class="float-left ml-3" color="switch" />
                </span>
                <v-list-item-subtitle>
                    در صورتی که جستجو فقط یک نتیجه داشت، به صورت خودکار وارد آن شود.
                </v-list-item-subtitle>
            </v-list-item>
            <v-list-item class="py-0">
                <span>
                    تاریخچه
                    <v-switch v-model="saveHistory" class="float-left ml-3" color="switch" />
                </span>
                <v-list-item-subtitle>
                    اگر غیرفعال شود، تاریخچه مشاهده های شما ذخیره نخواهد شد.
                </v-list-item-subtitle>
            </v-list-item>
            <v-divider class="mb-4"/>
            <v-list-item class="py-0">
                <span>
                    کپی لینک
                    <v-switch v-model="copyLink" class="float-left ml-3" color="switch" />
                </span>
                <v-list-item-subtitle>
                    اگر فعال شود، گزینه «کپی لینک» به صفحه دانلودها اضافه می شود.
                </v-list-item-subtitle>
            </v-list-item>
            <v-list-item class="py-0">
                <span>
                    بازکردن با VLC
                    <v-switch v-model="openWithVlc" class="float-left ml-3" color="switch" />
                </span>
                <v-list-item-subtitle>
                    اگر فعال شود، گزینه «بازکردن با VLC» به صفحه دانلودها اضافه می شود.
                </v-list-item-subtitle>
            </v-list-item>
            <v-divider/>
            <p class="ltr text-center py-4">
                <v-icon>mdi-xml</v-icon>
                with
                <v-icon>mdi-heart-outline</v-icon>
                by
                <span @click="goToGithub">MohammadAli Arjomand</span>
            </p>
        </v-list>
    </v-app>
</template>

<style scoped>

</style>