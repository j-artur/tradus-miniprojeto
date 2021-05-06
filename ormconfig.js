require('dotenv').config()

module.exports = {
	type: 'postgres',
	url: process.env.DATABASE_URL,
	synchronize: false,
	logging: true,
	entities: ['dist/models/*.js'],
	migrations: ['dist/migrations/*.js'],
	cli: {
		entitiesDir: 'src/entities',
		migrationsDir: 'src/migrations',
	},
	extra: {
		ssl: process.env.NODE_ENV === 'production' ? true : false,
	},
}
