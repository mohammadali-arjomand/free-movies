// router
import {createRouter, createWebHistory} from "vue-router";

// components
import App from "@/App.vue";
import Result from "@/components/Result.vue";
import Search from "@/components/Search.vue";
import NotFound from "@/components/NotFound.vue";
import Movie from "@/components/Movie.vue";
import History from "@/components/History.vue";

const routes = [
    { path: "/", component: App },
    { path: "/movie", component: Movie },
    { path: "/history", component: History },
    { path: "/search", component: Search },
    { path: "/search/:query", component: Result },
    { path: '/:pathMatch(.*)*', component: NotFound },
]

export default createRouter({
    history: createWebHistory(),
    routes
})