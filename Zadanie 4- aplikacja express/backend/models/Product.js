const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    name: String,
    description: String,
    unitPrice: Number,
    unitWeight: Number,
    productCategory: {type: mongoose.Schema.Types.ObjectId, ref: 'Categories'}
});

ProductSchema.statics = {
    isValid(id) {
        return this.findById(id)
            .then(result => {
                if (!result) throw new Error('Product id not found in database')
            })
    },
};


module.exports = mongoose.model('Products', ProductSchema);