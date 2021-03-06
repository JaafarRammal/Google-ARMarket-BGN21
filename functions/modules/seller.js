class Seller {
    constructor(sellerID, geoposition, name, owner) {
        this.id = sellerID
        this.location = geoposition;
        this.name = name;
        this.owner = owner;
    }
}


module.exports = Seller;