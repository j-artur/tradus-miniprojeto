import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import 'reflect-metadata'
import { createConnection, getRepository } from 'typeorm'
import { User } from './models/user'
import router from './routes'
import { SeedUsers } from './seeds/user.seed'

dotenv.config()

const PORT = process.env.PORT || 4000

async function main() {
	await createConnection()

	const app = express()

	try {
		console.log('Seeding Users...')

		await getRepository(User).save(await SeedUsers())

		console.log('Seeded.')
	} catch (err) {
		console.log('Users already seeded.')
	}

	app.use(express.urlencoded({ extended: true }))
	app.use(express.json())
	app.use(cors())

	app.use((req, _res, next) => {
		console.log('req headers:', req.headers)
		console.log('req body:', req.body)

		next()
	})

	app.use(router)

	if (process.env.NODE_ENV === 'production') {
		app.use(express.static(__dirname + '/public/'))

		app.get(/.*/, (_req, res) => {
			res.sendFile(__dirname + '/public/index.html')
		})
	}

	app.listen(PORT, () => {
		console.log(`Server listening on port ${PORT}`)
	})
}

main().catch(err => console.error(err))
