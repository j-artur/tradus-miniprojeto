import 'dotenv/config'

console.log('DB url:', process.env.DATABASE_URL)

export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET ?? 'selecao-tradus'
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET ?? 'selecao-tradus'
export const TOKEN_EXPIRE_TIME = process.env.TOKEN_EXPIRE_TIME ?? '30m'

export const EMAIL_SERVICE = process.env.EMAIL_SERVICE ?? undefined
export const EMAIL_HOST = process.env.EMAIL_SERVICE ?? 'ethereal'
export const EMAIL_USER = process.env.EMAIL_USER ?? 'rc2ftu775fayopto@ethereal.email'
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD ?? 'bBfqB6Hc3vmfTVMCA3'

export const FRONTEND_URL = process.env.FRONTEND_URL ?? 'http://localhost:8080'
