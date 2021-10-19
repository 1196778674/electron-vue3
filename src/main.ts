import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import locale from 'element-plus/lib/locale/lang/zh-cn' //中文
import 'element-plus/dist/index.css'
// import './registerServiceWorker'
import router from './router'
import store from './store'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(ElementPlus, {locale})
app.mount('#app')
