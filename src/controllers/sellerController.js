'use strict';

const firebase = require('../db');
const Seller = require('../models/seller')
const firestore = firebase.firestore();

const addSeller = async (req,res, next) => {
    try {
        const dtaa = req.body;
        await firestore.collection('sellers').doc().set(data);
        res.send("Seller added successfully")
    } catch (error) {
        
    }
}

module.exports = {
    addSeller
}