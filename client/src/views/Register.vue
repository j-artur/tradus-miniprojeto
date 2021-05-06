<template>
	<div class="wrapper">
		<form @submit="submit">
			<span class="message">
				{{ message }}
			</span>
			<div class="form-control">
				<label for="name">Nome</label>
				<input required v-model="name" type="text" id="name" placeholder="nome" />
			</div>
			<div class="form-control">
				<label for="email">Email</label>
				<input required v-model="email" type="email" id="email" placeholder="email@exemplo.com" />
			</div>
			<div class="form-control">
				<label for="password">Senha</label>
				<input required v-model="password" type="password" id="password" placeholder="senha" />
			</div>
			<button type="submit" :disabled="submitting">
				{{ submitting ? 'Registrando...' : 'Registrar' }}
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
		name: string
		email: string
		password: string
		message?: string
		submitting: boolean
	} {
		return {
			name: '',
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

			const res = await userStore.register({
				name: this.name,
				email: this.email,
				password: this.password,
			})

			this.submitting = false
			this.message = res.error ? res.error.message : res.message
		},
	},
})
</script>
