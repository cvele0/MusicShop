const express = require('express');
const { sequelize } = require('./models');
const msgs = require('./routes/messages');
const path = require('path');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }

 app.use(cors(corsOptions));

app.use('/admin', msgs);

function getCookies(req) {
    if (req.headers.cookie == null) return {};

    const rawCookies = req.headers.cookie.split('; ');
    const parsedCookies = {};

    rawCookies.forEach( rawCookie => {
        const parsedCookie = rawCookie.split('=');
        parsedCookies[parsedCookie[0]] = parsedCookie[1];
    });

    return parsedCookies;
};

function authToken(req, res, next) {
    const cookies = getCookies(req);
    const token = cookies['token'];
  
    if (token == null) return res.redirect(301, '/login');
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    
        if (err) return res.redirect(301, '/login');
    
        req.user = user;
    
        next();
    });
}


app.get('/register', (req, res) => {
    res.sendFile('register.html', { root: './static' });
});

app.get('/login', (req, res) => {
    res.sendFile('login.html', { root: './static' });
});

app.get('/', authToken, (req, res) => {
    res.sendFile('index.html', { root: './static' });
});



const countryRoutes = require("./routes/country.js");
app.use("/countries", countryRoutes);

const customerRoutes = require("./routes/customer.js");
app.use("/customers", customerRoutes);

const departmentRoutes = require("./routes/department.js");
app.use("/departments", departmentRoutes);

const employeeRoutes = require("./routes/employee.js");
app.use("/employees", employeeRoutes);

const instrumentRoutes = require("./routes/instrument.js");
app.use("/instruments", instrumentRoutes);

const manufacturerRoutes = require("./routes/manufacturer.js");
app.use("/manufacturers", manufacturerRoutes);

const orderRoutes = require("./routes/order.js");
app.use("/orders", orderRoutes);

const productRoutes = require("./routes/product.js");
app.use("/products", productRoutes);

const productOrderRoutes = require("./routes/productOrder.js");
app.use("/productOrders", productOrderRoutes);

const shopRoutes = require("./routes/shop.js");
app.use("/shops", shopRoutes);

app.use(express.static(path.join(__dirname, 'static')));

app.listen({ port: 8000 }, async () => {
    await sequelize.authenticate();
});