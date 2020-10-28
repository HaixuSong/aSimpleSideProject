let mongoose = require('mongoose')
let Schema = mongoose.Schema;

let userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  cellphone: String,
  wechat: String, //a url address
  facebook: String, // a url address

  active: {
    type: Boolean,
    require: true,
    default: false
  },
  activeDate: Number,
  pictures: [String], //url of all pictures
  sexPrefer: {
    type: Number,
    default: 1
  }, //1:MOnly, 2:FOnly, 0:default
  bedrooms: Number, //1-4
  bathrooms: Number, //1-4
  city: Number, //1:Jersey City, 2:Hoboken, 3:Weehawken, 4:Union City
  address: String,
  geocode: {
    type: Map,
    of: Number,
    require: true
  },
  time2Stevens: {
    type: Number,
    require: true
  },
  directionResult: Schema.Types.Mixed,
  houseType: Number, //0:apartment, 1:house
  roomType: Number, //1:Private Bathroom, 2:Public Bathroom 3: livingroom
  price: Number, //Each month
  including: [Number], //1:water, 2:electric, 3: gas, 4: internet
  fromdate: String,
  todate: String,
  payby: Number, //1:year, 2:month, 3: day
  // water: Boolean,
  // electric: Boolean,
  // gas: Boolean,
  // internet: Boolean,

  offering: [Number],
  roomateDescribe: String,
  roomDescribe: String,
  otherStatement: String
})

module.exports = mongoose.model('users', userSchema)