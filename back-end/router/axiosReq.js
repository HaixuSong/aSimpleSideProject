let { Router } = require('express')
let userModel = require('../user-module')
let router = new Router()
let multiparty = require('multiparty')
let path = require('path')
let sendEmail = require('../send')

//auto-login
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
  req.session.email = req.body.email
  req.session.vcode = code
  req.session.vcodeCreateTime = Date.now()
  if (code) res.send({ sent: true })
  else res.send({ sent: false })
})

//login-page login button
router.post('/login/login', async (req, res) => {
  console.log('request to login: sid:' + req.session.id + ' vcode:' + req.session.vcode + ' body:' + req.body.vcode)
  let time = Date.now()
  if (time - req.session.vcodeCreateTime < 60 * 1000 && req.session.email === req.body.email && req.session.vcode === req.body.vcode) {
    //login succeed
    try {
      let findResult = await userModel.findOne({ email: req.session.email })
      if (!findResult) {
        console.log('A new customer')
        userModel.create({ email: req.session.email })
      }
    } catch (err) {
      console.log('Sever error')
    }
    req.session.vcode = undefined
    req.session.lastLogin = time
    res.send({ login: true })
  } else {
    res.send({ login: false })
  }
})

//post image from my-info and store in /public/img
router.post('/my-info/postimage', async (req, res) => {
  var form = new multiparty.Form({
    uploadDir: path.resolve(__dirname, '../public/img')
  })
  let email = req.session.email
  let imgName
  //parse the img uploaded
  form.parse(req, async (err, fields, files) => {
    imgName = path.basename(files.img[0].path)
    if (!err) {
      console.log('Upload img succeed: ' + imgName)
    } else {
      console.log('Parsing img error: ' + err)
      res.send({ uploaded: false })
    }
    try {
      let findResult = await userModel.findOne({ email })
      console.log(findResult)
      if (findResult) {
        findResult.pictures.push('/public/img/' + imgName)
        await findResult.save()
        res.send({ uploaded: true })
      } else {
        console.log(`A strange picture wanna upload`)
        res.send({ uploaded: false })
      }
    } catch (err) {
      console.log('Server error: ' + err)
      res.send({ uploaded: false })
    }
  })
})

router.get('/my-info/get-house-status', async (req, res) => {
  let email = req.session.email
  try {
    let findResult = await userModel.findOne({ email })
    res.send(findResult)
  }
  catch (err) {
    //Server error
    console.log('Sever Error: ' + err)
  }

})


module.exports = router