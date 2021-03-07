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

//FUNCTIONAL
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

//FUNCTIONAL
app.get("/api/products", async (req, res) => {
  try {
    console.log("Fetching data");
    const products = await db.collection("products").get();
    const productsArray = [];
    if (products.empty) {
      res.status(404).send("No record found");
    } else {
      products.forEach((doc) => {
        productsArray.push({ id: doc.id, data: doc.data() });
      });
      res.send(productsArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//FUNCTIONAL
app.post("/api/products", async (req, res) => {
  try {
    // Get the relevant information
    // console.log(req.body);
    const name = req.body["name"];
    const price = req.body["price"];
    const quantity = req.body["quantity"];
    const productTags = req.body["tags"];

    // Check and the parse the files
    if (req.files.length > 0) {
      // Get the image
      const image = req.files[0];
      const model = req.files[1];

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
                product_tags: productTags,
              });

              res.json({
                id: docRef.id,
                name,
                price,
                quantity,
                image_link: imageUrl,
                model_link: modelUrl,
                product_tags: productTags,
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

//FUNCTIONAL
app.post("/api/upload", async (req, res) => {
  try {
    if (req.files.length > 0) {
      const image = req.files[0]; //image should be the first file we send.
      uploadFileToStorage(image).then((imageUrl) => {
        getImageTags(imageUrl)
          .then((tags) => {
            object_tags = tags;
            getProductIDs(object_tags)
              .then((return_ids) => {
                res.status(200).send(return_ids);
              })
              .catch((error) => res.status(400).send(error.message));
          })
          .catch((error) => res.status(500).send(error.message));
      });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//FUNCTIONAL
app.get("/api/search/:query", async (req, res) => {
  try {
    query = req.params.query;
    getProductIDs([query])
      .then((return_ids) => {
        res.status(200).send(return_ids);
      })
      .catch((error) => res.status(400).send(error.message));
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//update a product
app.put("/api/products/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const product = await db.collection("products").doc(id);
    await product.update(data);
    res.send("Product record updated.");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//FUNCTIONAL
app.delete("/api/products/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await db.collection("products").doc(id).delete();
    res.status(400).send("Record deleted.");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//FUNCTIONAL
app.post("/api/imgquery", async (req, res) => {
  try {
    const imgUrl = req.body["url"];
    console.log(imgUrl);
    getImageTags(imgUrl)
      .then((object_tags) => {
        getProductIDs(object_tags)
          .then((product_ids) => {
            res.status(200).send(product_ids);
          })
          .catch((error) => res.status(400).send(error.message));
      })
      .catch((error) => res.status(400).send(error.message));
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Upload a file to storage - FUNCTIONAL
const uploadFileToStorage = (fileInfo) => {
  return new Promise((resolve, reject) => {
    let fileName = `${Date.now()}-${fileInfo.originalname}`;
    let fileUpload = bucket.file(fileName);

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

//FUNCTIONAL
function getProductIDs(object_tags) {
  return new Promise(function (resolve, reject) {
    product_ids = [];
    db.collection("products")
      .get()
      .then((products) => {
        products.forEach((doc) => {
          id = doc.id;
          tags = doc.data().product_tags;
          console.log(tags);
          console.log(object_tags);
          ans = object_tags.some(function (e1) {
            return tags.includes(e1);
          });
          if (ans) {
            product_ids.push(id);
          }
        });

        resolve(product_ids);
      })
      .catch((error) => reject(error));
  });
}
// ----------------------- SELLER ----------------------------

// add a seller
app.post('/api/sellers', (req, res) => {
  (async () => {
      try {
          const latitude = req.body.latitude;
          const longitude = req.body.longitude;
          const owner = req.body["owner"];
          const name = req.body["name"];
          await db.collection('sellers').doc().set({name,location: new admin.firestore.GeoPoint(Number(latitude),Number(longitude)),owner});
          res.send("Added successfully")
      } catch (error) {
          res.status(400).send(error.message);
      }
  })();
});

//fetch all sellers
app.get('/api/sellers', async (req, res , next ) => {
      try {
          const sellers = await db.collection('sellers');
          const data = await sellers.get();
          const sellersArray = [];
          if (data.empty) {
              res.status(404).send("No sellers in the table");

          } else{
              data.forEach(doc => {
                  const seller = new Seller(
                      doc.sellerID,
                      doc.data().location,
                      doc.data().name,
                      doc.data().owner
                  );
                  sellersArray.push(seller);
              });
              res.send(sellersArray)
          }

      } catch (error) {
          res.status(400).send(error.message);
      }
  ;
});

//get by id
app.put('/api/sellers/:id', async (req, res, next) => {
 
      try {
          const id = req.params.id;
          const latitude = req.body.latitude;
          const longitude = req.body.longitude;
      
          const seller =  await db.collection('sellers').doc(id);
          await seller.update({
            location: new admin.firestore.GeoPoint(Number(latitude),Number(longitude)),
            name: req.body.name,
            owner: req.body.owner
          });
          res.send('Seller record updated.'); 
      } catch (error) {
          res.status(400).send(error.message);
      }
  
});

//delete a seller
app.delete('/api/sellers/:id', async (req, res) => {
  
      try {
          const id = req.params.id;
          await db.collection('sellers').doc(id).delete();
          res.send('Record deleted successfuly');
      } catch (error) {
          res.status(400).send(error.message);
      }
  }
);

//get seller by id
app.get('/api/sellers/:id', async (req, res) => {
      try {
          const id = req.params.id;
          const seller = await db.collection('sellers').doc(id);
          const data = await seller.get();
          if (!data.exists) {
              res.status(404).send('No such product has been found');
          } else {
              res.send(data.data());
          }
      } catch (error) {
          res.status(400).send(error.message);
      }
  ;
});
exports.app = functions.https.onRequest(app);
