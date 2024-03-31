<script setup>
import {
    VApp,
    VIcon,
    VListItemSubtitle,
    VList,
    VListItem,
    VSwitch,
    VDivider,
    VDialog, VSnackbar
} from "vuetify/components";
import {ref, watch} from "vue";
import AppBar from "@/components/AppBar.vue";

const autoEnter = ref(localStorage.settingsAutoEnter === undefined ? false : eval(localStorage.settingsAutoEnter))

const clearConfirmDlg = ref(false)
const clearConfirmSnk = ref(false)
const resetDataDlg = ref(false)
const clearCatchDlg = ref(false)
const clearCatchSnk = ref(false)
const contact = ref(false)

watch(autoEnter, () => {
    localStorage.settingsAutoEnter = autoEnter.value;
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

function clearCatch() {
    clearCatchDlg.value = false
    localStorage.removeItem("catch")
    localStorage.removeItem("catchExpires")
    localStorage.removeItem("catchSearch")
    localStorage.removeItem("catchSearchExpires")
    clearCatchSnk.value = true
}
</script>

<template>
    <v-app>
        <v-snackbar v-model="clearConfirmSnk" :timeout="1000" color="indigo-accent-2">تاریخچه جستجو با موفقیت پاک شد!</v-snackbar>
        <v-snackbar v-model="clearCatchSnk" :timeout="1000" color="indigo-accent-2">حافظه پنهان با موفقیت پاک شد!</v-snackbar>
        <v-dialog v-model="clearConfirmDlg">
            <v-card title="فری مووی">
                <v-card-text>
                    آیا میخواهید تاریخچه جستجو را پاک کنید؟
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text="بله" class="letter" color="red" @click="clearSearchHistory"></v-btn>
                    <v-btn text="خیر" class="letter" @click="clearConfirmDlg = false"></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="clearCatchDlg">
            <v-card title="فری مووی">
                <v-card-text>
                    آیا میخواهید حافظه پنهان را پاک کنید؟
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text="بله" class="letter" color="red" @click="clearCatch"></v-btn>
                    <v-btn text="خیر" class="letter" @click="clearCatchDlg = false"></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="contact">
            <v-card title="ارتباط با توسعه دهنده">
                <v-card-text>
                    <a href="mailto:arjomand.dev@gmail.com">
                        <v-icon>mdi-email-plus</v-icon>
                        ایمیل
                    </a>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text="بستن" class="letter" @click="contact = false"></v-btn>
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
                    <v-btn text="بله" class="letter" color="red" @click="resetData"></v-btn>
                    <v-btn text="خیر" class="letter" @click="resetDataDlg = false"></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <app-bar></app-bar>


        <v-list class="mt-14 pt-6 h-100 bg-black" color="surface" lines="three">

            <v-list-item class="py-0">
                <span>
                    ورود خودکار
                    <v-switch v-model="autoEnter" class="float-left ml-3" color="indigo-accent-2" />
                </span>
                <v-list-item-subtitle>
                    در صورتی که جستجو فقط یک نتیجه داشت، به صورت خودکار وارد آن شود.
                </v-list-item-subtitle>
            </v-list-item>

            <v-divider/>
            <v-list-item class="py-0" @click="clearConfirmDlg = true">
                <span>پاکسازی تاریخچه جستجو</span>
                <v-list-item-subtitle>
                    تاریخچه جسجتوهای شما به طور کامل پاک می شوند و دیگر در دسترس نیستند.
                </v-list-item-subtitle>
            </v-list-item>
            <v-list-item class="py-0" @click="clearCatchDlg = true">
                <span>پاکسازی حافظه پنهان</span>
                <v-list-item-subtitle>
                    فری مووی برای افزایش سرعت و بهینه شدن از حافظه پنهان (کش) استفاده میکند. میتوانید این حافظه پنهان را حذف کنید.
                </v-list-item-subtitle>
            </v-list-item>
            <v-list-item class="py-0" @click="resetDataDlg = true">
                <span>بازنشانی اطلاعات</span>
                <v-list-item-subtitle>
                    تمام اطلاعات شما در برنامه از جمله تنظیمات، حافظه پنهان، نشان ها و... از بین می روند.
                </v-list-item-subtitle>
            </v-list-item>
            <v-divider/>
            <v-list-item class="py-0" @click="contact = true">
                <span>ارتباط با توسعه دهنده</span>
                <v-list-item-subtitle>
                    برای پرسیدن سوالات و ارسال پیشنهادات میتوانید با توسعه دهنده این برنامه در ارتباط باشد. برای اینکار روی همین بخش ضربه بزنید.
                </v-list-item-subtitle>
            </v-list-item>
        </v-list>
    </v-app>
</template>

<style scoped>
.letter {
    letter-spacing: 0;
}
a {
    color: #222222;
    text-decoration: none;
}
</style>