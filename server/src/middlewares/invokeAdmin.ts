import { NextFunction, Request, Response } from 'express'

export function invokeAdmin(_req: Request, res: Response, next: NextFunction) {
	const token = res.locals.jwt

	if (!token || !token.isAdmin) return res.json({ error: { message: 'Unauthorized' } })

	return next()
}
