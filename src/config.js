import dotenv from 'dotenv'


dotenv.config()

export const TOKEN_SECRET = process.env.TOKEN_SECRET

export const SECRET_KEY_STRIPE = process.env.SECRET_KEY_STRIPE