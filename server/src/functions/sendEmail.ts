import nodemailer from 'nodemailer'
import { EMAIL_HOST, EMAIL_PASSWORD, EMAIL_SERVICE, EMAIL_USER } from '../config/config'

export async function sendEmail(to: string, subject: string, html: string) {
	try {
		// Generate test SMTP service account from ethereal.email
		// Only needed if you don't have a real mail account for testing
		// const testAccount = await nodemailer.createTestAccount()

		// console.log('testAccount:', testAccount)

		// create reusable transporter object using the default SMTP transport
		const transporter = nodemailer.createTransport({
			service: EMAIL_SERVICE,
			host: `smtp.${EMAIL_HOST}.email`,
			port: 587,
			secure: false,
			auth: {
				user: EMAIL_USER,
				pass: EMAIL_PASSWORD,
			},
		})

		const info = await transporter.sendMail({
			from: 'miniprojeto traDUS',
			to,
			subject,
			html,
		})

		console.log('Message sent: %s', info.messageId)
		// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

		// Preview only available when sending through an Ethereal account
		console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
		// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

		return true
	} catch (err) {
		console.error(err)
		return false
	}
}
