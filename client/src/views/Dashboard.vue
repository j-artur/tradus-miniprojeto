<template>
	<div class="wrapper">
		<div class="modal" v-if="editing.id || deleting || adding.isAdding">
			<div class="form" v-if="editing.id">
				<form @submit="edit">
					<div class="form-control">
						<label for="name">Nome</label>
						<input required v-model="editing.name" type="text" id="name" placeholder="nome" />
					</div>
					<button type="submit">Editar</button>
				</form>
				<button type="button" @click="editing.id = 0">Cancelar</button>
			</div>
			<div class="form" v-if="deleting">
				<span>Tem certeza que deseja excluir?</span>
				<div class="buttons">
					<button type="button" @click="remove">
						Sim
					</button>
					<button type="button" @click="deleting = 0">
						Não
					</button>
				</div>
			</div>
			<div class="form" v-if="adding.isAdding">
				<form @submit="add">
					<div class="form-control">
						<label for="name">Nome</label>
						<input required v-model="adding.name" type="text" id="name" placeholder="nome" />
					</div>
					<div class="form-control">
						<label for="email">Email</label>
						<input required v-model="adding.email" type="email" id="email" placeholder="email@exemplo.com" />
					</div>
					<button type="submit">Adicionar</button>
				</form>
				<button type="button" @click="adding.isAdding = false">Cancelar</button>
			</div>
		</div>
		<div v-if="!admin">You are not authorized</div>
		<div v-else>
			<div class="dashboard">
				<span class="message">
					{{ message }}
				</span>
				<button type="button" @click="adding.isAdding = true">Adicionar usuário</button>
				<table class="table">
					<thead>
						<tr>
							<th>ID</th>
							<th>Nome</th>
							<th>Email</th>
							<th>Confirmado</th>
							<th>Admin</th>
							<th>Ações</th>
						</tr>
					</thead>
					<tbody>
						<tr class="user" v-for="user in users" :key="user.id">
							<td>{{ user.id }}</td>
							<td>{{ user.name }}</td>
							<td>{{ user.email }}</td>
							<td>{{ user.isConfirmed ? 'Sim' : 'Não' }}</td>
							<td>{{ user.isAdmin ? 'Sim' : 'Não' }}</td>
							<td class="actions">
								<button class="icon" type="button" @click="setEditing(user)">
									<i class="fas fa-user-edit" />
								</button>
								<button class="icon" type="button" @click="deleting = user.id">
									<i class="fas fa-trash" />
								</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import axios from 'axios'
import { defineComponent } from 'vue'
import { userStore, User } from '../stores/user'

export default defineComponent({
	name: 'Dashboard',
	computed: {
		admin() {
			return userStore.get.user?.isAdmin
		},
	},
	data(): {
		message?: string
		users: User[]
		editing: {
			id: number
			name: string
		}
		adding: {
			isAdding: boolean
			name: string
			email: string
		}
		deleting: number
	} {
		return {
			users: [],
			editing: {
				id: 0,
				name: '',
			},
			adding: {
				isAdding: false,
				name: '',
				email: '',
			},
			deleting: 0,
		}
	},
	methods: {
		get() {
			axios.get('/users').then(res => {
				if (res.data.users) {
					this.users = res.data.users
				}
			})
		},
		add(e: Event) {
			e.preventDefault()
			axios.post('/users', this.adding).then(res => {
				if (res.data.message) {
					this.message = res.data.message
				}

				this.adding.isAdding = false
				this.adding.name = ''
				this.adding.email = ''

				this.get()
			})
		},
		setEditing(user: User) {
			this.editing.id = user.id
			this.editing.name = user.name
		},
		edit(e: Event) {
			e.preventDefault()
			axios.patch(`/users/${this.editing.id}`, this.editing).then(() => {
				this.editing.id = 0
				this.editing.name = ''

				this.get()
			})
		},
		remove() {
			axios.delete(`/users/${this.deleting}`).then(() => {
				this.deleting = 0

				this.get()
			})
		},
	},
	mounted() {
		this.get()
	},
})
</script>

<style lang="scss" scoped>
.wrapper {
	position: relative;
	height: 80vh;
}

.modal {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;

	background-color: #fff;

	display: flex;
	justify-content: center;
	align-items: center;
}

.dashboard {
	padding: 4rem;
	border-radius: 1rem;

	box-shadow: 0 0 1rem 0.5rem #0001;

	@media screen and (min-width: 769px) {
		padding: auto 6rem;
	}

	@media screen and (min-width: 1367px) {
		padding: auto 8rem;
	}
}

.add {
	padding: 0.5rem 0.875rem;
}

.form {
	padding: 2rem;
	border-radius: 1rem;

	display: flex;
	flex-direction: column;
	align-items: center;

	box-shadow: 0 0 1rem 0.5rem #0001;
}

.table {
	padding: 2rem;
	width: 100%;
	td {
		text-align: center;
	}
}

.actions {
	display: flex;
	justify-content: space-evenly;

	button {
		padding: 0.125rem;
	}
}

.delete {
	display: flex;
	justify-content: space-around;
}

button[type='button'] {
	padding: 0.75rem 1.5rem;
	border: solid 2px var(--primary-green);
	border-radius: 2rem;

	background-color: transparent;

	font-weight: bold;
	color: var(--text-dark);

	cursor: pointer;

	transition: all 0.2s;
}

button[type='button']:hover {
	background-color: var(--light-green);
	border-color: var(--light-green);
}

button[type='button']:active {
	background-color: var(--primary-green);
}

button[type='button']:focus {
	outline: none;
	box-shadow: 0 0 0 0.25rem var(--light-green);
}

form {
	box-shadow: none;
}

button.icon {
	padding: 0.5rem;
	width: 2.5rem;
	height: 2.5rem;
}

.buttons {
	align-self: stretch;

	margin-top: 1rem;

	display: flex;
	justify-content: space-between;
}
</style>
