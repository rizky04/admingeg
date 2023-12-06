const mongoose = require('mongoose')
let bankSchema = mongoose.Schema({
    name : {
        type : String,
        require: [true, 'Nama Pemilik Harus diisi']
    },
    nameBank : {
        type : String,
        require: [true, 'Nama Bank harus di isi']
    },
    noRekening : {
        type : String,
        require: [true, 'Nomor rekening harus di isi']
    },
    
})
module.exports = mongoose.model('Bank', bankSchema);