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

app.get('/instrumentNames', (req, res) => {
    var instrumentNames = [
        "Gibson SG",
        "El. gitara Peavey",
        "Klavir C40 Yamaha",
        "Klasicna gitara Alhambra",
        "El. gitara Stratokaster"
      ];
      res.json( {instrumentNames: instrumentNames});
});

app.get('/instrumentUrls', (req, res) => {
    var instrumentUrls = [
        "https://www.mitrosmusic.com/media/inlineimage/upload_28451_1.jpg",
        "https://www.scmusic.com.au/content/uploads/2015/11/p-25175-PEAVEY-AT200-BLACK-MAIN.jpg",
        "https://www.player.rs/images/products/big/30559.webp",
        "https://www.alhambraguitarras.com/layout/common/_thumb/2304mahoganydelante_ma-480x640-zc2.jpg",
        "https://makingfunmusic.com/wp-content/uploads/2021/02/Fender-Player-Stratocaster-Electric-Guitar-Maple-Fingerboard-Black-Full-Straight-Front.jpg"
      ]
    res.json( {instrumentUrls: instrumentUrls});
});

app.listen({ port: 9000 }, async () => {
    await sequelize.authenticate();
});