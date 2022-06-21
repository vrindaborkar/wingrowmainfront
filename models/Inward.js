const mongoose = require('mongoose');
mongoose.set('debug', true);

const requiredString = {
    type:String,
    required:true
}
const requiredNum = {
    type:Number,
    required:true
}

const dataSchema = mongoose.Schema({
    commodity:requiredString,
    purchase_quantity:requiredNum,
    purchase_rate:requiredNum,
    total_purchase:requiredNum

},{
    timestamp:true
})

const InwardSchema = mongoose.Schema({
        farmers_market: requiredString,
        mobile_num: requiredString,
        farmer_name: requiredString,
        data: [dataSchema],
        total_cummulative_purchase:Number
})

module.exports = mongoose.model('Inward' , InwardSchema)
