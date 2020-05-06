const express = require('express');
const router = express.Router();
const CategoriesController = require('../controllers/categories');

let openCorsPolicy = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");

    if(req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", "GET");
        return res.status(200).json({});
    }
    next();
};


router.get('/', openCorsPolicy, CategoriesController.categories_get_all);

module.exports = router;