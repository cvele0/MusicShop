const express = require('express');
const { sequelize, Product } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

function authToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) return res.status(401).json((err)=>{ msg: err });
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    
        if (err) return res.status(403).json({ msg: err });
    
        req.user = user;
    
        next();
    });
}

route.use(authToken);

route.get('/products', (req, res) => {
  Product.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

route.post('/products', (req, res) => {
  Product.create({ 
                      year: req.body.year,
                      price: req.body.price
                    })
                    .then( rows => res.json(rows) )
                    .catch( err => res.status(500).json(err) );
});

route.delete('/products', async (req, res) => {
  const product = await Product.findOne({ where: { id: req.body.id } });
  product.destroy();
  res.send(product);
})

route.put('/products', async (req, res) => {
  yearHere = req.body.combobox.split(";")[0];
  priceHere = req.body.combobox.split(";")[1];
  const product = await Product.findOne({ where: { year: yearHere, price: priceHere } });
  product.year = req.body.year;
  product.price = req.body.price;
  await product.save();
  res.send(product);
})

module.exports = route;