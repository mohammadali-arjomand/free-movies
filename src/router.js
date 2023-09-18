// router
import {createRouter, createWebHistory} from "vue-router";

// components
import Home from "@/pages/Home.vue";
import Result from "@/pages/Result.vue";
import Search from "@/pages/Search.vue";
import NotFound from "@/pages/NotFound.vue";
import Movie from "@/pages/Movie.vue";
import History from "@/pages/History.vue";
import Settings from "@/pages/Settings.vue";
import Bookmarks from "@/pages/Bookmarks.vue";

const routes = [
    { path: "/", component: Home },
    { path: "/movie", component: Movie },
    { path: "/history", component: History },
    { path: "/bookmarks", component: Bookmarks },
    { path: "/settings", component: Settings },
    { path: "/search", component: Search },
    { path: "/search/:query", component: Result },
    { path: '/:pathMatch(.*)*', component: NotFound },
]

export default createRouter({
    history: createWebHistory(),
    scrollBehavior()  {
        return { top: 0 }
    },
    routes
})