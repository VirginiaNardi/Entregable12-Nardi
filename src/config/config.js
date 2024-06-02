import dotenv from 'dotenv'

dotenv.config()

export default {
    port: process.env.PORT,
    mongoURL: process.env.MONGO_URL,
    mongoDBName: process.env.MONGO_DB_NAME,
    adminEmail: process.env.ADMIN_EMAIL,
    adminPassword: process.env.ADMIN_PASSWORD,
    githubClientId: process.env.GITHUB_STRATEGY_CLIENT_ID,
    githubClientSecret: process.env.GITHUB_STRATEGY_CLIENT_SECRET,
    mailDelEcommerce: process.env.NODEMAILER_USER,
    mailPasswordDelEcommerce: process.env.NODEMAILER_PASSWORD
}