<template>
	<div class="wrapper">
		<form @submit="submit">
			<span class="message">
				{{ message }}
			</span>
			<div class="form-control">
				<label for="email">Email</label>
				<input required v-model="email" type="email" id="email" placeholder="email@example.com" />
			</div>
			<div class="form-control">
				<label for="password">Senha</label>
				<input required v-model="password" type="password" id="password" placeholder="password" />
			</div>
			<button type="submit" :disabled="submitting">
				{{ submitting ? 'Alterando...' : 'Alterar senha' }}
			</button>
		</form>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { userStore } from '../stores/user'

export default defineComponent({
	name: 'Login',
	data(): {
		email: string
		password: string
		message?: string
		submitting: boolean
	} {
		return {
			email: '',
			password: '',
			message: undefined,
			submitting: false,
		}
	},
	methods: {
		async submit(e: Event) {
			e.preventDefault()
			this.submitting = true
			this.message = undefined

			const res = await userStore.changePassword(this.$route.params.token as string, {
				email: this.email,
				password: this.password,
			})

			this.submitting = false
			if (res.error) {
				this.message = res.error.message
			} else {
				this.message = res.message
				this.email = ''
				this.password = ''
			}
		},
	},
})
</script>
