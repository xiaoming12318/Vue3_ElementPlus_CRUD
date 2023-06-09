// import './assets/main.css'

//引入ElementPlus和样式文件
import ElementPlus from "element-plus"
import "element-plus/dist/index.css"

import { createApp } from 'vue'
import App from './App.vue'

const app=createApp(App)

app.use(ElementPlus)
app.mount("#app")
