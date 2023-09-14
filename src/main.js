// Vue
import { createApp } from 'vue/dist/vue.esm-bundler.js'
import router from "@/router";

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Styles
import '@mdi/font/css/materialdesignicons.css'
import './assets/main.css'

// VideoJs
import VueVideoPlayer from '@videojs-player/vue'
import 'video.js/dist/video-js.css'

const vuetify = createVuetify({
    components,
    directives,
})

createApp({})
    .use(router)
    .use(vuetify)
    .use(VueVideoPlayer)
    .mount('#app')
