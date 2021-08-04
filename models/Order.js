const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    name:{
        required:true,
        type:String
    },
    phone:{
        required:true,
        type:String
    },
    order:{
        required:true,
        type:String
    },
    quantity:{
        required:true,
        type:String
    },
    address:{
        required:true,
        type:String
    },
    date:{
        type:Date,
        default:Date.now()
    }
});


module.exports = mongoose.model('Order', orderSchema);