<template>
	<nav class="nav">
		<div class="nav-items">
			<router-link to="/">
				<div class="nav-item">
					Início
				</div>
			</router-link>
			<router-link to="/about">
				<div class="nav-item">
					Sobre
				</div>
			</router-link>
			<router-link v-if="admin" to="/dashboard">
				<div class="nav-item">
					Painel
				</div>
			</router-link>
			<div class="right">
				<div v-if="!logged">
					<router-link v-if="!logged" to="/register">
						<div class="nav-item">
							Registrar
						</div>
					</router-link>
					<router-link v-if="!logged" to="/login">
						<div class="nav-item">
							Entrar
						</div>
					</router-link>
				</div>
				<div v-else>
					<div class="username">{{ username }}</div>
					<button class="nav-item logout" @click="logout" :disabled="submitting">
						{{ submitting ? 'Saindo...' : 'Sair' }}
					</button>
				</div>
			</div>
		</div>
	</nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { userStore } from '../stores/user'

export default defineComponent({
	name: 'Navbar',
	computed: {
		username() {
			return userStore.get.user?.name
		},
		logged() {
			return !!userStore.get.token
		},
		admin() {
			return userStore.get.user?.isAdmin
		},
	},
	data(): {
		submitting: boolean
	} {
		return {
			submitting: false,
		}
	},
	methods: {
		async logout() {
			this.submitting = true
			setTimeout(async () => {
				userStore.logout()
				this.submitting = false
				this.$router.push('/')
			}, 500)
		},
	},
})
</script>

<style lang="scss" scoped>
.nav {
	padding: 0 4rem;

	background-color: #fff;

	color: var(--text-dark);

	display: flex;

	box-shadow: 0 0 0.5rem 0.5rem #0001;

	.right {
		margin-left: auto;
	}

	@media screen and (min-width: 769px) {
		padding: 0 8rem;
	}

	@media screen and (min-width: 1367px) {
		padding: 0 16rem;
	}
}

.nav-items {
	flex: 1;
	display: flex;

	.nav-item {
		padding: 1.25rem 1.5rem;

		font-weight: bold;
		color: var(--text-dark);

		transition: background-color 0.2s;

		&:hover {
			background-color: var(--text-light);
		}
	}

	.router-link-exact-active {
		background-color: var(--light-green);
	}
}

.right {
	margin-left: auto;

	display: flex;

	& > div {
		display: flex;
	}
}

.logout {
	border: 0;

	background-color: inherit;

	font: inherit;

	cursor: pointer;
}

.username {
	display: flex;
	padding: 0 1rem;
	align-items: center;
}
</style>
