const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    approvalDate: {type: Date, default: null},
    orderStatus: {type: mongoose.Schema.Types.ObjectId, ref: 'OrderStatuses', default: '5e0940d67b788c303c423a8d'},
    userName: String,
    email: String,
    phoneNumber: String,
    productList: [{product: {type: mongoose.Schema.Types.ObjectId, ref: 'Products'}, amount: Number}]
});

OrderSchema.statics = {
    isValid(id) {
        return this.findById(id)
            .then(result => {
                if (!result) throw new Error('Order id not found in database')
            })
    },
    getById(id) {
        return this.findById(id);
    }
};


module.exports = mongoose.model('Orders', OrderSchema);