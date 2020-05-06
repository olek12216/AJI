const express = require('express');
const router = express.Router();
const ProductsController = require('../controllers/products');

let openCorsPolicy = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");

    if(req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", "GET,PUT,POST");
        return res.status(200).json({});
    }
    next();
};

let onlyStaffCorsPolicy = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:8082");
    res.header("Access-Control-Allow-Headers", "*");

    if(req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", "PUT");
        return res.status(200).json({});
    }
    next();
};


router.get('/', openCorsPolicy, ProductsController.products_get_all);

router.post('/', openCorsPolicy, ProductsController.validate('product_create_product'),  ProductsController.products_create_product);

router.get('/:productId', openCorsPolicy, ProductsController.products_get_product);

router.put('/:productId', onlyStaffCorsPolicy, ProductsController.products_update_product);


module.exports = router;