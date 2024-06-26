import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
// import { useMainStore } from "./stores";
import vuetify from "./plugins/vuetify";
import router from "./router"

const pinia = createPinia();
// const store = useMainStore(pinia)
// const api = createApp(App)

// api.use(createPinia())

// store.setBaseUrl(import.meta.env.VITE_API_BASE_URL)

// api.mount('#api')
createApp(App)
  .use(pinia)
  .use(vuetify)
  .use(router)
  .mount("#app");