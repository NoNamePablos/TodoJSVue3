
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import "@/assets/style/_main.scss";
import {router} from "@/router/router";
import ui from "@/components/UI/index";

const app = createApp(App)
ui.forEach((item)=>{
    app.component(item.__name,item);
})
app.use(createPinia())
app.use(router)
app.mount('#app')
