import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'
import store from './store.js'
import './public/index.css'
import './src/components/bwc-autocomplete.js'
import './src/components/bwc-table.js'

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
