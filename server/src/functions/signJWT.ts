import { sign } from 'jsonwebtoken'
import { ACCESS_TOKEN_SECRET, TOKEN_EXPIRE_TIME } from '../config/config'
import { IUser } from '../models/user'

export function signJWT({ name, email, isAdmin }: IUser) {
	const signedToken = sign({ name, email, isAdmin }, ACCESS_TOKEN_SECRET, {
		expiresIn: TOKEN_EXPIRE_TIME,
	})

	return signedToken
}
