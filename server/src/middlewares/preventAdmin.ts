import { NextFunction, Request, Response } from 'express'
import { UserRepository } from '../repositories/user'

let id = 0

async function getAdminId() {
	if (id === 0) {
		const user = await UserRepository.getOneByEmail('admin@admin.com')
		id = user?.id ? user.id : 0
	}

	return id
}

export async function preventAlterAdmin(req: Request, res: Response, next: NextFunction) {
	const adminId = await getAdminId()

	if (parseInt(req.params.id!) === adminId) return res.json({ error: { message: 'Cannot alter admin' } })

	return next()
}
