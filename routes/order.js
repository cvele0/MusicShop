const express = require('express');
const { sequelize, Order } = require('../models');
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

route.get('/orders', (req, res) => {
  Order.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

route.post('/orders', (req, res) => {
  Order.create({ 
                      address: req.body.address
                    })
                    .then( rows => res.json(rows) )
                    .catch( err => res.status(500).json(err) );
});

route.delete('/orders', async (req, res) => {
  const order = await Order.findOne({ where: { id: req.body.id } });
  order.destroy();
  res.send(order);
})

route.put('/orders', async (req, res) => {
  const order = await Order.findOne({ where: { address: req.body.combobox } });
  order.address = req.body.address;
  await order.save();
  res.send(order);
})

module.exports = route;