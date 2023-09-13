import { createApp } from 'vue/dist/vue.esm-bundler.js'
import router from "@/router";

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import '@mdi/font/css/materialdesignicons.css'
import './assets/main.css'

const vuetify = createVuetify({
    components,
    directives,
})

createApp({})
    .use(router)
    .use(vuetify)
    .mount('#app')
