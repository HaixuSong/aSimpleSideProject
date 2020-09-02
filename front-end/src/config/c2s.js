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
  16: "Dishwasher",
  17: "Oven",
  18: "AC",
  19: "Sofa",
  20: "Bathtub",
  21: "Fridge",
  22: "Closet",
  23: "Outdoor Dryer",
  24: "Indoor Dryer"
}

let s2c = {}
for (var k in c2s) {
  s2c[c2s[k]] = k
}

let c2sSorted = [
  { name: "Bed", order: [1, 2] },
  { name: "Desk", order: [3, 4, 5] },
  { name: "Room", order: [6, 7, 8] },
  { name: "Indoor Sharing", order: [16, 17, 18, 19, 20, 21, 22, 15, 24] },
  { name: "Outdoor Sharing", order: [9, 10, 11, 12, 13, 14, 23] }
]
export { c2s, s2c, c2sSorted }