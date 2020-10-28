let { gmapAPIKey } = require('./secret')
let axios = require('axios')
const { model } = require('./user-module')
const { convertLatLng, LatLngBounds, LatLng } = require('spherical-geometry-js')

function getGeocode(text) {
  reqStr = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=' + text + '&location=40.7451,-74.0248&key=' + gmapAPIKey
  return axios.get(reqStr)
}
function getWalkingTime(text) {
  reqStr = 'https://maps.googleapis.com/maps/api/directions/json?key=' + gmapAPIKey + '&origin=' + text + '&destination=Stevens Institute of Technology&mode=walking'
  return axios.get(reqStr)
}
// function typecastRoutes(routes) {
//   routes.forEach((route) => {
//     route.bounds = asBounds(route.bounds);
//     route.overview_polyline = route.overview_polyline.points

//     route.legs.forEach((leg) => {
//       leg.start_location = convertLatLng(leg.start_location);
//       leg.end_location = convertLatLng(leg.end_location);

//       leg.steps.forEach((step) => {
//         step.start_location = convertLatLng(step.start_location);
//         step.end_location = new LatLng(step.end_location.lat, step.end_location.lng);
//       });
//     });
//   });
// }
// function asBounds(boundsObject) {
//   return new LatLngBounds(convertLatLng(boundsObject.southwest),
//     convertLatLng(boundsObject.northeast));
// }
// function getCity(code) {
//   switch (code) {
//     case 1:
//       return 'Jersey City'
//     case 2:
//       return 'Hoboken'
//     case 3:
//       return 'Weehawken'
//     case 4:
//       return 'Union City'
//     default:
//       return 'Hoboken'
//   }
// }

module.exports = { getGeocode, getWalkingTime }