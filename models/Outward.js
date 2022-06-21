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
    sales_quantity:requiredNum,
    sales_rate:requiredNum,
    total_sales:requiredNum,

},{
    timestamp:true
})

const OutwardSchema = mongoose.Schema({
        farmers_market: requiredString,
        mobile_num: requiredString,
        farmer_name: requiredString,
        data: [dataSchema],
        total_cummulative_sales:Number,
        wingrow_sc:Number,
        farmers_profit:Number
})

module.exports = mongoose.model('Outward' , OutwardSchema)