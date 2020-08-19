// Connect mongoDB

const PORT = 27017
const DB_NAME = 'SteHouse'

let mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)

// export a Promise
module.exports = new Promise((resolve, reject) => {
  mongoose.connect(`mongodb://localhost:${PORT}/${DB_NAME}`, { useNewUrlParser: true })

  mongoose.connection.once('open', (err) => {
    if (!err) {
      console.log(`Localhost Port:${PORT} Database:${DB_NAME} connected!`)
      resolve()
    } else {
      reject(err)
    }
  })
})