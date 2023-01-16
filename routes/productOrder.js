const express = require('express');
const { sequelize, ProductOrder } = require('../models');
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

route.get('/productOrders', (req, res) => {
  ProductOrder.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

route.post('/productOrders', (req, res) => {
  ProductOrder.create({ 
                      price: req.body.price
                    })
                    .then( rows => res.json(rows) )
                    .catch( err => res.status(500).json(err) );
});

route.delete('/productOrders', async (req, res) => {
  const productOrder = await ProductOrder.findOne({ where: { id: req.body.id } });
  productOrder.destroy();
  res.send(productOrder);
})

route.put('/productOrders', async (req, res) => {
  const productOrder = await ProductOrder.findOne({ where: { price: req.body.combobox } });
  productOrder.price = req.body.price;
  await productOrder.save();
  res.send(productOrder);
})

module.exports = route;