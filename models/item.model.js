const mongoose = require('mongoose');

    const schema = mongoose.Schema({
            ProductName: String,
            Catergory: String,
            Price: String,
            Discount : String,
            Description:String
        },
{
    timestamps: true
});

    module.exports = mongoose.model((''));
