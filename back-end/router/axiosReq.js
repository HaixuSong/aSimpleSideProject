let { Router } = require('express')
let userModel = require('../user-module')
let router = new Router()
let multiparty = require('multiparty')
let path = require('path')
let sendEmail = require('../send')
let { getGeocode, getWalkingTime } = require('../gmap.js')
let { cityC2S } = require('../code2string')

Array.prototype.indexOf = function (val) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == val) return i
  }
  return -1
}
Array.prototype.remove = function (val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1)
  }
}

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

//Get house status used for my-info page
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

//Delete house img from my-info page
router.post('/my-info/deleteimage', async (req, res) => {
  let email = req.session.email
  if (!email) {
    console.log("Strange request with no cookies");
    return
  }
  //Build a function for removing element from array
  try {
    let findResult = await userModel.findOne({ email })
    if (findResult) {
      findResult.pictures.remove(req.body.picURL)
      if (!(findResult["pictures"].length && findResult["address"] && findResult["city"] && findResult["price"])) {
        findResult["active"] = false
      }
      await findResult.save()
      res.send({ deleted: true })
    } else {
      console.log(`A strange email wanna delete`)
      res.send({ deleted: false })
    }
  } catch (err) {
    console.log('Server error: ' + err)
    res.send({ deleted: false })
  }
})

//posting wechat QR Code
router.post('/my-info/postWechat', async (req, res) => {
  var form = new multiparty.Form({
    uploadDir: path.resolve(__dirname, '../public/img')
  })
  let email = req.session.email
  let imgName
  //parse the img uploaded
  form.parse(req, async (err, fields, files) => {
    imgName = path.basename(files.img[0].path)
    if (!err) {
      console.log('Upload WeChat succeed: ' + imgName)
    } else {
      console.log('Parsing img error: ' + err)
      res.send({ uploaded: false })
    }
    try {
      let findResult = await userModel.findOne({ email })
      if (findResult) {
        findResult.wechat = '/public/img/' + imgName
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

//Delete wechat QR Code
router.post('/my-info/deleteWechat', async (req, res) => {
  let email = req.session.email
  if (!email) {
    console.log("Strange request with no cookies");
    return
  }
  try {
    let findResult = await userModel.findOne({ email })
    if (findResult) {
      findResult.wechat = undefined
      console.log('Deleted WeChat');
      await findResult.save()
      res.send({ deleted: true })
    } else {
      console.log(`A strange wechat wanna delete`)
      res.send({ deleted: false })
    }
  } catch (err) {
    console.log('Server error: ' + err)
    res.send({ deleted: false })
  }
})

//input onBlur update
router.post('/my-info/input-text', async (req, res) => {
  let email = req.session.email
  if (!email) {
    console.log("Strange request with no cookies");
    return
  }
  try {
    let findResult = await userModel.findOne({ email })
    if (findResult) {
      findResult[req.body.name] = req.body.value
      console.log(`Updated ${req.body.name}`)
      if (!(findResult["pictures"].length && findResult["address"] && findResult["city"] && findResult["price"])) {
        findResult["active"] = false
      }
      if ((req.body.name === "address" || req.body.name === "city") && (findResult.address && findResult.city)) {
        getGeocode(findResult.address + ', ' + cityC2S[findResult.city])
          .then(async value => {
            if (value.data.status === "OK") {
              findResult.set('geocode.lat', value.data.results[0].geometry.location.lat)
              findResult.set('geocode.lng', value.data.results[0].geometry.location.lng)
              console.log('Updated geocode');
              await findResult.save()
              getWalkingTime(findResult.address + ', ' + cityC2S[findResult.city])
                .then(async value => {
                  if (value.data.status === "OK") {
                    findResult.set('time2Stevens', value.data.routes[0].legs[0].duration.value / 60)
                    findResult.set('directionResult', value.data)
                    console.log('Updated time2Stevens and directionResult');
                    await findResult.save()
                    res.send({ updated: true })
                  } else {
                    //gmap responded but no good result
                    //may caused by a lot of reasons
                    //so just log the status code
                    console.log('gmap not ok respond: ' + value.data.status)
                    res.send({ updated: true })
                  }
                })
                .catch(err => {
                  console.log('Axios catch error: ' + err)
                  res.send({ updated: true })
                })
            } else {
              //gmap responded but no good result
              //may caused by a lot of reasons
              //so just log the status code
              console.log('gmap not ok respond: ' + value.data.status)
              res.send({ updated: true })
            }
          })
          .catch(err => {
            console.log('Axios catch error: ' + err)
            res.send({ updated: true })
          })
      } else { res.send({ updated: true }) }
      if (findResult['active'] === true) {
        findResult['activeDate'] = Date.now()
      }
      await findResult.save()
    } else {
      console.log(`A strange input:text request`)
      res.send({ updated: false })
    }
  } catch (err) {
    console.log('DB error: ' + err)
    res.send({ updated: false })
  }
})

//checkbox onChange update
router.post('/my-info/checkbox-change', async (req, res) => {
  let email = req.session.email
  if (!email) {
    console.log("Strange request with no cookies");
    return
  }
  try {
    let findResult = await userModel.findOne({ email })
    if (findResult) {
      findResult[req.body.name].remove(req.body.value)
      if (req.body.checked) {
        findResult[req.body.name].push(req.body.value)
      }
      console.log(`Updated ${req.body.name}`)
      await findResult.save()
      res.send({ updated: true })
    } else {
      console.log(`A strange input:text request`)
      res.send({ updated: false })
    }
  } catch (err) {
    console.log('Server error: ' + err)
    res.send({ updated: false })
  }
})

//get all data from database
router.get('/map/getAll', async (req, res) => {
  let email = req.session.email
  if (!email) {
    console.log("Strange request with no cookies");
    return
  }
  console.log('Get all data to id: ' + email)
  try {
    let findResult = await userModel.find({ active: true })
    res.send(findResult)
  }
  catch (err) {
    //Server error
    console.log('Sever Error: ' + err)
  }
})

//get one data from database
router.get('/map/getDetail', async (req, res) => {
  let email = req.session.email
  if (!email) {
    console.log("Strange request with no cookies");
    return
  }
  console.log('Get detail of ' + req.query.email + 'to id: ' + email)
  try {
    let findResult = await userModel.find({ email: req.query.email })
    res.send(findResult)
  }
  catch (err) {
    //Server error
    console.log('Sever Error: ' + err)
  }
})

//logout of the account
router.get('/map/logout', (req, res) => {
  console.log('request to logout: sid:' + req.session.id)
  req.session.destroy()
  res.send({ logout: true })
})

router.get('/myinfo/logout', (req, res) => {
  console.log('request to logout: sid:' + req.session.id)
  req.session.destroy()
  res.send({ logout: true })
})

router.get('/logout', (req, res) => {
  console.log('request to logout: sid:' + req.session.id)
  req.session.destroy()
  res.send({ logout: true })
})

module.exports = router