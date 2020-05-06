const mongoose = require('mongoose');

const OrderStatusSchema = mongoose.Schema({
    name: String
});

OrderStatusSchema.statics = {
    isValid(id) {
        return this.findById(id)
            .then(result => {
                if (!result) throw new Error('OrderStatus id not found in database')
            })
    },
};

module.exports = mongoose.model('OrderStatuses', OrderStatusSchema);