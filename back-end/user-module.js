let mongoose = require('mongoose')
let Schema = mongoose.Schema;

let userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  cellphone: Number,
  wechat: String, //a url address
  facebook: String, // a url address

  active: {
    type: Boolean,
    require: true,
    default: false
  },
  pictures: [String], //url of all pictures
  sexPrefer: {
    type: Number,
    default: 0
  }, //1:MOnly, 2:FOnly, 0:default
  bedrooms: Number, //0-5
  bathrooms: Number, //0-5
  city: Number, //0:Jersey City, 1:Hoboken, 2:Weehawken, 3:Union City
  address: String,
  houseType: Number, //0:apartment, 1:house
  roomType: Number, //0:main, 1:second 2: living
  price: Number, //Each month
  fromdate: {
    type: Date,
    default: Date.now()
  },
  todate: Date,
  payby: Number, //0:year, 1:month, 2: day
  water: Boolean,
  electric: Boolean,
  gas: Boolean,
  internet: Boolean,
  offering: [Number],
  roomateDescribe: String,
  roomDescribe: String,
  otherStatement: String
})

module.exports = mongoose.model('users', userSchema)