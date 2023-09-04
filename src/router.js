// router
import {createRouter, createWebHistory} from "vue-router";

// components
import App from "@/App.vue";
import Result from "@/components/Result.vue";

const routes = [
    { path: "/", component: App },
    { path: "/search/:query", component: Result }
]

export default createRouter({
    history: createWebHistory(),
    routes
})