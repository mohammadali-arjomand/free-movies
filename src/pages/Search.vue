<script setup>
    import {VApp, VBtn, VContainer, VDialog, VIcon, VList, VListItem, VToolbar, VToolbarTitle, VCheckbox} from "vuetify/components";
    import SearchBar from "@/components/SearchBar.vue";
    import router from "@/router";
    import AppBar from "@/components/AppBar.vue";
    import {ref} from "vue";

    const removeDlg = ref(false)
    const removeConfirmDlg = ref(false)
    const removeHistory = ref([])
    const isSearching = ref(false)

    const realSearchHistory = localStorage.search === undefined ? [] : JSON.parse(localStorage.search).reverse()
    const searchHistory = ref(realSearchHistory)

    const filterSearchHistory = function (searchText) {
        isSearching.value = searchText !== ""
        let updatedHistory = [];
        for (let i = 0; i < realSearchHistory.length; i++) {
            if (realSearchHistory[i].toLowerCase().includes(searchText.toLowerCase())) {
                updatedHistory.push(realSearchHistory[i]);
            }
        }
        searchHistory.value = updatedHistory
    }
    const removeSelectedItems = function () {
        let search = realSearchHistory.filter(value => !removeHistory.value.includes(value))
        localStorage.search = JSON.stringify(search)
        location.reload()
    }
</script>

<template>
    <v-app>
        <v-dialog v-model="removeConfirmDlg">
            <v-card title="فری مووی">
                <v-card-text>
                    از حذف موارد انتخاب شده مطمئن هستید؟
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text="بله" class="letter" color="red" @click="removeSelectedItems"></v-btn>
                    <v-btn text="خیر" class="letter" @click="removeConfirmDlg = false"></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="removeDlg" fullscreen :scrim="false" transition="dialog-bottom-transition">
            <v-toolbar color="black">
                <v-btn @click.stop="removeDlg = false" variant="text"><v-icon>mdi-close</v-icon></v-btn>
                <v-toolbar-title>حذف سوابق جستجو</v-toolbar-title>
            </v-toolbar>
            <div class="download-box overflow-x-auto bg-black h-100">
                <v-checkbox
                        v-for="history in realSearchHistory"
                        v-model="removeHistory"
                        :label="history"
                        :value="history"
                        color="deep-orange-darken-1"
                        style="height: 50px"
                ></v-checkbox>
                <v-btn class="fixed" v-show="removeHistory.length > 0" icon="mdi-delete-outline" @click="removeConfirmDlg = true" color="deep-orange-darken-1"></v-btn>
            </div>
        </v-dialog>
        <app-bar></app-bar>
        <v-container class="mt-14 h-100 bg-black">
            <search-bar :focus="true" :filter-search-history="filterSearchHistory"></search-bar>
            <v-list class="pt-4 bg-black">
                <v-list-item v-for="searchText in searchHistory" @click="router.push(`/search/${encodeURIComponent(searchText)}`)">
                    <v-icon color="indigo-accent-2">mdi-history</v-icon>
                    {{ searchText }}
                </v-list-item>
                <v-list-item v-if="!isSearching && realSearchHistory.length > 1" @click="removeDlg = true" style="color: #F4511E">
                    <v-icon color="deep-orange-darken-1">mdi-delete-sweep-outline</v-icon>
                    حذف موردی سوابق جستجو
                </v-list-item>
            </v-list>
            <br><br><br>
        </v-container>
    </v-app>
</template>

<style scoped>
.letter {
    letter-spacing: 0;
}
.fixed {
    position: fixed;
    left: 20px;
    bottom: 20px;
}
</style>