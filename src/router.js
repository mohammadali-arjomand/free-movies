// router
import {createRouter, createWebHistory} from "vue-router";

// components
import App from "@/App.vue";
import Result from "@/components/Result.vue";
import NotFound from "@/components/NotFound.vue";

const routes = [
    { path: "/", component: App },
    { path: "/search/:query", component: Result },
    { path: '/:pathMatch(.*)*', component: NotFound },
]

export default createRouter({
    history: createWebHistory(),
    routes
})