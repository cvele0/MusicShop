const express = require('express');
const { sequelize, Department } = require('../models');
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

route.get('/departments', (req, res) => {
    Department.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

route.post('/departments', (req, res) => {
    Department.create({ 
                      type: req.body.type
                    })
                    .then( rows => res.json(rows) )
                    .catch( err => res.status(500).json(err) );
});

route.delete('/departments', async (req, res) => {
    const department = await Department.findOne({ where: { id: req.body.id } });
    department.destroy();
    res.send(department);
})

route.put('/departments', async (req, res) => {
    const deparment = await Department.findOne({ where: { type: req.body.combobox } });
    deparment.type = req.body.type;
    await deparment.save();
    res.send(deparment);
})

module.exports = route;