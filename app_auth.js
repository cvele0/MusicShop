const express = require('express');
const { sequelize, Users } = require('./models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const cors = require('cors');
require('dotenv').config();

const app = express();

/*var corsOptions = {
    origin: 'http://127.0.0.1:8000',
    optionsSuccessStatus: 200
}*/

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }

app.use(express.json());
app.use(cors(corsOptions));

const shema = Joi.object().keys({
    name: Joi.string().trim().min(5).max(12).required(),
    email: Joi.string().trim().email().required(),
    password: Joi.string().min(4).required(),
    role: Joi.string()
});


app.post('/register', (req, res) => {

    const obj = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
        password: bcrypt.hashSync(req.body.password, 10)
    };

    const {error, succ} = shema.validate(obj);

    if (error) {
        console.log(error);
        res.send(error);
        return;
    } 

    Users.create(obj).then( rows => {
        
        const usr = {
            userId: rows.id,
            user: rows.name,
            role: rows.role
        };

        const token = jwt.sign(usr, process.env.ACCESS_TOKEN_SECRET);

        console.log(token);
        
        res.json({ token: token });

    }).catch( err => {
        res.status(500).json(err);
        console.log("error: " + err);
    } );
});

app.post('/login', (req, res) => {

    Users.findOne({ where: { name: req.body.name } })
        .then( usr => {

            if (bcrypt.compareSync(req.body.password, usr.password)) {
                const obj = {
                    userId: usr.id,
                    user: usr.name,
                    role: usr.role
                };
        
                const token = jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET);
                
                console.log(token);

                res.json({ token: token });
            } else {
                console.log("nije usao");
                res.status(400).json({ msg: "Invalid credentials"});
            }
        })
        .catch( err => res.status(500).json(err) );
});

app.listen({ port: 9000 }, async () => {
    await sequelize.authenticate();
});