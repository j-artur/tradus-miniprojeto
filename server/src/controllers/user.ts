import { Request, Response } from 'express'
import { v4 } from 'uuid'
import { FRONTEND_URL } from '../config/config'
import { hash, verify } from '../functions/hash'
import { sendEmail } from '../functions/sendEmail'
import { signJWT } from '../functions/signJWT'
import { UserRepository } from '../repositories/user'

export class UserController {
	static async getAll(_req: Request, res: Response) {
		try {
			const users = await UserRepository.getAll()

			return res.json({ users })
		} catch (err) {
			console.error(err)
			return res.json({ error: { message: 'Something went wrong' } })
		}
	}

	static async getOne(req: Request, res: Response) {
		const id: number = parseInt(req.params.id!)
		if (!id) return res.json({ error: { message: 'Invalid id' } })

		try {
			const user = await UserRepository.getOneById(id)
			if (!user) return res.json({ error: { message: 'User not found' } })

			return res.json({ user })
		} catch (err) {
			console.error(err)
			return res.json({ error: { message: 'Something went wrong' } })
		}
	}

	static async create(req: Request, res: Response) {
		const { name, email, isAdmin } = req.body

		const invalidFields: string[] = []

		if (typeof name !== 'string') invalidFields.push('name')
		if (typeof email !== 'string' || !email.includes('@')) invalidFields.push('email')
		if (typeof isAdmin !== 'undefined' && typeof isAdmin !== 'boolean') invalidFields.push('isAdmin')
		if (invalidFields.length) return res.json({ error: { message: 'Invalid fields: ' + invalidFields.join(', ') } })

		try {
			const randomPassword = v4()
			const hashedPassword = await hash(randomPassword)

			const user = await UserRepository.create({ name, email, password: hashedPassword, isAdmin, isConfirmed: true })

			const token = v4()

			await UserRepository.setConfirmationToken(email, token)

			sendEmail(
				user.email,
				'Password change',
				`<a href="${FRONTEND_URL}/#/change-password/${token}">Define a new password.</a>`,
			)

			return res.json({ user, token })
		} catch (err) {
			if (err.code == 23505) return res.json({ error: { message: 'User already registered' } })
			console.error(err)
			return res.json({ error: { message: 'Something went wrong' } })
		}
	}

	static async update(req: Request, res: Response) {
		const id = parseInt(req.params.id!)
		if (!id) return res.json({ error: { message: 'Invalid id' } })

		const { name, email, isAdmin, isConfirmed } = req.body
		const patch: any = {}

		const invalidFields: string[] = []

		if (typeof name === 'string') patch.name = name
		else name && invalidFields.push('name')

		if (typeof email === 'string' && email.includes('@')) patch.email = email
		else email && invalidFields.push('email')

		if (typeof isAdmin === 'boolean') patch.isAdmin = isAdmin
		else isAdmin && invalidFields.push('isAdmin')

		if (typeof isConfirmed === 'boolean') patch.isConfirmed = isConfirmed
		else isConfirmed && invalidFields.push('isConfirmed')

		if (invalidFields.length) {
			return res.json({ error: { message: 'Invalid fields: ' + invalidFields.join(', ') } })
		}

		try {
			const user = await UserRepository.getOneById(id)

			if (!user) return res.json({ error: { message: 'User not found' } })

			const update = await UserRepository.update(id, patch)

			if (!update) throw null

			return res.json({ user: update })
		} catch (err) {
			return res.json({ error: { message: 'Something went wrong' } })
		}
	}

	static async delete(req: Request, res: Response) {
		const id: number = parseInt(req.params.id!)
		if (!id) return res.json({ error: { message: 'Invalid id' } })

		try {
			const result = await UserRepository.delete(id)

			return res.json({ result })
		} catch (err) {
			return res.json({ error: { message: 'Something went wrong' } })
		}
	}

	static async register(req: Request, res: Response) {
		const { name, email, password, isAdmin } = req.body

		const invalidFields: string[] = []

		if (typeof name !== 'string') invalidFields.push('name')
		if (typeof email !== 'string' || !email.includes('@')) invalidFields.push('email')
		if (typeof password !== 'string') invalidFields.push('password')
		if (typeof isAdmin !== 'undefined' && typeof isAdmin !== 'boolean') invalidFields.push('isAdmin')
		if (invalidFields.length) return res.json({ error: { message: 'Invalid fields: ' + invalidFields.join(', ') } })

		try {
			const hashedPassword = await hash(password)

			const user = await UserRepository.create({ name, email, password: hashedPassword, isAdmin })

			const token = v4()

			await UserRepository.setConfirmationToken(email, token)
			sendEmail(
				user.email,
				'Account confirmation',
				`<a href="${FRONTEND_URL}/#/confirm/${token}">Confirm your account.</a>`,
			)

			return res.json({ user, token })
		} catch (err) {
			if (err.code == 23505) return res.json({ error: { message: 'User already registered' } })
			console.error(err)
			return res.json({ error: { message: 'Something went wrong' } })
		}
	}

	static async login(req: Request, res: Response) {
		const { email, password } = req.body
		if (typeof email !== 'string' || !email.includes('@')) return res.json({ error: { message: 'Invalid email' } })
		if (typeof password !== 'string') return res.json({ error: { message: 'Invalid password' } })

		try {
			const user = await UserRepository.getOneByEmail(email)
			if (!user) return res.json({ error: { message: 'Email not registered' } })

			const valid = await verify(password, user.password)
			if (!valid) return res.json({ error: { message: 'Incorrect password' } })

			if (!user.isConfirmed) return res.json({ error: { message: 'You need to confirm your email, check your inbox' } })

			const token = signJWT(user)

			return res.json({ token, user: { ...user, password: undefined } })
		} catch (err) {
			console.error(err)
			return res.json({ error: { message: 'Something went wrong' } })
		}
	}

	static async confirmEmail(req: Request, res: Response) {
		const token = req.params.token!
		const { email, password } = req.body
		if (typeof email !== 'string' || !email.includes('@')) return res.json({ error: { message: 'Invalid email' } })
		if (typeof password !== 'string') return res.json({ error: { message: 'Invalid password' } })

		try {
			const user = await UserRepository.getOneByEmail(email)
			if (!user) return res.json({ error: { message: 'Email not found' } })
			if (user.isConfirmed) return res.json({ error: { message: 'You already confirmed your email' } })

			const confirmationToken = await UserRepository.getConfirmationToken(email)
			if (token !== confirmationToken) return res.json({ error: { message: 'Your token expired' } })

			const valid = await verify(password, user.password)
			if (!valid) return res.json({ error: { message: 'Incorrect password' } })

			const updatedUser = await UserRepository.update(user.id, { isConfirmed: true })
			await UserRepository.setConfirmationToken(user.email, undefined)

			return res.json({ user: updatedUser })
		} catch (err) {
			console.error(err)
			return res.json({ error: { message: 'Something went wrong' } })
		}
	}

	static async changePassword(req: Request, res: Response) {
		const token = req.params.token!
		const { email, password } = req.body
		if (typeof email !== 'string' || !email.includes('@')) return res.json({ error: { message: 'Invalid email' } })
		if (typeof password !== 'string') return res.json({ error: { message: 'Invalid password' } })

		try {
			const user = await UserRepository.getOneByEmail(email)
			if (!user) return res.json({ error: { message: 'User not found' } })

			const confirmationToken = await UserRepository.getConfirmationToken(email)

			if (!confirmationToken || token !== confirmationToken)
				return res.json({ error: { message: 'Your token is invalid' } })

			const hashedPassword = await hash(password)
			await UserRepository.update(user.id, { password: hashedPassword, isConfirmed: true })
			await UserRepository.setConfirmationToken(user.email, undefined)

			return res.json({ user })
		} catch (err) {
			console.error(err)
			return res.json({ error: { message: 'Something went wrong' } })
		}
	}

	static async forgetPassword(req: Request, res: Response) {
		const { email } = req.body
		if (typeof email !== 'string' || !email.includes('@')) return res.json({ error: { message: 'Invalid email' } })

		try {
			const user = await UserRepository.getOneByEmail(email)
			if (!user) throw null

			const token = v4()

			await UserRepository.setConfirmationToken(email, token)
			sendEmail(
				email,
				'Password change',
				`<a href="${FRONTEND_URL}/#/change-password/${token}">Define a new password.</a>`,
			)
		} catch (err) {
			console.error(err)
		}
		return res.json({ message: 'If your information was right, a token for changing password was sent to your email' })
	}

	static async validateToken(_req: Request, res: Response) {
		return res.json({ message: 'You are logged in' })
	}
}
