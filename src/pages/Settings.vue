<script setup>
import {
    VApp,
    VAppBar,
    VAppBarTitle,
    VAppBarNavIcon,
    VIcon,
    VListItemSubtitle,
    VList,
    VListItem,
    VSwitch,
    VDivider,
    VDialog, VSnackbar
} from "vuetify/components";
import router from "@/router";
import {ref, watch} from "vue";
import {useTheme} from "vuetify";
import {tr} from "vuetify/locale";
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

const clearConfirmDlg = ref(false)
const clearConfirmSnk = ref(false)
const resetDataDlg = ref(false)

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

function clearSearchHistory() {
    clearConfirmDlg.value = false
    localStorage.removeItem("search")
    clearConfirmSnk.value = true
}

function resetData() {
    resetDataDlg.value = false
    localStorage.clear()
    window.location.assign("/")
}

function goToGithub() {
    window.location.assign("https://github.com/mohammadali-arjomand")
}
</script>

<template>
    <v-app>
        <v-snackbar v-model="clearConfirmSnk" :timeout="1000" color="snack">تاریخچه جستجو با موفقیت پاک شد!</v-snackbar>
        <v-dialog v-model="clearConfirmDlg">
            <v-card title="فری مووی">
                <v-card-text>
                    آیا میخواهید تاریخچه جستجو را پاک کنید؟
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text="بله" color="red" @click="clearSearchHistory"></v-btn>
                    <v-btn text="خیر" @click="clearConfirmDlg = false"></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="resetDataDlg">
            <v-card title="فری مووی">
                <v-card-text>
                    آیا میخواهید تمام اطلاعات خود در فری مووی را پاک کنید؟
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text="بله" color="red" @click="resetData"></v-btn>
                    <v-btn text="خیر" @click="resetDataDlg = false"></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
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
            <v-divider class="mb-4" />
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
            <v-list-item class="py-0" @click="clearConfirmDlg = true">
                <span>پاکسازی تاریخچه جستجو</span>
                <v-list-item-subtitle>
                    تاریخچه جسجتوهای شما به طور کامل پاک می شوند و دیگر در دسترس نیستند.
                </v-list-item-subtitle>
            </v-list-item>
            <v-list-item class="py-0" @click="resetDataDlg = true">
                <span>بازنشانی اطلاعات</span>
                <v-list-item-subtitle>
                    تمام اطلاعات شما در برنامه از جمله تنظیمات، تاریخچه، نشان ها و... از بین می روند.
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