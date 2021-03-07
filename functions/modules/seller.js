/* eslint-disable require-jsdoc */
class Seller {
  constructor(sellerID, name, owner, geoposition) {
    this.id = sellerID;
    this.location = geoposition;
    this.name = name;
    this.owner = owner;
  }
}

module.exports = Seller;
