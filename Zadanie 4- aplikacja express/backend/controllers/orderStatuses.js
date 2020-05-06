const OrderStatus = require('../models/OrderStatus');

exports.orderStatuses_get_all = (req, res) => {
    OrderStatus.find()
        .then(result => {
            console.log(result);
            res.status(200).json({
                orderStatuses: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err})
        });
};
