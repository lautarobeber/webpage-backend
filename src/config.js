import dotenv from 'dotenv'


dotenv.config()

export const TOKEN_SECRET = 'secret key'

export const SECRET_KEY_STRIPE = process.env.SECRET_KEY_STRIPE