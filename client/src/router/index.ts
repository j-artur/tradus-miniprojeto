import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	{
		path: '/about',
		name: 'About',
		component: () => import('../views/About.vue'),
	},
	{
		path: '/register',
		name: 'Register',
		component: () => import('../views/Register.vue'),
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import('../views/Login.vue'),
	},
	{
		path: '/confirm/:token',
		name: 'Confirm',
		component: () => import('../views/Confirm.vue'),
	},
	{
		path: '/forgot-password',
		name: 'ForgotPassword',
		component: () => import('../views/ForgotPassword.vue'),
	},
	{
		path: '/change-password/:token',
		name: 'ChangePassword',
		component: () => import('../views/ChangePassword.vue'),
	},
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: () => import('../views/Dashboard.vue'),
	},
]

export const router = createRouter({
	history: createWebHashHistory(),
	routes,
})
