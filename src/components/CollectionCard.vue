<script setup>

import {VCard, VRow, VCol, VImg, VDialog, VBtn, VIcon, VList, VListItem} from "vuetify/components";

const props = defineProps(["collection", "id"])
import ph from '@/assets/placeholder/poster-placeholder.png'
import {ref} from "vue";

const removeConfirm = ref(false)
const editCollectionDlg = ref(false)
const editCollectionMdl = ref(props.collection.title)
const collections = ref(localStorage.collections !== undefined ? JSON.parse(localStorage.collections) : [])
function removeCollection() {
    collections.value.splice(props.id, 1)
    localStorage.collections = JSON.stringify(collections.value)
    location.reload()
}

function editCollectionTitle() {
    collections.value[props.id].title = editCollectionMdl.value
    localStorage.collections = JSON.stringify(collections.value)
    location.reload()
}
</script>

<template>
    <v-dialog v-model="removeConfirm">
        <v-card title="فری مووی">
            <v-card-text>
                آیا میخواهید مجموعه «{{ collection.title }}» را حذف کنید؟
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text="بله" class="letter" color="red" @click="removeCollection"></v-btn>
                <v-btn text="خیر" class="letter" @click="removeConfirm = false"></v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-dialog v-model="editCollectionDlg">
        <v-card title="مجموعه جدید">
            <v-card-text>
                نام جدید را وارد کنید
            </v-card-text>
            <v-card-item>
                <v-text-field
                        hide-details="auto"
                        :label="'نام گذشته: ' + collection.title"
                        v-model="editCollectionMdl"
                ></v-text-field>
            </v-card-item>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text="لغو" class="letter" @click="editCollectionDlg = false"></v-btn>
                <v-btn text="تایید" class="letter" color="indigo-accent-2" @click="editCollectionTitle"></v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-card class="mt-3 bg-black h-100" @click="" dir="ltr">
        <v-row>
            <v-col cols="4">
                <v-img :src="collection.content.length > 0 ? collection.content[collection.content.length-1].image : ph" class="d-block rounded"></v-img>
            </v-col>
            <v-col cols="8">
                <p>{{ collection.title }}</p>
                <div class="icon my-4" style="font-size: 13px">
                    تعداد فیلم:
                    <span style="color: #536DFE">{{ collection.content.length }}</span>
                </div>
                    <v-btn class="bg-transparent fix-menu" size="small" style="height: 50px; border-radius: 50px">
                        <v-icon>mdi-dots-vertical</v-icon>
                        <v-menu activator="parent">
                            <v-list>
                                <v-list-item>
                                    <v-list-item-title class="py-2" @click.stop="editCollectionDlg = true">
                                        <v-icon size="small">mdi-pencil</v-icon>
                                        ویرایش نام
                                    </v-list-item-title>
                                    <v-list-item-title class="py-2 text-red" @click.stop="removeConfirm = true">
                                        <v-icon size="small" color="red">mdi-trash-can-outline</v-icon>
                                        حذف
                                    </v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </v-btn>
            </v-col>
        </v-row>
    </v-card>
</template>

<style scoped>
.letter {
    letter-spacing: 0;
}
.fix-menu {
    position: absolute;
    top: 0;
    left: 5px;
}
</style>