// Send verification code to target email
const nodemailer = require("nodemailer")
const { businessEmail, pswd } = require('./secret.js')
const rngPromise = require('./rng')

module.exports = async function (target) {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    service: 'Gmail',
    secure: true,
    auth: {
      user: businessEmail,
      pass: pswd
    }
  })
  let code = await rngPromise()
  let sendHtml = `
  <h1>Certification Code: ${code}</h1>
  <strong>Note: </strong> If this is not your own operation, be careful not telling anyone this number.
  `

  let mailOptions = {
    from: businessEmail,
    to: target,
    subject: 'Your Certification Code of SteHouse',
    html: sendHtml
  }
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) return console.log(error)
    console.log('Message sent: ' + info.response)
  }
  )
  return code
}