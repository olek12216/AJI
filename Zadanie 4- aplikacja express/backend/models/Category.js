const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    name: String
});

CategorySchema.statics = {
    isValid(id) {
        return this.findById(id)
            .then(result => {
                if (!result) throw new Error('Category id not found in database')
            })
    },
};

module.exports = mongoose.model('Categories', CategorySchema);