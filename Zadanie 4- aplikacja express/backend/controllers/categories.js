const Category = require('../models/Category');

exports.categories_get_all = (req, res) => {
    Category.find()
        .then(result => {
            console.log(result);
            res.status(200).json({
                categories: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err})
        });
};
