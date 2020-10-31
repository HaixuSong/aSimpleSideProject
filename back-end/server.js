const db = require('./db')
// let session = require('express-session');
// const MongoStore = require('connect-mongo')(session);
const businessRouter = require('./router/axiosReq')
const bodyParser = require('body-parser');
const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session);
const app = express()
const PORT = 4000

//Not showing that this service is based on Express
//in respond head
app.disable('x-powered-by')
var cors = require('cors')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.urlencoded({ extended: true }))
//expose public files which are in ./public
app.use('/public', express.static('public'))
app.use(session({
  secret: 'abaaba', //a string used encrypt sid
  saveUninitialized: false, //If true, store the session before initializing
  resave: true, //Store session each time while request
  store: new MongoStore({
    url: 'mongodb://localhost:27017/cookies_container',
    touchAfter: 1 * 24 * 60 * 60 * 1000 //Store each 24 hours
  }),
  cookie: {
    domain: 'stehouse.info', //set cookie to domain istead of url
    secure: false, //If true, this cookie may only dilivered while https
    httpOnly: true, //Won't allow this cookie be manipulated by js scripts
    maxAge: 90 * 24 * 60 * 60 * 1000 // Cookie expires after 180 days(about a semester)
  },
}))


db.then(() => {
  //Here needs a UI router to respond SPA
  app.use(businessRouter)
}).catch((err) => {
  console.log('Failed to connect mongoDB \n', err)
})

app.listen(PORT, (err) => {
  if (!err) console.log('Server is running on PORT: ' + PORT)
  else console.log(err)
})