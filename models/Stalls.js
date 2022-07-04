const mongoose = require('mongoose');
mongoose.set('debug', true);

const requiredString = {
    type:String,
    required:true
}

const StallsSchema = mongoose.Schema({
        location:requiredString,
        stalls:{
            type:Array,
            required:true
        },
        availablestalls:{
            type:Array,
            required:true
        }
})

module.exports = mongoose.model('Stalls' , StallsSchema)