import axios from 'axios'
import 'dotenv/config'
import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router/index'
import { userStore } from './stores/user'
import './styles/style.css'

const baseURL = '/api'

axios.interceptors.request.use(config => ({
	...config,
	baseURL,
	withCredentials: true,
	headers: { authorization: `Bearer ${userStore.get.token}` },
}))

createApp(App)
	.use(router)
	.mount('#app')
