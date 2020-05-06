const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv/config');


//Import Routes
const productsRoute = require('./routes/products');
const ordersRoute = require('./routes/orders');
const categoriesRoute = require('./routes/categories');
const orderStatusesRoute = require('./routes/orderStatuses');


// Connected to DB
mongoose.connect(process.env.DB_CONNECTION,
    { useUnifiedTopology: true ,
        useNewUrlParser: true },
    () => {
        console.log('connected to DB!')
    });
mongoose.Promise = global.Promise;


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.options('*', cors()); // include before other routes


//Use Routes
app.use('/products', productsRoute);
app.use('/orders', ordersRoute);
app.use('/categories', categoriesRoute);
app.use('/status', orderStatusesRoute);


app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});




module.exports = app;

