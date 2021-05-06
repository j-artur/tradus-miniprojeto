import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

export function extractJWT(req: Request, res: Response, next: NextFunction) {
	try {
		const token = req.headers.authorization?.split(' ')[1]

		if (!token) throw null

		const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!)

		res.locals.jwt = payload

		return next()
	} catch (err) {
		res.json({ error: { message: 'You need to be authenticated' } })
	}
}
