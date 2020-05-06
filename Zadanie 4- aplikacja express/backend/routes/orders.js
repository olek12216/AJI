const express = require('express');
const router = express.Router();
const OrdersController = require('../controllers/orders');

let openCorsPolicy = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");

    if(req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", "GET POST");
        return res.status(200).json({});
    }
    next();
};

let onlyStaffCorsPolicy = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:8082");
    res.header("Access-Control-Allow-Headers", "*");

    if(req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", "GET PUT POST");
        return res.status(200).json({});
    }
    next();
};


router.get('/', openCorsPolicy, OrdersController.orders_get_all);

router.post('/', openCorsPolicy, OrdersController.validate('orders_create_order'), OrdersController.orders_create_order);

router.put('/:orderId', onlyStaffCorsPolicy, OrdersController.validate('orders_update_order'), OrdersController.orders_update_order);

router.get('/:statusId', onlyStaffCorsPolicy, OrdersController.orders_get_orders_with_status);

module.exports = router;