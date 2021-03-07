const functions = require("firebase-functions");

const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const { service } = require("firebase-functions/lib/providers/analytics");
// const Product = require("./modules/product.js");

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

const app = express();
const db = admin.firestore();

app.use(cors({ origin: true }));

// Works
app.get("/api/test", (req, res) => {
  return res.status(200).send("Hello World!");
});

// Works
//get product by id
app.get("/api/products/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const product = await db.collection("products").doc(id);
    const data = await product.get();
    if (!data.exists) {
      res.status(404).send("No such product has been found");
    } else {
      res.send(data.data());
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Works
//get all products
app.get("/api/products", async (req, res) => {
  try {
    console.log("Fetching data");
    const products = await db.collection("products").get();
    // const data = await products.get();
    // console.log(data);
    const productsArray = [];
    if (products.empty) {
      res.status(404).send("No record found");
    } else {
      products.forEach((doc) => {
        // const product = new Product(
        //   doc.id,
        //   doc.data().colour,
        //   doc.data().size,
        //   doc.data().object_file,
        //   doc.data().price,
        //   doc.data().quantity
        // );
        productsArray.push({ id: doc.id, data: doc.data() });
      });
      res.send(productsArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// TODO: Add a product
//       Use google cloud storage to store the buffer received into a file
//       and get the picture link to the file
//add a product
app.post("api/products", (req, res) => {
  async () => {
    try {
      const id = req.params.id;
      const product = await db.collection("products").doc(id);
      const data = await product.get();
      if (!data.exists) {
        res.status(404).send("No such product has been found");
      } else {
        res.send(data.data());
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  };
});

//update a product
app.put("api/products", (req, res) => {
  async () => {
    try {
      const id = req.params.id;
      const data = req.body;
      const product = await db.collection("products").doc(id);
      await product.update(data);
      res.send("Product record updated.");
    } catch (error) {
      res.status(400).send(error.message);
    }
  };
});

//delete a product
app.delete("api/products", (req, res) => {
  async () => {
    try {
      const id = req.params.id;
      await db.collection("products").doc(id).delete();
      res.send("Record deleted successfuly");
    } catch (error) {
      res.status(400).send(error.message);
    }
  };
});

exports.app = functions.https.onRequest(app);
