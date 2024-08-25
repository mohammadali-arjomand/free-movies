// router
import {createRouter, createWebHistory} from "vue-router";

// components
import Home from "@/pages/Home.vue";
import Result from "@/pages/Result.vue";
import Search from "@/pages/Search.vue";
import NotFound from "@/pages/NotFound.vue";
import Movie from "@/pages/Movie.vue";
import Settings from "@/pages/Settings.vue";
import Bookmarks from "@/pages/Bookmarks.vue";
import Open from "@/pages/Open.vue";
import Collections from "@/pages/Collections.vue";
import CollectionShow from "@/pages/CollectionShow.vue";
import RecentlyAdded from "@/pages/RecentlyAdded.vue";

const routes = [
    { path: "/", component: Home },
    { path: "/recently-added", component: RecentlyAdded },
    { path: "/movie", component: Movie },
    { path: "/bookmarks", component: Bookmarks },
    { path: "/collections", component: Collections },
    { path: "/collections/show", component: CollectionShow },
    { path: "/settings", component: Settings },
    { path: "/search", component: Search },
    { path: "/search/:query", component: Result },
    { path: "/s/:data", component: Open },
    { path: '/:pathMatch(.*)*', component: NotFound },
]

export default createRouter({
    history: createWebHistory(),
    scrollBehavior()  {
        return { top: 0 }
    },
    routes
})