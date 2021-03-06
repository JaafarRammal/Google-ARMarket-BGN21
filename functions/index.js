const functions = require("firebase-functions");

const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const { service } = require("firebase-functions/lib/providers/analytics");
const Product = require('./modules/product.js');

admin.initializeApp({
    credential: admin.credential.applicationDefault()
});

const app = express();
const db = admin.firestore();

app.use(cors({ origin: true }));

app.get('/api/product', (req, res) => {
  return res.status(200).send('Hello World!');
});

//get product by id
app.get('/api/products/:id', (req, res) => {
    (async () => {
        try {
            const id = req.params.id;
            const product = await db.collection('sellers').doc(id);
            const data = await product.get();
            if (!data.exists) {
                res.status(404).send('No such product has been found');
            } else {
                res.send(data.data());
            }
        } catch (error) {
            res.status(400).send(error.message);
        }
    })();
});

//get all products
app.get('/api/products', (req, res) => {
    (async () => {
        try {
            const products = await db.collection('products');
            const data = await products.get();
            const productsArray = [];
            if (data.empty) {
                res.status(404).send('No record found');
            } else {
                data.forEach(doc => {
                    const product = new Product(
                        doc.id,
                        doc.data().colour,
                        doc.data().size,
                        doc.data().object_file,
                        doc.data().price,
                        doc.data().quantity
                    );
                    productsArray.push(product);
                });
                res.send(productsArray);
            }
        } catch (error) {
            res.status(400).send(error.message);
        }
    })
});

//add a product
app.post('api/products', (req, res) => {
    (async () => {
        try {
            const id = req.params.id;
            const product = await db.collection('products').doc(id);
            const data = await product.get();
            if(!data.exists) {
                res.status(404).send('No such product has been found');
            }else {
                res.send(data.data());
            }
        } catch (error) {
            res.status(400).send(error.message);
        }
    });
});

//update a product
app.put('api/products', (req, res) => {
    (async () => {
        try {
            const id = req.params.id;
            const data = req.body;
            const product =  await db.collection('products').doc(id);
            await product.update(data);
            res.send('Product record updated.');        
        } catch (error) {
            res.status(400).send(error.message);
        }
    });
});

//delete a product
app.delete('api/products', (req, res) => {
    (async () => {
        try {
            const id = req.params.id;
            await firestore.collection('products').doc(id).delete();
            res.send('Record deleted successfuly');
        } catch (error) {
            res.status(400).send(error.message);
        }
    })
})





exports.app = functions.https.onRequest(app);