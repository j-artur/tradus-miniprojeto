import { hash } from '../functions/hash'

export async function SeedUsers() {
	const adminPassword = await hash('admin')
	const bobPassword = await hash('bob')

	const userSeed = [
		{
			name: 'admin',
			email: 'admin@admin.com',
			password: adminPassword,
			isAdmin: true,
			isConfirmed: true,
			createdAt: `${new Date()}`,
			updatedAt: `${new Date()}`,
		},
		{
			name: 'bob',
			email: 'bob@bob.com',
			password: bobPassword,
			isConfirmed: true,
			createdAt: `${new Date()}`,
			updatedAt: `${new Date()}`,
		},
	]

	return userSeed
}
