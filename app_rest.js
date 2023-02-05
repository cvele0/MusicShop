const express = require('express');
const { sequelize, Users } = require('./models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const cors = require('cors');
require('dotenv').config();

const app = express();

const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}

app.use(cors(corsOptions));

const countries = require('./routes/country');
const customers = require('./routes/customer');
const departments = require('./routes/department');
const employees = require('./routes/employee');
const instruments = require('./routes/instrument');
const manufacturers = require('./routes/manufacturer');
const orders = require('./routes/order');
const products = require('./routes/product');
const productOrders = require('./routes/productOrder');
const shops = require('./routes/shop');
const availableInstruments = require('./routes/availableInstrument');

app.use('/admin', countries);
app.use('/admin', customers);
app.use('/admin', departments);
app.use('/admin', employees);
app.use('/admin', instruments);
app.use('/admin', manufacturers);
app.use('/admin', orders);
app.use('/admin', products);
app.use('/admin', productOrders);
app.use('/admin', shops);
app.use('/admin', availableInstruments);

app.listen({ port: 9090 }, async () => {
  await sequelize.authenticate();
});