import { createApp } from 'vue'
import App from './App.vue'
import './public/index.css'
import router from './router.js'
import store from './store.js'
import vClickOutside from 'v-click-outside'
// import { Autocomplete } from '@oruga-ui/oruga-next'
// import '@oruga-ui/oruga-next/dist/oruga.css'

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
app.use(vClickOutside)

// app.use(Autocomplete)
