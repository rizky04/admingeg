const mongoose = require('mongoose')
let bankSchema = mongoose.Schema({
    name : {
        type : String,
        require: [true, 'Nama Pemilik Harus diisi']
    },
    bankName : {
        type : String,
        require: [true, 'Nama Bank harus di isi']
    },
    noRekening : {
        type : String,
        require: [true, 'Nomor rekening harus di isi']
    },
}, {timestamps: true})
module.exports = mongoose.model('Bank', bankSchema);