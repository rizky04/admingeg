const mongoose = require('mongoose')
let userSchema = mongoose.Schema({
    email : {
        type : String,
        require: [true, 'Email Harus diisi']
    },
    name : {
        type : String,
        require: [true, 'Nama Harus diisi']
    },
    password : {
        type : String,
        require: [true, 'Kata Sandi Harus diisi']
    },
    role : {
        type : String,
        enum: ['admin', 'user'],
        default: 'admin'
    },
    status : {
        type : String,
        enum: ['Y', 'N'],
        default: 'Y'
    },
    phoneNumber: {
        type: String,
        require : [true, 'nomor telpon harus diisi']
    }
    
})
module.exports = mongoose.model('User', userSchema);