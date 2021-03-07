/* eslint-disable require-jsdoc */
class Product {
  //   constructor(id, colour, size, objectFile, price, quantity) {
  constructor(id, name, price, quantity, imageLink, modelLink, productTags, description) {
    this.id = id;
    // this.colour = colour;
    // this.size = size;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.imageLink = imageLink;
    this.modelLink = modelLink;
    this.description = description;
    this.productTags = productTags;
  }
}

module.exports = Product;
