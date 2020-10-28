const c2s = {
  1: "Bed",
  2: "Mattress",
  3: "Desk",
  4: "Chair",
  5: "Desk Lamp",
  6: "Bookshelf",
  7: "Locker",
  8: "Wardrobe",
  9: "Gym",
  10: "Activity Room",
  11: "Swimming Pool",
  12: "Doorman",
  13: "Package Concierge",
  14: "Outdoor Washing Machine",
  15: "Indoor Washing Machine",
  14: "Outdoor Dryer",
  15: "Indoor Dryer",
  16: "Dishwasher",
  17: "Oven",
  18: "AC",
  19: "Sofa",
  20: "Bathtub",
  21: "Fridge",
  22: "Closet"
}

let s2c = {}
for (var k in c2s) {
  s2c[c2s[k]] = k
}

cityC2S = {
  1: "Jersey City",
  2: "Hoboken",
  3: "Weehawken",
  4: "Union City"
}
module.exports = { c2s, s2c, cityC2S }