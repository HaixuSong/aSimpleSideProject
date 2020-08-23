let { Router } = require('express')
// let userModel = require('../user-module')
let router = new Router()
let multiparty = require('multiparty')
let path = require('path')
let sendEmail = require('../send')


router.get('/certificate', (req, res) => {

})

router.post('/login/send-verification', async (req, res) => {
  res.send({ sent: true })
  // let code = await sendEmail(req.body.email)
  // if (code) res.send({ sent: true })
  // else res.send({ sent: false })
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