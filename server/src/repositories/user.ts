import { getConnection } from 'typeorm'
import { IUser, User } from '../models/user'

export class UserRepository {
	static async getAll() {
		const users = await User.find()

		return users
	}

	static async getOneById(id: number) {
		const user = await User.findOne({ id })

		return user
	}

	static async getOneByEmail(email: string) {
		const user = await getConnection()
			.getRepository(User)
			.createQueryBuilder('user')
			.addSelect('user.password')
			.where('user.email = :email', { email })
			.getOne()

		return user
	}

	static async getConfirmationToken(email: string) {
		const user = await getConnection()
			.getRepository(User)
			.createQueryBuilder('user')
			.addSelect('user.confirmationToken')
			.where('user.email = :email', { email })
			.getOne()

		if (!user) return user

		return user.confirmationToken
	}

	static async setConfirmationToken(email: string, token?: string) {
		const { affected } = await User.update({ email }, { confirmationToken: token })

		return !!affected
	}

	static async create(input: IUser) {
		const user = await User.create(input).save()

		return { ...user, password: undefined }
	}

	static async update(id: number, input: Partial<IUser>) {
		const { affected } = await User.update({ id }, input)

		if (affected) return await User.findOne({ id })
		else return
	}

	static async delete(id: number) {
		const result = await User.delete({ id })

		return !!result.affected
	}
}
