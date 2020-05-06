const Order = require('../models/Order');
const OrderStatus = require('../models/OrderStatus');
const Product = require('../models/Product');
const {body, param, validationResult} = require('express-validator');

//TODO: change second orderStatus in orders_update_order into something slightly more acceptable


exports.validate = (method) => {
    switch (method) {
        case 'orders_create_order': {
            return [
                // body('approvalDate', 'sm msg').optional().notEmpty({ignore_whitespace: true}),
                // body('orderStatus', 'description needed').exists().notEmpty({ignore_whitespace: true}),
                body('userName', 'Field \'userName\' is needed').exists().notEmpty({ignore_whitespace: true}),
                body('email', 'Field \'email\' must have an email format').exists().isEmail(),
                body('phoneNumber', 'Field \'phoneNumber\' must be a 9-digit number').exists().isNumeric().isLength({min: 9, max: 9}),
                body('productList.*.product', 'Field \'product\' in \'productList\' must be in database').exists().custom(value => Product.isValid(value)),
                body('productList.*.amount', 'Field \'amount\' in \'productList\' must be a number greater than 0').exists().exists().isNumeric().custom(value => value > 0)
            ]
        }
        case 'orders_update_order': {
            return [
                param('orderId', 'Order with given id doesnt exist').exists().isMongoId().custom(value => Order.isValid(value)),
                body('approvalDate', 'Field \'approvalDate\' must be a date in format YYYY-MM-DD').optional().isISO8601(),
                body('orderStatus', 'Given order status doesnt exist').optional().isMongoId().custom(value => OrderStatus.isValid(value)),
                body('orderStatus', 'Order status problems').optional().isMongoId().bail().custom(async (value, {req})=> {

                    let actual = "";
                    await Order.getById(req.params.orderId)
                        .then(result =>{
                            actual = result;
                        })
                        .catch(err => console.log(err));

                    if(actual['orderStatus'] == '5e0940ef7b788c303c423a8f' && req.body.orderStatus != '5e0940ef7b788c303c423a8f')
                        return Promise.reject('Cannot change status of cancelled order');
                    else if(req.body.orderStatus < actual['orderStatus'])
                        return Promise.reject('Cannot change order status backwards');
                }),
                body('userName', 'Field \'userName\' cannot be empty').optional().notEmpty({ignore_whitespace: true}),
                body('email', 'Field \'email\' must have email format').optional().isEmail(),
                body('phoneNumber', 'Field \'phoneNumber\' must be a 9-digit number').optional().isNumeric().isLength({min: 9, max: 9}),
                body('productList.*.product', 'Field \'product\' in \'productList\' must be in database').exists().custom(value => Product.isValid(value)),
                body('productList.*.amount', 'Field \'amount\' in \'productList\' must be a number greater than 0').exists().exists().isNumeric().custom(value => value > 0)
            ]
        }
    }
};


exports.orders_get_all = (req, res) => {
    Order.find()
        .then(result => {
            console.log(result);
            res.status(200).json({
                orders: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: err})
        });
};


exports.orders_create_order = (req, res) => {
    try {
        const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

        if (!errors.isEmpty()) {
            res.status(422).json({errors: errors.array()});
            return;
        }

        let unapprovedId = '5e0940d67b788c303c423a8d';

        const order = new Order({
            approvalDate: null,
            orderStatus: unapprovedId,
            userName: req.body.userName,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            productList: req.body.productList
        });
        order.save()
            .then(result => {
                console.log(result);
                res.status(201).json({
                    message: "Order created successfully",
                    order: result
                });
            })
            .catch(err => {
                console.log(result);
                res.json({error: err})
            });

    } catch (err) {
        console.log(err);
    }
};


exports.orders_update_order = (req, res) => {
    try {
        const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

        if (!errors.isEmpty()) {
            res.status(422).json({errors: errors.array()});
            return;
        }

        const id = req.params.orderId;

        Order.updateOne({_id: id}, req.body)
            .then(result => {
                console.log(result);
                res.status(200).json({
                    message: "Order updated",
                    order: result
                });
            })
            .catch(err => {
                console.log(err);
                res.json({error: err});
            })

    } catch (err) {
        console.log(err);
    }
};


exports.orders_get_orders_with_status = (req, res) => {

    const status = req.params.statusId;
    Order.find({orderStatus: status})
        .then(result => {
            console.log(result);
            res.status(200).json({
                orders: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err})
        });
};
