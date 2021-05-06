import { reactive } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'
import axios from 'axios'

export type User = {
	id: number
	email: string
	name: string
	isConfirmed: boolean
	isAdmin: boolean
}

type Error = {
	message: string
}

type State = {
	token?: string
	user?: User
}

type Login = {
	email: string
	password: string
}

type Register = {
	name: string
	email: string
	password: string
}

const state = reactive<State>({})

const getters = reactive({
	token: computed(() => state.token),
	user: computed(() => state.user),
})

const actions = {
	setToken(token?: string) {
		state.token = token
	},
	setUser(user?: User) {
		state.user = user
	},
	async register(
		data: Register,
	): Promise<{
		user?: User
		message?: string
		token?: string
		error?: Error
	}> {
		try {
			const response = await axios.post('register', data)

			if (response.data.error) {
				return { error: response.data.error as Error }
			}

			return {
				user: response.data.user as User,
				message: 'Your account was registered succesfully. Please confirm your email to be able to login',
				token: response.data.token as string,
			}
		} catch (err) {
			console.log('Error:')
			console.error(err)
			return { error: { message: 'Something went wrong' } }
		}
	},
	async login(
		data: Login,
	): Promise<{
		error?: Error
		token?: string
	}> {
		try {
			const response = await axios.post('login', data)

			if (response.data.error) {
				return { error: response.data.error as Error }
			}

			this.setToken(response.data.token)
			this.setUser(response.data.user)

			return { token: response.data.token as string }
		} catch (err) {
			console.log('Error:')
			console.error(err)
			return { error: { message: 'Something went wrong' } }
		}
	},
	async forgetPassword(
		email: string,
	): Promise<{
		error?: Error
		message?: string
	}> {
		try {
			const response = await axios.post('forget-password', { email })

			if (response.data.error) {
				return { error: response.data.error as Error }
			}

			return response.data as { message: string }
		} catch (err) {
			console.log('Error:')
			console.error(err)
			return { error: { message: 'Something went wrong' } }
		}
	},
	async changePassword(
		token: string,
		data: Login,
	): Promise<{
		error?: Error
		message?: string
	}> {
		try {
			const response = await axios.post(`change-password/${token}`, data)

			if (response.data.error) {
				return { error: response.data.error as Error }
			}

			return { message: 'Your password was redefined' }
		} catch (err) {
			console.log('Error:')
			console.error(err)
			return { error: { message: 'Something went wrong' } }
		}
	},
	async confirmEmail(
		token: string,
		data: Login,
	): Promise<{
		error?: Error
		message?: string
	}> {
		try {
			const response = await axios.post(`confirm/${token}`, data)

			if (response.data.error) return { error: response.data.error }

			return { message: 'Your account was confirmed. You can login now' }
		} catch (err) {
			console.log('Error:')
			console.error(err)
			return { error: { message: 'Something went wrong' } }
		}
	},
	async logout() {
		state.token = undefined
		state.user = undefined
	},
}

export const userStore = {
	state,
	get: getters,
	...actions,
}
