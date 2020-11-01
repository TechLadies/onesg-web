import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'
import store from './store.js'
import './public/index.css'
import './src/components/bwc-autocomplete.js'

import Oruga from '@oruga-ui/oruga-next'
import '@oruga-ui/oruga-next/dist/oruga.css'

const app = createApp(App)
app.use(router)
app.use(store)
app.use(Oruga)
app.mount('#app')
