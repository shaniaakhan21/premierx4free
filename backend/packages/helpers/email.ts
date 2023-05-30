import * as nodemailer from 'nodemailer'

export async function sendEmail(to: string, subject: string, text: string) {
  let transporter: nodemailer.Transporter
  if (
    !process.env.EMAIL_HOST ||
    !process.env.EMAIL_PORT ||
    !process.env.EMAIL_USERNAME ||
    !process.env.EMAIL_PASSWORD ||
    !process.env.EMAIL_FROM
  ) {
    // Test mode
    transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'sabrina44@ethereal.email',
        pass: '3Ub7Hr3v2hmqRFSRrB'
      }
    })
  } else {
    // Production mode
    transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT ?? '', 10),
      secure: false,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    })
  }

  return transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    text
  })
}
