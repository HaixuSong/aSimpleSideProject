let { Router } = require('express')
// let userModel = require('../user-module')
let router = new Router()
let multiparty = require('multiparty')
let path = require('path')
let sendEmail = require('../send')
const { request } = require('http')


router.get('/auto-login', (req, res) => {
  console.log('Auto-login sid: ' + req.session.id)
  if (Date.now() - req.session.lastLogin < 30 * 24 * 60 * 60 * 1000) {
    res.send({ autoLogin: true })
  } else {
    res.send({ autoLogin: false })
  }
})

//login-panel send verification code to email
router.post('/login/send-verification', async (req, res) => {
  let code = await sendEmail(req.body.email)
  req.session.vcode = code
  req.session.vcodeCreateTime = Date.now()
  if (code) res.send({ sent: true })
  else res.send({ sent: false })
})

router.post('/login/login', (req, res) => {
  console.log('request to login: sid:' + req.session.id + ' vcode:' + req.session.vcode + ' body:' + req.body.vcode)
  let time = Date.now()
  if (time - req.session.vcodeCreateTime < 60 * 1000 && req.session.vcode === req.body.vcode) {
    req.session.vcode = undefined
    req.session.lastLogin = time
    console.log(req.session.lastLogin);
    res.send({ login: true })
  } else {
    res.send({ login: false })
  }
})

router.post('/my-info/postimage', (req, res) => {
  var form = new multiparty.Form({
    uploadDir: path.resolve(__dirname, '../public/img')
  });
  form.parse(req, (err, fields, files) => {
    console.log(files);
    if (!err) {
      res.send({ uploaded: true })
    } else {
      console.log(err);
      res.send({ uploaded: false })
    }
  })
})


module.exports = router