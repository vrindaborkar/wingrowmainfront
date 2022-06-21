const mongoose = require('mongoose');
mongoose.set('debug', true);

const requiredString = {
    type:String,
    required:true
}

const dataSchema = mongoose.Schema({
    commodity:requiredString,
    quantity:requiredString

},{
    timestamp:true
})

const VendorsSchema = mongoose.Schema({
        vendorsName:requiredString,
        vendorsMarket:requiredString,
        data: [dataSchema]
})

module.exports = mongoose.model('Vendors' , VendorsSchema)