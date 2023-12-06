const mongoose = require('mongoose')
let voucherSchema = mongoose.Schema({
    name : {
        type : String,
        require: [true, 'Nama Game Harus diisi']
    },
    status : {
        type : String,
        enum: ['Y', 'N'],
        default: 'Y'
    },
    thumbnail : {
        type : String,
    },
    categories: {
        type : mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    nominals: [{
        type : mongoose.Schema.Types.ObjectId,
        ref: "Nominal"
    }],
    
},{timestamps: true})
module.exports = mongoose.model('Voucher', voucherSchema);