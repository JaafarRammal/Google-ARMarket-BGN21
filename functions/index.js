const functions = require("firebase-functions");
const admin = require("firebase-admin");

const express = require("express");
const cors = require("cors");
const fileParser = require("express-multipart-file-parser");

const { service } = require("firebase-functions/lib/providers/analytics");
const Product = require("./modules/product.js");

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  storageBucket: "bgn-university-hack-rem-1010.appspot.com", // Specify the storage bucket name
});

// Get the Google Cloud storage object
const bucket = admin.storage().bucket();
// console.log("Storage: ", storage);

const app = express();
const db = admin.firestore();

app.use(cors({ origin: true }));
app.use(fileParser);

// Works
app.get("/api/test", (req, res) => {
  return res.status(200).send("Hello World!");
});

// Works
// get product by id
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
// get all products
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
// add a product
app.post("/api/products", async (req, res) => {
  try {
    // Get the relevant information
    // console.log(req.body);
    const name = req.body["name"];
    const price = req.body["price"];
    const quantity = req.body["quantity"];

    // Check and the parse the files
    if (req.files.length > 0) {
      console.log(req.files);

      // Get the image
      const image = req.files[0];
      const model = req.files[1];
      console.log(image);
      console.log(model);

      // const id = req.params.id;
      // const product = await db.collection("products").doc(id);
      // const data = await product.get();
      // if (!data.exists) {
      //   res.status(404).send("No such product has been found");
      // } else {
      //   res.send(data.data());
      // }

      // Access the storage bucket
      // const [files] = await storage.bucket().getFiles();
      // console.log("Files: ");
      // files.forEach((file) => {
      //   console.log(file.name);
      // });

      // Upload the image to the storage bucket
      uploadFileToStorage(image)
        .then((imageUrl) => {
          // Upload the model to storage
          uploadFileToStorage(model)
            .then(async (modelUrl) => {
              // TODO: Add the product and return the added product information
              const docRef = db.collection("products").doc();

              await docRef.set({
                name,
                price,
                quantity,
                image_link: imageUrl,
                model_link: modelUrl,
              });

              res.json({
                id: docRef.id,
                name,
                price,
                quantity,
                image_link: imageUrl,
                model_link: modelUrl,
              });
            })
            .catch((error) => {
              res.send(error);
            });
        })
        .catch((error) => {
          res.send(error);
        });
    } else {
      res.status(403).send("No image/model files received.");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// update a product
app.put("/api/products", (req, res) => {
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

// delete a product
app.delete("/api/products", (req, res) => {
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

// Upload a file to storage
const uploadFileToStorage = (fileInfo) => {
  return new Promise((resolve, reject) => {
    const fileName = `${Date.now()}-${fileInfo.originalname}`;
    const fileUpload = bucket.file(fileName);

    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: fileInfo.mimetype,
      },
    });

    blobStream.on("error", (error) => {
      reject(`Unable to upload file (${fileName}) to the storage bucket`);
    });

    blobStream.on("finish", async () => {
      const url = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`;

      // Make the file public
      await bucket.file(fileName).makePublic();
      console.log(`Public Uploaded URL: ${url}`);

      resolve(url);
    });

    blobStream.end(fileInfo.buffer);
  });
};

exports.app = functions.https.onRequest(app);
