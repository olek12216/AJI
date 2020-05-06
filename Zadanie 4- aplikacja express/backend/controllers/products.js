const Product = require('../models/Product');
const Category = require('../models/Category');
const {body, param, validationResult} = require('express-validator');


exports.validate = (method) => {
    switch (method) {
        case 'product_create_product': {
            return [
                body('name', 'Field \'name\' is needed').exists().notEmpty({ignore_whitespace: true}),
                body('description', 'Field \'description\' is needed').exists().notEmpty({ignore_whitespace: true}),
                body('unitPrice', 'Field \'unitPrice\' must exist and be a number greater than 0').exists().isNumeric().custom(value => value > 0),
                body('unitWeight', 'Field \'unitWeight\' must exist and be a number greater than 0').exists().isNumeric().custom(value => value > 0),
                body('productCategory', 'Category with given Id must exist in database').exists().isMongoId().custom(value => Category.isValid(value))
            ]
        }
        case 'product_update_product': {
            return [
                param('productId', 'Product with given id doesnt exist').exists().isMongoId().custom(value => Product.isValid(value)),
                body('name', 'Field \'name\' cannot be empty').optional().notEmpty({ignore_whitespace: true}),
                body('description', 'Field \'description\' cannot be empty').optional().notEmpty({ignore_whitespace: true}),
                body('unitPrice', 'Field \'unitPrice\' must be a number greater than 0').optional().isNumeric().custom(value => value > 0),
                body('unitWeight', 'Field \'unitWeight\' must be a number greater than 0').optional().isNumeric().custom(value => value > 0),
                body('productCategory', 'Given productCategory not exist').optional().isMongoId().custom(value => Category.isValid(value))
            ]
        }
    }
};

exports.products_get_all = (req, res) => {
    Product.find()
        .then(result => {
            console.log(result);
            res.status(200).json({products: result})
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err})
        });
};

exports.products_create_product = (req, res) => {

    try {
        const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

        if (!errors.isEmpty()) {
            res.status(422).json({errors: errors.array()});
            return;
        }

        const product = new Product({
            name: req.body.name,
            description: req.body.description,
            unitPrice: req.body.unitPrice,
            unitWeight: req.body.unitWeight,
            productCategory: req.body.productCategory
        });
        product.save()
            .then(result => {
                console.log(result);
                res.status(201).json({
                    message: "Product created successfully",
                    createdProduct: result
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({error: err})
            });

    } catch (err) {
        console.log(err);
    }
};

exports.products_get_product = (req, res) => {
    const id = req.params.productId;
    Product.findById(id)
        .then(result => {
            console.log(result);
            res.status(200).json({product: result})
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err})
        });
};


exports.products_update_product = (req, res) => {

    try {
        const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

        if (!errors.isEmpty()) {
            res.status(422).json({err: errors.array()});
            return;
        }

        const id = req.params.productId;

        Product.updateOne({_id: id}, req.body)
            .then(result => {
                console.log(result);
                res.status(200).json({
                    message: "Product updated",
                    product: result});
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({error: err});
            })
    } catch (err) {
        console.log(err);
    }
};