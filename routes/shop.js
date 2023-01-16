const express = require('express');
const { sequelize, Shop } = require('../models');
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

route.get('/shops', (req, res) => {
  Shop.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

route.post('/shops', (req, res) => {
  Shop.create({ 
                      name: req.body.name,
                      location: req.body.location
                    })
                    .then( rows => res.json(rows) )
                    .catch( err => res.status(500).json(err) );
});

route.delete('/shops', async (req, res) => {
  const shop = await Shop.findOne({ where: { id: req.body.id } });
  shop.destroy();
  res.send(shop);
})

route.put('/shops', async (req, res) => {
  nameHere = req.body.combobox.split(";")[0];
  locationHere = req.body.combobox.split(";")[1];
  const shop = await Shop.findOne({ where: { name: nameHere, location: locationHere } });
  shop.name = req.body.name;
  shop.location = req.body.location;
  await shop.save();
  res.send(shop);
})

module.exports = route;