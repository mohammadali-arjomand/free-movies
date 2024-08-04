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
const showGenres = ref(localStorage.settingsShowGenres === undefined ? true : eval(localStorage.settingsShowGenres))

const clearConfirmDlg = ref(false)
const clearConfirmSnk = ref(false)
const resetDataDlg = ref(false)
const clearCacheDlg = ref(false)
const clearCacheSnk = ref(false)
const contact = ref(false)

watch(autoEnter, () => {
    localStorage.settingsAutoEnter = autoEnter.value;
})

watch(showGenres, () => {
    localStorage.settingsShowGenres = showGenres.value;
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

function clearCache() {
    clearCacheDlg.value = false
    localStorage.removeItem("cache")
    localStorage.removeItem("cacheExpires")
    localStorage.removeItem("cacheSearch")
    localStorage.removeItem("cacheSearchExpires")
    clearCacheSnk.value = true
}

function openFarsroid() {
    location.assign('https://www.farsroid.com/vlc-for-android/#downloadbox')
}
</script>

<template>
    <v-app>
        <v-snackbar v-model="clearConfirmSnk" :timeout="1000" color="indigo-accent-2">تاریخچه جستجو با موفقیت پاک شد!</v-snackbar>
        <v-snackbar v-model="clearCacheSnk" :timeout="1000" color="indigo-accent-2">حافظه پنهان با موفقیت پاک شد!</v-snackbar>
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
        <v-dialog v-model="clearCacheDlg">
            <v-card title="فری مووی">
                <v-card-text>
                    آیا میخواهید حافظه پنهان را پاک کنید؟
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text="بله" class="letter" color="red" @click="clearCache"></v-btn>
                    <v-btn text="خیر" class="letter" @click="clearCacheDlg = false"></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="contact">
            <v-card title="ارتباط با توسعه دهنده">
                <v-card-text>
                    <a href="mailto:arjomand.dev@gmail.com" style="color: white">
                        <v-icon color="indigo-accent-2">mdi-email-plus</v-icon>
                        ایمیل
                    </a>
                    <br>
                    <a href="https://github.com/arjomand-dev" style="color: white">
                        <v-icon color="indigo-accent-2">mdi-github</v-icon>
                        گیت هاب
                    </a>
                    <br>
                    <a href="https://t.me/ArjomandDev" style="color: white">
                        <v-icon color="indigo-accent-2">mdi-message-text-outline</v-icon>
                        تلگرام
                    </a>
                    <br>
                    <a href="https://ir.linkedin.com/in/mohammad-ali-arjomand-b735b5279" style="color: white">
                        <v-icon color="indigo-accent-2">mdi-linkedin</v-icon>
                        لینکدین
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
            <v-list-item class="py-0">
                <span>
                    لیست ژانرها
                    <v-switch v-model="showGenres" class="float-left ml-3" color="indigo-accent-2" />
                </span>
                <v-list-item-subtitle>
                    اگر غیرفعال شود، لیست ژانرها از زیر کارت فیلم ها حذف خواهد شد.
                </v-list-item-subtitle>
            </v-list-item>
            <v-divider/>
            <v-list-item class="py-0" @click="clearConfirmDlg = true">
                <span>پاکسازی تاریخچه جستجو</span>
                <v-list-item-subtitle>
                    تاریخچه جستجوهای شما به طور کامل پاک می شوند و دیگر در دسترس نیستند.
                </v-list-item-subtitle>
            </v-list-item>
            <v-list-item class="py-0" @click="clearCacheDlg = true">
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
            <v-list-item class="py-0" @click.stop="openFarsroid">
                <span>دانلود پخش کننده VLC</span>
                <v-list-item-subtitle>
                    برای مشاهده آنلاین فیلم ها پخش کننده VLC را نصب و از گزینه «مشاهده با VLC» در صفحه «دانلود» استفاده کنید
                </v-list-item-subtitle>
            </v-list-item>
            <v-divider/>
            <v-list-item class="py-0" @click="contact = true">
                <span>ارتباط با توسعه دهنده</span>
                <v-list-item-subtitle>
                    برای پرسیدن سوالات و ارسال پیشنهادات میتوانید با توسعه دهنده این برنامه در ارتباط باشید.
                </v-list-item-subtitle>
            </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <div class="text-center mt-3" onclick="alert('نسخه 5.0.1 آزمایشی')">
            v5.0.1 Beta
        </div>
        <br><br><br>
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