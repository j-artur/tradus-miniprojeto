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
			<button type="submit" :disabled="submitting">
				{{ submitting ? 'Enviando email...' : 'Enviar email de recuperação' }}
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
		message?: string
		submitting: boolean
	} {
		return {
			email: '',
			message: undefined,
			submitting: false,
		}
	},
	methods: {
		async submit(e: Event) {
			e.preventDefault()
			this.submitting = true
			this.message = undefined

			const res = await userStore.forgetPassword(this.email)

			this.submitting = false
			this.message = res.error ? res.error.message : res.message
		},
	},
})
</script>
